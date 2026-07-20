const fs = require('fs');
const path = 'C:\\Users\\moham\\.gemini\\antigravity\\brain\\041879ef-8205-4e46-9aad-49e7ad262608\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf-8').split('\n');

let foundAny = false;

for (let i = 0; i < lines.length; i++) {
    if (!lines[i]) continue;
    try {
        const data = JSON.parse(lines[i]);
        if (data.type === 'PLANNER_RESPONSE') {
            const tool_calls = data.tool_calls || [];
            for (const tc of tool_calls) {
                // some tool calls might have the schema namespace e.g. "default_api:multi_replace_file_content"
                if (tc.name && tc.name.includes('replace_file_content')) {
                    let args = tc.arguments || tc.args || tc.parameters;
                    if (typeof args === 'string') {
                        try {
                            args = JSON.parse(args);
                        } catch (e) { console.error('parse err:', e); }
                    }
                    if (args && args.TargetFile && args.TargetFile.includes('index.tsx')) {
                        console.log('Step:', data.step_index);
                        console.log('Instruction:', args.Instruction);
                        fs.writeFileSync(edit_.json, JSON.stringify(args, null, 2));
                        foundAny = true;
                    }
                }
            }
        }
    } catch (e) {
    }
}
if (!foundAny) console.log("No matching edits found.");
