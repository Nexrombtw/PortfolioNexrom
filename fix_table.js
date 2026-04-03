const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

let newRow = `            <tr>
              <td>
                <span class="project-title">Stage Foundever / Sitel (AD Manager)</span>
                <span class="project-proofs">Preuves : Code source PowerShell, résolution de bugs, doc technique.</span>
              </td>
              <td class="has-proofs" data-skill-title="Gérer le patrimoine informatique"
                data-proof-target="proof-foundever-patrimoine"><span class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Répondre aux incidents"
                data-proof-target="proof-foundever-incidents"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td class="has-proofs" data-skill-title="Mode Projet" data-proof-target="proof-foundever-projet"><span
                  class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td><span class="matrix-icon none">○</span></td>
            </tr>`;

content = content.replace(/<tr>\s*<td>\s*<span class="project-title">Stage Foundever \/ Sitel \(AD Manager\)<\/span>[\s\S]*?<\/tr>/, newRow.trim());

fs.writeFileSync(filePath, content, 'utf8');
console.log('done');
