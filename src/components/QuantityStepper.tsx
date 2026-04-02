"use client";

import styles from "./QuantityStepper.module.css";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 50,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  const safeValue = Number.isFinite(value) ? value : min;
  const decDisabled = safeValue <= min;
  const incDisabled = safeValue >= max;

  return (
    <div className={styles.root} aria-label={label ?? "Quantity"}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => onChange(Math.max(min, safeValue - 1))}
        disabled={decDisabled}
        aria-disabled={decDisabled}
      >
        -
      </button>
      <div className={styles.value}>
        <span className={styles.mono}>{safeValue}</span>
      </div>
      <button
        type="button"
        className={styles.btn}
        onClick={() => onChange(Math.min(max, safeValue + 1))}
        disabled={incDisabled}
        aria-disabled={incDisabled}
      >
        +
      </button>
    </div>
  );
}
