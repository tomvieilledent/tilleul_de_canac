import { useApp } from "../app/store.jsx";
import { photo, HERO_PHOTO } from "../lib/site.js";

export default function Hero() {
  const { t } = useApp();

  return (
    <section className="hero">
      <div
        className="hero-media"
        style={{
          backgroundImage: `url(${photo(HERO_PHOTO)}), linear-gradient(135deg, #4b6b4f 0%, #2d4632 55%, #24381f 100%)`,
        }}
        role="img"
        aria-label={t("hero.imgAlt")}
      />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="hero-kicker">{t("hero.kicker")}</p>
        <h1>Le Tilleul de Canac</h1>
        <p className="hero-lead">{t("hero.lead")}</p>
        <div className="hero-actions">
          <a className="btn" href="#reservation">{t("hero.ctaAvailability")}</a>
          <a className="btn btn-ghost" href="#presentation">{t("hero.ctaDiscover")}</a>
        </div>
      </div>
    </section>
  );
}
