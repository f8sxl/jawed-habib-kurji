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
        if (
          tc.name === "run_command" &&
          tc.arguments.CommandLine === "git diff src/routes/index.tsx"
        ) {
          const nextData = JSON.parse(lines[i + 1]);
          if (nextData.type === "SYSTEM_RESPONSE") {
            const responses = nextData.tool_responses || [];
            for (const tr of responses) {
              const output = tr.response.output || "";
              fs.writeFileSync("restore.diff", output, "utf-8");
              console.log("Found and extracted diff!");
              process.exit(0);
            }
          }
        }
      }
    }
  } catch (e) {}
}
