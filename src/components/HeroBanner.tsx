"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./HeroBanner.module.css";

const AMINO_SEQUENCE =
  "Ala-Gly-Ser-Thr-Pro-Val-Leu-Ile-Met-Phe-Trp-Tyr-Asp-Glu-Lys-Arg-His-Cys-Asn-Gln";

function MolecularCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const count = Math.floor((w * h) / 12000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1.5,
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      const bondDist = 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < bondDist) {
            const alpha = (1 - dist / bondDist) * 0.18;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `rgba(57,175,200,${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(57,175,200,0.55)";
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * 0.45, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(200,240,255,0.6)";
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    seed();
    draw();
    window.addEventListener("resize", () => { resize(); seed(); });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", () => {}); };
  }, []);

  return <canvas ref={ref} className={styles.moleculeCanvas} />;
}

export function HeroBanner() {
  return (
    <section className={styles.hero}>
      {/* Hexagonal grid overlay */}
      <div className={styles.hexGrid} aria-hidden />

      {/* Molecular network canvas */}
      <MolecularCanvas />

      {/* DNA helix strands */}
      <div className={styles.helixWrap} aria-hidden>
        <div className={`${styles.helix} ${styles.helixLeft}`}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={styles.helixRung} style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>
        <div className={`${styles.helix} ${styles.helixRight}`}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={styles.helixRung} style={{ animationDelay: `${i * 0.18 + 0.09}s` }} />
          ))}
        </div>
      </div>

      {/* Spectrometer scan line */}
      <div className={styles.scanLine} aria-hidden />

      {/* Grid coordinate markers */}
      <div className={styles.gridMarkers} aria-hidden>
        <span className={styles.marker} style={{ top: "10%", left: "6%" }}>01</span>
        <span className={styles.marker} style={{ top: "10%", right: "6%" }}>02</span>
        <span className={styles.marker} style={{ bottom: "10%", left: "6%" }}>03</span>
        <span className={styles.marker} style={{ bottom: "10%", right: "6%" }}>04</span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.brandTag}>AEGIS WELLNESS</div>
        <div className={styles.testedBadge}>
          <span className={styles.badgeDot} />
          third party tested
        </div>

        <h1 className={styles.title}>
          Premium Research Peptides
        </h1>
        <p className={styles.subtitle}>For Lab Use Only</p>

        <Link href="/products" className={styles.cta}>
          Shop All Peptides
          <svg className={styles.ctaArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Amino acid ticker */}
      <div className={styles.ticker} aria-hidden>
        <div className={styles.tickerTrack}>
          <span>{AMINO_SEQUENCE}</span>
          <span>{AMINO_SEQUENCE}</span>
        </div>
      </div>
    </section>
  );
}
