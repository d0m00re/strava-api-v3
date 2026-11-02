import { afterEach, describe, expect, test, vi } from "vitest";
import { StravaAuthError, StravaError, StravaNotFoundError, StravaRateLimitError } from "../../src";
import { BASE_URL, createClient, fetchCall, jsonResponse, mockFetch } from "./helpers";

const tokenResponse = (suffix: string, expiresAt = 2_000_000_000) =>
    jsonResponse({
        token_type: "Bearer",
        access_token: `ACCESS_${suffix}`,
        refresh_token: `REFRESH_${suffix}`,
        expires_at: expiresAt,
        expires_in: 21600,
    });

describe("getters / setters", () => {
    test("read and replace the credentials", () => {
        const client = createClient();
        expect(client.getAccessToken()).toBe("ACCESS_TOKEN");
        expect(client.getRefreshToken()).toBe("REFRESH_TOKEN");
        expect(client.getClientId()).toBe("CLIENT_ID");
        expect(client.getClientSecret()).toBe("CLIENT_SECRET");
        expect(client.getBaseUrl()).toBe(BASE_URL);
        expect(client.getAuthHeader()).toEqual({ Authorization: "Bearer ACCESS_TOKEN" });

        client.setAccessToken("A2");
        client.setRefreshToken("R2");
        client.setClientId("C2");
        client.setClientSecret("S2");
        client.setExpiresAt(123);
        expect(client.getAccessToken()).toBe("A2");
        expect(client.getRefreshToken()).toBe("R2");
        expect(client.getClientId()).toBe("C2");
        expect(client.getClientSecret()).toBe("S2");
        expect(client.getExpiresAt()).toBe(123);
        expect(client.getAuthHeader()).toEqual({ Authorization: "Bearer A2" });
    });
});

describe("request", () => {
    test("builds the url, skips undefined query values and joins arrays", async () => {
        const fetch = mockFetch(jsonResponse({ ok: true }));
        const data = await createClient().request("GET", "/path", { query: { a: 1, b: undefined, c: ["x", "y"] } });

        const call = fetchCall(fetch);
        expect(data).toEqual({ ok: true });
        expect(call.method).toBe("GET");
        expect(call.url.origin + call.url.pathname).toBe(`${BASE_URL}/path`);
        expect([...call.url.searchParams]).toEqual([
            ["a", "1"],
            ["c", "x,y"],
        ]);
        expect(call.headers.Authorization).toBe("Bearer ACCESS_TOKEN");
        expect(call.body).toBeUndefined();
    });

    test("sends a json body with its content type", async () => {
        const fetch = mockFetch();
        await createClient().request("POST", "/path", { body: { name: "run" } });

        const call = fetchCall(fetch);
        expect(call.headers["Content-Type"]).toBe("application/json");
        expect(call.body).toBe(JSON.stringify({ name: "run" }));
    });

    test("reads the response as text when asked", async () => {
        mockFetch(new Response("<gpx/>"));
        await expect(createClient().request("GET", "/path", { text: true })).resolves.toBe("<gpx/>");
    });

    test("does not send the Authorization header with auth: false", async () => {
        const fetch = mockFetch();
        await createClient().request("GET", "https://example.com/x", { auth: false });
        expect(fetchCall(fetch).headers.Authorization).toBeUndefined();
    });

    test("calls the logger without any token", async () => {
        mockFetch();
        const logger = vi.fn();
        await createClient({ logger }).request("GET", "/path");

        expect(logger).toHaveBeenCalledWith(
            expect.objectContaining({ method: "GET", url: `${BASE_URL}/path`, status: 200 }),
        );
        expect(JSON.stringify(logger.mock.calls)).not.toContain("ACCESS_TOKEN");
    });
});

describe("errors", () => {
    const fault = { message: "Record Not Found", errors: [{ resource: "Activity", field: "id", code: "invalid" }] };

    test.each([
        [401, StravaAuthError],
        [404, StravaNotFoundError],
        [429, StravaRateLimitError],
        [500, StravaError],
    ])("status %i throws %o", async (status, ErrorClass) => {
        mockFetch(jsonResponse(fault, { status }));
        const error = await createClient({ refreshToken: "" })
            .request<never>("GET", "/path")
            .catch((e: StravaError) => e);

        expect(error).toBeInstanceOf(ErrorClass);
        expect(error).toBeInstanceOf(StravaError);
        expect(error.status).toBe(status);
        expect(error.message).toBe(fault.message);
        expect(error.errors).toEqual(fault.errors);
    });

    test("falls back to statusText when the body is not json", async () => {
        mockFetch(new Response("oops", { status: 502, statusText: "Bad Gateway" }));
        const error = await createClient()
            .request<never>("GET", "/path")
            .catch((e: StravaError) => e);
        expect(error.message).toBe("Bad Gateway");
        expect(error.errors).toEqual([]);
    });
});

