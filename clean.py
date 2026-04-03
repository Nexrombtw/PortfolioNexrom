import re

file_path = 'C:/Users/Nexrom/Desktop/PF/PortfolioNexrom/index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Using regex to remove the CashCash article block
content = re.sub(
    r'\s*<!-- Project 3: CashCash -->.*?<h3 class="cell-title">CashCash</h3>.*?</article>', 
    '', 
    content, 
    flags=re.DOTALL
)

# Using regex to remove the CashCash table row
content = re.sub(
    r'\s*<tr>\s*<td>\s*<span class="project-title">CashCash \(AP 2 - Client Lourd\)</span>.*?\s*</tr>',
    '',
    content,
    flags=re.DOTALL
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
