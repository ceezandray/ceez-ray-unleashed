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
  // Featured (existing products)
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
    id: "ceez-banana-sweatshirt",
    name: "Ceez Banana Sweatshirt",
    price: 62.99,
    image: "/images/product-banana-sweatshirt.png",
    hoverImage: "/images/banana-sweatshirt-hover.png",
    category: "Tops",
    description: "Heavyweight crewneck sweatshirt with the iconic banana design.",
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
  // Additional products
  {
    id: "bpf-snapback",
    name: "BPF Snapback",
    price: 34.99,
    image: "/images/ceez-bpf-tee-hover.jpg",
    category: "Hats",
    description: "Classic snapback with embroidered BPF logo. One size fits all.",
  },
  {
    id: "ray-joggers",
    name: "Ray Flight Joggers",
    price: 72.99,
    image: "/images/product-banana-sweatshirt.png",
    category: "Bottoms",
    description: "Slim-fit joggers with reflective pigeon detail. Comfort meets culture.",
  },
  {
    id: "bpf-slides",
    name: "BPF Slides",
    price: 39.99,
    image: "/images/bpf-watch.png",
    category: "Shoes",
    description: "Cushioned slides with raised BPF branding. Summer essential.",
  },
  {
    id: "ceez-hoodie",
    name: "Ceez Street Hoodie",
    price: 79.99,
    image: "/images/ceez-bpf-tee-hover.jpg",
    category: "Tops",
    description: "Oversized pullover hoodie with Ceez graphic. Heavy fleece.",
  },
  {
    id: "bpf-poster",
    name: "BPF Wall Poster",
    price: 24.99,
    image: "/images/product-ceez-bpf-tee.jpg",
    category: "Decor",
    description: "24x36 premium matte poster featuring Ceez & Ray artwork.",
  },
  {
    id: "ray-bucket-hat",
    name: "Ray Bucket Hat",
    price: 29.99,
    image: "/images/banana-sweatshirt-hover.png",
    category: "Hats",
    description: "Reversible bucket hat with pigeon embroidery. UV protection.",
  },
  {
    id: "bpf-cargo-shorts",
    name: "BPF Cargo Shorts",
    price: 58.99,
    image: "/images/product-banana-sweatshirt.png",
    category: "Bottoms",
    description: "Utility cargo shorts with BPF patch. Multiple pockets.",
  },
  {
    id: "ceezray-mug",
    name: "Ceez & Ray Mug",
    price: 18.99,
    image: "/images/ceezwatch.png",
    category: "Decor",
    description: "Ceramic mug with wraparound Ceez & Ray art. Microwave safe.",
  },
  {
    id: "bpf-chain",
    name: "BPF Chain Pendant",
    price: 44.99,
    image: "/images/bpf-watch.png",
    category: "Accessories",
    description: "Stainless steel chain with BPF pendant. Anti-tarnish finish.",
  },
];

export const categories = ["All", "Tops", "Bottoms", "Hats", "Shoes", "Accessories", "Decor"];
