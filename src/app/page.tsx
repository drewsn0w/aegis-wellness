import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { HeroBanner } from "@/components/HeroBanner";
import styles from "./page.module.css";

export default function Home() {
  const featured = getFeaturedProducts(4);

  return (
    <div className={styles.page}>
      <HeroBanner />

      <section className={styles.marquee}>
        <div className={styles.container}>
          <div className={styles.marqueeRow}>
            <span>Premium Research Peptides</span>
            <span>Third Party Tested</span>
            <span>2 Day Shipping</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured peptides</h2>
            <p className={styles.sectionSubtitle}>
              Example products from the current catalog. Prices and availability are confirmed via
              the quote flow.
            </p>
          </div>

          <div className={styles.grid}>
            {featured.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className={styles.card}>
                {p.image ? (
                  <div className={styles.cardImageWrap}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={300}
                      height={300}
                      className={styles.cardImage}
                    />
                  </div>
                ) : null}
                <div className={styles.cardContent}>
                  <div className={styles.cardTop}>
                    <span className={styles.price}>
                      ${p.price.toFixed(0)} {p.unit}
                    </span>
                    <span className={styles.badge}>{p.category}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{p.name}</h3>
                  <p className={styles.cardDescription}>{p.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardLink}>
                      View details <span aria-hidden>→</span>
                    </span>
                    <span className={`${styles.cardMono} mono`}>ID: {p.id}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.sectionCta}>
            <Link href="/products" className={styles.linkCta}>
              See full catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
