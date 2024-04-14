import * as strava from "./../../src/";

describe('getSegmentEffortStreams', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        const data = await ApiStrava.segmentEffort.getSegmentEffortStreams({ id: '0', keys: ["heartrate"], key_by_type: true })
        console.log("resp")
        console.log(data)
        expect(data.distance).toBeGreaterThan(10);
    });
});