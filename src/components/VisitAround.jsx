import { useApp } from "../app/store.jsx";

export default function VisitAround() {
  const { t } = useApp();

  return (
    <section id="visiter" className="section section-alt" aria-labelledby="visiter-title">
      <div className="container">
        <p className="eyebrow">{t("visit.eyebrow")}</p>
        <h2 id="visiter-title">{t("visit.title")}</h2>
        <p className="section-intro">{t("visit.intro")}</p>

        <ul className="cards visit-cards">
          {t("visit.places").map((p) => (
            <li key={p.name} className="card">
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <a
                className="card-link"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.linkLabel} ↗
              </a>
            </li>
          ))}
        </ul>

        <h3 className="visit-subtitle">{t("visit.eatTitle")}</h3>
        <p className="section-intro">{t("visit.eatIntro")}</p>
        <ul className="cards visit-cards">
          {t("visit.restaurants").map((r) => (
            <li key={r.name} className="card">
              <h3>{r.name}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>

        <div className="visit-office">
          <div>
            <p className="eyebrow">{t("visit.officeTitle")}</p>
            <p>{t("visit.officeText")}</p>
          </div>
          <div className="visit-office-actions">
            <a
              className="btn"
              href={t("visit.ticketingHref")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("visit.ticketingCta")}
            </a>
            <a
              className="card-link"
              href={t("visit.officeHref")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("visit.officeCta")} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
