import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import styles from "./page.module.css";

export default function Home() {
  const featured = getFeaturedProducts(4);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={`${styles.kicker} mono`}>AEGIS WELLNESS · THIRD PARTY TESTED</div>
          <h1 className={styles.title}>
            Premium Research Peptides
            <span className={styles.titleAccent}> For Lab Use Only</span>
          </h1>
          <p className={styles.subtitle}>
            Shop high-quality research peptides with transparent catalog data and fast quote
            fulfillment.
          </p>

          <div className={styles.ctas}>
            <Link href="/products" className={styles.btnPrimary}>
              Shop all peptides
            </Link>
            <Link href="/quote" className={styles.btnSecondary}>
              Request quote
            </Link>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <div className={styles.trustDot} />
              <div className={styles.trustText}>Batch QC workflow</div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustDotAlt} />
              <div className={styles.trustText}>Chain-of-custody notes</div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustDotThird} />
              <div className={styles.trustText}>Protocol-fit consultation</div>
            </div>
          </div>
        </div>
      </div>

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
