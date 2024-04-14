import * as strava from "../../src";
/*
    accessToken : string;
    clientId : string;
    clientSecret : string;
    refreshToken ?: string;
*/
describe('getActivityById', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        });
 
        let data = await ApiStrava.activity.getActivityStreams({id : process.env.STRAVA_ACTIVITY_ID ?? "", keys : ["heartrate", "latlng"], key_by_type : true})
        console.log(data)
        expect(data.heartrate?.data.length).toBeGreaterThan(5);
        expect(data.latlng?.data.length).toBeGreaterThan(5);
    });
});