const fs = require("fs");
const path =
  "C:\\Users\\moham\\.gemini\\antigravity\\brain\\041879ef-8205-4e46-9aad-49e7ad262608\\.system_generated\\logs\\transcript_full.jsonl";
const lines = fs.readFileSync(path, "utf-8").split("\n");

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
            // Steps 6545 (hero), 6597 (packages), 6609 (packages)
            if ([6545, 6597, 6609].includes(data.step_index)) {
              console.log("--- Step " + data.step_index + " ---");
              if (args.ReplacementChunks) {
                args.ReplacementChunks.forEach((c) => {
                  console.log("TARGET:\n", c.TargetContent);
                  console.log("REPLACEMENT:\n", c.ReplacementContent);
                });
              } else {
                console.log("TARGET:\n", args.TargetContent);
                console.log("REPLACEMENT:\n", args.ReplacementContent);
              }
            }
          }
        }
      }
    }
  } catch (e) {}
}
