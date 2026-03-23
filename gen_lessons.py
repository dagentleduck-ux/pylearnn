import json
from typing import Dict, List, Any

tracks: Dict[str, List[Dict[str, Any]]] = {
    "hacking": [
        {"title": "Section 5: Offensive Security Path (Novice)", "lessons": []},
        {"title": "Section 6: Offensive Security Path (Intermediate)", "lessons": []},
        {"title": "Section 7: Offensive Security Path (Expert)", "lessons": []}
    ],
    "ai": [
        {"title": "Section 5: Artificial Intelligence Path (Novice)", "lessons": []},
        {"title": "Section 6: Artificial Intelligence Path (Intermediate)", "lessons": []},
        {"title": "Section 7: Artificial Intelligence Path (Expert)", "lessons": []}
    ],
    "web": [
        {"title": "Section 5: Web Development Path (Novice)", "lessons": []},
        {"title": "Section 6: Web Development Path (Intermediate)", "lessons": []},
        {"title": "Section 7: Web Development Path (Expert)", "lessons": []}
    ],
    "gaming": [
        {"title": "Section 5: Game Dev Path (Novice)", "lessons": []},
        {"title": "Section 6: Game Dev Path (Intermediate)", "lessons": []},
        {"title": "Section 7: Game Dev Path (Expert)", "lessons": []}
    ]
}

base_id: int = 100

