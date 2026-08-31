import { useEffect, useRef } from "react";
import { useApp } from "../app/store.jsx";

export default function LegalModal({ which, onClose }) {
  const { t } = useApp();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const open = which === "legal" || which === "privacy";

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const title = which === "legal" ? t("legal.legalTitle") : t("legal.privacyTitle");
  const body = which === "legal" ? t("legal.legalBody") : t("legal.privacyBody");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="modal-title">{title}</h2>
          <button type="button" ref={closeRef} className="icon-btn" onClick={onClose} aria-label={t("legal.close")}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
