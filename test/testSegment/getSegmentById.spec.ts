// todo : problem for finding segment effort id - fix that later

import * as strava from "./../../src/";
/*
    accessToken : string;
    clientId : string;
    clientSecret : string;
    refreshToken ?: string;
*/
describe('getSegmentById', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        let userId = parseInt(process.env.STRAVA_USER_ID ?? "0");
        console.log("check for user id : ", userId)

        let data = await ApiStrava.segment.getSegmentById({id : parseInt(process.env.STRAVA_SEGMENT_ID ?? '0')})
        console.log("resp")
        console.log(data)
        expect(data.distance).toBeGreaterThan(10);
    });
});