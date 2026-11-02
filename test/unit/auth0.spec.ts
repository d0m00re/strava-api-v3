import { describe, expect, test } from "vitest";
import { StravaError } from "../../src";
import { createClient, fetchCall, jsonResponse, mockFetch } from "./helpers";

describe("auth0.getAskAuthUrl", () => {
    test("builds the authorize url from the client options", () => {
        const url = new URL(createClient().auth0.getAskAuthUrl("activity:read_all", "https://app.example/callback"));
        expect(url.origin + url.pathname).toBe("https://www.strava.com/oauth/authorize");
        expect(Object.fromEntries(url.searchParams)).toEqual({
            client_id: "CLIENT_ID",
            redirect_uri: "https://app.example/callback",
            response_type: "code",
            scope: "activity:read_all",
        });
    });

    test("t_allAuth expands to every scope", () => {
        const url = new URL(createClient().auth0.getAskAuthUrl("t_allAuth"));
        expect(url.searchParams.get("scope")).toBe(
            "read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write",
        );
    });
});

describe("oauth token", () => {
    test.each([
        [
            "getTokenFromAuth",
            (c: ReturnType<typeof createClient>) => c.auth0.getTokenFromAuth("THE_CODE"),
            { code: "THE_CODE", grant_type: "authorization_code" },
        ],
        [
            "retrieveAccessTokenWtRefreshToken",
            (c: ReturnType<typeof createClient>) => c.auth0.retrieveAccessTokenWtRefreshToken("THE_REFRESH"),
            { refresh_token: "THE_REFRESH", grant_type: "refresh_token" },
        ],
    ])("%s posts the secrets in the body, never in the url", async (_name, call, params) => {
        const fetch = mockFetch(jsonResponse({ access_token: "A" }));
        await expect(call(createClient())).resolves.toEqual({ access_token: "A" });

        const req = fetchCall(fetch);
        expect(req.method).toBe("POST");
        expect(req.url.toString()).toBe("https://www.strava.com/oauth/token");
        expect(req.headers.Authorization).toBeUndefined();
        expect(Object.fromEntries(req.body as URLSearchParams)).toEqual({
            client_id: "CLIENT_ID",
            client_secret: "CLIENT_SECRET",
            ...params,
        });
    });

    test("throws a StravaError on a bad code", async () => {
        mockFetch(
            jsonResponse(
                { message: "Bad Request", errors: [{ resource: "AuthorizationCode", field: "code", code: "invalid" }] },
                { status: 400 },
            ),
        );
        const error = await createClient()
            .auth0.getTokenFromAuth("BAD")
            .catch(e => e);
        expect(error).toBeInstanceOf(StravaError);
        expect(error.status).toBe(400);
        expect(error.errors[0].field).toBe("code");
    });
});
