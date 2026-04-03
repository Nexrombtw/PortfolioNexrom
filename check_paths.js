const fs = require('fs');
const path = require('path');

function checkPathCase(filePath) {
    const parts = filePath.split('/');
    let current = '.';
    for (const part of parts) {
        if (!part) continue;
        const decodedPart = decodeURIComponent(part);
        try {
            if (!fs.existsSync(current)) {
                return { ok: false, msg: `Directory missing: '${current}'` };
            }
            const actualFiles = fs.readdirSync(current);
            if (!actualFiles.includes(decodedPart)) {
                const lowerFiles = {};
                for (const f of actualFiles) {
                    lowerFiles[f.toLowerCase()] = f;
                }
                if (lowerFiles[decodedPart.toLowerCase()]) {
                    return { ok: false, msg: `Case mismatch: expected '${decodedPart}', found '${lowerFiles[decodedPart.toLowerCase()]}' in '${current}'` };
                } else {
                    return { ok: false, msg: `File or folder missing: '${decodedPart}' in '${current}'` };
                }
            }
            current = path.join(current, decodedPart);
        } catch (e) {
            return { ok: false, msg: `Error navigating '${current}': ${e.message}` };
        }
    }
    return { ok: true, msg: 'OK' };
}

const htmlPath = 'index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const srcRegex = /src="([^"]+)"/g;
const hrefRegex = /href="([^"]+)"/g;

let match;
const paths = new Set();
while ((match = srcRegex.exec(html)) !== null) paths.add(match[1]);
while ((match = hrefRegex.exec(html)) !== null) paths.add(match[1]);

const issues = [];
for (const p of paths) {
    if (p.startsWith('assets/')) {
        const result = checkPathCase(p);
        if (!result.ok) {
            issues.push({ path: p, msg: result.msg });
        }
    }
}

fs.writeFileSync('check_results.json', JSON.stringify(issues, null, 2), 'utf8');
console.log("Wrote results to json");
