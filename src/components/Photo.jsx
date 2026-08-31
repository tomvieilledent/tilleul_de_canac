import { useState } from "react";
import { photoJpg, photoWebpSrcSet } from "../lib/site.js";

/** <picture> WebP responsive + repli JPEG, avec repli visuel si le fichier est absent. */
export default function Photo({
  name,
  alt,
  sizes,
  className,
  width = 1024,
  height = 768,
  eager = false,
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`photo-placeholder ${className || ""}`.trim()} role="img" aria-label={alt} />;
  }

  return (
    <picture>
      <source type="image/webp" srcSet={photoWebpSrcSet(name)} sizes={sizes} />
      <img
        className={className}
        src={photoJpg(name)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
