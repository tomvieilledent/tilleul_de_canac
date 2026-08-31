import { useApp } from "../app/store.jsx";
import { GALLERY_PHOTOS, photo } from "../lib/site.js";
import Photo from "./Photo.jsx";

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
              <Photo src={photo(name)} alt={`${t("gallery.title")} — ${i + 1}`} placeholderLabel="" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
