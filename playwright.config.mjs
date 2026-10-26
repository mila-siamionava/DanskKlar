import { defineConfig, devices } from "@playwright/test";

/*
  Accessibility tests.
  Run: npm run test:a11y
  First time only: npx playwright install chromium
*/

const testEnv = {
  NEXT_PUBLIC_SUPABASE_URL: "http://localhost:54321",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "test-key",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3100",
  NEXT_DIST_DIR: ".next-test",
};

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: "http://localhost:3100",
    ...devices["Pixel 7"],
  },

  webServer: [
    {
      command: "node tests/fake-supabase.mjs",
      port: 54321,
      reuseExistingServer: true,
    },
    {
      command: "npx next build && npx next start -p 3100",
      port: 3100,
      env: testEnv,
      timeout: 240_000,
      reuseExistingServer: false,
    },
  ],
});
