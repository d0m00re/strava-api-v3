# strava-api-v3 — Roadmap des futures mises à jour

_Mise à jour : 2026-10-27_

## Contexte

Le package passe de la v0.0.48 expérimentale à une v1.0.0 utilisable en production, en cinq versions. Aujourd'hui, le découpage par ressource (activity, athlete, club, gear, route, segment, segmentEffort, upload, auth0) et le build ESM + CJS via tsup sont de bonnes bases. Mais plusieurs endpoints sont cassés, les erreurs HTTP sont ignorées et des tokens sont écrits dans la console.

Ordre retenu : d'abord la correction et la sécurité, puis la fiabilité, puis les nouvelles fonctionnalités, et enfin la stabilisation de l'API publique. Les ruptures de compatibilité sont regroupées en v0.4.0, pour qu'aucune autre version n'en impose aux utilisateurs.

## Vue d'ensemble

| Version | Thème | Contenu clé |
| --- | --- | --- |
| v0.1.0 | Fondations | Bugs bloquants, client HTTP unique, `StravaError`, sécurité, packaging |
| v0.2.0 | Fiabilité | Tests mockés, CI, refresh automatique des tokens, rate limit |
| v0.3.0 | Fonctionnalités | Pagination, webhooks, `deauthorize`, options du client |
| v0.4.0 | Types et API | Renommages, types sans `any`, signatures figées — **seule version avec ruptures de compatibilité** |
| v1.0.0 | Stabilisation | README, TypeDoc, exemples, release automatisée |

Chaque version s'appuie sur la précédente : le client HTTP de la v0.1.0 porte le refresh et le rate limit de la v0.2.0.

---

## v0.1.0 — Fondations

Objectif : chaque endpoint existant fonctionne, et une erreur HTTP lève une exception au lieu de renvoyer un faux objet.

### Corrections bloquantes

| Problème | Fichier | Correction |
| --- | --- | --- |
| `createActivity` n'envoie pas de body | `src/api/subApi/StravaActivity.api.ts` | Envoyer `props` en JSON |
| `getActivityById` ignore `include_all_efforts` | `src/api/subApi/StravaActivity.api.ts` | Utiliser l'URL construite |
| `updateActivityById` sans `Content-Type` | `src/api/subApi/StravaActivity.api.ts` | Ajouter `application/json` |
| `createUpload` sérialise le fichier en JSON | `src/api/subApi/StravaUpload.api.ts` | `FormData` natif + `Blob` |
| `getActivitiesGpxById` appelle le site web, pas l'API | `src/api/subApi/StravaActivity.api.ts` | Supprimer la méthode |
| L'OAuth lit `process.env` au lieu des options du client | `src/api/subApi/StravaAuth0.api.ts` | Utiliser `clientId` / `clientSecret` de l'instance |
| `redirect_uri` codé en dur sur `http://localhost` | `src/api/subApi/StravaAuth0.api.ts` | Le passer en paramètre |
| Licence ISC dans `package.json`, MIT dans `LICENSE` | `package.json` | Aligner sur MIT |

### Client HTTP centralisé

- Une seule méthode privée `request<T>(method, path, { query, body, form, responseType })` remplace la quarantaine de blocs `try/fetch/catch` recopiés.
- Les paramètres passent par `URLSearchParams` : encodage correct, valeurs `undefined` ignorées.
- La réponse est lue en JSON ou en texte selon l'endpoint (GPX, TCX).

### Gestion d'erreurs

- Classe `StravaError extends Error` avec `status`, `errors[]` (le `Fault` renvoyé par Strava) et `rateLimit`.
- Sous-classes : `StravaAuthError` (401), `StravaNotFoundError` (404), `StravaRateLimitError` (429).
- `res.ok` est vérifié sur chaque réponse.

### Sécurité

- Supprimer tous les `console.log` et `console.error`, dont ceux qui affichent `access_token` et `refresh_token`.
- Envoyer `client_secret` et les codes dans le body du POST `/oauth/token`, plus dans l'URL.
- Option `logger` facultative pour qui veut tracer les requêtes.

