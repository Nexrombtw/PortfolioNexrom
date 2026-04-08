const fs = require('fs');
const path = require('path');

function cleanName(name) {
    return name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9.]/g, '_') // replace anything not alphanumeric or dot with underscore
        .replace(/_+/g, '_') // compress multiple underscores
        .replace(/^_|_$/g, '') // trim
        .replace(/_\./g, '.'); // fix _ before dot
}

function processDir(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
        const oldPath = path.join(dir, entry);
        const stats = fs.statSync(oldPath);
        
        let newName = cleanName(entry);
        let newPath = path.join(dir, newName);
        
        if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${entry} -> ${newName}`);
        }
        
        // Recurse using the new path if it's a directory
        if (stats.isDirectory()) {
            processDir(newPath);
        }
    }
}

const targetDir = path.join(__dirname, 'assets', 'preuves_esn');
processDir(targetDir);
console.log('Done renaming files.');
