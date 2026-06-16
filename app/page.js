'use client';
import { useEffect, useRef } from 'react';

const BODY_HTML = `
<div class="scan-lines"></div>
<div class="scanbar"></div>
<div class="corner tl"></div><div class="corner tr"></div>
<div class="corner bl"></div><div class="corner br"></div>
<div class="mob-overlay" id="mobOverlay"></div>

<!-- ════ AUTH ════ -->
<div id="authScreen">
  <div class="auth-card">
    <div class="auth-logo">
      <div class="auth-orb">
        <div class="auth-orb-r1"></div>
        <div class="auth-orb-r2"></div>
        <span class="auth-orb-ai">A.I</span>
      </div>
      <div class="auth-title">JARVIS</div>
      <div class="auth-sub">GEORGIAN AI PLATFORM · 17.07.2026</div>
    </div>
    <div class="auth-tabs">
      <div class="auth-tab active" id="tab-login" data-switch="login">შესვლა</div>
      <div class="auth-tab" id="tab-reg" data-switch="register">რეგისტრაცია</div>
    </div>
    <!-- LOGIN -->
    <div id="loginForm">
      <div class="auth-field"><label class="auth-label">ელ-ფოსტა</label><input class="auth-input" type="email" id="loginEmail" placeholder="user@example.com"></div>
      <div class="auth-field"><label class="auth-label">პაროლი</label><input class="auth-input" type="password" id="loginPass" placeholder="••••••••"></div>
      <button class="auth-btn" id="loginBtn">შესვლა →</button>
      <div class="auth-divider">ან</div>
      <button class="auth-google" id="googleBtn">
        <svg width="17" height="17" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.5 13.3l7.9 6.1C12.4 13.1 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 6.5-9.3 6.5-16.2z"/><path fill="#FBBC05" d="M10.4 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.9-4.6l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7-5.4c-2 1.4-4.6 2.2-8.2 2.2-6.3 0-11.6-3.7-13.6-9.1l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>
        Google-ით შესვლა
      </button>
      <div class="auth-footer">ანგარიში არ გაქვს? <a data-switch="register">დარეგისტრირდი</a></div>
    </div>
    <!-- REGISTER -->
    <div id="registerForm" style="display:none">
      <div class="auth-field"><label class="auth-label">სახელი</label><input class="auth-input" type="text" placeholder="შენი სახელი"></div>
      <div class="auth-field"><label class="auth-label">ელ-ფოსტა</label><input class="auth-input" type="email" placeholder="user@example.com"></div>
      <div class="auth-field"><label class="auth-label">პაროლი</label><input class="auth-input" type="password" placeholder="მინ. 8 სიმბოლო"></div>
      <button class="auth-btn" id="regBtn">რეგისტრაცია →</button>
      <div class="auth-divider">ან</div>
      <button class="auth-google" id="googleRegBtn">
        <svg width="17" height="17" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.5 13.3l7.9 6.1C12.4 13.1 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 6.5-9.3 6.5-16.2z"/><path fill="#FBBC05" d="M10.4 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.9-4.6l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7-5.4c-2 1.4-4.6 2.2-8.2 2.2-6.3 0-11.6-3.7-13.6-9.1l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>
        Google-ით რეგისტრაცია
      </button>
      <div class="auth-footer">უკვე გაქვს? <a data-switch="login">შესვლა</a></div>
    </div>
  </div>
</div>

<!-- ════ APP ════ -->
<div id="appScreen">
  <!-- HEADER -->
  <div class="header">
    <div class="logo-wrap">
      <button class="mob-menu-btn" id="mobMenuBtn">☰</button>
      <div class="h-orb"><div class="h-orb-r"></div><span class="h-orb-ai">A.I</span></div>
      <div class="logo-txt">JARVIS</div>
    </div>
    <div class="h-right">
      <div class="h-stat"><span class="h-dot"></span>ონლაინ</div>
      <div class="h-stat">CPU: <span id="cpu">8%</span></div>
      <div class="h-stat">RAM: <span id="ram">2.1GB</span></div>
      <div class="clock" id="clock">00:00:00</div>
      <button class="h-btn" id="logoutBtn">⏻ გასვლა</button>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">

    <!-- SIDEBAR -->
    <div class="sidebar" id="sidebar">
      <div class="sb-hdr">
        <div class="sb-orb"><div class="sb-orb-r"></div><span class="sb-orb-ai">A.I</span></div>
        <div class="sb-brand">JARVIS</div>
      </div>
      <button class="sb-new" id="sbNewBtn">✦ ახალი ჩატი</button>
      <div class="sb-sec">ჩატები</div>
      <div class="sb-item active" id="si-new"><span class="sb-icon">💬</span>ახალი ჩატი</div>
      <div class="sb-item" id="si-prev"><span class="sb-icon">🕐</span>წინა ჩატი</div>
      <div class="sb-sec">პროექტები</div>
      <div class="sb-item" id="si-proj"><span class="sb-icon">◈</span>ჩემი პროექტი</div>
      <div class="sb-foot">
        <div class="sb-user">
          <div class="sb-av">მ</div>
          <div><div class="sb-uname">მომხმარებელი</div><div class="sb-uplan">Jarvis Pro · 25₾/თვე</div></div>
        </div>
      </div>
    </div>

    <!-- MAIN -->
    <div class="main">

      <!-- LEFT -->
      <div class="left-panel">
        <div class="panel-box">
          <div class="p-title">სისტემა</div>
          <div class="p-row"><span class="p-lbl">სტატუსი</span><span class="p-val">აქტიური</span></div>
          <div class="p-row"><span class="p-lbl">მოდელი</span><span class="p-val">JARVIS Pro</span></div>
          <div class="p-row"><span class="p-lbl">კონტექსტი</span><span class="p-val">200K</span></div>
          <div class="p-row"><span class="p-lbl">სიზუსტე</span><span class="p-val">98.7%</span></div>
          <div class="mini-bar"><div class="mini-fill"></div></div>
        </div>
        <div class="panel-box">
          <div class="p-title">შესაძლებლობები</div>
          <div class="p-row"><span class="p-lbl">კოდის წერა</span><span class="p-val">✓</span></div>
          <div class="p-row"><span class="p-lbl">ვებ დიზაინი</span><span class="p-val">✓</span></div>
          <div class="p-row"><span class="p-lbl">ბიზნეს გეგმა</span><span class="p-val">✓</span></div>
          <div class="p-row"><span class="p-lbl">ანალიზი</span><span class="p-val">✓</span></div>
        </div>
        <div class="panel-box">
          <div class="p-title">სტატისტიკა</div>
          <div class="p-row"><span class="p-lbl">შეკითხვები</span><span class="p-val" id="qcount">0</span></div>
          <div class="p-row"><span class="p-lbl">პასუხები</span><span class="p-val" id="rcount">1</span></div>
          <div class="p-row"><span class="p-lbl">ღირებულება</span><span class="p-val">25₾/თვე</span></div>
        </div>
      </div>

      <!-- CHAT -->
      <div class="chat-wrap">
        <div class="chat-top">
          <div class="c-orb"><div class="c-orb-r1"></div><div class="c-orb-r2"></div><span class="c-orb-ai">A.I</span></div>
          <div><div class="c-title">JARVIS</div><div class="c-sub">Just A Rather Very Intelligent System</div></div>
        </div>
        <div class="chat-msgs" id="chatMsgs"></div>
        <div class="chat-input-row">
          <input class="chat-input" id="chatInput" placeholder="JARVIS-ს დაუწერე...">
          <button class="send-btn" id="sendBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000"><path d="M2 21L23 12 2 3v7l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right-panel">
        <div class="neural-box"><canvas id="neuralCanvas"></canvas></div>
        <div class="quick-box">
          <button class="qbtn" data-qa="კოდი დამიწერე">💻 კოდის წერა</button>
          <button class="qbtn" data-qa="ვებ დიზაინი გამიკეთე">🎨 ვებ დიზაინი</button>
          <button class="qbtn" data-qa="ბიზნეს გეგმა">💼 ბიზნეს გეგმა</button>
          <button class="qbtn" data-qa="პრეზენტაცია გამიკეთე">📊 პრეზენტაცია</button>
          <button class="qbtn" data-qa="ტექსტი გადამთარგმნე">🌐 თარგმანი</button>
        </div>
      </div>

    </div><!-- /main -->
  </div><!-- /body -->
</div><!-- /appScreen -->
`;

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const $ = (id) => root.querySelector('#' + id);
    const $$ = (sel) => root.querySelectorAll(sel);

    let prevMsgs = [];
    let qc = 0, rc = 1, busy = false;

    function now() {
      return new Date().toLocaleTimeString('ka-GE', { hour12: false });
    }

    function addMsg(text, who) {
      const m = $('chatMsgs');
      if (!m) return;
      const d = document.createElement('div');
      d.className = 'msg ' + who;
      d.innerHTML = '<div>' + text.replace(/\n/g, '<br>') + '</div><div class="msg-time">' + now() + '</div>';
      m.appendChild(d);
      m.scrollTop = m.scrollHeight;
    }

    function enterApp() {
      $('authScreen').style.display = 'none';
      $('appScreen').style.display = 'flex';
      initNeural();
      setTimeout(() => addMsg('გამარჯობა! მე JARVIS ვარ — ყველაზე ძლიერი ქართული AI ასისტენტი. რით შემიძლია დაგეხმარო? 🚀', 'ai'), 500);
    }

    function switchTab(t) {
      $('tab-login').classList.toggle('active', t === 'login');
      $('tab-reg').classList.toggle('active', t === 'register');
      $('loginForm').style.display = t === 'login' ? '' : 'none';
      $('registerForm').style.display = t === 'register' ? '' : 'none';
    }

    function openSidebar() {
      $('sidebar').classList.add('open');
      $('mobOverlay').classList.add('show');
    }
    function closeSidebar() {
      $('sidebar').classList.remove('open');
      $('mobOverlay').classList.remove('show');
    }

    function setActive(id) {
      ['si-new', 'si-prev', 'si-proj'].forEach((i) => $(i).classList.remove('active'));
      $(id).classList.add('active');
      closeSidebar();
    }

    function newChat() {
      setActive('si-new');
      $('chatMsgs').innerHTML = '';
      qc = 0; rc = 1;
      $('qcount').textContent = '0';
      $('rcount').textContent = '1';
      prevMsgs = [];
      setTimeout(() => addMsg('გამარჯობა! მე JARVIS ვარ — ყველაზე ძლიერი ქართული AI ასისტენტი. რით შემიძლია დაგეხმარო? 🚀', 'ai'), 300);
    }
    function prevChat() {
      setActive('si-prev');
      $('chatMsgs').innerHTML = '';
      if (prevMsgs.length === 0) {
        addMsg('წინა ჩატი ცარიელია. დაიწყე ახალი საუბარი! 💬', 'ai');
      } else {
        prevMsgs.forEach((m) => addMsg(m.t, m.w));
      }
    }
    function myProject() {
      setActive('si-proj');
      $('chatMsgs').innerHTML = '';
      addMsg('📁 ჩემი პროექტი — JARVIS AI პლატფორმა\n\n✅ ფაზა 01: ინფრასტრუქტურა — დასრულებული\n⟳ ფაზა 02: Chat & Dashboard — მიმდინარე\n○ ფაზა 03: ავტომატიზაცია — დასაწყები\n○ ფაზა 04: მობილური & UX — დასაწყები\n\nგამოსვლის თარიღი: 17.07.2026 🚀', 'ai');
    }

    async function send() {
      const inp = $('chatInput');
      const txt = inp.value.trim();
      if (!txt || busy) return;
      inp.value = '';
      addMsg(txt, 'user');
      prevMsgs.push({ t: txt, w: 'user' });
      qc++; $('qcount').textContent = qc;
      busy = true;

      const m = $('chatMsgs');
      const ty = document.createElement('div');
      ty.className = 'typing';
      ty.id = 'typing';
      ty.innerHTML = '<span></span><span></span><span></span>';
      m.appendChild(ty);
      m.scrollTop = m.scrollHeight;

      try {
        const history = prevMsgs.slice(0, -1).map((p) => ({
          role: p.w === 'user' ? 'user' : 'assistant',
          content: p.t,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: txt, history }),
        });
        const data = await res.json();
        const t = $('typing');
        if (t) t.remove();

        const reply = data.reply || data.error || 'შეცდომა მოხდა პასუხის მიღებისას.';
        addMsg(reply, 'ai');
        prevMsgs.push({ t: reply, w: 'ai' });
        rc++; $('rcount').textContent = rc;
      } catch (e) {
        const t = $('typing');
        if (t) t.remove();
        addMsg('⚠️ კავშირის შეცდომა. გადახედე ინტერნეტს ან API გასაღებს.', 'ai');
      } finally {
        busy = false;
      }
    }

    function qa(text) {
      $('chatInput').value = text;
      send();
    }

    function tick() {
      const c = $('clock');
      if (c) c.textContent = new Date().toLocaleTimeString('ka-GE', { hour12: false });
    }
    const clockInterval = setInterval(tick, 1000);
    tick();
    const sysInterval = setInterval(() => {
      const cpu = $('cpu'), ram = $('ram');
      if (cpu) cpu.textContent = Math.floor(Math.random() * 25 + 4) + '%';
      if (ram) ram.textContent = (Math.random() * 2 + 1.4).toFixed(1) + 'GB';
    }, 3500);

    function initNeural() {
      const canvas = $('neuralCanvas');
      if (!canvas) return;
      const par = canvas.parentElement;
      canvas.width = par.clientWidth;
      canvas.height = par.clientHeight;
      const ctx = canvas.getContext('2d');
      const nodes = Array.from({ length: 35 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
      }));
      let raf;
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 90) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(0,255,255,${(1 - d / 90) * 0.22})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        nodes.forEach((n) => {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,220,255,.7)'; ctx.fill();
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,200,255,.07)'; ctx.fill();
        });
        raf = requestAnimationFrame(draw);
      }
      draw();
      const onResize = () => { canvas.width = par.clientWidth; canvas.height = par.clientHeight; };
      window.addEventListener('resize', onResize);
      return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
    }

    const loginBtn = $('loginBtn'), googleBtn = $('googleBtn'), regBtn = $('regBtn'), googleRegBtn = $('googleRegBtn');
    const logoutBtn = $('logoutBtn'), mobMenuBtn = $('mobMenuBtn'), mobOverlay = $('mobOverlay');
    const sendBtn = $('sendBtn'), chatInput = $('chatInput'), sbNewBtn = $('sbNewBtn');
    const siNew = $('si-new'), siPrev = $('si-prev'), siProj = $('si-proj');
    const tabLogin = $('tab-login'), tabReg = $('tab-reg');
    const loginEmail = $('loginEmail'), loginPass = $('loginPass');

    loginBtn?.addEventListener('click', enterApp);
    googleBtn?.addEventListener('click', enterApp);
    regBtn?.addEventListener('click', enterApp);
    googleRegBtn?.addEventListener('click', enterApp);
    logoutBtn?.addEventListener('click', () => {
      $('authScreen').style.display = 'flex';
      $('appScreen').style.display = 'none';
    });

    const enterKeyHandler = (e) => { if (e.key === 'Enter') enterApp(); };
    loginEmail?.addEventListener('keydown', enterKeyHandler);
    loginPass?.addEventListener('keydown', enterKeyHandler);

    tabLogin?.addEventListener('click', () => switchTab('login'));
    tabReg?.addEventListener('click', () => switchTab('register'));
    $$('[data-switch]').forEach((el) => {
      el.addEventListener('click', () => switchTab(el.getAttribute('data-switch')));
    });

    mobMenuBtn?.addEventListener('click', openSidebar);
    mobOverlay?.addEventListener('click', closeSidebar);

    sbNewBtn?.addEventListener('click', newChat);
    siNew?.addEventListener('click', newChat);
    siPrev?.addEventListener('click', prevChat);
    siProj?.addEventListener('click', myProject);

    sendBtn?.addEventListener('click', send);
    chatInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });

    $$('[data-qa]').forEach((el) => {
      el.addEventListener('click', () => qa(el.getAttribute('data-qa')));
    });

    return () => {
      clearInterval(clockInterval);
      clearInterval(sysInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
    />
  );
}
