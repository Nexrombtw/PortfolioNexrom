const fs = require('fs');
const path = require('path');

const esnData = {
    'proof-esn-presence': {
        context: "Développer la présence en ligne de l'organisation (ESN Lille)",
        proofs: [
            {
                tag: "Charte Graphique",
                title: "Visual Identity Manual",
                target: "assets/preuves_esn/stage/visual_identity_manual_2023_1_2.pdf",
                isPdf: true
            },
            {
                tag: "Audit UX/UI",
                title: "Ancien Design ESN Lille",
                target: "assets/preuves_esn/stage/screen/page/ancien_design_esn_lille/sans_titre.png",
                isPdf: false
            },
            {
                tag: "Maquettage & Design",
                title: "Nouvelle Page d'Accueil",
                target: "assets/preuves_esn/stage/screen/page/page_d_acceuil/esn_page.png",
                isPdf: false
            },
            {
                tag: "Composants",
                title: "Design de la nouvelle Navbar",
                target: "assets/preuves_esn/stage/screen/page/navbar/capture_d_ecran_2026_01_21_124050.png",
                isPdf: false
            },
            {
                tag: "Composants",
                title: "Nouveau Footer",
                target: "assets/preuves_esn/stage/screen/page/footer/footer.png",
                isPdf: false
            }
        ]
    },
    'proof-esn-projet': {
        context: "Travailler en mode projet",
        proofs: [
            {
                tag: "Organisation",
                title: "Cahier des charges",
                target: "assets/preuves_esn/stage/cahier_des_charges_site_internet_stage_gabriel.pdf",
                isPdf: true
            },
            {
                tag: "Suivi",
                title: "Rapport de Suivi Semaine 1",
                target: "assets/preuves_esn/stage/esn_marche_gabriel_week_1.docx",
                isPdf: false // Note: It's docx but we'll treat it as a download/document
            }
        ]
    },
    'proof-esn-service': {
        context: "Mettre à disposition des utilisateurs un service informatique",
        proofs: [
            {
                tag: "Accompagnement",
                title: "Guide: Ajouter un nouvel événement",
                target: "assets/preuves_esn/stage/comment_ajouter_un_nouvel_evenement.docx",
                isPdf: false
            },
            {
                tag: "Intégration",
                title: "Mise en place page Contact",
                target: "assets/preuves_esn/stage/screen/page/contact/capture_d_ecran_2026_02_04_165548.png",
                isPdf: false
            }
        ]
    },
    'proof-esn-devpro': {
        context: "Organiser son développement professionnel",
        proofs: [
            {
                tag: "Documentation",
                title: "Rédaction de guide utilisateur",
                target: "assets/preuves_esn/stage/comment_ajouter_un_nouvel_evenement.docx",
                isPdf: false
            }
        ]
    },
    'proof-esn-conception': {
        context: "Conception et développement d'une solution",
        proofs: [
            {
                tag: "CMS Elementor",
                title: "Résolution de bug Navbar",
                target: "assets/preuves_esn/stage/screen/preuve_elementor_navbar_probleme_.jpg",
                isPdf: false
            },
            {
                tag: "CMS Elementor",
                title: "Intégration et édition via CMS",
                target: "assets/preuves_esn/stage/screen/capture_d_ecran_2026_01_27_164951.png",
                isPdf: false
            }
        ]
    }
};

function buildTemplate(id, data) {
    let html = `    <template id="${id}">\n`;
    html += `        <p class="proof-context">${data.context}</p>\n`;
    html += `        <div class="proof-cards-grid">\n`;
    
    data.proofs.forEach(proof => {
        html += `            <article class="proof-card-item">\n`;
        html += `                <div class="proof-card-header">\n`;
        html += `                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${proof.tag}">${proof.tag}</span>\n`;
        html += `                    <h4 style="margin-top:4px;" title="${proof.title}">${proof.title}</h4>\n`;
        html += `                </div>\n`;
        html += `                <div class="proof-image-wrapper">\n`;
        // For docs and pdfs, show them directly or use a default image fallback
        html += `                    <img src="${proof.target}" alt="${proof.title}" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />\n`;
        html += `                </div>\n`;
        let btnText = proof.target.endsWith('.pdf') || proof.target.endsWith('.docx') ? 'Voir le document' : 'Voir la capture';
        html += `                <a href="${proof.target}" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">${btnText}</a>\n`;
        html += `            </article>\n`;
    });
    
    html += `        </div>\n`;
    html += `    </template>\n`;
    return html;
}

let allHtml = "";
Object.keys(esnData).forEach(id => {
    allHtml += buildTemplate(id, esnData[id]) + "\n";
});

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// The ESN section to replace starts from "<!-- ESN Lille Placeholders -->" to "</template>\n\n            <!-- Stage Foundever: Gérer le patrimoine"
const startMarker = "<!-- ESN Lille Placeholders -->";
const endMarker = "<!-- Stage Foundever: Gérer le patrimoine";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    
    const newContent = before + "<!-- ESN Lille Preuves -->\n" + allHtml + "    " + after;
    fs.writeFileSync(indexPath, newContent, 'utf8');
    console.log("Successfully replaced ESN placeholders.");
} else {
    // If placeholders not found, we just replace the exact template strings if possible, or print error
    console.log("Placeholders not found. Generating html for manual copy:");
    console.log(allHtml);
}
