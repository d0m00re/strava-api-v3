// todo : problem for finding segment effort id - fix that later

import * as strava from "./../../src/";

describe('getSegmentEffortStreams', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        const data = await ApiStrava.segment.getSegmentStreams({ id: process.env.STRAVA_SEGMENT_ID ?? "", keys: ["latlng"], key_by_type: true })
        console.log("resp")
        console.log(data)
        expect(data.latlng?.data.length).toBeGreaterThan(10);
    });
});