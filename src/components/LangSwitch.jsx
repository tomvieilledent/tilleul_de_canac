import { useApp } from "../app/store.jsx";

export default function LangSwitch() {
  const { lang, setLang, langs, t } = useApp();

  return (
    <label className="lang-switch">
      <span className="visually-hidden">{t("nav.language")}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        aria-label={t("nav.language")}
      >
        {langs.map((l) => (
          <option key={l.key} value={l.key}>
            {l.key.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
