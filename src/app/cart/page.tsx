"use client";

import Link from "next/link";
import { useMemo } from "react";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart } from "@/state/cart-context";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, totalCount, setQuantity, remove } = useCart();

  const subtotal = useMemo(() => {
    return items.reduce((sum, i) => sum + i.lineTotal, 0);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Your cart is empty</h1>
          <p className={styles.subtitle}>
            Browse the catalog and add peptides to request a quote.
          </p>
          <Link href="/products" className={styles.btnPrimary}>
            Browse catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Cart</h1>
            <p className={styles.subtitle}>{totalCount} item(s) selected</p>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Estimated subtotal</span>
              <strong>${subtotal.toFixed(0)}</strong>
            </div>
            <div className={styles.note}>
              No payment collected here. Quote flow confirms final details.
            </div>
          </div>
        </div>

        <div className={styles.lines}>
          {items.map((i) => (
            <div key={i.product.id} className={styles.line}>
              <div className={styles.lineMain}>
                <div>
                  <div className={styles.lineTitle}>{i.product.name}</div>
                  <div className={styles.lineMeta}>
                    <span className="mono">{i.product.category}</span>
                    <span aria-hidden>·</span>
                    <span>
                      ${i.product.price.toFixed(0)} / {i.product.unit}
                    </span>
                  </div>
                </div>

                <div className={styles.stepperWrap}>
                  <QuantityStepper
                    value={i.quantity}
                    min={1}
                    max={50}
                    onChange={(next) => setQuantity(i.product.id, next)}
                    label={`Quantity for ${i.product.name}`}
                  />
                </div>
              </div>

              <div className={styles.lineRight}>
                <div className={styles.lineTotal}>
                  ${i.lineTotal.toFixed(0)}
                </div>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => remove(i.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Link href="/quote" className={styles.btnPrimary}>
            Request quote
          </Link>
          <Link href="/products" className={styles.btnSecondary}>
            Add more
          </Link>
        </div>
      </div>
    </div>
  );
}
