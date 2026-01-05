# GitHub Pages Deployment Checklist

Gjennomgå denne sjekklisten før deployment av statiske React-apper til GitHub Pages.

## 1. Repository Setup
- [ ] Repository er offentlig (public)
- [ ] GitHub Pages er aktivert i Settings → Pages
- [ ] Source er satt til "GitHub Actions" eller "gh-pages branch"

## 2. Build Configuration
- [ ] `vite.config.ts` har `base: '/repository-name/'` (hvis ikke på root domene)
- [ ] Build output path er satt korrekt (`outDir: './dist'`)
- [ ] Build script er oppdatert: `"build": "vite build"`

## 3. Package Management
- [ ] `package-lock.json` er oppdatert og synkronisert
- [ ] Kjør `npm install` lokalt før commit hvis du endrer `package.json`
- [ ] Sjekk at alle pakker har gyldige versjoner (ingen broken dependencies)
- [ ] `node_modules/` er i `.gitignore` (ikke commit installerte pakker)

## 4. Build Artifacts
- [ ] `.gitignore` inneholder `dist/` (bygg-output skal genereres på GitHub Actions)
- [ ] `dist/` mappen er fjernet fra git: `git rm -r --cached dist/`
- [ ] Ingen andre build-output-mapper er committet

## 5. HTML & Assets
- [ ] Fjern eller rett opp alle metatagg som refererer til manglende filer
  - Spesielt: `og:image`, `twitter:image` osv.
- [ ] Alle asset-paths er relative eller absolute (riktig formatted)
- [ ] Favicon og andre kritiske ressurser finnes

## 6. GitHub Actions Workflow
- [ ] `.github/workflows/deploy.yml` eksisterer
- [ ] Workflow bruker `npm install` (ikke `npm ci` hvis package-lock kan være ut av sync)
- [ ] Build kommando er riktig: `npm run build`
- [ ] Deploy-steg bruker `peaceiris/actions-gh-pages` eller `actions/deploy-pages`
- [ ] `permissions` er satt riktig (minst `contents: write` og `pages: write`)
- [ ] Deploy-steg peker til riktig directory: `./dist`

## 7. Routing & URLs
- [ ] `wouter` eller annen router bruker `base` path riktig
- [ ] Links bruker relative paths (unngå hardkodede `/`)
- [ ] Test at alle routes fungerer på `/repo-name/path`

## 8. Testing Før Deploy
- [ ] Kjør `npm run build` lokalt og verifiser `dist/` folder
- [ ] Åpne `dist/index.html` i nettleser for å sjekke basis-funksjonalitet
- [ ] Sjekk at assets lastes (åpne DevTools → Console for errors)
- [ ] Verifiser at ingen 404-feil på ressurser

## 9. After Deploy
- [ ] Vente 2-3 minutter på GitHub Actions workflow
- [ ] Sjekk Actions-fanen for errors
- [ ] Besøk `https://username.github.io/repo-name/`
- [ ] Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Åpne DevTools → Console for JS-errors
- [ ] Test hovedfunksjonalitet (klikk rundt i appen)

## 10. Debugging Tips

Hvis siden fortsatt ikke vises:
- [ ] Sjekk GitHub Pages settings er riktig konfigurert
- [ ] Verifiser base path i vite.config matcher repo-navn
- [ ] Se på Actions-loggen for build/deploy errors
- [ ] Sjekk at `dist/index.html` finnes i gh-pages branch
- [ ] Bruk browser DevTools → Network for å se hvilke requests som feiler

## Common Pitfalls
```
❌ Committe dist/ til main branch
❌ Glemme base: '/repo-name/' i vite.config
❌ Hardkodede asset paths som /assets/... (skal være /repo-name/assets/...)
❌ Bruke npm ci når package-lock kan være out of sync
❌ Uaktivert GitHub Pages i Settings
❌ Refs til manglende bildefiler (og:image osv)
❌ Glemme node_modules i .gitignore
```

## Workflow til fremtiden
1. Lag en branch for endringer
2. Test bygget lokalt: `npm run build`
3. Sjekk `dist/` folder innhold
4. Commit, push, og vent på GitHub Actions
5. Verifiser på live URL
