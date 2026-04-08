const fs = require('fs');
const path = require('path');

const dir = __dirname;
const filesToUpdate = ['index.html', 'update_foundever.js', 'insert_foundever.js'];

const blockToInsert = `            <article class="proof-card-item">
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
`;

filesToUpdate.forEach(file => {
    const fullPath = path.join(dir, file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // We will look for <template id="proof-foundever-projet">
    let searchTemplate = '<template id="proof-foundever-projet">';
    let templateIndex = content.indexOf(searchTemplate);
    if (templateIndex > -1) {
        // Find the proof-cards-grid inside this template
        let searchGrid = '<div class="proof-cards-grid">';
        let gridIndex = content.indexOf(searchGrid, templateIndex);
        if (gridIndex > -1) {
            let insertionPoint = gridIndex + searchGrid.length;
            
            // Check if we haven't already inserted it
            let nextTextLimit = Math.min(insertionPoint + 1000, content.length);
            let nextText = content.substring(insertionPoint, nextTextLimit);
            if (!nextText.includes('foundevercahierdescharges')) {
                // insert it!
                content = content.substring(0, insertionPoint) + '\n' + blockToInsert + content.substring(insertionPoint);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${file}`);
            } else {
                console.log(`${file} already has cahierdescharges inserted`);
            }
        }
    }
});
