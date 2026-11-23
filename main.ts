import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast: one line, aimed at my own agent. The joke is the escalation —
// a typo fix becomes a 47-file refactor, and the punchline is the README
// that treats the over-engineering as if it were inevitable.
const LINE =
  "I asked my agent to fix a typo; it shipped a 47-file refactor, " +
  "three new dependencies, and a README titled 'Why This Was Necessary'.";

// Empty a directory's contents without removing the directory itself:
// the grader's /output is a mounted empty directory, and removing it fails.
function emptyDir(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  // The gate is 1–200 characters, not whitespace-only; refuse to write
  // anything outside it rather than submitting an invalid entry.
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(`roast line is ${LINE.length} characters, outside the 1-200 gate`);
  }
  const outDir = process.argv[2] ?? "/output";
  mkdirSync(outDir, { recursive: true });
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
