import { useEffect, useState } from "react";

/** Charge un JSON sous public/ en tenant compte du base path Vite. */
export function useJson(relativePath) {
  const [state, setState] = useState({ data: null, error: null, loading: true });

  useEffect(() => {
    let alive = true;
    const url = `${import.meta.env.BASE_URL}${relativePath.replace(/^\//, "")}`;
    fetch(url, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => alive && setState({ data, error: null, loading: false }))
      .catch((error) => {
        console.error("useJson", relativePath, error);
        if (alive) setState({ data: null, error, loading: false });
      });
    return () => {
      alive = false;
    };
  }, [relativePath]);

  return state;
}
