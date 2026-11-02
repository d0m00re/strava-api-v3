# changelog

## 0.2.0
* automatic token refresh: `expiresAt` and `onTokenRefresh` options, refresh 5 minutes before expiration, refresh and replay once on 401, a single refresh for concurrent requests
* rate limit: `client.rateLimit` updated on each response, `maxRetries` option with exponential backoff on 429 and 5xx (disabled by default)
* fix: CommonJS consumers received the ESM type declarations
* node >= 22 required
* vitest replaces jest: mocked unit tests for every endpoint, integration tests skipped without `STRAVA_ACCESS_TOKEN`
* github actions CI on node 22 / 24: eslint, prettier, typecheck, unit tests, publint, are-the-types-wrong
* pnpm replaces npm

## 0.1.0
* `StravaError` thrown on every non 2xx response, with `status`, `errors` and `rateLimit`, subclasses `StravaAuthError` (401), `StravaNotFoundError` (404), `StravaRateLimitError` (429)
* single http client, query params encoded with `URLSearchParams`
* fix: `createActivity` sent no body
* fix: `getActivityById` ignored `include_all_efforts`
* fix: `updateActivityById` had no `Content-Type`
* fix: `createUpload` serialized the file as json, now a native `FormData`
* fix: oauth read `process.env` instead of the client options, `redirect_uri` is now a parameter
* remove `getActivitiesGpxById` (called the strava website, not the api)
* security: no more `console.*`, `client_secret` and codes sent in the body of `/oauth/token` instead of the url
* optional `logger` option
* package: `files`, `engines`, `sideEffects`, MIT license, `form-data` dependency removed

## 0.0.47
* add gpx retrieve with id inside activities api (not present inside documentation)

## 0.0.41
* fix entry point of the module

## 0.0.4
* package update
* update build

## 0.0.31
* add auth0 function
* code refacto in smaller api class
* moore test
* setter/getter on main class

## 0.0.3
* module
* jest test
* add some test
* add .env for testing purpose with jest
* minor type change

## 0.0.2
* add network request
* add entity
## 0.0.1
* init module