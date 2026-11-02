import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    name: "unit",
                    include: ["test/unit/**/*.spec.ts"],
                    unstubGlobals: true,
                },
            },
            {
                // hits the real Strava API, every suite is skipped without STRAVA_ACCESS_TOKEN
                test: {
                    name: "integration",
                    include: ["test/integration/**/*.spec.ts"],
                    setupFiles: ["dotenv/config"],
                    testTimeout: 30_000,
                },
            },
        ],
    },
});
