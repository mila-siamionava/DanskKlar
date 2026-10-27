import BackLink from "@/components/navigation/BackLink/BackLink";
import { Eye, RotateCcw, PencilLine, Brain } from "lucide-react";

import ExerciseModeGroup from "../_components/ExerciseModeGroup/ExerciseModeGroup";

import { canAccessResource } from "@/lib/access/canAccessResource";
import { getCurrentAccess } from "@/lib/access/getCurrentAccess";

import styles from "./ReviewTrain.module.css";

const trainingGroups = [
  {
    title: "Husk",
    icon: Brain,
    modes: [
      {
        key: "flashcards",
        href: "/review/train/flashcards",
        title: "Huskekort",
        description: "Gennemgå ord og deres betydning.",
        icon: "▣",
      },
      {
        key: "match-pairs",
        href: "/review/train/match-pairs",
        title: "Find par",
        description: "Sæt hvert udtryk sammen med oversættelsen.",
        icon: "▱▱",
      },
    ],
  },
  {
    title: "Genkend",
    icon: Eye,
    modes: [
      {
        key: "true-false",
        href: "/review/train/true-false",
        title: "Sandt eller falsk",
        description: "Afgør, om betydningen er rigtig.",
        icon: "✓✕",
      },
      {
        key: "multiple-choice",
        href: "/review/train/multiple-choice",
        title: "Multiple choice",
        description: "Vælg den rigtige betydning.",
        icon: "☷",
      },
      {
        key: "definition-word",
        href: "/review/train/definition-word",
        title: "Definition → ord",
        description: "Vælg det ord, der passer til definitionen.",
        icon: "A→",
      },
    ],
  },
  {
    title: "Genkald",
    icon: RotateCcw,
    modes: [
      {
        key: "fill-gap",
        href: "/review/train/fill-gap",
        title: "Udfyld hullet",
        description: "Vælg det udtryk, der passer ind.",
        icon: "___",
      },
      {
        key: "first-letter",
        href: "/review/train/first-letter",
        title: "Første bogstav",
        description: "Husk udtrykket ud fra første bogstav.",
        icon: "A_D",
      },
      {
        key: "typed-gap",
        href: "/review/train/typed-gap",
        title: "Skriv ordet",
        description: "Skriv det manglende ord eller udtryk.",
        icon: "⌨",
      },
    ],
  },
  {
    title: "Brug",
    icon: PencilLine,
    modes: [
      {
        key: "build-sentence",
        href: "/review/train/build-sentence",
        title: "Byg en sætning",
        description: "Sæt ordene i den rigtige rækkefølge.",
        icon: "▤",
      },
    ],
  },
];

export default async function ReviewTrainPage() {
  const access = await getCurrentAccess();

  const availableGroups = trainingGroups
    .map((group) => ({
      ...group,
      modes: group.modes.filter((mode) =>
        canAccessResource(access.resources, "training_mode", mode.key),
      ),
    }))
    .filter((group) => group.modes.length > 0);

  return (
    <main>
      <div className="mobilePage">
        <div className={styles.titleRow}>
          <BackLink href="/review" label="Tilbage til dine ord" />

          <h1>Vælg øvelse</h1>
        </div>

        <header className={styles.header}>
          <p>Fra genkendelse til aktiv brug.</p>
        </header>
        <div className={styles.groups}>
          {availableGroups.map((group) => (
            <ExerciseModeGroup
              key={group.title}
              title={group.title}
              modes={group.modes}
              icon={group.icon}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
