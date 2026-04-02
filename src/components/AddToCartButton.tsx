"use client";

import { useMemo, useState } from "react";
import styles from "./AddToCartButton.module.css";
import { QuantityStepper } from "./QuantityStepper";
import { getProductById } from "@/lib/products";
import { useCart } from "@/state/cart-context";

export function AddToCartButton({ productId }: { productId: string }) {
  const { add } = useCart();
  const product = useMemo(() => getProductById(productId), [productId]);
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <div className={styles.root}>
      <QuantityStepper value={qty} onChange={setQty} min={1} max={50} />

      <button
        type="button"
        className={styles.btn}
        onClick={() => add(productId, qty)}
      >
        Add to cart
      </button>

      <div className={styles.meta}>
        <div className={styles.price}>
          ${product.price.toFixed(0)} / {product.unit}
        </div>
        <div className={styles.hint}>Quote confirms final details.</div>
      </div>
    </div>
  );
}
