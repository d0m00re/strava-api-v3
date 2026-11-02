import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist", "coverage"] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "no-console": "error",
            // removed in v0.4.0, see ROADMAP
            "@typescript-eslint/no-explicit-any": "warn",
            // stream interfaces mirror the Swagger names: interface ITimeStream extends IGenericStream<number> {}
            "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    },
    {
        files: ["test/**"],
        rules: { "no-console": "off" },
    },
);
