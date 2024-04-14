import * as strava from "./../../src/";

describe('starSegment', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        const data = await ApiStrava.segment.starSegment({
            id: 22729684,
            starred: false
        })
        console.log("resp")
        console.log(data)
        expect(data.starred).toBe(false);

        const data2 = await ApiStrava.segment.starSegment({
            id: 22729684,
            starred: true
        })
        console.log("resp")
        console.log(data2)
        expect(data2.starred).toBe(true);
    });
});