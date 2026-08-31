import { useApp } from "../app/store.jsx";

export default function Room() {
  const { t } = useApp();

  return (
    <section id="chambre" className="section section-alt" aria-labelledby="chambre-title">
      <div className="container">
        <p className="eyebrow">{t("room.eyebrow")}</p>
        <h2 id="chambre-title">{t("room.title")}</h2>
        <div className="cards">
          {t("room.features").map((f) => (
            <article className="card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
