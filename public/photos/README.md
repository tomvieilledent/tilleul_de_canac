# Photos

Déposer les photos **source** en JPEG, nommées :

- `tc1.jpg` … `tc6.jpg` : galerie
- `tc7.jpg` : photo de la maison (fond du bandeau d'accueil)

Puis générer les dérivés (WebP 400 / 800 / 1024 px + repli JPEG optimisé) :

```bash
npm run images        # nécessite cwebp (libwebp) et magick (ImageMagick)
```

Cela crée `tcN-400.webp`, `tcN-800.webp`, `tcN-1024.webp` et recompresse `tcN.jpg`.
Le nombre de photos de galerie se règle dans `GALLERY_PHOTOS` (`src/lib/site.js`).

Tant qu'une photo est absente, le site affiche un bloc de repli.
