import { useApp } from "../app/store.jsx";
import Map from "./Map.jsx";

export default function Surroundings() {
  const { t } = useApp();

  return (
    <section id="environs" className="section" aria-labelledby="environs-title">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">{t("surroundings.eyebrow")}</p>
          <h2 id="environs-title">{t("surroundings.title")}</h2>
          <ul className="distance-list">
            {t("surroundings.distances").map((d) => (
              <li key={d.place}>
                <span>{d.place}</span>
                <span>{d.value}</span>
              </li>
            ))}
          </ul>
          <p>{t("surroundings.p")}</p>
        </div>
        <div className="map-wrap">
          <Map />
        </div>
      </div>
    </section>
  );
}
