import * as strava from "./../../src/";

describe('auth0 : getAskAuthUrl', () => {
    test('getAskAuthUrl', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        const urlAuth = ApiStrava.auth0.getAskAuthUrl("t_allAuth");
        console.log("strava url auth for grant auth")
        console.log(urlAuth);
        expect(urlAuth.length).toBeGreaterThan(10);
    });
});