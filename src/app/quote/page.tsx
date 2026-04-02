"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/state/cart-context";
import styles from "./quote.module.css";

export default function QuotePage() {
  const { items, clear } = useCart();

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.lineTotal, 0), [items]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    notes: "",
    consent: false,
  });

  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "success"; message: string; orderId?: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Nothing to quote yet</h1>
          <p className={styles.subtitle}>Add items to your cart before requesting a quote.</p>
          <Link href="/products" className={styles.btnPrimary}>
            Browse catalog
          </Link>
        </div>
      </div>
    );
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      setStatus({ state: "error", message: "Please enter your name." });
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setStatus({ state: "error", message: "Please enter a valid email." });
      return;
    }
    if (!form.country.trim()) {
      setStatus({ state: "error", message: "Please enter your country." });
      return;
    }
    if (!form.consent) {
      setStatus({ state: "error", message: "Please confirm the quote request consent." });
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone || undefined,
            country: form.country,
            address: form.address || undefined,
          },
          notes: form.notes || undefined,
          consent: form.consent,
          cart: {
            items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          },
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; message?: string; orderId?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus({
          state: "error",
          message: data?.message || "Quote submission failed. Please try again.",
        });
        return;
      }

      clear();
      setStatus({
        state: "success",
        message: "Quote request received. We’ll email you shortly with next steps.",
        orderId: data.orderId,
      });
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Request a quote</h1>
            <p className={styles.subtitle}>No payment collected. We confirm final details via email.</p>
          </div>
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Estimated subtotal</span>
              <strong>${subtotal.toFixed(0)}</strong>
            </div>
            <div className={styles.note}>This helps us prepare your quote quickly.</div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Your request</h2>
              <div className={styles.items}>
                {items.map((i) => (
                  <div key={i.product.id} className={styles.itemRow}>
                    <div>
                      <div className={styles.itemName}>{i.product.name}</div>
                      <div className={styles.itemMeta}>
                        Quantity: <span className="mono">{i.quantity}</span>
                      </div>
                    </div>
                    <div className={styles.itemPrice}>${i.lineTotal.toFixed(0)}</div>
                  </div>
                ))}
              </div>

              <div className={styles.disclaimer}>
                This is a request for a quote and protocol guidance workflow. It is not medical advice.
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <form className={styles.form} onSubmit={submit}>
              <h2 className={styles.sectionTitle}>Contact details</h2>

              <label className={styles.label}>
                Name
                <input
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Full name"
                  autoComplete="name"
                />
              </label>

              <label className={styles.label}>
                Email
                <input
                  className={styles.input}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>

              <label className={styles.label}>
                Phone (optional)
                <input
                  className={styles.input}
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+1 ..."
                  autoComplete="tel"
                />
              </label>

              <label className={styles.label}>
                Country
                <input
                  className={styles.input}
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  placeholder="United States"
                  autoComplete="country"
                />
              </label>

              <label className={styles.label}>
                Address (optional)
                <textarea
                  className={styles.textarea}
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Street / city / postal code"
                />
              </label>

              <label className={styles.label}>
                Notes (optional)
                <textarea
                  className={styles.textarea}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Goals, protocol context, clinician notes"
                />
              </label>

              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                />
                <span>
                  I understand this is a quote request workflow (no payment collected here) and it is not medical advice.
                </span>
              </label>

              {status.state === "error" ? (
                <div className={styles.alertError} role="alert">
                  {status.message}
                </div>
              ) : null}
              {status.state === "success" ? (
                <div className={styles.alertOk} role="status">
                  <div>{status.message}</div>
                  {status.orderId ? <div className={styles.orderId}>Order: {status.orderId}</div> : null}
                </div>
              ) : null}

              <div className={styles.submitRow}>
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={status.state === "submitting"}
                >
                  {status.state === "submitting" ? "Submitting..." : "Submit quote request"}
                </button>
                <Link href="/cart" className={styles.btnSecondary}>
                  Back to cart
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