### Packaging

- Remplacer `.npmignore` par `"files": ["dist"]`.
- Ajouter `"engines": { "node": ">=18" }`, `"sideEffects": false`, ainsi que `main`, `module` et `types`.
- Retirer la dépendance `form-data`, remplacée par le `FormData` natif.
- Renommer le script `publish` (il se rappelle lui-même) et ajouter `prepublishOnly` : build puis tests.
- Retirer « DON'T USE THIS CODE » du README.

---

## v0.2.0 — Fiabilité

Objectif : la lib tourne sans intervention dans une app longue durée (tokens rafraîchis, quotas respectés) et chaque endpoint est couvert par un test qui ne dépend pas du compte Strava du développeur.

### Tests

- Séparer les tests unitaires mockés (`msw` ou un `fetch` injecté) des tests d'intégration, lancés seulement si `STRAVA_ACCESS_TOKEN` est défini.
- Chaque test unitaire vérifie l'URL, la méthode, les headers, le body et le mapping des erreurs.
- Supprimer les assertions liées à un compte personnel, comme `expect(data.calories).toBe(731)`.
- Envisager Vitest à la place de Jest + ts-jest : ESM natif, configuration plus simple.

### Intégration continue

- GitHub Actions : lint, typecheck (`tsc --noEmit`), tests unitaires et build sur Node 18, 20 et 22.
- ESLint et Prettier.
- `publint` et `@arethetypeswrong/cli` pour valider les exports ESM / CJS et les types.

### Refresh automatique des tokens

- Le client stocke `expiresAt`. Si le token expire dans moins de 5 minutes, il est rafraîchi avant la requête.
- Sur un 401, le client rafraîchit le token puis rejoue la requête une seule fois.
- Callback `onTokenRefresh(tokens)` pour que l'app sauvegarde les nouveaux tokens.
- Deux appels simultanés ne déclenchent qu'un seul refresh.

### Rate limit

- Lire les headers `X-RateLimit-Limit` et `X-RateLimit-Usage` (quota 15 minutes et quota journalier).
- Exposer l'état courant via `client.rateLimit`.
- Retry optionnel avec backoff exponentiel sur 429 et 5xx (`maxRetries`, désactivé par défaut).

---

## v0.3.0 — Fonctionnalités

Objectif : couvrir l'API Strava v3 publique au complet, webhooks compris, et rendre la pagination transparente.

### Pagination

- Itérateurs asynchrones : `for await (const activity of client.athlete.iterateActivities({ after }))`.
- Helper `getAll*` avec une limite `maxPages` pour éviter de vider le quota.
- Les deux modèles gérés : `page` / `per_page` et curseur (`after_cursor` pour les commentaires).

### Webhooks (Push Subscriptions)

- `webhook.createSubscription`, `listSubscriptions`, `deleteSubscription`.
- Helper `webhook.verifyChallenge(query, verifyToken)` qui renvoie la réponse `hub.challenge` attendue.
- Type `WebhookEvent` pour les événements reçus (activity / athlete, create / update / delete).

### Endpoints manquants

