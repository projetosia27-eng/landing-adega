export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

export interface DeliveryProduct {
  id: number;
  categoria: string;
  nome: string;
  volume: string;
  preco: string;
  badge?: string;
  icon: string;
  desc: string;
  image: string;
}

export interface ComboItem {
  id: string;
  title: string;
  desc: string;
  price: string;
  icon: string;
  image: string;
}

export interface AdegaConfig {
  name: string;
  subtitle: string;
  location: string;
  address: string;
  whatsapp: string;
  email: string;
  hours: string;
  instagram: string;
  videoUrl: string;
  categories: CategoryItem[];
  produtos: DeliveryProduct[];
  combos: ComboItem[];
  infoItems: { icon: string; text: string }[];
}

export const defaultConfig: AdegaConfig = {
  name: "Adega Caieiras",
  subtitle: "Conveniência & Delivery",
  location: "Caieiras, SP",
  address: "Av. Professor Carvalho Pinto, 450 - Centro, Caieiras - SP",
  whatsapp: "5511999998888",
  email: "contato@adegacaieiras.com.br",
  hours: "Seg a Sáb: 10h às 23h | Dom: 11h às 20h",
  instagram: "@adegacaieiras",
  videoUrl: "/assets/aistudio/Wine_pouring_into_crystal_glass_2c54305b_9472c62a.mp4",
  categories: [
    { id: "todos", name: "Todos", icon: "🔥" },
    { id: "vinhos", name: "Vinhos", icon: "🍷" },
    { id: "espumantes", name: "Espumantes", icon: "🥂" },
    { id: "cervejas", name: "Cervejas", icon: "🍺" },
    { id: "whisky", name: "Whisky", icon: "🥃" },
    { id: "destilados", name: "Vodka e Gin", icon: "🍸" },
    { id: "bebidas", name: "Energéticos", icon: "⚡" }
  ],
  produtos: [
    {
      id: 1,
      categoria: "vinhos",
      nome: "Vinho Tinto Seco Gran Reserva 750ml",
      volume: "750ml",
      preco: "59,90",
      badge: "Mais pedido",
      icon: "🍷",
      desc: "Vinho Tinto Seco Gran Reserva 750ml",
      image: "vinhoreserva"
    },
    {
      id: 2,
      categoria: "espumantes",
      nome: "Espumante Brut Tradicional 750ml",
      volume: "750ml",
      preco: "79,90",
      icon: "🥂",
      desc: "Espumante Brut Tradicional 750ml",
      image: "espumante"
    },
    {
      id: 3,
      categoria: "cervejas",
      nome: "Cerveja Pilsen lata 350ml, pack com 12",
      volume: "Pack 12 un",
      preco: "54,90",
      badge: "Gelado",
      icon: "🍺",
      desc: "Cerveja Pilsen lata 350ml, pack com 12",
      image: "cervejapilsen"
    },
    {
      id: 4,
      categoria: "whisky",
      nome: "Whisky Red Label 1L",
      volume: "1 Litro",
      preco: "119,90",
      icon: "🥃",
      desc: "Whisky Red Label 1L",
      image: "whisky"
    },
    {
      id: 5,
      categoria: "destilados",
      nome: "Vodka Smirnoff 900ml",
      volume: "900ml",
      preco: "39,90",
      badge: "Oferta",
      icon: "🍸",
      desc: "Vodka Smirnoff 900ml",
      image: "vodka"
    },
    {
      id: 6,
      categoria: "destilados",
      nome: "Gin Tanqueray 750ml",
      volume: "750ml",
      preco: "89,90",
      icon: "🍸",
      desc: "Gin Tanqueray 750ml",
      image: "gin"
    },
    {
      id: 7,
      categoria: "bebidas",
      nome: "Red Bull Energético 2L",
      volume: "Garrafa 2L",
      preco: "29,90",
      icon: "⚡",
      desc: "Red Bull Energético 2L",
      image: "redbull"
    }
  ],
  combos: [
    {
      id: "kit-churrasco",
      title: "Kit Churrasco",
      desc: "Carvão Vegetal 3kg + Gelo em Cubos 5kg + 12 Cervejas Geladas",
      price: "129,90",
      icon: "🥩",
      image: "kitchurrasco"
    },
    {
      id: "kit-presente",
      title: "Kit Presente",
      desc: "Vinho Gran Reserva 750ml + 2 Taças de Cristal",
      price: "149,90",
      icon: "🎁",
      image: "kitpresente"
    },
    {
      id: "noite-amigos",
      title: "Noite com Amigos",
      desc: "Whisky Red Label 1L + Energéticos + Gelo em Cubos 5kg",
      price: "189,90",
      icon: "🥳",
      image: "kitnoite"
    },
    {
      id: "kit-gelo-carvao",
      title: "Kit Gelo + Carvão",
      desc: "Gelo em Cubos 5kg + Carvão Vegetal 3kg",
      price: "34,90",
      icon: "🧊",
      image: "kitgelocarvao"
    }
  ],
  infoItems: [
    { icon: "🛵", text: "Entrega expressa em Caieiras e região" },
    { icon: "🕒", text: "Atendimento Seg a Sáb: 10h–23h | Dom: 11h–20h" },
    { icon: "💳", text: "Pagamento em Pix, Cartão ou Dinheiro" },
    { icon: "🔞", text: "Venda apenas para maiores de 18 anos" }
  ]
};
