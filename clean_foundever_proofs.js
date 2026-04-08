const fs = require('fs');
const path = require('path');

const dir = __dirname;
const filesToUpdate = ['index.html', 'update_foundever.js', 'insert_foundever.js'];

const replacements = [
    // 1. Patrimoine
    {
        old: 'title="Interface principale de l\'outil">Interface principale de l\'outil</span>',
        new: 'title="Annuaire Active Directory">Annuaire Active Directory</span>'
    },
    {
        old: 'Gestion sécurisée du patrimoine informatique via l\'annuaire d\'entreprise (Onboarding, Accès et Permissions).',
        new: 'Interface de gestion sécurisée et centralisée permettant d\'interroger les comptes utilisateurs et machines.'
    },
    {
        old: 'title="Script de récupération des données LDAP">Script de récupération des données LDAP</span>',
        new: 'title="Scripting PowerShell">Scripting PowerShell</span>'
    },
    {
        old: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        new: '>Développement d\'un script d\'automatisation LDAP garantissant une connexion sécurisée et robuste au contrôleur de domaine.<'
        // we use > and < to avoid replacing it everywhere, we will loop carefully
    },
    {
        old: 'title="Déplacement d\'objets OUs">Déplacement d\'objets OUs</span>',
        new: 'title="Gestion des Unités Organisationnelles">Gestion des Unités Organisationnelles</span>'
    },
    {
        old: 'title="Inventaire des ressources matérielles">Inventaire des ressources matérielles</span>',
        new: 'title="Inventaire Matériel">Inventaire Matériel</span>'
    },
    {
        old: 'title="Vue d\'ensemble du parc">Vue d\'ensemble du parc</span>',
        new: 'title="Supervision du Parc">Supervision du Parc</span>'
    },
    {
        old: 'Supervision et gestion du matériel réseau informatique pour s\'assurer du maintien en condition opérationnelle.',
        new: 'Vue globale des ressources informatiques, permettant aux techniciens d\'assurer le suivi et le maintien en condition opérationnelle.'
    },
    {
        old: 'Traduction des exigences visuelles en interfaces ergonomiques optimisées pour le web.',
        new: 'Centralisation, suivi et résolution de bout en bout des incidents utilisateurs, garantissant la qualité du support IT engagée (SLA).'
    },
    {
        old: 'Traçabilité et résolution de bout en bout des incidents rapportés par les utilisateurs (Support IT).',
        new: 'Centralisation, suivi et résolution de bout en bout des incidents utilisateurs, garantissant la qualité du support IT engagée (SLA).'
    },
    {
        old: 'title="Support: Gestion des incidents (ITSM)">Support: Gestion des incidents (ITSM)</span>',
        new: 'title="Outil ITSM">Outil ITSM</span>'
    },
    {
        old: 'title="Traitement des pertes d\'accès">Traitement des pertes d\'accès</span>',
        new: 'title="Traitement des requêtes courantes">Traitement des requêtes courantes</span>'
    },
    {
        old: 'Script ou procédure mis en place pour garantir la continuité de service et sécuriser les données.',
        new: 'Réponse automatisée aux demandes d\'assistance les plus fréquentes (pertes d\'accès), réduisant la charge du support de niveau 1.'
    },
    {
        old: 'title="Offboarding Collaborateurs">Offboarding Collaborateurs</span>',
        new: 'title="Gestion des départs">Gestion des départs</span>'
    },
    {
        old: 'Automatisation de procédures critiques pour contrer les pertes d\'accès tout en maintenant la sécurité LDAP.',
        new: 'Blocage des accès et désactivation sécurisée des profils collaborateurs afin de protéger le système d\'information lors des départs.'
    },
    {
        old: 'Exécution de tests techniques et traitement des retours pour stabiliser l\'application en production.',
        new: 'Mise en place de tests croisés et intégration itérative des retours métiers pour stabiliser la version production de l\'outil.'
    },
    {
        old: 'title="Correction de bugs d\'interface">Correction de bugs d\'interface</span>',
        new: 'title="Recette et Débogage">Recette et Débogage</span>'
    },
    {
        old: 'title="Accompagnement Utilisateurs">Accompagnement Utilisateurs</span>',
        new: 'title="Documentation Utilisateur">Documentation Utilisateur</span>'
    },
    {
        old: 'title="UX pour les techniciens">UX pour les techniciens</span>',
        new: 'title="Déploiement Technicien">Déploiement Technicien</span>'
    },
    {
        old: 'title="Création d\'une IHM (Forms) pour PowerShell">Création d\'une IHM (Forms) pour PowerShell</span>',
        new: 'title="Conception du Service">Conception du Service</span>'
    },
    {
        old: 'title="Confirmation et rassurance UI">Confirmation et rassurance UI</span>',
        new: 'title="Sécurisation du Service">Sécurisation du Service</span>'
    }
];

