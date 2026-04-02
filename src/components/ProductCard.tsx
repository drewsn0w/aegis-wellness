import Link from "next/link";
import type { Product } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";
import styles from "./ProductCard.module.css";

export function ProductCard({
  product,
  showAddToCart = true,
}: {
  product: Product;
  showAddToCart?: boolean;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.badge}>{product.category}</span>
        <span className={styles.price}>
          ${product.price.toFixed(0)} / {product.unit}
        </span>
      </div>

      <h2 className={styles.cardTitle}>
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
      </h2>

      <p className={styles.cardDescription}>{product.description}</p>

      <div className={styles.actions}>
        {showAddToCart ? (
          <AddToCartButton productId={product.id} />
        ) : (
          <Link href={`/products/${product.slug}`} className={styles.viewLink}>
            View details
          </Link>
        )}
      </div>
    </article>
  );
}
