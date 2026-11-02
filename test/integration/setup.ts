import { describe, test } from "vitest";
import { Strava } from "../../src";

const env = process.env;

export const client = new Strava({
    accessToken: env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken: env.STRAVA_REFRESH_TOKEN ?? "",
    clientId: env.STRAVA_CLIENT_ID ?? "",
    clientSecret: env.STRAVA_CLIENT_SECRET ?? "",
});

/** skipped without STRAVA_ACCESS_TOKEN */
export const describeIntegration = describe.skipIf(!env.STRAVA_ACCESS_TOKEN);

/** skipped when the env var holding the resource id is not set */
export const testWithId = (key: string, name: string, fn: (id: string) => Promise<void>) =>
    test.skipIf(!env[key])(`${name} (${key})`, () => fn(env[key]!));

/** modifies the account (upload, weight, star...), skipped unless STRAVA_WRITE_TESTS=1 */
export const testWrite = test.skipIf(env.STRAVA_WRITE_TESTS !== "1");
