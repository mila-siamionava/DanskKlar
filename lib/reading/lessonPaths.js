/*
  Reading lessons fill the screen and have their own top bar,
  so the site header, footer and bottom navigation hide on them.
  The strategy overview pages (/reading/skimming) keep them.
*/
const LESSON_PREFIXES = [
  "/reading/scanning/",
  "/reading/skimming/",
  "/reading/naerlaesning/",
  "/reading/inferens/",
];

export function isReadingLessonPath(pathname) {
  return LESSON_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
