/* TP CRO review widget — notas por URL */
(function(){
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAIuMNwX-KzMn6Jb4ne0npBacXJfojNtyQ",
    authDomain: "page-review-widget.firebaseapp.com",
    databaseURL: "https://page-review-widget-default-rtdb.firebaseio.com",
    projectId: "page-review-widget",
    storageBucket: "page-review-widget.firebasestorage.app",
    messagingSenderId: "402123128341",
    appId: "1:402123128341:web:3013432dd254c040e6d81c"
  };

  const PANEL_W = 380;
  const LS_AUTHOR = 'cro-notes-author';
  const pageKey = (location.pathname.replace(/[\/.#$\[\]]/g, '_') || '_root');

  function loadScript(src){
    return new Promise((res, rej)=>{
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function injectStyles(){
    const css = `
      body { padding-right: ${PANEL_W}px !important; transition: padding-right .2s; }
      body.cnw-collapsed { padding-right: 0 !important; }
      #cnw-panel { position: fixed; top:0; right:0; width:${PANEL_W}px; height:100vh; background:#fff; border-left:1px solid #e5e7eb; box-shadow:-2px 0 12px rgba(0,0,0,.06); z-index:99998; display:flex; flex-direction:column; font-family: ui-sans-serif, -apple-system, system-ui, "Inter", sans-serif; color:#111; font-size:14px; transition: transform .2s; }
      body.cnw-collapsed #cnw-panel { transform: translateX(${PANEL_W}px); }
      #cnw-panel * { box-sizing: border-box; }
      .cnw-header { padding:12px 16px; border-bottom:1px solid #e5e7eb; background:#fafafa; display:flex; align-items:center; justify-content:space-between; gap:8px; }
      .cnw-title { font-weight:700; font-size:15px; margin:0; }
      .cnw-meta { font-size:11px; color:#666; margin-top:2px; }
      .cnw-toggle { background:none; border:none; cursor:pointer; font-size:18px; color:#666; padding:4px 8px; }
      .cnw-body { flex:1; overflow-y:auto; padding:12px 16px; }
      .cnw-empty { color:#999; font-style:italic; padding:20px 0; text-align:center; font-size:13px; }
      .cnw-note { background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:10px 12px; margin-bottom:10px; }
      .cnw-note.cnw-ok { border-left:3px solid #10b981; }
      .cnw-note.cnw-pendiente { border-left:3px solid #f59e0b; }
      .cnw-note-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-size:11px; color:#666; gap:8px; }
      .cnw-author { font-weight:600; color:#111; }
      .cnw-text { white-space:pre-wrap; font-size:13px; line-height:1.4; color:#111; word-wrap:break-word; }
      .cnw-actions { display:flex; gap:6px; margin-top:8px; flex-wrap:wrap; }
      .cnw-btn { background:#fff; border:1px solid #d1d5db; border-radius:6px; padding:3px 8px; font-size:11px; cursor:pointer; color:#374151; }
      .cnw-btn:hover { background:#f3f4f6; }
      .cnw-btn-danger { color:#dc2626; border-color:#fecaca; }
      .cnw-btn-status { font-weight:600; }
      .cnw-chip-ok { background:#d1fae5; color:#065f46; border-color:#a7f3d0; }
      .cnw-chip-pendiente { background:#fef3c7; color:#92400e; border-color:#fde68a; }
      .cnw-footer { padding:12px 16px; border-top:1px solid #e5e7eb; background:#fafafa; }
      .cnw-textarea { width:100%; border:1px solid #d1d5db; border-radius:6px; padding:8px; font-size:13px; resize:vertical; min-height:60px; font-family:inherit; }
      .cnw-submit { margin-top:8px; background:#f79802; color:#fff; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:600; font-size:13px; }
      .cnw-submit:hover { background:#e08a00; }
      .cnw-author-bar { display:flex; align-items:center; gap:8px; font-size:11px; color:#666; margin-bottom:8px; flex-wrap:wrap; }
      .cnw-author-link { color:#f79802; cursor:pointer; text-decoration:underline; background:none; border:none; padding:0; font-size:11px; }
      .cnw-overlay { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:99999; display:flex; align-items:center; justify-content:center; }
      .cnw-modal { background:#fff; padding:24px; border-radius:12px; width:90%; max-width:360px; box-shadow:0 20px 60px rgba(0,0,0,.3); font-family: ui-sans-serif, -apple-system, system-ui, "Inter", sans-serif; }
      .cnw-modal h3 { margin:0 0 12px; font-size:18px; }
      .cnw-modal p { margin:0 0 12px; color:#666; font-size:13px; }
      .cnw-input { width:100%; padding:10px; border:1px solid #d1d5db; border-radius:6px; font-size:14px; box-sizing:border-box; font-family:inherit; }
      .cnw-edit-textarea { width:100%; border:1px solid #d1d5db; border-radius:6px; padding:6px; font-size:13px; font-family:inherit; min-height:60px; }
      .cnw-tab { position:fixed; right:0; top:50%; transform:translateY(-50%); background:#f79802; color:#fff; padding:14px 8px; border-radius:8px 0 0 8px; cursor:pointer; writing-mode:vertical-rl; font-weight:600; z-index:99999; display:none; font-family: ui-sans-serif, -apple-system, system-ui, sans-serif; font-size:12px; letter-spacing:.5px; box-shadow:-2px 0 8px rgba(0,0,0,.15); }
      .cnw-tab:hover { background:#e08a00; }
      body.cnw-collapsed .cnw-tab { display:block; }
      .cnw-refresh { background:none; border:none; cursor:pointer; font-size:16px; color:#666; padding:4px 8px; transition:transform .3s; }
      .cnw-refresh:hover { color:#f79802; }
      .cnw-refresh.spinning { animation:cnw-spin .6s linear; }
      @keyframes cnw-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      .cnw-toast-container { position:fixed; top:20px; right:20px; z-index:100000; display:flex; flex-direction:column; gap:8px; pointer-events:none; max-width:340px; }
      .cnw-toast { background:#fff; color:#111; border-left:4px solid #10b981; border-radius:8px; padding:12px 16px; box-shadow:0 12px 32px rgba(0,0,0,.18); font-family: ui-sans-serif, -apple-system, system-ui, sans-serif; font-size:13px; line-height:1.4; opacity:0; transform:translateX(20px); transition:opacity .25s, transform .25s; pointer-events:auto; }
      .cnw-toast.cnw-toast-show { opacity:1; transform:translateX(0); }
      .cnw-toast-title { font-weight:700; margin-bottom:2px; color:#065f46; font-size:12px; letter-spacing:.02em; }
      .cnw-toast-body { color:#374151; }
    `;
    const style = document.createElement('style');
    style.id = 'cnw-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function escapeHtml(s){
    return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function fmtDate(ts){
    if(!ts) return '';
    const d = new Date(ts);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    return isToday
      ? d.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'})
      : d.toLocaleDateString('es-CL', {day:'2-digit', month:'2-digit'}) + ' ' + d.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'});
  }

  function getAuthor(){ return localStorage.getItem(LS_AUTHOR) || ''; }
  function setAuthor(name){ localStorage.setItem(LS_AUTHOR, name); }

  function promptName(prefill){
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.className = 'cnw-overlay';
      overlay.innerHTML = `
        <div class="cnw-modal">
          <h3>¿Cómo te llamás?</h3>
          <p>Se guarda en tu navegador y aparece en cada nota. Solo lo necesitamos una vez.</p>
          <input class="cnw-input" id="cnw-name-input" placeholder="Ej: Maxi" value="${escapeHtml(prefill||'')}" />
          <div style="display:flex; gap:8px; margin-top:14px; justify-content:flex-end;">
            <button class="cnw-btn" id="cnw-name-cancel">Cancelar</button>
            <button class="cnw-submit" id="cnw-name-ok" style="margin-top:0;">Guardar</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      const input = overlay.querySelector('#cnw-name-input');
      setTimeout(()=>{ input.focus(); input.select(); }, 50);
      const finish = (v) => { overlay.remove(); resolve(v); };
      overlay.querySelector('#cnw-name-ok').onclick = () => {
        const v = input.value.trim();
        if (v) { setAuthor(v); finish(v); }
      };
      overlay.querySelector('#cnw-name-cancel').onclick = () => finish(null);
      input.onkeydown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); const v = input.value.trim(); if(v){ setAuthor(v); finish(v); } }
        if (e.key === 'Escape') finish(null);
      };
    });
  }

  async function ensureAuthor(){
    let a = getAuthor();
    if (!a) a = await promptName();
    return a;
  }

  function renderPanel(){
    const panel = document.createElement('div');
    panel.id = 'cnw-panel';
    panel.innerHTML = `
      <div class="cnw-header">
        <div style="min-width:0;">
          <h3 class="cnw-title">Notas de revisión</h3>
          <div class="cnw-meta" id="cnw-meta">cargando…</div>
        </div>
        <div style="display:flex; gap:4px;">
          <button class="cnw-refresh" id="cnw-refresh" title="Refrescar notas">↻</button>
          <button class="cnw-toggle" id="cnw-toggle" title="Colapsar">→</button>
        </div>
      </div>
      <div class="cnw-toast-container" id="cnw-toasts"></div>
      <div class="cnw-body" id="cnw-body">
        <div class="cnw-empty">Cargando notas…</div>
      </div>
      <div class="cnw-footer">
        <div class="cnw-author-bar" id="cnw-author-bar"></div>
        <textarea class="cnw-textarea" id="cnw-text" placeholder="Escribir nota sobre esta página…"></textarea>
        <button class="cnw-submit" id="cnw-submit">Agregar nota</button>
      </div>`;
    document.body.appendChild(panel);

    const tab = document.createElement('div');
    tab.className = 'cnw-tab';
    tab.textContent = 'Notas';
    tab.onclick = () => document.body.classList.remove('cnw-collapsed');
    document.body.appendChild(tab);

    document.getElementById('cnw-toggle').onclick = () => {
      document.body.classList.toggle('cnw-collapsed');
    };

    updateAuthorBar();
  }

  function updateAuthorBar(){
    const a = getAuthor();
    const el = document.getElementById('cnw-author-bar');
    if (a){
      el.innerHTML = `Comentás como <strong>${escapeHtml(a)}</strong> · <button class="cnw-author-link" id="cnw-change-name">cambiar nombre</button>`;
      el.querySelector('#cnw-change-name').onclick = async () => {
        const n = await promptName(a);
        if (n) updateAuthorBar();
      };
    } else {
      el.innerHTML = `<em>Sin nombre — te lo pediré al comentar</em>`;
    }
  }

  let currentNotes = {};
  let prevNotes = null;
  let currentRef = null;

  function showToast(title, body){
    const container = document.getElementById('cnw-toasts');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'cnw-toast';
    toast.innerHTML = `<div class="cnw-toast-title">${escapeHtml(title)}</div><div class="cnw-toast-body">${escapeHtml(body)}</div>`;
    container.appendChild(toast);
    setTimeout(()=>toast.classList.add('cnw-toast-show'), 10);
    setTimeout(()=>{
      toast.classList.remove('cnw-toast-show');
      setTimeout(()=>toast.remove(), 300);
    }, 4000);
  }

  function detectChanges(newNotes){
    if (prevNotes === null) return; // skip first load
    let resolvedCount = 0;
    let editedCount = 0;
    let resolvedSample = '';
    for (const [id, n] of Object.entries(newNotes)){
      const prev = prevNotes[id];
      if (!prev) continue;
      if (prev.status === 'pendiente' && n.status === 'ok'){
        resolvedCount++;
        if (!resolvedSample) resolvedSample = (n.text||'').slice(0, 80);
      } else if (prev.text !== n.text && prev.status === n.status){
        editedCount++;
      }
    }
    if (resolvedCount > 0){
      const title = resolvedCount === 1 ? '✓ Nota resuelta' : `✓ ${resolvedCount} notas resueltas`;
      const body = resolvedCount === 1 ? resolvedSample + (resolvedSample.length === 80 ? '…' : '') : 'Cambios aplicados en esta página';
      showToast(title, body);
    } else if (editedCount > 0){
      showToast('Notas actualizadas', `${editedCount} nota${editedCount===1?'':'s'} modificada${editedCount===1?'':'s'}`);
    }
  }

  function renderNotes(ref, notes){
    detectChanges(notes || {});
    prevNotes = notes || {};
    currentNotes = notes || {};
    const body = document.getElementById('cnw-body');
    const meta = document.getElementById('cnw-meta');
    const entries = Object.entries(currentNotes).sort((a,b) => (b[1].createdAt||0) - (a[1].createdAt||0));
    meta.textContent = `${entries.length} nota${entries.length===1?'':'s'} · ${location.pathname.split('/').pop() || '/'}`;
    if (entries.length === 0){
      body.innerHTML = '<div class="cnw-empty">Sin notas todavía.</div>';
      return;
    }
    body.innerHTML = entries.map(([id, n]) => `
      <div class="cnw-note cnw-${n.status||'pendiente'}" data-id="${id}">
        <div class="cnw-note-head">
          <span><span class="cnw-author">${escapeHtml(n.author||'anon')}</span> · ${fmtDate(n.createdAt)}</span>
          <span>${n.updatedAt && Math.abs(n.updatedAt - (n.createdAt||0)) > 1000 ? '<em>editada</em>' : ''}</span>
        </div>
        <div class="cnw-text" data-text>${escapeHtml(n.text||'')}</div>
        <div class="cnw-actions">
          <button class="cnw-btn cnw-btn-status ${n.status==='ok'?'cnw-chip-ok':'cnw-chip-pendiente'}" data-act="status">${n.status==='ok' ? '✓ OK' : '⏳ Pendiente'}</button>
          <button class="cnw-btn" data-act="edit">✏️ Editar</button>
          <button class="cnw-btn cnw-btn-danger" data-act="delete">🗑️</button>
        </div>
      </div>
    `).join('');

    body.querySelectorAll('.cnw-note').forEach(noteEl => {
      const id = noteEl.dataset.id;
      const n = currentNotes[id];
      noteEl.querySelector('[data-act="status"]').onclick = () => {
        ref.child(id).update({ status: n.status==='ok' ? 'pendiente' : 'ok', updatedAt: Date.now() });
      };
      noteEl.querySelector('[data-act="edit"]').onclick = () => startEdit(noteEl, ref, id, n);
      noteEl.querySelector('[data-act="delete"]').onclick = () => {
        if (confirm('¿Borrar esta nota?')) ref.child(id).remove();
      };
    });
  }

  function startEdit(noteEl, ref, id, n){
    const textEl = noteEl.querySelector('[data-text]');
    const actionsEl = noteEl.querySelector('.cnw-actions');
    const original = n.text || '';
    textEl.innerHTML = `<textarea class="cnw-edit-textarea" rows="3"></textarea>`;
    const ta = textEl.querySelector('textarea');
    ta.value = original;
    setTimeout(()=>ta.focus(), 50);
    actionsEl.innerHTML = `
      <button class="cnw-submit" data-act="save" style="margin-top:0; padding:4px 10px; font-size:11px;">Guardar</button>
      <button class="cnw-btn" data-act="cancel">Cancelar</button>
    `;
    actionsEl.querySelector('[data-act="save"]').onclick = () => {
      const v = ta.value.trim();
      if (v && v !== original) ref.child(id).update({ text: v, updatedAt: Date.now() });
      else renderNotes(ref, currentNotes);
    };
    actionsEl.querySelector('[data-act="cancel"]').onclick = () => renderNotes(ref, currentNotes);
  }

  async function submit(ref){
    const ta = document.getElementById('cnw-text');
    const text = ta.value.trim();
    if (!text) return;
    const author = await ensureAuthor();
    if (!author) return;
    updateAuthorBar();
    const now = Date.now();
    await ref.push({
      text, author, status:'pendiente', createdAt: now, updatedAt: now, url: location.href
    });
    ta.value = '';
  }

  async function init(){
    await loadScript('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
    await loadScript('https://www.gstatic.com/firebasejs/10.7.0/firebase-database-compat.js');
    firebase.initializeApp(FIREBASE_CONFIG);
    injectStyles();
    renderPanel();
    const ref = firebase.database().ref('notes/' + pageKey);
    currentRef = ref;
    ref.on('value', snap => renderNotes(ref, snap.val()));
    document.getElementById('cnw-submit').onclick = () => submit(ref);
    document.getElementById('cnw-text').addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); submit(ref); }
    });
    document.getElementById('cnw-refresh').onclick = (e) => {
      const btn = e.currentTarget;
      btn.classList.add('spinning');
      prevNotes = null; // skip toast on manual refresh
      ref.once('value').then(snap => {
        renderNotes(ref, snap.val());
        setTimeout(()=>btn.classList.remove('spinning'), 600);
      });
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
