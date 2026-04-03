const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace the Foundever row with corrected dots
// Image reference: ●, ●, ○, ●, ●, ●, ●
const foundeverRow = `            <tr>
              <td>
                <span class="project-title">Stage Foundever / Sitel</span>
                <span class="project-proofs">Preuves : Journal de bord, assistance N1/N2, scripts PowerShell, gestion de parc, doc utilisateur.</span>
              </td>
              <td class="has-proofs" data-skill-title="Gérer le patrimoine informatique" data-proof-target="proof-foundever-patrimoine"><span class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Répondre aux incidents" data-proof-target="proof-foundever-incidents"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td class="has-proofs" data-skill-title="Mode Projet" data-proof-target="proof-foundever-projet"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
            </tr>

            <!-- AD Manager row -->
            <tr>
              <td>
                <span class="project-title">AD Manager (PowerShell GUI)</span>
                <span class="project-proofs">Preuves : Code source PowerShell, interface WPF, documentation technique, captures.</span>
              </td>
              <td class="has-proofs" data-skill-title="Gérer le patrimoine informatique" data-proof-target="proof-foundever-patrimoine"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td class="has-proofs" data-skill-title="Mode Projet" data-proof-target="proof-foundever-projet"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
            </tr>`;

// Replace old Foundever row (with AD Manager combined)
content = content.replace(
  /<tr>\n\s*<td>\n\s*<span class="project-title">Stage Foundever \/ Sitel \(AD Manager\)<\/span>[\s\S]*?<\/tr>/,
  foundeverRow
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done');
