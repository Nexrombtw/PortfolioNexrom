const fs = require('fs');
const path = require('path');

const dir = __dirname;
const filesToUpdate = ['index.html', 'insert_esn.js'];

const specialBlocks = [
    // EMMAUS - Analyse et Plan
    {
        marker: 'Diagramme des Cas d\'Utilisation',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Modélisation des acteurs et de l\'arborescence applicative visant à cadrer fonctionnellement le projet informatique.<'
    },
    {
        marker: 'Plan du site',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Modélisation des acteurs et de l\'arborescence applicative visant à cadrer fonctionnellement le projet informatique.<'
    },
    {
        marker: 'Aperçu du site après refonte',
        oldDesc: '>Utilisation avancée du CMS pour intégrer des composants dynamiques et assurer l\'esthétique du site.<',
        newDesc: '>Refonte complète de l\'interface visant à moderniser l\'expérience utilisateur et répondre aux nouveaux standards web.<'
    },
    {
        marker: 'Optimisation SEO : Métadonnées',
        oldDesc: '>Conception structurée des tables de bases de données et des relations logiques essentielles.<',
        newDesc: '>Analyse et implémentation de balises HTML/Métadonnées pertinentes permettant d\'optimiser l\'indexation par les moteurs de recherche.<'
    },
    {
        marker: 'Google My Business : Mise à jour',
        oldDesc: '>Mise en conformité légale, audit de l\'existant, et optimisation du référencement naturel.<',
        newDesc: '>Révision de la fiche établissement Google (GMB) pour maximiser le référencement local (Local SEO) et la visibilité.<'
    },
    {
        marker: 'Déploiement de la base de données',
        oldDesc: '>Conception structurée des tables de bases de données et des relations logiques essentielles.<',
        newDesc: '>Mise en œuvre du processus de déploiement et de configuration de la base de données sur l\'environnement d\'hébergement.<'
    },
    {
        marker: 'Schéma d\'Architecture de Flux',
        oldDesc: '>Conception structurée des tables de bases de données et des relations logiques essentielles.<',
        newDesc: '>Cartographie précise des différents composants applicatifs et vulgarisation de leurs interactions réseaux.<'
    },

    // ESN LILLE
    {
        marker: 'Visual Identity Manual',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Application stricte de la charte graphique globale et des guidelines visuelles pour garantir la cohérence de marque sur le web.<'
    },
    {
        marker: 'Ancien Design ESN Lille',
        oldDesc: '>Traduction des exigences visuelles en interfaces ergonomiques optimisées pour le web.<',
        newDesc: '>Audit UX/UI et analyse critique de l\'interface existante afin de définir les axes prioritaires d\'amélioration ergonomique.<'
    },
    {
        marker: 'Nouvelle Page d\'Accueil',
        oldDesc: '>Traduction des exigences visuelles en interfaces ergonomiques optimisées pour le web.<',
        newDesc: '>Maquettage et intégration de la nouvelle page d\'accueil selon les standards ergonomiques actuels et l\'identité visuelle ESN.<'
    },
    {
        marker: 'Design de la nouvelle Navbar',
        oldDesc: '>Traduction des exigences visuelles en interfaces ergonomiques optimisées pour le web.<',
        newDesc: '>Modélisation et maquettage du composant de navigation pour fluidifier le parcours de l\'utilisateur final.<'
    },
    {
        marker: 'Nouveau Footer',
        oldDesc: '>Traduction des exigences visuelles en interfaces ergonomiques optimisées pour le web.<',
        newDesc: '>Refonte structurelle du pied de page intégrant l\'arborescence secondaire et les mentions légales obligatoires.<'
    },
    {
        marker: 'Guide: Ajouter un nouvel événement',
        oldDesc: '>Traduction des exigences visuelles en interfaces ergonomiques optimisées pour le web.<',
        newDesc: '>Création d\'un guide d\'administration fonctionnel destiné aux membres de l\'association, favorisant très fortement leur autonomie.<'
    },
    {
        marker: 'Mise en place page Contact',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Intégration d\'un formulaire de contact dynamique respectant les contraintes ergonomiques et facilitant l\'interaction visiteur.<'
    },
    {
        marker: 'Édition de blocs et structure',
        oldDesc: '>Attestation de la bonne mise en place de la solution technique évoquée.<',
        newDesc: '>Utilisation avancée du constructeur de pages (CMS Elementor) pour bâtir des blocs dynamiques responsives.<'
    }
];

filesToUpdate.forEach(file => {
    const fullPath = path.join(dir, file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');

    // split per article
    let cards = content.split(/<article/g);
    for (let i = 1; i < cards.length; i++) {
        specialBlocks.forEach(sb => {
            if (cards[i].includes(sb.marker)) {
                // Try strictly with > <
                if(cards[i].includes(sb.oldDesc)) {
                    cards[i] = cards[i].split(sb.oldDesc).join(sb.newDesc);
                } else {
                    // Try without > <
                    let plainOld = sb.oldDesc.replace(/>/g, '').replace(/</g, '');
                    let plainNew = sb.newDesc.replace(/>/g, '').replace(/</g, '');
                    if(cards[i].includes(plainOld)) {
                        cards[i] = cards[i].split(plainOld).join(plainNew);
                    }
                }
            }
        });
    }
    content = cards.join('<article');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
});
