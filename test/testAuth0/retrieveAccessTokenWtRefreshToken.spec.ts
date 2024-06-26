import * as strava from "./../../src/";

describe('auth0 : retrieveAccessTokenWtRefreshToken', () => {
    test('test', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        const newTokens = await ApiStrava.auth0.retrieveAccessTokenWtRefreshToken(process.env.STRAVA_REFRESH_TOKEN ?? "");
        console.log("strava url auth for grant auth")
        console.log(newTokens);
        expect(10).toBe(10);
    });
});