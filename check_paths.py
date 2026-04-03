import os
import re
import urllib.parse

def check_path_case(path):
    parts = path.split('/')
    # Start from where the script is executed, assuming it's the root of the project
    current = '.' 
    for part in parts:
        if not part: continue
        decoded_part = urllib.parse.unquote(part)
        try:
            actual_files = os.listdir(current)
            if decoded_part not in actual_files:
                lower_files = {f.lower(): f for f in actual_files}
                if decoded_part.lower() in lower_files:
                    return False, f"Case mismatch: expected '{decoded_part}', found '{lower_files[decoded_part.lower()]}' in '{current}'"
                else:
                    return False, f"File or folder missing: '{decoded_part}' in '{current}'"
            current = os.path.join(current, decoded_part)
        except Exception as e:
            return False, f"Error traversing at '{current}': {str(e)}"
    return True, "OK"

html_path = "index.html"
if not os.path.exists(html_path):
    print(f"HTML not found: {html_path}")
    exit(1)

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

srcs = re.findall(r'src="([^"]+)"', html)
hrefs = re.findall(r'href="([^"]+)"', html)

paths = set(srcs + hrefs)
issues_found = []
for p in set(paths):
    if p.startswith('assets/'):
       ok, msg = check_path_case(p)
       if not ok:
           issues_found.append((p, msg))

if not issues_found:
    print("No case or missing file issues found!")
else:
    for p, msg in issues_found:
        print(f"ISSUE: {p}")
        print(f"  -> {msg}")
