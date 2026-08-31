import { useApp } from "../app/store.jsx";
import { GALLERY_PHOTOS } from "../lib/site.js";
import Photo from "./Photo.jsx";

const SIZES = "(min-width: 900px) 320px, (min-width: 560px) 45vw, 92vw";

export default function Gallery() {
  const { t } = useApp();

  return (
    <section id="galerie" className="section" aria-labelledby="galerie-title">
      <div className="container">
        <p className="eyebrow">{t("gallery.eyebrow")}</p>
        <h2 id="galerie-title">{t("gallery.title")}</h2>
        <ul className="gallery">
          {GALLERY_PHOTOS.map((name, i) => (
            <li className="gallery-item" key={name}>
              <Photo name={name} alt={`${t("gallery.title")} — ${i + 1}`} sizes={SIZES} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