// Custom larger blocks where old standard tag occurs multiple times
const specialBlocks = [
    {
        marker: 'Move-ADObject', // look for this to identify the block
        oldDesc: 'Interface de gestion sécurisée et centralisée permettant d\'interroger les comptes utilisateurs et machines.', // Because it got replaced first
        // Wait, "Gestion sécurisée..." was replaced globally above. So it's "Interface de gestion sécurisée..."
        newDesc: 'Manipulation des objets Active Directory et automatisation des migrations comptes/machines via la cmdlet Move-ADObject.'
    },
    {
        marker: 'Module de recherche de PC',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Fonctionnalité permettant l\'identification rapide des équipements déployés, facilitant la gestion du cycle de vie du matériel.<'
    },
    {
        marker: 'Problèmes d\'affichage détectés en recette',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Phase de recette applicative (QA) : identification et correction des problèmes d\'affichage avant la livraison.<'
    },
    {
        marker: 'Guide utilisateur MyPassword',
        // In the original file, it was: "Traduction des exigences visuelles..." which is replaced above.
        // Wait, "Traduction des exigences visuelles..." is replaced by "Centralisation, suivi et résolution..."
        // So the new oldDesc is the globally replaced one !
        oldDesc: 'Centralisation, suivi et résolution de bout en bout des incidents utilisateurs, garantissant la qualité du support IT engagée (SLA).',
        newDesc: 'Rédaction d\'une documentation technique et accompagnement pour la prise en main du nouvel outil d\'administration, garantissant l\'autonomie de l\'équipe de support.'
    },
    {
        marker: 'Configuration du site favori local',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Mise à disposition optimisée de l\'outil pour les administrateurs locaux, facilitant l\'accès quotidien au service.<'
    },
    {
        marker: 'Code source de l\'interface WinForms',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Développement de l\'interface graphique (WinForms/PowerShell) constituant le service mis à la disposition des équipes.<'
    },
    {
        marker: 'Pop-ups de confirmation des actions critiques',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Implémentation de sécurités applicatives (Pop-ups de confirmation) pour prévenir les mauvaises manipulations de l\'annuaire.<'
    }
];

filesToUpdate.forEach(file => {
    const fullPath = path.join(dir, file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    replacements.forEach(rep => {
        // String split join handles global replace without escaping regex manually
        content = content.split(rep.old).join(rep.new);
    });

    // Handle special blocks
    // We split by <article and process each proof card
    let cards = content.split(/<article class="proof-card-item">/g);
    for (let i = 1; i < cards.length; i++) {
        specialBlocks.forEach(sb => {
            if (cards[i].includes(sb.marker)) {
                cards[i] = cards[i].split(sb.oldDesc).join(sb.newDesc);
                
                // fallback for the generic one without > <
                let plainOld = sb.oldDesc.replace(/>/g, '').replace(/</g, '');
                let plainNew = sb.newDesc.replace(/>/g, '').replace(/</g, '');
                if(cards[i].includes(plainOld)) {
                    cards[i] = cards[i].split(plainOld).join(plainNew);
                }
            }
        });
    }
    content = cards.join('<article class="proof-card-item">');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
});
