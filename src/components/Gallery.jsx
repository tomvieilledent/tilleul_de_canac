import { PHOTOS } from "../lib/site.js";
import Photo from "./Photo.jsx";

export default function Gallery() {
  return (
    <section id="galerie" className="section">
      <div className="container">
        <p className="eyebrow">En images</p>
        <h2>La chambre d'hôtes</h2>
        <div className="gallery">
          {PHOTOS.map((p) => (
            <figure className="gallery-item" key={p.src}>
              <Photo src={p.src} alt={p.alt} placeholderLabel="Photo" />
            </figure>
          ))}
        </div>
        <p className="note">
          Les photos définitives se placent dans <code>public/photos/</code> (photo-1.jpg …
          photo-6.jpg).
        </p>
      </div>
    </section>
  );
}
