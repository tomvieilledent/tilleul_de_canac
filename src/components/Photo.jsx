import { useState } from "react";

/** Image avec repli visuel si le fichier est absent. */
export default function Photo({ src, alt, className, placeholderLabel = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`photo-placeholder ${className || ""}`.trim()} role="img" aria-label={alt}>
        {placeholderLabel ? <span>{placeholderLabel}</span> : null}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
