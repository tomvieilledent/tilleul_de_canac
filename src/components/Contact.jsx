import { CONTACT, PRACTICAL } from "../lib/site.js";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Nous joindre</h2>
          <ul className="contact-list">
            <li>
              <strong>Adresse</strong>
              <br />
              {CONTACT.address1}
              <br />
              {CONTACT.address2}
            </li>
            <li>
              <strong>Téléphone</strong>
              <br />
              <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
            </li>
            <li>
              <strong>E-mail</strong>
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <strong>Langues parlées</strong>
              <br />
              {CONTACT.languages}
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Bon à savoir</p>
          <h2>Informations pratiques</h2>
          <ul className="feature-list">
            {PRACTICAL.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <a className="btn" href="#reservation">Voir les disponibilités</a>
        </div>
      </div>
    </section>
  );
}
