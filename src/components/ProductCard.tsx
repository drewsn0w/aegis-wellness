import Image from "next/image";
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
      {product.image ? (
        <Link href={`/products/${product.slug}`} className={styles.imageWrap}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className={styles.image}
          />
        </Link>
      ) : null}

      <div className={styles.cardBody}>
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
      </div>
    </article>
  );
}