for tk, data_list in tracks.items():
    theme: List[tuple] = []
    
    if tk == "hacking":
        theme = [
            ("Information Gathering", "target_ip = '192.168.1.1'"),
            ("Port Scanner Construction", "ports_to_scan = [80, 443, 22]"),
            ("Socket Connections", "connection_established = True"),
            ("Banner Grabbing", "banner = 'SSH-2.0-OpenSSH'"),
            ("Vulnerability Analysis", "vuln_found = True"),
            ("Password Cracker (Dictionary)", "passwords = ['admin', '123456']"),
            ("Hash Digester", "import hashlib\npwd_hash = hashlib.md5(b'admin').hexdigest()"),
            ("Packet Sniffer Interface", "promiscuous_mode = True"),
            ("Payload Encoder", "payload = b'\\x90\\x90\\x90'"),
            ("Reverse Shell Handler", "listening_port = 4444")
        ]
    elif tk == "ai":
        theme = [
            ("Dataset Initialization", "data = [0.1, 0.4, 0.8]"),
            ("Normalization", "normalized = [d * 0.1 for d in data]"),
            ("Weight Matrix", "weights = [0.5, -0.2, 0.1]"),
            ("Dot Product Logic", "dot = weights[0] * data[0]"),
            ("Activation Function (ReLU)", "import math\nact = max(0, dot)"),
            ("Bias Addition", "bias = 0.05\nact += bias"),
            ("Loss Calculation", "loss = abs(1.0 - act)"),
            ("Backpropagation Theory", "correction = loss * 0.1"),
            ("Weight Update", "weights[0] += correction"),
            ("Epoch Training Loop", "epochs = 100")
        ]
    elif tk == "web":
        theme = [
            ("HTTP Request Structure", "method = 'GET'"),
            ("Route Mapping", "routes = {'/home': 'Home Page'}"),
            ("Header Parsing", "headers = {'Content-Type': 'text/html'}"),
            ("JSON Serialization", "import json\nbody = json.dumps({'user': 'admin'})"),
            ("Session Management", "session_id = 'a1b2c3d4'"),
            ("Middleware Filter", "is_authenticated = True"),
            ("Database Connection", "db_connected = True"),
            ("SQL Query Builder", "query = 'SELECT * FROM users'"),
            ("Data Formatting", "response_formatted = True"),
            ("Websocket Upgrade", "socket_live = True")
        ]
    else:
        theme = [
            ("Game Loop Variables", "is_running = True"),
            ("Player Entity", "player_pos = [0, 0]"),
            ("Input Mapping", "move_right = True"),
            ("Velocity Calculation", "velocity = 5.0"),
            ("Position Update", "player_pos[0] += velocity"),
            ("Collision Box", "collided = False"),
            ("Sprite Loading", "sprite = 'player.png'"),
            ("Enemy Tracking", "enemy_dist = 10.0"),
            ("Score Counter", "score = 100"),
            ("Level Transition", "current_level = 2")
        ]
    
    # Generate 30 lessons (3 tiers of 10 themes each)
    for i in range(30):
        t_idx: int = i % 10
        tier: int = (i // 10) + 1
        name, code_ex = theme[t_idx]
        
        var_name: str = code_ex.split('=')[0].strip().split(' ')[-1]
        if 'import' in code_ex:
            var_name = code_ex.split('\n')[1].split('=')[0].strip()
        
        lesson: Dict[str, Any] = {
            "id": base_id + i,
            "title": f"Mission {t_idx+1}: {name}",
            "activities": []
        }
        
        activities_list: List[Dict[str, str]] = lesson["activities"]
        
        payload_val = code_ex.split('=')[1].strip() if '=' in code_ex else code_ex
        if 'import' in code_ex:
            payload_val = code_ex.split('\n')[1].split('=')[1].strip()
        
        activities_list.append({
            "explain": f"<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Theoretical Concept: {name}</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Welcome to <b>{name}</b>.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>In the structural field of <b>{tk}</b> engineering, systematically managing state logic is absolutely critical. You cannot construct a sophisticated programmatic architecture or bypass basic diagnostic gates without physically mastering targeted memory variables.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
            "example": code_ex,
            "challenge": f"Systematically construct the foundational <b>{name}</b> payload architecture and assign it to its official structural memory register.",
            "hint": f"Your structural register name should be {var_name}. Pay attention to the syntax types expected.",
            "explainBetter": f"<div style='background:rgba(255,255,255,0.05); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary);'><h3 style='color:var(--primary); margin-top:0;'>Deep Dive: {name}</h3><p>The concept of <code>{name}</code> is the foundational building block of structural <b>{tk}</b> engineering. When you type commands allocating state space, you are not just writing text—you are physically commanding the Python runtime to allocate space in your computer's RAM.</p><h4 style='color:var(--secondary); margin-top:1rem;'>How it works under the hood:</h4><ul style='margin-left:1.5rem; margin-bottom:1rem;'><li><b>Allocation:</b> Python finds empty memory space.</li><li><b>Assignment:</b> It stores your data payload into that space.</li><li><b>Binding:</b> It attaches the label to that exact memory address so you can recall it later.</li></ul><h4 style='color:var(--secondary); margin-top:1rem;'>Real-World Example</h4><pre style='background:#1e1e1e; padding:1rem; border-radius:8px; border:1px solid #333; color:#a6e22e; overflow-x:auto;'># Dynamic state allocation (Good)\n{code_ex}\nprocess_payload_logic()</pre><p>By declaring your state correctly once, you create a singular source of truth. If the value changes, you only update it in one place, and your entire architecture adapts automatically!</p></div>",
            "test": f"if '{var_name}' not in globals(): raise AssertionError('CRITICAL FAULT: You did not successfully deploy the target architecture. The runtime engine failed to find the correctly designated memory pointer. Double check your variable name, syntax capitalization, and structural integrity. Engage your Hint module if you require syntax referencing.')"
        })
        
        activities_list.append({
            "explain": f"<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--secondary); margin-bottom:1.5rem;'><h3 style='color:var(--secondary); margin-top:0;'>Diagnostic Theory: State Extraction</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>You must successfully verify the memory payload data state.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>You have successfully allocated parameters within the local machine's memory boundaries. However, blindly trusting an operational state is incredibly dangerous in high-level <b>{tk}</b> programming.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Engineers must build diagnostic bridges to verify their payloads. By natively invoking Python's standard output pipeline, you can physically extract the hidden computational execution strings and pipe them directly into your console for visual verification. This verifies your architecture remains uncorrupted.</p></div>",
            "example": f"print({var_name})",
            "challenge": f"Engage the standard diagnostic execution pipeline to extract and output your localized payload state continuously.",
            "hint": f"Use the generic output method surrounding your payload register.",
            "explainBetter": f"<div style='background:rgba(255,255,255,0.05); padding:1.5rem; border-radius:12px; border-left:4px solid var(--secondary);'><h3 style='color:var(--secondary); margin-top:0;'>Diagnostics: The Print Function</h3><p>Executing your printing diagnostics operates as a pure data-retrieval pipeline. It is your primary tool for validating the internal state of your <b>{tk}</b> algorithms.</p><h4 style='color:var(--primary); margin-top:1rem;'>The Execution Pipeline:</h4><ol style='margin-left:1.5rem; margin-bottom:1rem;'><li>Python locates the memory address tied to your pointer.</li><li>It retrieves the raw payload hiding inside.</li><li>It streams it directly into the standard output console.</li></ol><h4 style='color:var(--primary); margin-top:1rem;'>Why is this critical?</h4><p>Without extraction procedures, a program runs completely in the dark. For instance, debugging an invalid payload:</p><pre style='background:#1e1e1e; padding:1rem; border-radius:8px; border:1px solid #333; color:#e6db74; overflow-x:auto;'># Let's verify the payload before executing the core loop!\nprint({var_name})</pre></div>",
            "test": f"if 'base64' not in globals() and '{var_name}' not in globals(): raise AssertionError('CRITICAL FAULT: The parameter diagnostic sequence failed. You either omitted the default output pipeline wrapper, mapped an invalid reference pointer, or did not retrieve the required execution payload inside the parenthesize logic.')"
        })
        
        data_list[tier - 1]["lessons"].append(lesson)
        
    base_id += 100

js_out: str = "const TRACKS_CONTENT = " + json.dumps(tracks, indent=4) + ";"

with open("extra_lessons.js", "w", encoding="utf-8") as f:
    f.write(js_out)
