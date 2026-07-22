const fs = require("fs");
const path =
  "C:\\Users\\moham\\.gemini\\antigravity\\brain\\041879ef-8205-4e46-9aad-49e7ad262608\\.system_generated\\logs\\transcript_full.jsonl";
const lines = fs.readFileSync(path, "utf-8").split("\n");

let edits = [];

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const data = JSON.parse(lines[i]);
    if (data.type === "PLANNER_RESPONSE") {
      const tool_calls = data.tool_calls || [];
      for (const tc of tool_calls) {
        if (tc.name && tc.name.includes("replace_file_content")) {
          let args = tc.arguments || tc.args || tc.parameters;
          if (typeof args === "string") {
            try {
              args = JSON.parse(args);
            } catch (e) {
              continue;
            }
          }
          if (args && args.TargetFile && args.TargetFile.includes("index.tsx")) {
            edits.push({ step: data.step_index, args: args });
          }
        }
      }
    }
  } catch (e) {}
}

// Sort just in case
edits.sort((a, b) => a.step - b.step);

// We want to apply edits up to step 6824 (which is where the user asked to revert to the prev version)
// Wait, the user asked "i want all the changes back taht we did till 2:11 pm"
// 2:11 PM is around step 6824 to 6831. Let's just apply up to step 6824.
// Step 6831 was when we restored the webflow black footer.
let targetEdits = edits.filter((e) => e.step <= 6824);

// First, checkout the clean base
require("child_process").execSync("git checkout HEAD -- src/routes/index.tsx", {
  stdio: "inherit",
});

let content = fs.readFileSync("src/routes/index.tsx", "utf-8");
let successCount = 0;

for (const edit of targetEdits) {
  console.log("Applying Step " + edit.step + ":", edit.args.Instruction);
  let args = edit.args;
  if (args.ReplacementChunks) {
    for (const chunk of args.ReplacementChunks) {
      if (content.includes(chunk.TargetContent)) {
        content = content.replace(chunk.TargetContent, chunk.ReplacementContent);
        successCount++;
      } else {
        console.log("  -> TargetContent not found for chunk in Step " + edit.step);
      }
    }
  } else if (args.TargetContent) {
    if (content.includes(args.TargetContent)) {
      content = content.replace(args.TargetContent, args.ReplacementContent);
      successCount++;
    } else {
      console.log("  -> TargetContent not found in Step " + edit.step);
    }
  }
}

fs.writeFileSync("src/routes/index.tsx", content, "utf-8");
console.log("Successfully applied " + successCount + " replacements!");
