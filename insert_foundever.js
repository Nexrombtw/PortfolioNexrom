const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the placeholders
const searchStr = `    <!-- Foundever Placeholders -->
    <template id="proof-foundever-patrimoine">
      <p class="proof-context">Gestion du patrimoine informatique Foundever.</p>
      <div class="proof-cards-grid">
        <article class="proof-card-item">
          <div class="proof-card-header">
            <span class="proof-tag">Scripting</span>
            <h4>Interface PowerShell (GUI)</h4>
          </div>
          <p class="proof-demo">A venir : Code source de l'outil et captures.</p>
        </article>
      </div>
    </template>
    <template id="proof-foundever-incidents">
      <p class="proof-context">Réponse aux incidents Foundever.</p>
      <p class="proof-demo">A venir : Guide utilisateur pour incidents, et résolution de bugs API.</p>
    </template>
    <template id="proof-foundever-projet">
      <p class="proof-context">Gestion de projet Foundever.</p>
      <p class="proof-demo">A venir : Cahier des charges et suivi DSI.</p>
    </template>`;

const replacementStr = `    <!-- Stage Foundever: Gérer le patrimoine informatique -->
    <template id="proof-foundever-patrimoine">
        <p class="proof-context">Gérer le patrimoine informatique (Active Directory)</p>
        <div class="proof-cards-grid">
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Cahier des charges">Cahier des charges</span>
                    <h4 style="margin-top:4px;" title="Cahier des charges">Cahier des charges</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/foundevercahierdescharges.docx" alt="Cahier des charges" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                
                <div style="font-size: 0.85rem; padding: 10px; color: var(--text-muted); font-style: italic;">
                    Documentation professionnelle rédigée pour définir les besoins, les fonctionnalités attendues et les contraintes techniques du projet.
                </div>
                <a href="assets/preuves_foundever/foundevercahierdescharges.docx" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir le document</a>
            </article>

            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Annuaire Active Directory">Annuaire Active Directory</span>
                    <h4 style="margin-top:4px;" title="Interface d'interrogation de l'annuaire AD">Interface d'interrogation de l'annuaire AD</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/Applications.png" alt="Interface d'interrogation de l'annuaire AD" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/Applications.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Scripting PowerShell">Scripting PowerShell</span>
                    <h4 style="margin-top:4px;" title="Import des modules et connexion">Import des modules et connexion</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/26.2.png" alt="Import des modules et connexion" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/26.2.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Gestion des Unités Organisationnelles">Gestion des Unités Organisationnelles</span>
                    <h4 style="margin-top:4px;" title="Modification de l'arborescence (Move-ADObject)">Modification de l'arborescence (Move-ADObject)</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/Déplacement%20user.png" alt="Modification de l'arborescence" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/Déplacement%20user.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Inventaire Matériel">Inventaire Matériel</span>
                    <h4 style="margin-top:4px;" title="Module de recherche de PC (sans nº de série)">Module de recherche de PC (sans nº de série)</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/Recherche%20pc%201.png" alt="Module de recherche de PC" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/Recherche%20pc%201.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
        </div>
    </template>

    <!-- Stage Foundever: Répondre aux incidents -->
    <template id="proof-foundever-incidents">
        <p class="proof-context">Répondre aux incidents et aux demandes d'assistance</p>
        <div class="proof-cards-grid">
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Traitement des requêtes courantes">Traitement des requêtes courantes</span>
                    <h4 style="margin-top:4px;" title="Automatisation de la réinitialisation de mots de passe">Automatisation de la réinitialisation de mots de passe</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/Reinitialisation.png" alt="Automatisation de la réinitialisation de mots de passe" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/Reinitialisation.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Gestion des départs">Gestion des départs</span>
                    <h4 style="margin-top:4px;" title="Fonction de désactivation sécurisée">Fonction de désactivation sécurisée</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/Désactivations.png" alt="Fonction de désactivation sécurisée" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/Désactivations.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
        </div>
    </template>

    <!-- Stage Foundever: Travailler en mode projet -->
    <template id="proof-foundever-projet">
        <p class="proof-context">Travailler en mode projet et s'adapter aux retours métiers</p>
        <div class="proof-cards-grid">
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Remarques & Corrections">Remarques & Corrections</span>
                    <h4 style="margin-top:4px;" title="Feedback du tuteur sur les fonctionnalités">Feedback du tuteur sur les fonctionnalités</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/Erreur1223.png" alt="Feedback du tuteur sur les fonctionnalités" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/St1/remarques%20Sylvain.txt" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir les retours fixes</a>
            </article>
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Recette et Débogage">Recette et Débogage</span>
                    <h4 style="margin-top:4px;" title="Problèmes d'affichage détectés en recette">Problèmes d'affichage détectés en recette</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/Pbl%20d'affichage.png" alt="Problèmes d'affichage détectés en recette" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/Pbl%20d'affichage.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
        </div>
    </template>

    <!-- Stage Foundever: Mettre à disposition un service informatique -->
    <template id="proof-foundever-service">
        <p class="proof-context">Mettre à disposition des utilisateurs (Techniciens) un service informatique</p>
        <div class="proof-cards-grid">
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Expérience Utilisateur pour les techniciens">UX pour les techniciens</span>
                    <h4 style="margin-top:4px;" title="Configuration du site favori local">Configuration du site favori local</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/ville.png" alt="Configuration du site favori local" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/ville.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Conception du Service">Conception du Service</span>
                    <h4 style="margin-top:4px;" title="Code source de l'interface WinForms">Code source de l'interface WinForms</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/26.png" alt="Code source de l'interface" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/vega/code.txt" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir le code entier</a>
            </article>
            <article class="proof-card-item">
                <div class="proof-card-header">
                    <span class="proof-tag" style="font-size:0.75em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Sécurisation du Service">Sécurisation du Service</span>
                    <h4 style="margin-top:4px;" title="Pop-ups de confirmation des actions critiques">Pop-ups de confirmation des actions critiques</h4>
                </div>
                <div class="proof-image-wrapper">
                    <img src="assets/preuves_foundever/confirmations.png" alt="Pop-ups de confirmation des actions critiques" class="proof-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';" />
                </div>
                <a href="assets/preuves_foundever/confirmations.png" target="_blank" class="btn btn--sm proof-btn" style="margin-top:10px;">Voir la capture</a>
            </article>
        </div>
    </template>`;

if (content.includes(searchStr)) {
    content = content.replace(searchStr, replacementStr);
    console.log("Foundever placeholders replaced.");
} else {
    // try replacing via regex if whitespace mismatches
    const regex = /<!-- Foundever Placeholders -->[\s\S]*?<template id="proof-foundever-projet">[\s\S]*?<\/template>/m;
    if(regex.test(content)) {
         content = content.replace(regex, replacementStr);
         console.log("Foundever placeholders replaced via regex.");
    } else {
         console.log("Could not find the placeholders.");
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done inserting Foundever logic.");
