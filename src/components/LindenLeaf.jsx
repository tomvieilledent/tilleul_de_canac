/** Feuille de tilleul (cordée, dentée) — hérite de `currentColor`. */
export default function LindenLeaf({ size = 26, className, title = "Feuille de tilleul" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      fill="none"
    >
      <path
        d="M32 5c7 8 19 12 22 26 2 11-9 19-16 20-3 .5-5-2-6-5-1 3-3 5.5-6 5-7-1-18-9-16-20C6.9 17 25 13 32 5Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M32 5c7 8 19 12 22 26 2 11-9 19-16 20-3 .5-5-2-6-5-1 3-3 5.5-6 5-7-1-18-9-16-20C6.9 17 25 13 32 5Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.85">
        <path d="M32 47V11" />
        <path d="M32 22 46 14M32 22 19 15M32 31 49 24M32 31 16 25M32 39 43 34M32 39 22 33" />
      </g>
      <path d="M32 47c0 6 0 9 1 14" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}
