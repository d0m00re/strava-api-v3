import * as strava from "./../../src/";

describe('auth0 : getTokenFromAuth', () => {
    test('getAskAuthUrl', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        // get it form getAsk....
        const newTokens = await ApiStrava.auth0.getTokenFromAuth(process.env.STRAVA_AUTH_CODE ?? "");
        console.log("strava url auth for grant auth")
        console.log(newTokens);
        expect(10).toBe(10);
    });
});