describe("rate limit", () => {
    const headers = { "X-RateLimit-Limit": "200,2000", "X-RateLimit-Usage": "12,345" };
    const expected = { shortTermLimit: 200, shortTermUsage: 12, dailyLimit: 2000, dailyUsage: 345 };

    test("is exposed on the client after a request", async () => {
        mockFetch(jsonResponse({}, { headers }));
        const client = createClient();
        expect(client.rateLimit).toBeUndefined();
        await client.request("GET", "/path");
        expect(client.rateLimit).toEqual(expected);
    });

    test("is attached to the error", async () => {
        mockFetch(jsonResponse({}, { status: 429, headers }));
        const error = await createClient()
            .request<never>("GET", "/path")
            .catch((e: StravaError) => e);
        expect(error.rateLimit).toEqual(expected);
    });
});

describe("retry", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    test("is disabled by default", async () => {
        const fetch = mockFetch(jsonResponse({}, { status: 503 }));
        await expect(createClient().request("GET", "/path")).rejects.toThrow(StravaError);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("retries 429 and 5xx with exponential backoff up to maxRetries", async () => {
        vi.useFakeTimers();
        const fetch = mockFetch(
            jsonResponse({}, { status: 429 }),
            jsonResponse({}, { status: 500 }),
            jsonResponse({ ok: true }),
        );
        const promise = createClient({ maxRetries: 3 }).request("GET", "/path");

        await vi.advanceTimersByTimeAsync(999);
        expect(fetch).toHaveBeenCalledTimes(1);
        await vi.advanceTimersByTimeAsync(1); // 1s
        expect(fetch).toHaveBeenCalledTimes(2);
        await vi.advanceTimersByTimeAsync(2000); // 2s
        await expect(promise).resolves.toEqual({ ok: true });
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    test("throws the last error when retries are exhausted", async () => {
        vi.useFakeTimers();
        const fetch = mockFetch(jsonResponse({}, { status: 500 }));
        const promise = createClient({ maxRetries: 2 })
            .request<never>("GET", "/path")
            .catch((e: StravaError) => e);

        await vi.runAllTimersAsync();
        expect(await promise).toBeInstanceOf(StravaError);
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    test("does not retry other 4xx", async () => {
        const fetch = mockFetch(jsonResponse({}, { status: 400 }));
        await expect(createClient({ maxRetries: 3 }).request("GET", "/path")).rejects.toThrow(StravaError);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});

describe("token refresh", () => {
    const now = () => Math.floor(Date.now() / 1000);

    test("refreshes before the request when the token expires in less than 5 minutes", async () => {
        const fetch = mockFetch(tokenResponse("NEW"), jsonResponse({ ok: true }));
        const onTokenRefresh = vi.fn();
        const client = createClient({ expiresAt: now() + 60, onTokenRefresh });

        await client.request("GET", "/path");

        const refresh = fetchCall(fetch, 0);
        expect(refresh.url.toString()).toBe("https://www.strava.com/oauth/token");
        expect(refresh.method).toBe("POST");
        expect(refresh.headers.Authorization).toBeUndefined();
        expect(Object.fromEntries(refresh.body as URLSearchParams)).toEqual({
            client_id: "CLIENT_ID",
            client_secret: "CLIENT_SECRET",
            refresh_token: "REFRESH_TOKEN",
            grant_type: "refresh_token",
        });
        expect(fetchCall(fetch, 1).headers.Authorization).toBe("Bearer ACCESS_NEW");
        expect(onTokenRefresh).toHaveBeenCalledWith({
            accessToken: "ACCESS_NEW",
            refreshToken: "REFRESH_NEW",
            expiresAt: 2_000_000_000,
        });
        expect(client.getExpiresAt()).toBe(2_000_000_000);
    });

    test("does not refresh a token that is still valid", async () => {
        const fetch = mockFetch(jsonResponse({}));
        await createClient({ expiresAt: now() + 3600 }).request("GET", "/path");
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("refreshes on 401 and replays the request once", async () => {
        const fetch = mockFetch(jsonResponse({}, { status: 401 }), tokenResponse("NEW"), jsonResponse({ ok: true }));
        await expect(createClient().request("GET", "/path")).resolves.toEqual({ ok: true });

        expect(fetch).toHaveBeenCalledTimes(3);
        expect(fetchCall(fetch, 2).headers.Authorization).toBe("Bearer ACCESS_NEW");
    });

    test("throws StravaAuthError when the replayed request is still 401", async () => {
        const fetch = mockFetch(
            jsonResponse({}, { status: 401 }),
            tokenResponse("NEW"),
            jsonResponse({}, { status: 401 }),
        );
        await expect(createClient().request("GET", "/path")).rejects.toThrow(StravaAuthError);
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    test("does not refresh without a refresh token", async () => {
        const fetch = mockFetch(jsonResponse({}, { status: 401 }));
        await expect(createClient({ refreshToken: "" }).request("GET", "/path")).rejects.toThrow(StravaAuthError);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("concurrent requests share a single refresh", async () => {
        const fetch = mockFetch(tokenResponse("NEW"), jsonResponse({}));
        const client = createClient({ expiresAt: now() });

        await Promise.all([client.request("GET", "/a"), client.request("GET", "/b"), client.request("GET", "/c")]);

        const refreshCalls = fetch.mock.calls.filter(([url]) => url.toString().includes("/oauth/token"));
        expect(refreshCalls).toHaveLength(1);
        expect(fetch).toHaveBeenCalledTimes(4);
    });
});
