import Strava from "./../../src/api/Strava.api";

describe("Strava Api", () => {
    test("base get/set test", () => {
        const data = {
            accessToken: "ACCESS_TOKEN",
            refreshToken: "REFRESH_TOKEN",
            clientId: "CLIENT_ID",
            clientSecret: "CLIENT_SECRET"
        };

        const dataReplace = {
            accessToken: "ACCESS_TOKEN_REPLACE",
            refreshToken: "REFRESH_TOKEN_REPLACE",
            clientId: "CLIENT_ID_REPLACE",
            clientSecret: "CLIENT_SECRET_REPLACE"
        };

        const ApiStrava = new Strava(data);

        expect(ApiStrava.getAccessToken()).toEqual(data.accessToken);
        expect(ApiStrava.getAuthHeader()).toEqual({ 'Authorization': `Bearer ${data.accessToken}` });
        expect(ApiStrava.getBaseUrl()).toEqual("https://www.strava.com/api/v3");
        expect(ApiStrava.getClientId()).toEqual(data.clientId);
        expect(ApiStrava.getClientSecret()).toEqual(data.clientSecret);
        expect(ApiStrava.getRefreshToken()).toEqual(data.refreshToken);

        ApiStrava.setAccessToken(dataReplace.accessToken);
        expect(ApiStrava.getAccessToken()).toEqual(dataReplace.accessToken);
        expect(ApiStrava.getAuthHeader()).toEqual({ 'Authorization': `Bearer ${dataReplace.accessToken}` });
        expect(ApiStrava.getBaseUrl()).toEqual("https://www.strava.com/api/v3");
        ApiStrava.setClientId(dataReplace.clientId);
        expect(ApiStrava.getClientId()).toEqual(dataReplace.clientId);

        ApiStrava.setClientSecret(dataReplace.clientSecret);
        expect(ApiStrava.getClientSecret()).toEqual(dataReplace.clientSecret);

        ApiStrava.setRefreshToken(dataReplace.refreshToken);
        expect(ApiStrava.getRefreshToken()).toEqual(dataReplace.refreshToken);
    })
})