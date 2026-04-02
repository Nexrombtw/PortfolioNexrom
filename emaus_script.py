import os
import sys

def encode_path(p):
    return p.replace('\\', '/')

def clean_name(n):
    n = n.replace('_', ' ')
    n = n.replace('.png', '').replace('.pdf', '')
    # Remove prefix like 1774565832682-6282...-
    parts = n.split('-')
    if len(parts) > 4:
        # likely a uuid prefix
        n = parts[-1]
    return n

lines = open('emaus_files_utf8.txt', 'r', encoding='utf-8').read().splitlines()

templates = {
    "Gerer le Le patrimoine": "proof-emmaus-patrimoine",
    "Développer la présence en ligne de l’organisation": "proof-emmaus-presence",
    "Travailler en mode projet": "proof-emmaus-projet",
    "Mettre à disposition des utilisateurs un service informatique": "proof-emmaus-service",
    "Organiser son dévprofessionnel": "proof-emmaus-devpro"
}

from collections import defaultdict
data = defaultdict(list)

for line in lines:
    if not line.strip(): continue
    # C:\Users\Nexrom\Desktop\PF\assets\preuves_emaus\EMAUS\Développer la présence en ligne de l’organisation\Participer à la valorisation de l’image de l’organisation sur les médias numériques\Mentions_L_gales.png
    parts = line.split("\\EMAUS\\")
    if len(parts) < 2: continue
    rel_path_win = "assets\\preuves_emaus\\EMAUS\\" + parts[1]
    rel_path = encode_path(rel_path_win)
    
    subparts = parts[1].split('\\')
    major = subparts[0]
    minor = subparts[1]
    filename = subparts[2]
    
    data[major].append({
        "minor": minor,
        "filename": filename,
        "rel_path": rel_path
    })

html_output = ""

default_img = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
pdf_img = "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=800&auto=format&fit=crop"

for major, tpl_id in templates.items():
    html_output += f'      <!-- Emmaüs: {major} -->\n'
    html_output += f'      <template id="{tpl_id}">\n'
    html_output += f'          <p class="proof-context">{major}</p>\n'
    html_output += f'          <div class="proof-cards-grid">\n'
    
    for item in data.get(major, []):
        name_clean = clean_name(item["filename"])
        is_pdf = item["filename"].lower().endswith('.pdf')
        img_src = item["rel_path"] if not is_pdf else pdf_img
        
        btn_text = "Voir le document" if is_pdf else "Voir la capture"
        
        html_output += f'              <article class="proof-card-item">\n'
        html_output += f'                  <div class="proof-card-header">\n'
        html_output += f'                      <span class="proof-tag" style="font-size:0.7em;">{item["minor"]}</span>\n'
        html_output += f'                      <h4>{name_clean}</h4>\n'
        html_output += f'                  </div>\n'
        html_output += f'                  <div class="proof-image-wrapper">\n'
        html_output += f'                      <img src="{img_src}" alt="{name_clean}" class="proof-image" onerror="this.onerror=null; this.src=\'{default_img}\';" />\n'
        html_output += f'                  </div>\n'
        html_output += f'                  <a href="{item["rel_path"]}" target="_blank" class="btn btn--sm proof-btn" style="margin-top:auto;">{btn_text}</a>\n'
        html_output += f'              </article>\n'
        
    html_output += f'          </div>\n'
    html_output += f'      </template>\n\n'

with open('generated_templates.html', 'w', encoding='utf-8') as f:
    f.write(html_output)
print("done")
