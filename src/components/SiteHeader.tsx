"use client";

import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { useCart } from "@/state/cart-context";

export function SiteHeader() {
  const { totalCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandDot} aria-hidden />
          <span className={styles.brandName}>Aegis Wellness</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/products" className={styles.navLink}>
            Catalog
          </Link>
          <Link href="/quote" className={styles.navLink}>
            Request quote
          </Link>
          <Link href="/cart" className={styles.cartLink}>
            Cart
            <span className={styles.cartPill} aria-label={`${totalCount} items in cart`}>
              {totalCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
