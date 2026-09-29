import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

type SteigerConfig = ReturnType<typeof defineConfig>;

const recommended = fsd.configs.recommended as unknown as SteigerConfig;

export default defineConfig([
  ...recommended,
  {
    rules: {
      /**
       * Next.js owns the root `app/` and `pages/` directories, so the FSD
       * layers live under `src/` and the FSD `app` layer sits next to them.
       */
      "fsd/forbidden-imports": "off",
    },
  },
  {
    files: ["./src/**"],
    rules: {
      "fsd/forbidden-imports": "error",
    },
  },
]);
