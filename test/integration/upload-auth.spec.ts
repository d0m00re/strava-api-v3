import fs from "fs/promises";
import { expect } from "vitest";
import { client, describeIntegration, testWithId, testWrite } from "./setup";

describeIntegration("upload", () => {
    testWrite("createUpload then getUploadById", async () => {
        const file = await fs.readFile("./test/fixtures/test.gpx");
        const upload = await client.upload.createUpload({
            file,
            data_type: "gpx",
            name: "strava-api-v3 integration test",
            external_id: `strava-api-v3-${Date.now()}`,
        });
        expect(upload.id).toBeDefined();

        const status = await client.upload.getUploadById({ uploadId: upload.id });
        expect(status.id).toBe(upload.id);
    });
});

describeIntegration("auth0", () => {
    // an authorization code can only be used once, get a new one with getAskAuthUrl
    testWithId("STRAVA_AUTH_CODE", "getTokenFromAuth", async code => {
        const data = await client.auth0.getTokenFromAuth(code);
        expect(data.access_token).toBeTruthy();
    });

    testWithId("STRAVA_REFRESH_TOKEN", "retrieveAccessTokenWtRefreshToken", async refreshToken => {
        const data = await client.auth0.retrieveAccessTokenWtRefreshToken(refreshToken);
        expect(data.access_token).toBeTruthy();
        expect(data.expires_at).toBeGreaterThan(Date.now() / 1000);
    });
});
