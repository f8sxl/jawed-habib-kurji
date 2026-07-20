import json
import sys

with open(r'C:\Users\moham\.gemini\antigravity\brain\041879ef-8205-4e46-9aad-49e7ad262608\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    try:
        data = json.loads(line)
        if data.get('type') == 'PLANNER_RESPONSE':
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                if tc.get('name') == 'run_command':
                    args = tc.get('arguments', {})
                    if args.get('CommandLine') == 'git diff src/routes/index.tsx':
                        # The next line is usually the SYSTEM_RESPONSE
                        next_data = json.loads(lines[i+1])
                        if next_data.get('type') == 'SYSTEM_RESPONSE':
                            responses = next_data.get('tool_responses', [])
                            for tr in responses:
                                output = tr.get('response', {}).get('output', '')
                                with open('restore.diff', 'w', encoding='utf-8') as out:
                                    out.write(output)
                                print('Found and extracted diff!')
                                sys.exit(0)
    except Exception as e:
        pass
