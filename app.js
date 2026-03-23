document.addEventListener('DOMContentLoaded', () => {
    
    // --- Minimalistic Audio Synth & Theming ---
    let audioCtx = null;
    function initAudio() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }
    
    document.body.addEventListener('click', () => { 
        if (!audioCtx) initAudio(); 
    }, { once: true });

    function playSound(type) {
        if (!audioCtx || (currentUser && currentUser.settings && currentUser.settings.sfx === false)) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        const now = audioCtx.currentTime;
        if (type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(500, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(); osc.stop(now + 0.3);
        } else if (type === 'error') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(120, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(); osc.stop(now + 0.2);
        } else if (type === 'blip') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(); osc.stop(now + 0.05);
        } else if (type === 'unlock') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.linearRampToValueAtTime(600, now + 0.15);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(); osc.stop(now + 0.4);
        }
    }

    function applyTheme() {
        if (currentUser && currentUser.settings && currentUser.settings.darkMode) {
            document.body.classList.add('dark-theme');
            document.getElementById('toggle-dark-mode').checked = true;
        } else {
            document.body.classList.remove('dark-theme');
            document.getElementById('toggle-dark-mode').checked = false;
        }

        if (currentUser && currentUser.settings) {
            document.getElementById('toggle-sfx').checked = currentUser.settings.sfx !== false;
        }
    }

    const screens = {
        loader: document.getElementById('loader'),
        intro: document.getElementById('intro-screen'),
        dashboard: document.getElementById('dashboard-screen'),
        lesson: document.getElementById('lesson-screen'),
        settings: document.getElementById('settings-screen')
    };

    function showScreen(screenId) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenId].classList.add('active');
        if (screenId === 'dashboard') requestAnimationFrame(drawSVGPaths);
    }

    // --- Base44 Encoding ---
    const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh";
    function toBase44(jsonObj) {
        const jsonStr = JSON.stringify(jsonObj);
        const utf8Str = encodeURIComponent(jsonStr); 
        let b44 = "";
        for (let i = 0; i < utf8Str.length; i++) {
            const charCode = utf8Str.charCodeAt(i);
            let c1 = Math.floor(charCode / 44);
            let c2 = charCode % 44;
            b44 += ALPHABET[c1] + ALPHABET[c2];
        }
        return b44;
    }

    function fromBase44(b44Str) {
        let decodedStr = "";
        for (let i = 0; i < b44Str.length; i += 2) {
            const c1 = ALPHABET.indexOf(b44Str[i]);
            const c2 = ALPHABET.indexOf(b44Str[i+1]);
            const charCode = (c1 * 44) + c2;
            decodedStr += String.fromCharCode(charCode);
        }
        return JSON.parse(decodeURIComponent(decodedStr));
    }

    // --- System State ---
    const DB_KEY = 'pylearn_user_v5';
    let currentUser = null;
    let TOTAL_LESSONS = 0;
    SECTIONS.forEach(s => TOTAL_LESSONS += s.lessons.length);

    function loadUser() {
        const data = localStorage.getItem(DB_KEY);
        if (data) {
            try { currentUser = fromBase44(data); } catch (e) { console.error(e); currentUser = null; }
        }
    }

    function saveDatabase() {
        if (currentUser) localStorage.setItem(DB_KEY, toBase44(currentUser));
    }
    loadUser();

    function applyTrack() {
        if (!currentUser || !currentUser.track) return;
        if (SECTIONS.length === 4 && typeof TRACKS_CONTENT !== 'undefined') {
            const extraArray = TRACKS_CONTENT[currentUser.track];
            if (extraArray && Array.isArray(extraArray)) {
                SECTIONS.push(...extraArray);
                extraArray.forEach(sec => TOTAL_LESSONS += sec.lessons.length);
            }
        }
    }
    applyTrack();

    // --- Pyodide Sandbox Setup ---
    let pyodide = null;
    async function initPyodide() {
        try {
            let p = 0;
            let pInt = setInterval(() => { 
                p+=20;
                if(p <= 100) document.getElementById('load-progress').style.width = p + "%"; 
            }, 100);
            
            pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/" });
            
            clearInterval(pInt);
            document.getElementById('load-progress').style.width = "100%";

            // Register global stdout proxy once
            pyodide.setStdout({ batched: (msg) => { 
                const out = document.getElementById('console-out');
                if(out) out.textContent += msg + "\\n"; 
            }});
            pyodide.setStderr({ batched: (msg) => { 
                const out = document.getElementById('console-out');
                if(out) out.textContent += "ERROR: " + msg + "\\n"; 
            }});

            setTimeout(() => {
                if (!currentUser || !currentUser.isSetup) showScreen('intro');
                else {
                    // Update streak on return visit
                    const todaySTR = new Date().toDateString();
                    if (currentUser.lastLogin !== todaySTR) {
                        let yesterday = new Date(Date.now() - 86400000).toDateString();
                        if (currentUser.lastLogin === yesterday) currentUser.streak += 1;
                        else currentUser.streak = 1;
                        currentUser.dailyMissions = 0; currentUser.dailyXp = 0; currentUser.lastLogin = todaySTR;
                        saveDatabase();
                    }
                    enterDashboard();
                }
            }, 300);
        } catch (error) {
            document.querySelector('.loader-content').innerHTML = "<h3>Network Failure loading Sandbox.</h3>";
        }
    }
    initPyodide();

    // --- Avatar Selection ---
    let pendingAvatar = "🦊";
    document.querySelectorAll('.avatar-opt').forEach(el => {
        el.addEventListener('click', () => {
            playSound('blip');
            document.querySelectorAll('.avatar-opt').forEach(e => e.classList.remove('selected'));
            el.classList.add('selected');
            pendingAvatar = el.getAttribute('data-avatar');
        });
    });

    document.querySelectorAll('.track-box').forEach(el => {
        el.addEventListener('click', () => {
            playSound('blip');
            document.querySelectorAll('.track-box').forEach(e => e.classList.remove('selected'));
            el.classList.add('selected');
            document.getElementById('track-level').value = el.getAttribute('data-track');
        });
    });

    document.getElementById('intro-form').addEventListener('submit', (e) => {
        e.preventDefault();
        initAudio(); playSound('unlock');
        const todaySTR = new Date().toDateString();

        // Create a fresh user profile (no username/password needed)
        currentUser = {
            name: document.getElementById('profile-name').value,
            experience: document.getElementById('experience-level').value,
            track: document.getElementById('track-level').value,
            avatar: pendingAvatar,
            isSetup: true,
            xp: 0, streak: 1, lastLogin: todaySTR, badges: [], completedLessons: [], currentLessonId: 1,
            dailyMissions: 0, dailyXp: 0, botSeed: Math.random(),
            pastAnswers: {}, stats: { runs: 0, errors: 0 },
            settings: { darkMode: false, sfx: true, geminiKey: "" }
        };

        applyTrack();

        if (currentUser.experience === 'hacker') {
            currentUser.xp += 1500;
            currentUser.dailyXp += 1500;
            currentUser.badges.push("Pro Hacker");
            for(let i = 1; i <= 6; i++) currentUser.completedLessons.push(i);
            currentUser.currentLessonId = 7;
        }
        
        saveDatabase();
        applyTheme();
        enterDashboard();
    });

    // --- Dashboard ---
    function enterDashboard() {
        showScreen('dashboard');
        
        document.getElementById('profile-dash-avatar').textContent = currentUser.avatar;
        document.getElementById('profile-dash-name').textContent = currentUser.name;

        document.getElementById('dash-streak').textContent = currentUser.streak;
        document.getElementById('dash-xp').textContent = currentUser.xp;
        
        generateLeaderboard();
        populateCheatSheet();
        
        document.getElementById('q1-prog').style.width = Math.min((currentUser.dailyMissions / 2) * 100, 100) + "%";
        document.getElementById('q2-prog').style.width = Math.min((currentUser.dailyXp / 30) * 100, 100) + "%";

        const bList = document.getElementById('badges-list');
        if (currentUser.badges.length > 0) {
            bList.innerHTML = currentUser.badges.map(b => `<span class="badge" style="background:#f1f1f1; padding:4px 8px; border-radius:8px; font-weight:800; color:#333;">🥇 ${b}</span>`).join('');
        }

        renderLessonsTree();
    }

    function populateCheatSheet() {
        const cList = document.getElementById('cheat-sheet-list');
        cList.innerHTML = '';
        const concepts = [
            { id: 1, c: "Variables (=)", t: "Variables act as named boxes containing data. Ex: x = 10" },
            { id: 2, c: "Math (+ - * /)", t: "Standard math operators perform calculations linearly." },
            { id: 3, c: "Booleans", t: "Logically True or False explicitly capitilized." },
            { id: 5, c: "If/Else Statements", t: "The if block executes indented lines only conditionally." },
            { id: 6, c: "While Loops", t: "Runs code over and over repeatedly while the condition yields true." },
            { id: 8, c: "Lists ([1,2])", t: "Sequential order arrays tracking multiple items via comma." },
            { id: 9, c: "Dictionaries ({})", t: "Key to value mappings fetching instant values." },
            { id: 11, c: "Functions (def)", t: "Wraps custom logic returning parsed data cleanly." },
            { id: 13, c: "Base64 Encoding", t: "Turns raw byte string architectures into safe data chains." }
        ];
        
        let found = false;
        concepts.forEach(cn => {
            if(currentUser.completedLessons.includes(cn.id) || currentUser.currentLessonId > cn.id) {
                cList.innerHTML += `<details><summary>${cn.c}</summary><p>${cn.t}</p></details>`;
                found = true;
            }
        });

        if (!found) {
            cList.innerHTML = `<span>Complete missions to decode syntax files.</span>`;
        }
    }

    function generateLeaderboard() {
        const xp = currentUser.xp;
        let league = "Bronze";
        if (xp >= 3500) league = "Obsidian";
        else if (xp >= 2000) league = "Master";
        else if (xp >= 1200) league = "Diamond";
        else if (xp >= 700) league = "Platinum";
        else if (xp >= 350) league = "Gold";
        else if (xp >= 100) league = "Silver";
        
        const titleEl = document.getElementById('league-title');
        if (titleEl) titleEl.textContent = `🏆 ${league} League`;

        const FAKE_NAMES = ['SarahScript', 'John_Smith', 'DataWiz_99', 'xX_Sniper_Xx', 'Emily.dev', 'PythonPro', 'AliceCoder', 'just_a_hacker'];
        const AVATARS = ['🐻', '🐸', '🦄', '👤', '👤', '🦉', '🐱', '🤖'];
        
        let lbData = FAKE_NAMES.map((n, i) => {
            let aiXp = xp + Math.floor((Math.sin(currentUser.botSeed * (i+1))) * i * 30);
            if (aiXp < 0) aiXp = 0;
            return { name: n, xp: aiXp, me: false, avatar: AVATARS[i % AVATARS.length] };
        });
        lbData.sort((a,b) => b.xp - a.xp);
        
        let lbHtml = lbData.slice(0, 6).map((entry, idx) => `
            <div class="lb-entry">
                <span class="lb-rank">${idx + 1}</span>
                <span class="lb-name">${entry.avatar} ${entry.name}</span>
                <span class="lb-xp">${entry.xp}</span>
            </div>
        `).join('');

        lbHtml += `<div class="lb-ellipsis">...</div>`;

        let pRank = 1;
        lbData.forEach(e => { if(e.xp > currentUser.xp) pRank++; });
        if (pRank <= 6) pRank = 7;

        lbHtml += `
            <div class="lb-entry me">
                <span class="lb-rank">${pRank}</span>
                <span class="lb-name">${currentUser.avatar} ${currentUser.name} (You)</span>
                <span class="lb-xp">${currentUser.xp}</span>
            </div>
        `;
        document.getElementById('leaderboard-list').innerHTML = lbHtml;
    }

    let nodeElements = []; 
    function renderLessonsTree() {
        const grid = document.getElementById('lessons-grid');
        grid.innerHTML = '';
        nodeElements = [];
        let nodeIndex = 0;

        const reachedAdvanced = currentUser.currentLessonId >= 100;

        SECTIONS.forEach((section, sIdx) => {
            if (reachedAdvanced && sIdx < 4) return;
            
            const secHead = document.createElement('div');
            secHead.className = 'section-header';
            secHead.innerHTML = `<h2>${section.title}</h2>`;
            grid.appendChild(secHead);

            if (sIdx >= 4 && !reachedAdvanced) {
                if (sIdx === 4) {
                    const gate = document.createElement('div');
                    gate.style = "text-align:center; padding: 1.5rem; background: rgba(220,53,69,0.1); border: 2px dashed var(--danger); border-radius:12px; margin: 1rem 0; font-weight: 800; color: var(--danger); margin-bottom: 2rem;";
                    gate.innerHTML = "🔒 <b>Advanced Module Locked</b><br><span style='font-size:0.9rem; font-weight:normal; color:var(--text-main);'>You must complete all core training missions above to gain authorization.</span>";
                    grid.appendChild(gate);
                }
                return;
            }

            section.lessons.forEach((lesson) => {
                const isCompleted = currentUser.completedLessons.includes(lesson.id);
                const isCurrent = (lesson.id === currentUser.currentLessonId);
                const isUnlocked = isCompleted || isCurrent;

                const wrapper = document.createElement('div');
                wrapper.className = 'lesson-node-wrapper';
                
                const offset = Math.sin(nodeIndex) * 60; 
                
                const node = document.createElement('div');
                node.className = `lesson-node ${isCompleted ? 'unlocked' : (isUnlocked ? 'current' : 'locked')}`;
                if(lesson.isQuiz) node.classList.add('project');

                if (isCurrent) node.innerHTML = "🎯";
                else if (lesson.isQuiz && isCompleted) node.innerHTML = "🏆";
                else if (isCompleted) node.innerHTML = "⭐️";
                else node.innerHTML = "🔒";

                node.style.setProperty('--x-offset', `${offset}px`);
                node.dataset.completed = isCompleted;
                node.dataset.id = lesson.id;
                
                const tooltip = document.createElement('div');
                tooltip.className = 'lesson-title-tooltip';
                tooltip.textContent = lesson.title;
                tooltip.style.setProperty('--x-offset', `${offset}px`);

                if (isUnlocked) {
                    node.addEventListener('click', () => { playSound('blip'); openLesson(lesson.id); });
                }

                wrapper.appendChild(node);
                wrapper.appendChild(tooltip);
                grid.appendChild(wrapper);
                
                nodeElements.push(node);
                nodeIndex++;
            });
        });
        
        requestAnimationFrame(drawSVGPaths);
    }

    function drawSVGPaths() {
        const svg = document.getElementById('path-svg');
        svg.innerHTML = '';
        const containerRect = svg.parentElement.getBoundingClientRect();
        const justCompletedId = sessionStorage.getItem('justCompleted');

        for (let i = 0; i < nodeElements.length - 1; i++) {
            const n1 = nodeElements[i];
            const n2 = nodeElements[i+1];
            
            const r1 = n1.getBoundingClientRect();
            const r2 = n2.getBoundingClientRect();
            
            if(r1.width===0) return; // Not visible yet

            const x1 = r1.left + r1.width/2 - containerRect.left;
            const y1 = r1.top + r1.height/2 - containerRect.top;
            const x2 = r2.left + r2.width/2 - containerRect.left;
            const y2 = r2.top + r2.height/2 - containerRect.top;

            const isCompleted = (n1.dataset.completed === 'true' && n2.dataset.completed === 'true');
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", `M ${x1} ${y1} Q ${x1} ${(y1+y2)/2} ${(x1+x2)/2} ${(y1+y2)/2} T ${x2} ${y2}`);
            
            let pClass = "path-line";
            if (isCompleted) pClass += " completed";

            if (justCompletedId === n1.dataset.id && !isCompleted && n1.dataset.completed === 'true') {
                pClass += " completed animate-draw";
                sessionStorage.removeItem('justCompleted');
            }

            path.setAttribute("class", pClass);
            svg.appendChild(path);
        }

        setTimeout(() => {
            let focusId = sessionStorage.getItem('justCompletedNode') || currentUser.currentLessonId;
            let el = document.querySelector(`.lesson-node[data-id="${focusId}"]`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            sessionStorage.removeItem('justCompletedNode');
            
            if (sessionStorage.getItem('justUnlockedSection')) {
                playSound('success');
                if (typeof window.confetti !== 'undefined') window.confetti({ particleCount: 300, spread: 120, origin: { y: 0.3 }});
                sessionStorage.removeItem('justUnlockedSection');
            }
            if (sessionStorage.getItem('justFinishedTrack')) {
                playSound('success');
                if (typeof window.confetti !== 'undefined') window.confetti({ particleCount: 500, spread: 360, origin: { y: 0.5 }});
                sessionStorage.removeItem('justFinishedTrack');
                setTimeout(() => {
                    let newTrack = prompt("Congratulations! You cleared all missions for this module.\nType a new track to explore: (hacking, ai, web, gaming)", "ai");
                    if (newTrack) {
                        currentUser.track = newTrack;
                        saveDatabase();
                        location.reload();
                    }
                }, 1000);
            }
        }, 300);
    }

    window.addEventListener('resize', drawSVGPaths);

    // --- Settings UI ---
    document.getElementById('settings-btn').addEventListener('click', () => {
        playSound('blip');
        showScreen('settings');
    });

    document.getElementById('settings-close-btn').addEventListener('click', () => {
        playSound('blip');
        enterDashboard();
    });

    document.getElementById('toggle-dark-mode').addEventListener('change', (e) => {
        playSound('blip');
        currentUser.settings.darkMode = e.target.checked;
        saveDatabase();
        applyTheme();
    });

    document.getElementById('toggle-sfx').addEventListener('change', (e) => {
        currentUser.settings.sfx = e.target.checked;
        saveDatabase();
        playSound('blip');
    });

    document.getElementById('reset-progress-btn').addEventListener('click', () => {
        if(confirm("Are you totally sure you want to delete your entire progress? This cannot be undone!")) {
            localStorage.removeItem(DB_KEY);
            currentUser = null;
            showScreen('intro');
        }
    });

    // --- Logout ---
    document.getElementById('logout-btn').addEventListener('click', () => {
        playSound('blip');
        if(confirm("This will clear your profile and all progress. Are you sure?")) {
            localStorage.removeItem(DB_KEY);
            currentUser = null;
            showScreen('intro');
        }
    });

    // --- Active Document Multi-Activity Logic ---
    let activeLesson = null;
    let activityIndex = 0;
    let activities = [];

    const editor = document.getElementById('code-editor');
    
    editor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
            playSound('blip');
        }
    });

    const consoleOutElem = document.getElementById('console-out');
    const hintBox = document.getElementById('hint-box');
    const explainBox = document.getElementById('explain-box');
    const runBtn = document.getElementById('run-code-btn');
    const nextBtn = document.getElementById('next-step-btn');
    const skipBtn = document.getElementById('skip-step-btn');

    function openLesson(lessonId) {
        let sec = SECTIONS.find(s => s.lessons.some(l => l.id === lessonId));
        activeLesson = sec.lessons.find(l => l.id === lessonId);
        activities = activeLesson.activities;
        activityIndex = 0;
        
        showScreen('lesson');
        document.getElementById('lesson-title').innerHTML = activeLesson.title;
        renderActivity();
    }

    function renderActivity() {
        const act = activities[activityIndex];
        
        const explainElem = document.getElementById('lesson-desc') || document.getElementById('lesson-explanation');
        if (explainElem) explainElem.innerHTML = act.explain;
        
        const challengeElem = document.getElementById('lesson-challenge');
        if (challengeElem) challengeElem.innerHTML = act.challenge;

        document.getElementById('activity-counter').textContent = `Activity ${activityIndex + 1}/${activities.length}`;
        document.getElementById('lesson-progress-inner').style.width = `${(activityIndex / activities.length) * 100}%`;

        hintBox.classList.remove('active');
        explainBox.classList.remove('active');
        
        const key = activeLesson.id + "_" + activityIndex;
        editor.value = currentUser.pastAnswers[key] || "";
        
        consoleOutElem.textContent = "Awaiting execution sequence...";
        
        runBtn.style.display = "block";
        nextBtn.style.display = "none";
        skipBtn.style.display = "block";
        const prevBtn = document.getElementById('prev-step-btn');
        if (prevBtn) prevBtn.style.display = (activityIndex > 0) ? "block" : "none";
    }

    document.getElementById('back-to-dash-btn').addEventListener('click', () => { playSound('blip'); enterDashboard(); });

    document.getElementById('hint-btn').addEventListener('click', () => {
        playSound('blip');
        let act = activities[activityIndex];
        let htm = `<strong>HINT:</strong> ${act.hint || "Try breaking the problem down."}`;
        if (act.example && act.example !== "None.") {
            htm += `<br><br><span style="color:var(--primary); font-size:0.9rem; font-weight:bold;">SYNTAX STRUCTURE:</span><pre style="background:#1e1e1e; padding:1rem; border-radius:8px; border:1px solid #333; color:#a6e22e; margin-top:0.5rem; overflow-x:auto;">${act.example}</pre>`;
        }
        hintBox.innerHTML = htm;
        hintBox.classList.add('active');
    });

    document.getElementById('explain-btn').addEventListener('click', () => {
        playSound('blip');
        let act = activities[activityIndex];
        let content = act.explainBetter || "Just combine the concepts.";
        
        if (!content.includes('<div')) {
            content = `
            <div style="background:var(--surface-alt); padding:1.5rem; border-radius:12px; border-left:4px solid var(--secondary);">
                <h3 style="color:var(--secondary); margin-top:0; margin-bottom:1rem; font-size:1.4rem;">Deep Dive Explanation</h3>
                <p style="line-height:1.7; font-size:1.1rem; color:var(--text-main);">${content}</p>
                
                <h4 style="color:var(--primary); margin-top:1.5rem; margin-bottom:0.5rem; font-size:1.1rem;">Real-World Example</h4>
                <p style="font-size:0.95rem; color:var(--text-muted); margin-bottom:0.5rem;">Here is how this exact concept is structured in professional environments:</p>
                <pre style="background:#1e1e1e; padding:1.2rem; border-radius:8px; border:1px solid #3e3e3e; color:#a6e22e; overflow-x:auto; font-family:var(--font-mono); font-size:1rem;">
# Applying ${act.example || "this logic"} in a live system:

${act.example !== "None." ? act.example : "# Combinatory Logic Execution..."}</pre>
                
                <p style="margin-top:1.5rem; font-size:0.95rem; color:#888; font-style:italic;">
                    * Pro Tip: Internalizing this foundational concept is absolutely mandatory for successfully engineering systems in your advanced track module later.
                </p>
            </div>
            `;
        }
        
        explainBox.innerHTML = content;
        explainBox.classList.add('active');
    });

    // Run Code
    runBtn.addEventListener('click', async () => {
        playSound('blip');
        currentUser.stats.runs += 1;

        if (currentUser.stats.runs === 1) showBadge("First Blood");
        if (currentUser.stats.runs === 10) showBadge("Console Hacker");

        const userCode = editor.value;
        const testCode = activities[activityIndex].test;
        consoleOutElem.textContent = ""; 
        const pyScript = `
import sys
import io
import traceback

if not hasattr(sys, '_original_stdout'):
    sys._original_stdout = sys.stdout

class Tee:
    def __init__(self):
        self._buf = io.StringIO()
    def write(self, data):
        self._buf.write(data)
        sys._original_stdout.write(data)
    def flush(self):
        self._buf.flush()
        sys._original_stdout.flush()
    def getvalue(self):
        return self._buf.getvalue()

sys.stdout = Tee()

__err = None
try:
    exec(compile(${JSON.stringify(userCode)}, '<string>', 'exec'), globals())
except Exception as e:
    __err = e

if __err:
    sys.stdout = sys._original_stdout
    raise __err

try:
    exec(compile(${JSON.stringify(testCode)}, '<test>', 'exec'), globals())
except Exception as e:
    sys.stdout = sys._original_stdout
    raise e

sys.stdout = sys._original_stdout
`;
        try {
            await pyodide.runPythonAsync(pyScript);
            // PASSED!
            playSound('success');
            if (typeof window.confetti !== 'undefined') {
                window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            }
            consoleOutElem.textContent += "\n\n=== SUCCESS ===\nCheck passed!";
            
            currentUser.pastAnswers[activeLesson.id + "_" + activityIndex] = userCode;

            const h = new Date().getHours();
            if (h < 9) showBadge("Early Bird");
            if (h > 21) showBadge("Night Owl");
            
            saveDatabase();
            
            runBtn.style.display = "none";
            skipBtn.style.display = "none";
            nextBtn.style.display = "block";

        } catch (err) {
            currentUser.stats.errors += 1;
            playSound('error');
            
            const editorEl = document.querySelector('.lesson-editor');
            if (editorEl) {
                editorEl.classList.remove('shake-error');
                void editorEl.offsetWidth; // trigger reflow
                editorEl.classList.add('shake-error');
            }
            
            let errMsg = err.toString();
            let errLines = errMsg.split('\n');
            let simpleErrLines = [];
            let capture = false;
            
            for(let l of errLines) {
                if (l.includes('File "<string>"')) {
                    capture = true;
                    simpleErrLines.push(l.replace('File "<string>"', 'Code'));
                } else if (l.includes('File "<exec>"') || l.includes('File "<test>"')) {
                    capture = false; 
                } else if (capture && (l.startsWith('    ') || l.includes('^'))) {
                    simpleErrLines.push(l);
                } else if (!l.startsWith(' ') && l.trim().length > 0 && !l.includes('Traceback') && !l.includes('PythonError') && l.includes(':')) {
                    if (l.startsWith('Exception: ')) l = l.substring(11);
                    simpleErrLines.push(l);
                }
            }
            let simpleErr = simpleErrLines.length > 0 ? simpleErrLines.join('\n') : errLines[errLines.length - 1];

            consoleOutElem.textContent += "\n\n=== VERIFICATION FAILED ===\n" + simpleErr.trim();
        }
    });

    skipBtn.addEventListener('click', () => {
        if (!confirm("Are you sure you want to skip this question? You won't get the programming practice from this step!")) return;
        playSound('error');
        
        currentUser.pastAnswers[activeLesson.id + "_" + activityIndex] = "# SKIPPED\n";
        
        runBtn.style.display = "none";
        skipBtn.style.display = "none";
        nextBtn.style.display = "block";
        
        // Emulate skipping completion message
        consoleOutElem.textContent += "\n\n=== QUESTION SKIPPED ===\nMoving to next step...";
        
        // Auto-click the next step after a very brief delay to let user see "Question Skipped"
        setTimeout(() => {
            nextBtn.click();
        }, 800);
    });

    document.getElementById('prev-step-btn').addEventListener('click', () => {
        playSound('blip');
        if (activityIndex > 0) {
            activityIndex--;
            renderActivity();
        }
    });

    nextBtn.addEventListener('click', () => {
        playSound('blip');
        if (activityIndex < activities.length - 1) {
            activityIndex++;
            renderActivity();
        } else {
            // Finished lesson
            document.getElementById('lesson-progress-inner').style.width = "100%";
            const isNewCompletion = !currentUser.completedLessons.includes(activeLesson.id);
            if (isNewCompletion) {
                currentUser.completedLessons.push(activeLesson.id);
                currentUser.xp += 10; currentUser.dailyXp += 10; currentUser.dailyMissions += 1;
                
                let nextListId = currentUser.currentLessonId + 1;
                let flatIds = [];
                SECTIONS.forEach(s => s.lessons.forEach(l => flatIds.push(l.id)));
                let currIdx = flatIds.indexOf(activeLesson.id);
                if(currIdx !== -1 && currIdx < flatIds.length - 1) {
                    nextListId = flatIds[currIdx + 1];
                }
                
                if (currIdx === flatIds.length - 1) {
                    sessionStorage.setItem('justFinishedTrack', 'true');
                }

                if (activeLesson.id === currentUser.currentLessonId) {
                    let isSectionJump = SECTIONS.some(s => s.lessons[0] && s.lessons[0].id === nextListId && activeLesson.id !== s.lessons[0].id);
                    if (isSectionJump) sessionStorage.setItem('justUnlockedSection', 'true');
                    
                    currentUser.currentLessonId = nextListId;
                }
                
                if (currentUser.dailyMissions === 2) setTimeout(() => showBadge("Dual Threat - Daily"), 1500);
                if (activeLesson.isQuiz) setTimeout(() => showBadge("Overview Champion"), 1000);
                
                sessionStorage.setItem('justCompleted', activeLesson.id);
                saveDatabase();
            }
            
            document.getElementById('feedback-title').textContent = "Lesson Complete!";
            document.getElementById('feedback-msg').textContent = "You nailed it! Returning to map...";
            document.getElementById('feedback-content').classList.add('success');
            document.getElementById('feedback-modal').classList.remove('hidden');
        }
    });

    document.getElementById('feedback-action-btn').addEventListener('click', () => {
        playSound('blip');
        document.getElementById('feedback-modal').classList.add('hidden');
        document.getElementById('feedback-content').classList.remove('success');
        enterDashboard();
    });

    function showBadge(name) {
        if (currentUser.badges.includes(name)) return;
        playSound('unlock');
        document.getElementById('badge-name').textContent = name;
        currentUser.badges.push(name);
        badgeToast.classList.remove('hidden');
        setTimeout(() => badgeToast.classList.add('show'), 50);
        setTimeout(() => { badgeToast.classList.remove('show'); setTimeout(() => badgeToast.classList.add('hidden'), 500); }, 4000);
        saveDatabase();
    }

    // --- Free AI Chatbot Logic ---
    function appendChat(msg, isAi) {
        const d = document.createElement('div');
        d.className = `chat-msg ${isAi ? 'ai-msg' : 'user-msg'}`;
        if (isAi) d.style.borderLeft = "3px solid #bb86fc";
        d.textContent = msg;
        document.getElementById('chat-history').appendChild(d);
        document.getElementById('chat-history').scrollTop = document.getElementById('chat-history').scrollHeight;
    }

    document.getElementById('ai-send-btn').addEventListener('click', processAiChat);
    document.getElementById('ai-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') processAiChat(); });

    async function processAiChat() {
        const i = document.getElementById('ai-input');
        const text = i.value.trim();
        if (!text) return;

        appendChat(text, false);
        i.value = "";
        playSound('blip');
        
        appendChat("Thinking...", true);
        const processingNode = document.getElementById('chat-history').lastChild;

        try {
            const systemPrompt = "You are an AI Helper for a Python learning platform. The user is stuck. Keep answers brief, under 3 sentences. Student asks: ";
            const response = await fetch("https://text.pollinations.ai/" + encodeURIComponent(systemPrompt + text));
            
            if (!response.ok) throw new Error("API Offline");
            const answer = await response.text();
            
            processingNode.textContent = answer;
            playSound('success');
            document.getElementById('chat-history').scrollTop = document.getElementById('chat-history').scrollHeight;
        } catch (err) {
            processingNode.textContent = "Error: Connection failed. Please check your internet connection and try again.";
            playSound('error');
        }
    }

});
