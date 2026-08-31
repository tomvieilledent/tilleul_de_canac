import { useApp } from "../app/store.jsx";
import Photo from "./Photo.jsx";

export default function About() {
  const { t } = useApp();

  return (
    <section id="presentation" className="section" aria-labelledby="presentation-title">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">{t("about.eyebrow")}</p>
          <h2 id="presentation-title">{t("about.title")}</h2>
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <ul className="feature-list">
            {t("about.highlights").map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <figure className="figure">
          <Photo name="tc1" alt={t("about.figCaption")} sizes="(min-width: 900px) 500px, 92vw" />
          <figcaption>{t("about.figCaption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
