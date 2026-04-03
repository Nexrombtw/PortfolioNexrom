const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to remove the CashCash bento cell
content = content.replace(/\s*<!-- Project 3: CashCash -->[\s\S]*?<h3 class="cell-title">CashCash<\/h3>[\s\S]*?<\/article>/g, '');

// Regex to remove the CashCash row in the skills table
content = content.replace(/\s*<tr>\s*<td>\s*<span class="project-title">CashCash \(AP 2 - Client Lourd\)<\/span>[\s\S]*?<\/tr>/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('done');
