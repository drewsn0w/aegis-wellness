"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProductById, type Product } from "@/lib/products";

type CartLines = Record<string, number>; // productId -> quantity

type CartContextValue = {
  lines: CartLines;
  totalCount: number;
  items: Array<{ product: Product; quantity: number; lineTotal: number }>;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_KEY = "peptide_cart_v1";

function readStoredLines(): CartLines {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};

    const lines: CartLines = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      const qty = typeof value === "number" ? value : Number(value);
      if (!key || !Number.isFinite(qty)) continue;
      const safeQty = Math.max(0, Math.floor(qty));
      if (safeQty > 0) lines[key] = safeQty;
    }
    return lines;
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLines>(() => readStoredLines());


  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      // Ignore storage failures (private browsing, etc.).
    }
  }, [lines]);

  const totalCount = useMemo(() => {
    return Object.values(lines).reduce((sum, qty) => sum + qty, 0);
  }, [lines]);

  const items = useMemo(() => {
    const out: Array<{ product: Product; quantity: number; lineTotal: number }> = [];
    for (const [productId, quantity] of Object.entries(lines)) {
      const product = getProductById(productId);
      if (!product) continue;
      out.push({ product, quantity, lineTotal: product.price * quantity });
    }
    return out;
  }, [lines]);

  const value: CartContextValue = {
    lines,
    totalCount,
    items,
    add: (productId, quantity = 1) => {
      setLines((prev) => {
        const next = { ...prev };
        const current = next[productId] ?? 0;
        const safeQty = Math.max(0, Math.floor(quantity));
        const updated = current + safeQty;
        if (updated <= 0) delete next[productId];
        else next[productId] = updated;
        return next;
      });
    },
    setQuantity: (productId, quantity) => {
      const safeQty = Math.max(0, Math.floor(quantity));
      setLines((prev) => {
        const next = { ...prev };
        if (safeQty <= 0) delete next[productId];
        else next[productId] = safeQty;
        return next;
      });
    },
    remove: (productId) => {
      setLines((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    },
    clear: () => setLines({}),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
