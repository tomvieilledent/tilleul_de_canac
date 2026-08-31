import { useState } from "react";
import { useApp } from "../app/store.jsx";
import { photoJpg, photoWebpSrcSet, HERO_PHOTO } from "../lib/site.js";

export default function Hero() {
  const { t } = useApp();
  const [failed, setFailed] = useState(false);

  return (
    <section className="hero">
      <div className="hero-fallback" aria-hidden="true" />
      {!failed && (
        <picture>
          <source type="image/webp" srcSet={photoWebpSrcSet(HERO_PHOTO)} sizes="100vw" />
          <img
            className="hero-media"
            src={photoJpg(HERO_PHOTO)}
            alt=""
            width={1024}
            height={768}
            sizes="100vw"
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
          />
        </picture>
      )}
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
