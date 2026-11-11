/**
 * Video & Static Frame Engine with Progressive Loading and IndexedDB Caching
 * Prioritizes pre-rendered high-speed static WebP frames (/frames/frame_0001.webp...60)
 * and falls back to background video extraction if needed.
 * Delivers zero-latency, buttery-smooth 60/120 FPS scroll on mobile and desktop.
 */

const DB_NAME = 'AdegaVideoCacheDB';
const DB_VERSION = 3;
const STORE_NAME = 'video_frames';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getCachedFrameBlobs(cacheKey: string): Promise<Blob[] | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(cacheKey);
      req.onsuccess = () => {
        if (req.result && Array.isArray(req.result.blobs) && req.result.blobs.length > 0) {
          resolve(req.result.blobs);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
}

export async function saveFrameBlobsToCache(cacheKey: string, blobs: Blob[]): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ key: cacheKey, blobs, timestamp: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    // ignore
  }
}

// Check if static frames folder exists by probing the first frame
export async function checkStaticFramesAvailable(): Promise<boolean> {
  try {
    const res = await fetch('/frames/frame_0001.webp', { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

interface LoadOptions {
  videoElement: HTMLVideoElement;
  frameCount: number;
  targetWidth: number;
  cacheKey: string;
  onFrameExtracted?: (index: number, bitmap: ImageBitmap, blob?: Blob) => void;
  onFirstFrameReady?: (bitmap: ImageBitmap) => void;
  onProgress?: (processed: number, total: number) => void;
  isDebug?: boolean;
}

/**
 * Load static pre-rendered WebP frames progressively in batches.
 * This runs with ultra-low CPU and ZERO video decoding load on mobile devices!
 */
export async function loadStaticFrames({
  frameCount,
  onFrameExtracted,
  onFirstFrameReady,
  onProgress,
  isDebug = false,
}: LoadOptions): Promise<{ bitmaps: (ImageBitmap | null)[]; blobs: Blob[] }> {
  if (isDebug) console.log('[FrameEngine] Loading pre-rendered static WebP frames...', { frameCount });

  const bitmaps: (ImageBitmap | null)[] = new Array(frameCount).fill(null);
  const blobs: Blob[] = new Array(frameCount).fill(null);

  // Helper to load a single frame image and convert to ImageBitmap
  const loadSingleFrame = async (idx: number): Promise<ImageBitmap | null> => {
    const frameNum = String(idx + 1).padStart(4, '0');
    const path = `/frames/frame_${frameNum}.webp`;

    try {
      const response = await fetch(path);
      if (!response.ok) return null;
      const blob = await response.blob();
      blobs[idx] = blob;
      const bitmap = await createImageBitmap(blob);
      bitmaps[idx] = bitmap;
      if (onFrameExtracted) onFrameExtracted(idx, bitmap, blob);
      return bitmap;
    } catch (e) {
      return null;
    }
  };

  // 1. Immediately load frame 0 for instant display
  const firstBitmap = await loadSingleFrame(0);
  if (firstBitmap && onFirstFrameReady) {
    onFirstFrameReady(firstBitmap);
  }

  // 2. Load last frame
  if (frameCount > 1) {
    await loadSingleFrame(frameCount - 1);
  }

  // 3. Priority sequence: every 6th, then every 3rd, then rest
  const remainingIndices: number[] = [];
  const added = new Set<number>([0, frameCount - 1]);

  const add = (i: number) => {
    if (i >= 0 && i < frameCount && !added.has(i)) {
      added.add(i);
      remainingIndices.push(i);
    }
  };

  for (let i = 0; i < frameCount; i++) {
    if (i % 6 === 0) add(i);
  }
  for (let i = 0; i < frameCount; i++) {
    if (i % 3 === 0) add(i);
  }
  for (let i = 0; i < frameCount; i++) {
    add(i);
  }

  // Load in small controlled batches of 6 concurrent downloads
  const BATCH_SIZE = 6;
  let completed = 2; // frame 0 and last
  if (onProgress) onProgress(completed, frameCount);

  for (let b = 0; b < remainingIndices.length; b += BATCH_SIZE) {
    const chunk = remainingIndices.slice(b, b + BATCH_SIZE);
    await Promise.all(
      chunk.map(async (idx) => {
        await loadSingleFrame(idx);
        completed++;
        if (onProgress) onProgress(completed, frameCount);
      })
    );
    // Yield to main thread
    await new Promise((r) => setTimeout(r, 0));
  }

  if (isDebug) console.log('[FrameEngine] All static frames loaded successfully!');
  return { bitmaps, blobs };
}

/**
 * Fallback Video Frame Extraction in background
 */
export async function extractVideoFramesFallback(options: LoadOptions): Promise<{ bitmaps: (ImageBitmap | null)[]; blobs: Blob[] }> {
  const { videoElement, frameCount, targetWidth, cacheKey, onFrameExtracted, onFirstFrameReady, onProgress, isDebug } = options;

  const blobs: Blob[] = new Array(frameCount).fill(null);
  const bitmaps: (ImageBitmap | null)[] = new Array(frameCount).fill(null);

  // 1. Check IndexedDB
  try {
    const cachedBlobs = await getCachedFrameBlobs(cacheKey);
    if (cachedBlobs && cachedBlobs.length === frameCount) {
      if (cachedBlobs[0]) {
        try {
          const firstBitmap = await createImageBitmap(cachedBlobs[0]);
          bitmaps[0] = firstBitmap;
          blobs[0] = cachedBlobs[0];
          if (onFirstFrameReady) onFirstFrameReady(firstBitmap);
          if (onFrameExtracted) onFrameExtracted(0, firstBitmap, cachedBlobs[0]);
        } catch {
          // ignore
        }
      }

      for (let i = 0; i < frameCount; i++) {
        const b = cachedBlobs[i];
        if (b && (i !== 0 || !bitmaps[0])) {
          try {
            const bmp = await createImageBitmap(b);
            bitmaps[i] = bmp;
            blobs[i] = b;
            if (onFrameExtracted) onFrameExtracted(i, bmp, b);
          } catch {
            // ignore
          }
        }
        if (onProgress) onProgress(i + 1, frameCount);
      }
      return { bitmaps, blobs };
    }
  } catch {
    // continue to extraction
  }

  // 2. Video element extraction
  if (videoElement.readyState < 1) {
    await new Promise<void>((resolve) => {
      const onMeta = () => {
        videoElement.removeEventListener('loadedmetadata', onMeta);
        resolve();
      };
      videoElement.addEventListener('loadedmetadata', onMeta);
      videoElement.load();
    });
  }

  const duration = videoElement.duration || 7.9;
  const videoW = videoElement.videoWidth || 1280;
  const videoH = videoElement.videoHeight || 720;
  const aspect = videoH / videoW;
  const targetHeight = Math.round(targetWidth * aspect);

  const offscreen = document.createElement('canvas');
  offscreen.width = targetWidth;
  offscreen.height = targetHeight;
  const ctx = offscreen.getContext('2d', { alpha: false });

  const seekVideo = (time: number): Promise<void> => {
    return new Promise((resolve) => {
      let resolved = false;
      const done = () => {
        if (!resolved) {
          resolved = true;
          videoElement.removeEventListener('seeked', done);
          resolve();
        }
      };
      videoElement.addEventListener('seeked', done);
      videoElement.currentTime = Math.min(Math.max(0, time), duration - 0.02);
      setTimeout(done, 150);
    });
  };

  // Frame 0 capture
  try {
    await seekVideo(0);
    if (ctx) {
      ctx.drawImage(videoElement, 0, 0, targetWidth, targetHeight);
      const firstBitmap = await createImageBitmap(offscreen);
      bitmaps[0] = firstBitmap;
      if (onFirstFrameReady) onFirstFrameReady(firstBitmap);
      if (onFrameExtracted) onFrameExtracted(0, firstBitmap);

      offscreen.toBlob((b) => {
        if (b) blobs[0] = b;
      }, 'image/webp', 0.75);
    }
  } catch {
    // ignore
  }

  const indices: number[] = [frameCount - 1];
  for (let i = 0; i < frameCount; i++) {
    if (i !== 0 && i !== frameCount - 1) indices.push(i);
  }

  for (const idx of indices) {
    const targetTime = (idx / (frameCount - 1)) * duration;
    await seekVideo(targetTime);

    if (ctx) {
      ctx.drawImage(videoElement, 0, 0, targetWidth, targetHeight);
      try {
        const bitmap = await createImageBitmap(offscreen);
        bitmaps[idx] = bitmap;
        if (onFrameExtracted) onFrameExtracted(idx, bitmap);
      } catch {
        // ignore
      }

      offscreen.toBlob((b) => {
        if (b) blobs[idx] = b;
      }, 'image/webp', 0.75);
    }

    if (onProgress) onProgress(idx + 1, frameCount);
    await new Promise((r) => setTimeout(r, 20));
  }

  setTimeout(() => {
    const valid = blobs.filter(Boolean);
    if (valid.length >= frameCount * 0.8) {
      saveFrameBlobsToCache(cacheKey, blobs);
    }
  }, 200);

  return { bitmaps, blobs };
}

/**
 * Main facade: Uses static pre-rendered frames if available, otherwise video extraction fallback.
 */
export async function extractVideoFrames(options: LoadOptions): Promise<{ bitmaps: (ImageBitmap | null)[]; blobs: Blob[] }> {
  const hasStatic = await checkStaticFramesAvailable();
  if (hasStatic) {
    return loadStaticFrames(options);
  }
  return extractVideoFramesFallback(options);
}