- `oauth.deauthorize` (`POST /oauth/deauthorize`).
- Contrôle de couverture endpoint par endpoint contre le [Swagger officiel](https://developers.strava.com/swagger/swagger.json), avec une table de couverture dans le README.

### Options du client

- `fetch` personnalisé (tests, proxy, runtimes sans `fetch` global).
- `timeout` global et `signal` (`AbortSignal`) par requête.
- `baseUrl` et `userAgent` configurables.
- `accessToken` facultatif, pour instancier un client qui ne sert qu'au flux OAuth.
- `getAuthorizeUrl({ redirectUri, scopes, state, approvalPrompt })` avec des scopes typés, à la place de la valeur magique `"t_allAuth"`.

---

## v0.4.0 — Types et API publique

Objectif : figer les noms et les signatures qui seront garantis en v1. C'est la seule version qui casse la compatibilité, et chaque renommage est décrit dans un guide de migration.

### Renommages

| Avant | Après |
| --- | --- |
| `client.auth0` | `client.oauth` |
| `getAskAuthUrl` | `oauth.getAuthorizeUrl` |
| `getTokenFromAuth` | `oauth.exchangeCode` |
| `retrieveAccessTokenWtRefreshToken` | `oauth.refreshAccessToken` |
| `IStreamRouteSetCorrect` | `RouteStreamSet` |
| `export * as types` | exports nommés des types à la racine |

### Signatures

- Tous les identifiants en `number | string` : certains ID Strava dépassent `Number.MAX_SAFE_INTEGER`.
- `key_by_type` forcé à `true` en interne et retiré des paramètres, puisque Strava l'exige.
- Interfaces de paramètres exportées (`CreateActivityParams`, etc.), aujourd'hui privées.
- Dates acceptées en `Date` ou ISO string ; les timestamps epoch sont convertis en interne.

### Types des entités

- Supprimer les `any` restants dans `src/entity/strava.entity.ts` (streams, `elevation_profile`, `achievements`, `visibility`, `friend`, `follower`).
- Unions littérales pour `SportType` et `ActivityType`.
- Distinguer `SummaryAthlete` et `DetailedAthlete` selon le scope `profile:read_all`.
- Générer une base depuis le Swagger avec `openapi-typescript`, puis corriger à la main les écarts déjà notés (club, athlete, club member).
- Option : validation au runtime avec `zod`, activable par le client, pour détecter les écarts entre la doc et l'API réelle.

---

## v1.0.0 — Stabilisation

Objectif : un nouvel utilisateur fait son premier appel en moins de 10 minutes avec le README seul, et l'API publique suit le semver strict.

### Documentation

- README complet : installation, démarrage rapide, flux OAuth de bout en bout, exemples par ressource, gestion d'erreurs, rate limit, table de couverture des endpoints.
- JSDoc sur chaque méthode publique : scope requis, lien vers la doc Strava, exemple.
- Site de référence généré par TypeDoc et publié sur GitHub Pages.
- Guide de migration 0.0.x → 1.0.

### Exemples

- `examples/node-script` : lister ses dernières activités.
- `examples/express-oauth` : callback OAuth et stockage des tokens.
- `examples/webhook` : recevoir et traiter les événements.

### Process de release

- Changesets ou semantic-release : versions et CHANGELOG générés depuis les PR.
- Publication npm depuis la CI avec `--provenance`.
- `CONTRIBUTING.md`, templates d'issues et de PR, badges npm / CI / couverture.

---

## Critères de done et risques

Une version n'est publiée que si tous ses critères sont cochés.

- [ ] v0.1.0 : aucun `console.*` dans `src/`, chaque endpoint renvoie une `StravaError` sur un statut non 2xx
- [ ] v0.2.0 : CI verte sur Node 18 / 20 / 22, chaque endpoint a un test unitaire mocké
- [ ] v0.3.0 : table de couverture à 100 % des endpoints publics du Swagger
- [ ] v0.4.0 : zéro `any` dans les types exportés, guide de migration publié
- [ ] v1.0.0 : README et TypeDoc en ligne, publication automatisée avec provenance

### Risques

| Risque | Impact | Parade |
| --- | --- | --- |
| La doc Strava ne correspond pas aux réponses réelles | Types faux, bugs silencieux | Champs incertains en optionnels, validation `zod` facultative |
| Les renommages de la v0.4.0 cassent le code des utilisateurs | Montée de version bloquée | Alias dépréciés pendant une version, guide de migration |
| Les tests d'intégration consomment le quota | CI bloquée par des 429 | Intégration hors CI, lancée à la demande |
| Webhooks impossibles à tester sans URL publique | Fonctionnalité non vérifiée | Tests unitaires sur des payloads enregistrés, tunnel local pour le test manuel |
