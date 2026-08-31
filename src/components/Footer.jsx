import { useApp } from "../app/store.jsx";

export default function Footer({ onOpen }) {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-copy">© {year} Le Tilleul de Canac — {t("footer.rights")}</p>
        <nav className="footer-links" aria-label={t("footer.legal")}>
          <button type="button" className="linklike" onClick={() => onOpen("legal")}>
            {t("footer.legal")}
          </button>
          <button type="button" className="linklike" onClick={() => onOpen("privacy")}>
            {t("footer.privacy")}
          </button>
          <a href="#top">{t("footer.top")}</a>
        </nav>
      </div>
    </footer>
  );
}
