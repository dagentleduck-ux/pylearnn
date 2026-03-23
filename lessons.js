const SECTIONS = [
    {
        title: "Section 1: Starting Off",
        lessons: [
            {
                id: 1, title: "1. Variables & Output",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Welcome to Python. Variables act as named boxes for your data.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "alias = 'hacker'",
                        challenge: "Initialize a string variable mapped to the word <code>alias</code> and assign it the value of <code>root</code>.",
                        hint: "Use the equals sign (=) and put quotes around 'root'.",
                        explainBetter: "When you type alias = 'root', you are telling the computer to remember the word 'root' whenever you say alias.",
                        test: "if globals().get('alias') != 'root': raise AssertionError('alias must be root')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>You can print variables to see what's inside them.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "print(alias)",
                        challenge: "Use the <code>print()</code> function to print the <code>alias</code> variable.",
                        hint: "Type print(alias). Do not use quotes around alias.",
                        explainBetter: "print() sends output to the console. Without quotes, it evaluates the variable alias to find its value.",
                        test: "if 'root' not in globals().get('sys').stdout.getvalue(): raise AssertionError('Did not print the variable alias.')"
                    }
                ]
            },
            {
                id: 2, title: "2. Basic Math",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Python acts as a powerful calculator: <code>+ - * /</code>.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "res = 10 * 2",
                        challenge: "Create a variable <code>target_port</code> and set it to 40 multiplied by 2.",
                        hint: "Use the asterisk (*) for multiplication.",
                        explainBetter: "Math operations are direct. Write target_port = 40 * 2 to compute and store 80.",
                        test: "if globals().get('target_port') != 80: raise AssertionError('target_port must be 80.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Variables can be updated mathematically.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "res = res + 5",
                        challenge: "Add 443 to the existing <code>target_port</code> and update the variable.",
                        hint: "target_port = target_port + 443",
                        explainBetter: "The right side evaluates first. It takes 80, adds 443, and saves it back into target_port.",
                        test: "if globals().get('target_port') != 523: raise AssertionError('target_port must equal 523.')"
                    }
                ]
            },
            {
                id: 3, title: "3. Booleans",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Booleans represents digital truth: <code>True</code> or <code>False</code>.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "is_admin = False",
                        challenge: "Set <code>system_online</code> to True.",
                        hint: "Capitalize the first letter!",
                        explainBetter: "In Python, true and false must explicitly be written as True and False with capital starting letters.",
                        test: "if globals().get('system_online') is not True: raise AssertionError('Must be exactly True.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Logic can be tracked simultaneously.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "is_admin = False\nis_user = True",
                        challenge: "Now also declare <code>firewall_active</code> and set it to False.",
                        hint: "It must be False.",
                        explainBetter: "Declare the second variable exactly as requested with False.",
                        test: "if globals().get('firewall_active') is not False: raise AssertionError('Must be False.')"
                    }
                ]
            },
            {
                id: 4, title: "Overview: Core Basics", isQuiz: true,
                activities: [
                    {
                        explain: "<p><b>Mastery Checkpoint: Core Variables</b><br>You've tackled variables, tracking state, and mathematics sequentially. Now you must deploy them simultaneously without guidance.</p>",
                        example: "None.",
                        challenge: "Initialize three variables on separate lines: <code>score</code> as 100, <code>multiplier</code> as 2, and <code>total</code> as the product of the first two.",
                        hint: "Declare each variable on a new line.",
                        explainBetter: "Line 1: set score. Line 2: set multiplier. Line 3: set total using the first two.",
                        test: "if globals().get('total') != 200: raise AssertionError('total must be 200.')"
                    },
                    {
                        explain: "<p><b>Mastery Checkpoint: State Emission</b><br>An algorithm is completely useless if we cannot extract its output. Send the final calculated sum to the console standard output system.</p>",
                        example: "None.",
                        challenge: "Print the <code>total</code> variable using print().",
                        hint: "print(total)",
                        explainBetter: "Verify that total holds the correct value by outputting it.",
                        test: "if '200' not in globals().get('sys').stdout.getvalue(): raise AssertionError('Must print total.')"
                    }
                ]
            }
        ]
    },
    {
        title: "Section 2: Control The Flow",
        lessons: [
            {
                id: 5, title: "5. If Statements",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Use <code>if</code> to run code conditionally.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "if a == 1:\n    b = 2",
                        challenge: "Initialize <code>uid</code> as 0. Then construct an if-statement that checks if uid equals 0, and if so, assigns the string 'root' to a new variable <code>status</code>.",
                        hint: "Remember the colon `:` and use == for comparison.",
                        explainBetter: "Python uses indentation (4 spaces). Your assignment status = 'root' must be indented.",
                        test: "if globals().get('status') != 'root': raise AssertionError('status must be root.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Use <code>else</code> for fallback logic.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "if False:\n    x=1\nelse:\n    x=2",
                        challenge: "Set <code>auth = False</code>. If auth is True, set <code>access = 1</code>, else set <code>access = 0</code>.",
                        hint: "The else: block must be on the same indentation level as the if block.",
                        explainBetter: "If auth is False, it will skip the first block and execute the indented code under else:.",
                        test: "if globals().get('access') != 0: raise AssertionError('access must be 0.')"
                    }
                ]
            },
            {
                id: 6, title: "6. While Loops",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'><code>while</code> loops run repeatedly.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "while x < 5:\n    x = x + 1",
                        challenge: "Set <code>count = 0</code>. While count is less than 3, add 1 to count.",
                        hint: "Loop condition is count < 3.",
                        explainBetter: "Inside the loop, update count so it eventually stops. count = count + 1.",
                        test: "if globals().get('count') != 3: raise AssertionError('count must be exactly 3.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Tracking iterations.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "None.",
                        challenge: "Print <code>count</code> inside your while loop structure as it counts up.",
                        hint: "Add print(count) below or above count = count + 1.",
                        explainBetter: "Indent print(count) to be inside the while block.",
                        test: "if '1' not in globals().get('sys').stdout.getvalue() and '0' not in globals().get('sys').stdout.getvalue(): raise AssertionError('Did not print.')"
                    }
                ]
            },
            {
                id: 7, title: "Overview: Flow Control", isQuiz: true,
                activities: [
                    {
                        explain: "<p><b>Mastery Checkpoint: Dynamic Execution</b><br>You possess the keys to basic loop conditioning. Configure a while-loop structure that iterates mathematically until a ceiling threshold is breached.</p>",
                        example: "None.",
                        challenge: "Set <code>power = 10</code>. While power is less than 15, add 2 to power.",
                        hint: "Write the while loop.",
                        explainBetter: "Create a loop that dynamically increments power.",
                        test: "if globals().get('power') != 16: raise AssertionError('power should hit 16.')"
                    },
                    {
                        explain: "<p><b>Mastery Checkpoint: Conditional Post-Processing</b><br>Now that the simulation loop has yielded a final data integer into your <code>power</code> variable, execute an external conditional logic check verifying the outcome.</p>",
                        example: "None.",
                        challenge: "Below the loop, write an <code>if</code> statement checking if power > 14, setting <code>stable = True</code>.",
                        hint: "Un-indent the if statement completely.",
                        explainBetter: "Once the loop finishes, power contains a number. Check it in the main scope.",
                        test: "if globals().get('stable') is not True: raise AssertionError('stable logic failed.')"
                    }
                ]
            }
        ]
    },
    {
        title: "Section 3: Data Structures",
        lessons: [
            {
                id: 8, title: "8. Lists",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Lists hold multiple items in order: <code>[]</code>.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "items = [1, 2]",
                        challenge: "Construct a list named <code>ports</code> containing two integer values exactly in order: 80 and 443.",
                        hint: "Separate integers by commas inside brackets.",
                        explainBetter: "A list is an ordered collection allowing one variable to hold multiple values.",
                        test: "if globals().get('ports') != [80, 443]: raise AssertionError('ports must be [80, 443].')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Access indices.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "items[0]",
                        challenge: "Set <code>target = ports[0]</code> to grab the first item.",
                        hint: "Python lists are zero-indexed.",
                        explainBetter: "The first item in the list is at position 0.",
                        test: "if globals().get('target') != 80: raise AssertionError('target must be 80.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Add items using <code>.append()</code>.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "items.append(3)",
                        challenge: "Append the number 22 to your <code>ports</code> list.",
                        hint: "Call ports.append(22).",
                        explainBetter: "Append modifies your existing list directly.",
                        test: "if globals().get('ports') != [80, 443, 22]: raise AssertionError('ports must now include 22.')"
                    }
                ]
            },
            {
                id: 9, title: "9. Dictionaries",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Dictionaries map keys to values: <code>{}</code>.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "user = {'role': 'admin'}",
                        challenge: "Create a dictionary object named <code>config</code> containing a single key defined as 'ip' mapped to the string '1.1.1.1'.",
                        hint: "Keys and values separated by colons.",
                        explainBetter: "Dictionaries allow fetching values instantly using names (keys).",
                        test: "if globals().get('config', {}).get('ip') != '1.1.1.1': raise AssertionError('ip key must be 1.1.1.1')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Update Dictionary Entries.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "user['role'] = 'guest'",
                        challenge: "Set the <code>'ip'</code> key in <code>config</code> to <code>'localhost'</code>.",
                        hint: "Write config['ip'] = 'localhost'",
                        explainBetter: "You can overwrite a dict key by directly assigning to it just like a variable.",
                        test: "if globals().get('config', {}).get('ip') != 'localhost': raise AssertionError('ip is not localhost')"
                    }
                ]
            },
            {
                id: 10, title: "Overview: Data Masters", isQuiz: true,
                activities: [
                    {
                        explain: "<p><b>Mastery Checkpoint: Dimensional Data Architecture</b><br>Sophisticated software constantly merges Data Types. You must dynamically construct a List structure encapsulated perfectly inside a Dictionary object.</p>",
                        example: "None.",
                        challenge: "Initialize a new dictionary <code>server</code> containing a single key 'ports'. Map this key's value directly to a nested list storing the integer 80.",
                        hint: "This is a dictionary containing a list.",
                        explainBetter: "The value of the 'ports' key is a list object containing 80.",
                        test: "if globals().get('server',{}).get('ports') != [80]: raise AssertionError('server structure failed.')"
                    },
                    {
                        explain: "<p><b>Mastery Checkpoint: Dimensional Mapping</b><br>You initialized a nested list structure inside a dictionary. Now target that interior array via bracket notation and physically append a new node onto it during runtime.</p>",
                        example: "None.",
                        challenge: "Append 443 to the list inside the <code>server</code> dictionary.",
                        hint: "server['ports'].append(443)",
                        explainBetter: "Access the list via the dict key, then call append() on it.",
                        test: "if 443 not in globals().get('server',{}).get('ports',[]): raise AssertionError('443 missing from ports.')"
                    }
                ]
            }
        ]
    },
    {
        title: "Section 4: Advanced Modules",
        lessons: [
            {
                id: 11, title: "11. Functions",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Functions are reusable blocks of code.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "def ping():\n    return 'pong'",
                        challenge: "Define a function <code>get_target()</code> that returns the string <code>'127.0.0.1'</code>.",
                        hint: "Use def, return, and indent the body.",
                        explainBetter: "Defining it makes it ready for use, but it doesn't execute until called.",
                        test: "if 'get_target' not in globals() or globals()['get_target']() != '127.0.0.1': raise AssertionError('function missing or returned incorrectly.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Calling the function.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "val = ping()",
                        challenge: "Set <code>t = get_target()</code>.",
                        hint: "The parentheses are required to execute the function.",
                        explainBetter: "Calling it executes the block and captures the return value into t.",
                        test: "if globals().get('t') != '127.0.0.1': raise AssertionError('t must hold the returned string.')"
                    }
                ]
            },
            {
                id: 12, title: "12. Arguments",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Pass data into functions.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "def add(x, y):\n    return x + y",
                        challenge: "Define <code>multiply(a, b)</code> returning a*b.",
                        hint: "The function needs two input parameters within the def parentheses.",
                        explainBetter: "Arguments act like internal variables scoped exclusively inside the function.",
                        test: "if 'multiply' not in globals() or globals()['multiply'](2,3) != 6: raise AssertionError('Function undefined.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Executing with arguments.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "add(5, 5)",
                        challenge: "Set <code>res = multiply(5, 5)</code>.",
                        hint: "Pass the literal numbers in.",
                        explainBetter: "The arguments a and b will receive 5 and 5 during this specific execution.",
                        test: "if globals().get('res') != 25: raise AssertionError('res must be 25.')"
                    }
                ]
            },
            {
                id: 13, title: "13. Base64 Encoding",
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Import code libraries seamlessly.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "import math",
                        challenge: "Import the <code>base64</code> module.",
                        hint: "Just write import base64",
                        explainBetter: "Modules contain pre-written useful functions you can borrow.",
                        test: "import sys\nif 'base64' not in sys.modules: raise AssertionError('base64 not imported.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Using imported functions.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "base64.b64encode(b'hack')",
                        challenge: "Use <code>base64.b64encode(b'hack')</code> and store the result in <code>enc</code>.",
                        hint: "Don't forget the b prefix before the string to make it bytes.",
                        explainBetter: "Base64 encodes data safely. It requires byte strings, so write b'hack' instead of 'hack'.",
                        test: "import base64\nif globals().get('enc') != base64.b64encode(b'hack'): raise AssertionError('Did not encode properly.')"
                    }
                ]
            },
            {
                id: 14, title: "Overview: Payload Delivery", isQuiz: true,
                activities: [
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Break into the system logic.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "Good Luck.",
                        challenge: "Set <code>tries = 3</code>.",
                        hint: "Initialization.",
                        explainBetter: "Just variable declaration.",
                        test: "if globals().get('tries') != 3: raise AssertionError('tries != 3.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Loop mechanics.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "None.",
                        challenge: "Write a while loop: while tries > 0, subtract 1 from tries.",
                        hint: "tries = tries - 1",
                        explainBetter: "Standard countdown loop.",
                        test: "if globals().get('tries') != 0: raise AssertionError('Loop did not burn down zeroes.')"
                    },
                    {
                        explain: "<div style='background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:12px; border-left:4px solid var(--primary); margin-bottom:1.5rem;'><h3 style='color:var(--primary); margin-top:0;'>Pre-Mission Theory</h3><p style='font-size:1.1rem; line-height:1.6; margin-bottom:0.5rem;'>Condition check on completion.</p><p style='font-size:1.05rem; line-height:1.6; color:var(--text-main); margin-top:0.8rem;'>Computers require exact instructions. You must systematically build the memory architecture required before processing external algorithms. Think carefully about the syntax and capitalization before you execute. If you misconfigure the data type mapping or logic layout here, the subsequent downstream tests will categorically fail.</p><p style='font-size:1rem; line-height:1.6; color:var(--text-muted); margin-top:0.8rem;'><i>* Read the challenge below extremely carefully and synthesize the required structural code. Do not proceed until you fully grasp the architectural intent.</i></p></div>",
                        example: "None.",
                        challenge: "Un-indent totally. If tries == 0, set <code>hacked = True</code>.",
                        hint: "This executes after the while loop.",
                        explainBetter: "Check if the tries variable successfully hit zero.",
                        test: "if globals().get('hacked') is not True: raise AssertionError('hacked not True.')"
                    }
                ]
            }
        ]
    }
];
