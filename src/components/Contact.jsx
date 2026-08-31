import { useApp } from "../app/store.jsx";
import { CONTACT } from "../lib/site.js";

export default function Contact() {
  const { t } = useApp();

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">{t("contact.eyebrow")}</p>
          <h2 id="contact-title">{t("contact.title")}</h2>
          <ul className="contact-list">
            <li>
              <strong>{t("contact.address")}</strong>
              <br />
              {CONTACT.address1}
              <br />
              {CONTACT.address2}
            </li>
            <li>
              <strong>{t("contact.phone")}</strong>
              <br />
              <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
            </li>
            <li>
              <strong>{t("contact.email")}</strong>
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <strong>{t("contact.languages")}</strong>
              <br />
              {t("contact.languagesValue")}
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">{t("contact.knowEyebrow")}</p>
          <h2>{t("contact.knowTitle")}</h2>
          <ul className="feature-list">
            {t("contact.practical").map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <a className="btn" href="#reservation">{t("contact.cta")}</a>
        </div>
      </div>
    </section>
  );
}
