const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Regex to capture an entire article block
const regex = /<article class="proof-card-item">([\s\S]*?)<\/article>/g;
let count = 0;

html = html.replace(regex, (match, content) => {
    // If it already has a description (using font-size: 0.85rem or proof-demo), skip it
    if (content.includes('font-size: 0.85rem') || content.includes('proof-demo')) {
        return match;
    }

    // Try to find the title to adapt the description
    const titleMatch = content.match(/<h4[^>]*title="([^"]+)"/);
    let title = titleMatch ? titleMatch[1].toLowerCase() : "";

    let description = "Attestation de la bonne mise en place de la solution technique évoquée.";

    if (title.includes('mcd') || title.includes('données') || title.includes('bdd') || title.includes('architecture')) {
        description = "Conception structurée des tables de bases de données et des relations logiques essentielles.";
    } else if (title.includes('gantt') || title.includes('calendrier') || title.includes('projet') || title.includes('backlog') || title.includes('rapport')) {
        description = "Suivi de projet rigoureux permettant de garantir le respect des délais et de l'avancement technique.";
    } else if (title.includes('postman') || title.includes('test') || title.includes('anomalies') || title.includes('feedback')) {
        description = "Exécution de tests techniques et traitement des retours pour stabiliser l'application en production.";
    } else if (title.includes('maquette') || title.includes('ui') || title.includes('design') || title.includes('charte') || title.includes('accueil') || title.includes('footer')  || title.includes('nav')) {
        description = "Traduction des exigences visuelles en interfaces ergonomiques optimisées pour le web.";
    } else if (title.includes('active directory') || title.includes('ad') || title.includes('profil') || title.includes('groupe') || title.includes('propriété') || title.includes('ldap') || title.includes('déplacement')) {
        description = "Gestion sécurisée du patrimoine informatique via l'annuaire d'entreprise (Onboarding, Accès et Permissions).";
    } else if (title.includes('déploiement') || title.includes('hébergement') || title.includes('script bash') || title.includes('automatisation') || title.includes('sauvegarde')) {
        description = "Script ou procédure mis en place pour garantir la continuité de service et sécuriser les données.";
    } else if (title.includes('elementor') || title.includes('cms') || title.includes('refonte') || title.includes('responsive')) {
        description = "Utilisation avancée du CMS pour intégrer des composants dynamiques et assurer l'esthétique du site.";
    } else if (title.includes('guide') || title.includes('manuel') || title.includes('cahier des charges')) {
        description = "Documentation professionnelle rédigée pour assurer le transfert de compétences et l'autonomie des équipes.";
    } else if (title.includes('seo') || title.includes('google') || title.includes('mentions') || title.includes('bilan')) {
        description = "Mise en conformité légale, audit de l'existant, et optimisation du référencement naturel.";
    } else if (title.includes('outil') || title.includes('stack') || title.includes('environnement')) {
        description = "Mise en place de l'environnement matériel et logiciel nécessaire au cycle de développement.";
    } else if (title.includes('inventaire') || title.includes('recherche pc') || title.includes('parc')) {
        description = "Supervision et gestion du matériel réseau informatique pour s'assurer du maintien en condition opérationnelle.";
    } else if (title.includes('ticket') || title.includes('incident') || title.includes('itsm')) {
        description = "Traçabilité et résolution de bout en bout des incidents rapportés par les utilisateurs (Support IT).";
    } else if (title.includes('réinitialisation') || title.includes('désactivation')) {
        description = "Automatisation de procédures critiques pour contrer les pertes d'accès tout en maintenant la sécurité LDAP.";
    }

    // Inject after the closing div of proof-image-wrapper
    let newContent = content.replace(/(<\/div>\s*)(<a [^>]*>)/, `$1\n                <div style="font-size: 0.85rem; padding: 10px; color: var(--text-muted); font-style: italic;">\n                    ${description}\n                </div>\n                $2`);

    count++;
    return `<article class="proof-card-item">${newContent}</article>`;
});

fs.writeFileSync(filePath, html, 'utf8');
console.log(`Successfully injected descriptions into ${count} proofs.`);
