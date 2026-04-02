"use client";

import { useState, useEffect } from "react";
import styles from "./DisclaimerGate.module.css";

const STORAGE_KEY = "aegis_disclaimer_accepted";

export function DisclaimerGate() {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}

    try {
      setAccepted(window.sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setAccepted(false);
    }
    setMounted(true);
  }, []);

  function handleAccept() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setAccepted(true);
  }

  if (!mounted || accepted) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.brandRow}>
          <span className={styles.dot} aria-hidden />
          <span className={styles.brandName}>Aegis Wellness</span>
        </div>

        <h2 className={styles.title}>Research Use &amp; Compliance Disclaimer</h2>

        <p className={styles.intro}>
          Before accessing this website, please review and acknowledge the following:
        </p>

        <ol className={styles.list}>
          <li>
            The products available on this website are intended for <strong>laboratory research
            purposes only</strong> and are not for human or animal consumption.
          </li>
          <li>
            The products are not intended to diagnose, treat, cure, or prevent any disease.
          </li>
          <li>
            The products should not be used as a food, drug, cosmetic, or for other household use.
          </li>
          <li>
            By accessing this website, you acknowledge that it is your sole responsibility to
            ensure compliance with all applicable laws and regulations within your jurisdiction.
          </li>
          <li>
            No information on this website should be interpreted or construed as medical advice
            or guidance.
          </li>
        </ol>

        <p className={styles.confirm}>By continuing, you confirm that you:</p>

        <ul className={styles.confirmList}>
          <li>Have read and understood the above disclaimer.</li>
          <li>Are at least 21 years of age.</li>
          <li>Are a qualified researcher or purchasing agent.</li>
          <li>
            Agree that your access to this website constitutes acceptance of these terms.
          </li>
        </ul>

        <div className={styles.actions}>
          <button type="button" className={styles.acceptBtn} onClick={handleAccept}>
            I Agree &amp; Enter
          </button>
          <a href="https://www.google.com" className={styles.declineLink}>
            I Do Not Agree
          </a>
        </div>
      </div>
    </div>
  );
}
