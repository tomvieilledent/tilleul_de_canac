import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { strings, LOCALES, LANG_KEYS, DEFAULT_LANG } from "../i18n/strings.js";

const LANG_KEY = "tdc.lang";
const THEME_KEY = "tdc.theme";

const Ctx = createContext(null);

function safeGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* stockage indisponible : on ignore */
  }
}

function initialLang() {
  const stored = safeGet(LANG_KEY);
  if (stored && LANG_KEYS.includes(stored)) return stored;
  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  return LANG_KEYS.includes(nav) ? nav : DEFAULT_LANG;
}

function initialTheme() {
  const stored = safeGet(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

/** Résout une clé "a.b.c" dans un objet. */
function resolve(obj, path) {
  return path.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

export function AppProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const [theme, setThemeState] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
    const meta = strings[lang]?.meta;
    if (meta) {
      document.title = meta.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", meta.description);
    }
    safeSet(LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#14171a" : "#3a5a40");
    safeSet(THEME_KEY, theme);
  }, [theme]);

  const setLang = useCallback((next) => {
    if (LANG_KEYS.includes(next)) setLangState(next);
  }, []);

  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  const t = useCallback(
    (path) => {
      const val = resolve(strings[lang], path);
      if (val !== undefined) return val;
      const fallback = resolve(strings[DEFAULT_LANG], path);
      return fallback !== undefined ? fallback : path;
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      locale: LOCALES[lang].code,
      langs: LANG_KEYS.map((k) => ({ key: k, name: LOCALES[k].name })),
      theme,
      toggleTheme,
      t,
    }),
    [lang, setLang, theme, toggleTheme, t]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
