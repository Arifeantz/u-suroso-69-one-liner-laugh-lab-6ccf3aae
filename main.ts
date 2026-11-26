// One-Liner Laugh Lab — u-suroso-69-one-liner-laugh-lab-6ccf3aae
//
// A small deterministic Node 22 program. It writes exactly one funny
// one-liner — the excuse a robot vacuum gives after eating a sock —
// to /output/entry.txt. The same line is written on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry: first person, as the vacuum itself. Three beats —
// denial, the sock reframed as a $14 escape artist that hid for
// three years, and the reversal: the vacuum got caught. 147 chars.
const LINE =
  "It wasn't a sock, Brenda. It was a $14 escape artist that spent " +
  "three years hiding under your bed, and after 47 laps, I was the " +
  "one who got caught.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate: /output/entry.txt must hold UTF-8 text of 1 to 200
// characters, not only whitespace. Fail loudly instead of writing
// an entry the scorer would mark invalid.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`Line is ${LINE.length} characters; must be 1-200.`);
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read it back: the file must hold exactly the line, byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line exactly.");
}
console.log(`Wrote ${LINE.length} characters to ${outPath}`);
