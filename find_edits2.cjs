const fs = require('fs');
const path = 'C:\\Users\\moham\\.gemini\\antigravity\\brain\\041879ef-8205-4e46-9aad-49e7ad262608\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf-8').split('\n');

for (let i = 0; i < lines.length; i++) {
    if (!lines[i]) continue;
    try {
        const data = JSON.parse(lines[i]);
        if (data.type === 'PLANNER_RESPONSE') {
            const tool_calls = data.tool_calls || [];
            for (const tc of tool_calls) {
                if (tc.name === 'multi_replace_file_content' || tc.name === 'replace_file_content') {
                    if (tc.arguments.TargetFile && tc.arguments.TargetFile.includes('index.tsx')) {
                        console.log('Step:', data.step_index);
                        console.log('Instruction:', tc.arguments.Instruction);
                    }
                }
            }
        }
    } catch (e) {}
}
