import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";
import styles from "./page.module.css";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const relatedProducts = getProducts()
    .filter((candidate) => candidate.category === product?.category && candidate.id !== product?.id)
    .slice(0, 2);

  if (!product) return notFound();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <span>Catalog</span> <span aria-hidden>›</span> <span>{product.category}</span>
        </div>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.priceRow}>
              <span className={styles.price}>
                ${product.price.toFixed(0)} / {product.unit}
              </span>
              <span className={styles.idMono}>
                ID: <span className="mono">{product.id}</span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            {product.image ? (
              <div className={styles.imageCard}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className={styles.productImage}
                  priority
                />
              </div>
            ) : null}

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.description}>{product.description}</p>

              <h3 className={styles.subTitle}>Quality & documentation</h3>
              <p className={styles.quality}>{product.quality}</p>

              <h3 className={styles.subTitle}>Tags</h3>
              <div className={styles.tags}>
                {product.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.buyCard}>
              <h2 className={styles.sectionTitle}>Add to cart</h2>
              <p className={styles.smallMuted}>
                You’ll request a quote next. Prices here help you estimate; final details are
                confirmed during checkout.
              </p>

              <AddToCartButton productId={product.id} />

              <div className={styles.actionsHint}>
                Tip: when your cart is ready, head to the cart page to submit the quote.
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <section className={styles.related}>
            <h2 className={styles.sectionTitle}>More in {product.category}</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} showAddToCart={false} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
