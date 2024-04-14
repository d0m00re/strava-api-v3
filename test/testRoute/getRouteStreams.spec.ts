import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId : process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
});

// no valid id for the moments
describe('getRouteStreams', () => {
    test('test', async() => {
        let data = await ApiStrava.route.getRouteStreams({id : "3175080533840625586"})
        console.log("data")
        console.log(data)
        expect(data.length).toBeGreaterThan(2);

        let findDist = data.find(e => e.type === "distance");
        let findAltitude = data.find(e => e.type === "altitude");
        let findLatLng = data.find(e => e.type === "latlng");

        expect(findDist?.data.length).toBeGreaterThan(10);
        expect(findAltitude?.data.length).toBeGreaterThan(10);
        expect(findLatLng?.data.length).toBeGreaterThan(10);

        // expect(data.).toEqual("plages et chemins")
        //expect(data.brand_name).toBe("BMC")
    });
});