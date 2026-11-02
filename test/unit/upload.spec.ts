import { describe, expect, test } from "vitest";
import { BASE_URL, createClient, fetchCall, jsonResponse, mockFetch } from "./helpers";

describe("upload.createUpload", () => {
    test("sends a multipart form with the file and the fields", async () => {
        const fetch = mockFetch(jsonResponse({ id: 1, status: "Your activity is still being processed." }));
        const file = new TextEncoder().encode("<gpx></gpx>");

        await createClient().upload.createUpload({
            file,
            data_type: "gpx",
            name: "Morning run",
            external_id: "ext-1",
            description: undefined,
        });

        const req = fetchCall(fetch);
        expect(req.method).toBe("POST");
        expect(req.url.toString()).toBe(`${BASE_URL}/uploads`);
        expect(req.headers["Content-Type"]).toBeUndefined(); // fetch sets the multipart boundary itself

        const form = req.body as FormData;
        expect(form).toBeInstanceOf(FormData);
        expect(form.get("data_type")).toBe("gpx");
        expect(form.get("name")).toBe("Morning run");
        expect(form.get("external_id")).toBe("ext-1");
        expect(form.has("description")).toBe(false);

        const sent = form.get("file") as File;
        expect(sent.name).toBe("activity.gpx");
        expect(await sent.text()).toBe("<gpx></gpx>");
    });

    test("accepts a Blob or a string", async () => {
        const fetch = mockFetch(jsonResponse({ id: 1 }));
        await createClient().upload.createUpload({ file: new Blob(["blob content"]), data_type: "tcx" });
        await createClient().upload.createUpload({ file: "string content", data_type: "fit" });

        expect(await ((fetchCall(fetch, 0).body as FormData).get("file") as File).text()).toBe("blob content");
        expect(await ((fetchCall(fetch, 1).body as FormData).get("file") as File).text()).toBe("string content");
    });
});
