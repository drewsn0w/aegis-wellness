import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import styles from "./products.module.css";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Catalog</h1>
          <p className={styles.subtitle}>
            Add items to your cart, then request a quote for confirmed details.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
