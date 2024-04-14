import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId: process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
});

describe('getRouteStreams', () => {
    test('test', async () => {
        const data = await ApiStrava.route.getRouteStreams({ id: "3175080533840625586" })
        console.log("data")
        console.log(data)
        expect(data.length).toBeGreaterThan(2);

        const findDist = data.find(e => e.type === "distance");
        const findAltitude = data.find(e => e.type === "altitude");
        const findLatLng = data.find(e => e.type === "latlng");

        expect(findDist?.data.length).toBeGreaterThan(10);
        expect(findAltitude?.data.length).toBeGreaterThan(10);
        expect(findLatLng?.data.length).toBeGreaterThan(10);
    });
});