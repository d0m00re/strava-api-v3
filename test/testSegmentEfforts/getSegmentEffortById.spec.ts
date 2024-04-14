import * as strava from "./../../src/";

// todo : fix it with real id for a segment effort
describe('getSegmentEffortById', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        let data = await ApiStrava.segmentEffort.getSegmentEffortById({id : process.env.STRAVA_SEGMENT_EFFORT_ID ?? ""})
        console.log("resp")
        console.log(data)
        expect(data.distance).toBeGreaterThan(10);
    });
});