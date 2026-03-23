import re

with open("lessons.js", "r", encoding="utf-8") as f:
    text = f.read()

def replace_fn(match):
    original_text = match.group(1)
    if 'Mastery Checkpoint' in original_text:
        return match.group(0) # Do not modify quizzes
    
    # We create a massive, detailed theoretical teaching card before the mission
    new_html = f"<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>{original_text}</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>"
    return f'explain: "{new_html}"'

# Matches explain: "<p>...</p>"
new_text = re.sub(r'explain:\s*"<p>(.*?)<\/p>"', replace_fn, text, flags=re.DOTALL)

with open("lessons.js", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Upgraded lessons.js globally!")
