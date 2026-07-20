const fs = require('fs');
const path = require('path');

// Read all edit_*.json files
const files = fs.readdirSync(__dirname).filter(f => f.startsWith('edit_') && f.endsWith('.json'));
// Sort them by step number
files.sort((a, b) => {
    const numA = parseInt(a.replace('edit_', '').replace('.json', ''));
    const numB = parseInt(b.replace('edit_', '').replace('.json', ''));
    return numA - numB;
});

// We want to apply edits up to roughly step 6824
const targetFiles = files.filter(f => parseInt(f.replace('edit_', '')) <= 6824);

// First, checkout the clean base
require('child_process').execSync('git checkout HEAD -- src/routes/index.tsx', { stdio: 'inherit' });

let content = fs.readFileSync('src/routes/index.tsx', 'utf-8');

for (const file of targetFiles) {
    const edit = JSON.parse(fs.readFileSync(file, 'utf-8'));
    console.log('Applying', file, ':', edit.Instruction);
    
    // Some are multi_replace, some are replace
    if (edit.ReplacementChunks) {
        for (const chunk of edit.ReplacementChunks) {
            if (content.includes(chunk.TargetContent)) {
                content = content.replace(chunk.TargetContent, chunk.ReplacementContent);
            } else {
                console.log('  -> TargetContent not found for chunk in', file);
            }
        }
    } else if (edit.TargetContent) {
        if (content.includes(edit.TargetContent)) {
            content = content.replace(edit.TargetContent, edit.ReplacementContent);
        } else {
            console.log('  -> TargetContent not found in', file);
        }
    }
}

fs.writeFileSync('src/routes/index.tsx', content, 'utf-8');
console.log('Successfully re-applied all changes up to step 6824!');
