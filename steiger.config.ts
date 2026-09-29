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
  {
    /**
     * Opening a project is a user action. It stays a feature so the project
     * card never learns about the transition, even though only the home
     * widget calls it today.
     */
    files: ["./src/features/open-project/**"],
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
]);
