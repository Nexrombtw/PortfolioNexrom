const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const replacements = [
    // Emmaus Typos
    [/Mise en place des sauvegarde de la bdd \(1\)/g, "Sauvegardes automatiques de la base de données"],
    [/Script sauvegarde bdd/g, "Script Bash de sauvegarde"],
    [/-Maquette des diff rentes pages/g, "Maque UI des différentes pages"],
    [/Maquette des diff rentes pages/g, "Maquette UI des différentes pages"],
    [/Mentions L gales/g, "Mentions Légales"],
    [/Proposition de solution d h bergement/g, "Proposition d'hébergement web"],
    [/Apercu du site apres/g, "Aperçu du site après refonte"],
    [/SITE AVANT/g, "Bilan de l'existant (Ancien site)"],
    [/Exemple de metadata/g, "Optimisation SEO : Métadonnées"],
    [/Demande changement informations google/g, "Google My Business : Mise à jour"],
    [/cahier des charges/g, "Cahier des Charges"],
    [/Plan Fonctionnalites/g, "Backlog et Fonctionnalités"],
    [/calendrier previsionnel/g, "Calendrier Prévisionnel"],
    [/Analyse des  carts  Gantt /g, "Analyse des écarts (Gantt)"],
    [/calendrier effectif/g, "Calendrier Effectif"],
    [/Manuel d utilisation du site ACCB/g, "Manuel d'utilisation (Site ACCB)"],
    [/Procédure de déploiment bdd \(1\)/g, "Déploiement de la base de données"],
    [/Procédure de déploiment bdd/g, "Déploiement de la base de données"],
    [/Procédure de déploiment \(1\)/g, "Déploiement de l'application"],
    [/Procédure de déploiment/g, "Déploiement de l'application"],
    [/Sch ma d Architecture Technique et Flux de Donn es/g, "Schéma d'Architecture de Flux"],
    [/Outils Technologies/g, "Stack Technique & Outils"],
    [/Diagramme de cas d utilisation PlantUML/g, "Diagramme des Cas d'Utilisation"],
    [/Mettre en place et vérifier les niveaux d’habilitation associés à un serviceS/g, "Validation des niveaux d'habilitation"],
    
    // Foundever Typos
    [/Sans titre\^d/g, "Propriétés étendues de profils"],
    [/Sans titre12/g, "Affichage des groupes d'appartenance"],
    [/Sans titre/g, "Fonctions AD complémentaires"],
    [/Pbl d'affichage/g, "Retours et anomalies en recette"],
    [/Erreur1223/g, "Feedback métier"],
    [/1223\.png/g, ".png"],
    [/PC R TOUT/g, "Inventaire exhaustif du parc"],
    [/Recherche pc 1/g, "Module de recherche avancée"],
    
    // Tag Typos (Emmaüs)
    [/Accompagner les utilisateurs dans la mise en place d’un/g, "Accompagnement utilisateurs"],
    [/Évaluer les indicateurs de suivi d’un projet et an/g, "Indicateurs et suivi projet"],
    [/Mettre en place son envi/g, "Environnement de travail"],
];

for (let r of replacements) {
    html = html.replace(r[0], r[1]);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Proof titles embedded in HTML have been cleaned up and professionalized.');
