/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        let fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk('d:/OMVIK/src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Apply Medium to Hero specific h1 elements, fallback defaults everywhere else.
    if (file.includes('Hero.tsx')) {
        content = content.replace(/heading-clagio/g, 'heading-clagio-medium');
    } else {
        // Strip out heading-clagio from other components
        content = content.replace(/ heading-clagio/g, '');
        content = content.replace(/heading-clagio /g, '');
    }

    if (original !== content) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
