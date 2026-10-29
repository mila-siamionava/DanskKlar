import Badge from "@/components/ui/Badge/Badge";
import { MASTERY_SCORE } from "@/lib/reading/progressStore";

// a reading technique's best test score: not started, on the way or mastered
export default function ScoreBadge({ bestScore }) {
  if (bestScore === null || bestScore === undefined) {
    return (
      <Badge variant="neutral" size="sm">
        Ikke startet
      </Badge>
    );
  }

  if (bestScore >= MASTERY_SCORE) {
    return (
      <Badge variant="success" size="sm">
        Mestret · {bestScore} %
      </Badge>
    );
  }

  return (
    <Badge variant="warning" size="sm">
      Bedste: {bestScore} %
    </Badge>
  );
}
