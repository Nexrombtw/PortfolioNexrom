const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Define the 3 sections with updated titles based on the image
const sectionEmmaus = `            <!-- SECTION PROJETS SCOLAIRES -->
            <tr class="section-title">
              <td colspan="8">Réalisation en cours de formation</td>
            </tr>
            <tr>
              <td>
                <span class="project-title">Site Emmaüs Wambrechies (AP 1)</span>
                <span class="project-proofs">Preuves : Intranet, Habilitations, UML, MCD, Mentions Légales</span>
              </td>
              <td class="has-proofs" data-skill-title="Gérer le patrimoine" data-proof-target="proof-emmaus-patrimoine">
                <span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td class="has-proofs" data-skill-title="Développer la présence en ligne"
                data-proof-target="proof-emmaus-presence"><span class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Mode Projet" data-proof-target="proof-emmaus-projet"><span
                  class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Mise à disposition un service"
                data-proof-target="proof-emmaus-service"><span class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Dév. Pro" data-proof-target="proof-emmaus-devpro"><span
                  class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Conception & Dév" data-proof-target="proof-emmaus-conception">
                <span class="matrix-icon check">●</span></td>
            </tr>`;

const section1stYear = `            <!-- SECTION 1ERE ANNEE -->
            <tr class="section-title">
              <td colspan="8">Réalisations en milieu professionnel en cours de première année</td>
            </tr>
            <tr>
              <td>
                <span class="project-title">Stage Foundever / Sitel</span>
                <span class="project-proofs">Preuves : Journal de bord, assistance N1/N2, scripts PowerShell, gestion de parc, doc utilisateur.</span>
              </td>
              <td class="has-proofs" data-skill-title="Gérer le patrimoine informatique" data-proof-target="proof-foundever-patrimoine"><span class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Répondre aux incidents" data-proof-target="proof-foundever-incidents"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td class="has-proofs" data-skill-title="Mode Projet" data-proof-target="proof-foundever-projet"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td><span class="matrix-icon none">○</span></td>
            </tr>

            <!-- AD Manager row -->
            <tr>
              <td>
                <span class="project-title">AD Manager (PowerShell GUI)</span>
                <span class="project-proofs">Preuves : Code source PowerShell, interface WPF, documentation technique, captures.</span>
              </td>
              <td class="has-proofs" data-skill-title="Gérer le patrimoine informatique" data-proof-target="proof-foundever-patrimoine"><span class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Répondre aux incidents" data-proof-target="proof-foundever-incidents"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td class="has-proofs" data-skill-title="Mode Projet" data-proof-target="proof-foundever-projet"><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon check">●</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td><span class="matrix-icon none">○</span></td>
            </tr>`;

const section2ndYear = `            <!-- SECTION 2EME ANNEE -->
            <tr class="section-title">
              <td colspan="8">Réalisations en milieu professionnel en cours de seconde année</td>
            </tr>
            <tr>
              <td>
                <span class="project-title">Refonte site ESN Lille (Stage)</span>
                <span class="project-proofs">Preuves : Cahier des charges, Audit SEO, Maquettes, Guide utilisateur</span>
              </td>
              <td><span class="matrix-icon none">○</span></td>
              <td><span class="matrix-icon none">○</span></td>
              <td class="has-proofs" data-skill-title="Présence en ligne" data-proof-target="proof-esn-presence"><span
                  class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Mode Projet" data-proof-target="proof-esn-projet"><span
                  class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Mise à disposition" data-proof-target="proof-esn-service"><span
                  class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Dév. Pro" data-proof-target="proof-esn-devpro"><span
                  class="matrix-icon check">●</span></td>
              <td class="has-proofs" data-skill-title="Conception & Dév" data-proof-target="proof-esn-conception"><span
                  class="matrix-icon check">●</span></td>
            </tr>`;

const newTbody = `          <tbody>\n${sectionEmmaus}\n\n${section1stYear}\n\n${section2ndYear}\n          </tbody>`;

// Regex to catch the entire <tbody> content of the skills table
content = content.replace(/<tbody>[\s\S]*?<\/tbody>/, newTbody);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Table reordered successfully');
