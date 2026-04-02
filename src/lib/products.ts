import { z } from "zod";
import productsJson from "../../data/products.json";

const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  currency: z.string().min(1),
  unit: z.string().min(1),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  category: z.string().min(1),
  tags: z.array(z.string()),
  quality: z.string().min(1),
});

const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;

const products = productsSchema.parse(productsJson);

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}
export function getProductById(id: string): Product | null {
  return products.find((p) => p.id === id) ?? null;
}
