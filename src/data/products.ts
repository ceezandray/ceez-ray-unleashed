export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  // Row 1: Hero mix — tee, accessory, hat, tee
  {
    id: "ceez-bpf-tee",
    name: "Ceez BPF Tee",
    price: 54.99,
    image: "/images/ceez-bpf-tee-hover.jpg",
    hoverImage: "/images/product-ceez-bpf-tee.jpg",
    category: "Tops",
    description: "Official Ceez graphic tee with the BPF logo. Premium cotton blend.",
    featured: true,
  },
  {
    id: "bpf-sports-watch",
    name: "BPF Sports Watch",
    price: 149.99,
    image: "/images/bpf-watch.png",
    hoverImage: "/images/ceezwatch.png",
    category: "Accessories",
    description: "Limited edition BPF sports watch. Water-resistant, street-ready.",
    featured: true,
  },
  {
    id: "bpf-snapback",
    name: "All Black BPF Hat",
    price: 34.99,
    image: "/images/product-bpf-snapback.jpg",
    category: "Hats",
    description: "All black trucker hat with tonal B.P.F embroidery. One size fits all.",
  },
  {
    id: "ray-pigeon-tee",
    name: "Ray 'The Pigeon' Tee",
    price: 44.99,
    image: "/images/product-ray-tee.jpg",
    category: "Tops",
    description: "White tee with Ray in full swagger mode. Sunglasses. Chain. Attitude.",
  },
  // Row 2: decor, tee, accessory, tee
  {
    id: "ceezray-poster",
    name: "Ceez & Ray Art Print",
    price: 29.99,
    image: "/images/product-poster.jpg",
    category: "Decor",
    description: "Premium framed art print of Ceez & Ray in the city. Gallery quality.",
  },
  {
    id: "bpf-dawick-shirt",
    name: "BPF Da'Wick Shirt",
    price: 54.99,
    image: "/images/bpf-dawick-front.png",
    hoverImage: "/images/product-ceez-hoodie.jpg",
    category: "Tops",
    description: "White oversized tee with Black Picket Fence Da'Wick graphic. Ceez & Ray. Est. 2020.",
  },
  {
    id: "bpf-chain",
    name: "Ceez Gold Chain",
    price: 64.99,
    image: "/images/product-chain.jpg",
    category: "Accessories",
    description: "Gold stainless steel chain with gorilla face pendant. Anti-tarnish finish.",
  },
  {
    id: "ceez-banana-sweatshirt",
    name: "Ceez Banana Sweatshirt",
    price: 62.99,
    image: "/images/product-banana-sweatshirt.png",
    hoverImage: "/images/banana-sweatshirt-hover.png",
    category: "Tops",
    description: "Heavyweight crewneck sweatshirt with the iconic banana design.",
    featured: true,
  },
  // Row 3: tee, decor, tee, accessory
  {
    id: "joes-bodega-tee",
    name: "Joe's Bodega Tee",
    price: 44.99,
    image: "/images/product-joes-bodega-tee.jpg",
    category: "Tops",
    description: "Oversized black tee with the iconic Joe's Bodega sign. Elizabeth, NJ. Est. 1992.",
  },
  {
    id: "ceezray-mug",
    name: "Ceez & Ray Mug",
    price: 18.99,
    image: "/images/product-mug.jpg",
    category: "Decor",
    description: "Black ceramic mug with Ceez holding Ray. Microwave safe.",
  },
  {
    id: "bpf-red-tee",
    name: "BPF Red Tee",
    price: 49.99,
    image: "/images/product-bpf-red-tee.jpg",
    category: "Tops",
    description: "Bold red tee with gothic B.P.F lettering. Premium heavyweight cotton.",
  },
  {
    id: "joes-bodega-deck",
    name: "Joe's Bodega Skateboard",
    price: 89.99,
    image: "/images/product-joes-bodega-deck.jpg",
    category: "Accessories",
    description: "Custom skateboard deck featuring Joe's Bodega storefront artwork. Limited run.",
  },
];

export const categories = ["All", "Tops", "Hats", "Accessories", "Decor"];
