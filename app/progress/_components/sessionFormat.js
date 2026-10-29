// how one finished activity is described in lists

export function sessionScore(session) {
  if (session.area === "reading") {
    return `${Math.round((session.points / session.max) * 100)} %`;
  }

  return `${session.points}/${session.max}`;
}

export function sessionMeta(session) {
  const minutes = Math.max(1, Math.round(session.seconds / 60));
  const parts = [];

  if (session.texts) {
    parts.push(`${session.texts} ${session.texts === 1 ? "tekst" : "tekster"}`);
  } else if (session.area === "words") {
    parts.push(`${session.max} svar`);
  }

  parts.push(`${minutes} min`);

  if (session.textsOnTarget !== undefined && session.texts) {
    parts.push(`${session.textsOnTarget} af ${session.texts} inden for tidsmålet`);
  }

  return parts.join(" · ");
}
