import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId: process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
});

describe('getLoggedInAthleteClubs', () => {
    test('club', async () => {
        const data = await ApiStrava.athlete.getLoggedInAthleteClubs({ per_page: 2 })
        console.log(data)
        expect(data.length).toBe(2)
    });
});