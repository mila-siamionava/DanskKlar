import { permanentRedirect } from "next/navigation";

import { ADJECTIVES_PATH } from "@/lib/grammar/adjectivePaths";

// the adjective pages moved to /grammar/adjektiver
export function GET() {
  permanentRedirect(ADJECTIVES_PATH);
}
