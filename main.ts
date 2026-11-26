// Entry for "One Star, Five Stars for the Food" (make.fun).
// Writes one funny sentence of plain text to the output file the kit's
// RULES require: /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The grading sandbox mounts the repository read-only, so the output
// directory must come from the environment, never from the repo itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "One star: Earth makes you pay for water, charges extra for legroom, and invented small talk — but the ramen was so good I briefly considered defecting.";

// The gate refuses anything over 200 characters, and anything that is
// not one line of real text: fail loudly here instead of shipping an
// invalid entry.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry is ${line.length} characters, must be 1-200`);
}
if (line.trim().length === 0 || line.includes("\n")) {
  throw new Error("entry must be a single line of non-whitespace text");
}
// The bounty asks for exactly one sentence: a single terminal period
// and no other sentence-ending punctuation anywhere in the text.
const terminators = line.replace(/[^.!?]/g, "");
if (terminators !== ".") {
  throw new Error(`entry must be exactly one sentence, found terminators ${JSON.stringify(terminators)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, line, "utf8");
console.log(`wrote ${line.length} characters to ${outFile}`);
