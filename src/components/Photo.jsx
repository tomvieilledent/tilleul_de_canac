import { useState } from "react";

/** Image avec repli « Photo à venir » si le fichier est absent. */
export default function Photo({ src, alt, className, placeholderLabel = "Photo à venir" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`photo-placeholder ${className || ""}`.trim()} aria-label={alt}>
        <span>{placeholderLabel}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
