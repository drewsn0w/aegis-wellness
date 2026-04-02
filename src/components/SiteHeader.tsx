"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { useCart } from "@/state/cart-context";
import { getProducts } from "@/lib/products";

export function SiteHeader() {
  const { totalCount } = useCart();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const products = getProducts();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.leftGroup}>
          <div className={styles.hamburgerWrap} ref={menuRef}>
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
            >
              <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
              <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
              <span className={`${styles.bar} ${open ? styles.barOpen : ""}`} />
            </button>

            {open ? (
              <div className={styles.dropdown}>
                <div className={styles.dropSection}>
                  <div className={styles.dropLabel}>Products</div>
                  {products.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className={styles.dropLink}
                      onClick={() => setOpen(false)}
                    >
                      {p.name}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className={styles.dropLinkAll}
                    onClick={() => setOpen(false)}
                  >
                    View all products
                  </Link>
                </div>

                <div className={styles.dropDivider} />

                <Link
                  href="/contact"
                  className={styles.dropLink}
                  onClick={() => setOpen(false)}
                >
                  Contact Us
                </Link>

                <Link
                  href="/account"
                  className={styles.dropLink}
                  onClick={() => setOpen(false)}
                >
                  My Account
                </Link>
              </div>
            ) : null}
          </div>

          <Link href="/" className={styles.brand}>
            <span className={styles.brandDot} aria-hidden />
            <span className={styles.brandName}>Aegis Wellness</span>
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/products" className={styles.navLink}>
            Catalog
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
