// script.js
// Tornar botões funcionais (simulação simples, usando localStorage)
// Comentários em português.

// --- Utilitários ---
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

// --- Estado ---
let matches = load('futnaticos_matches', []);
let currentMatchId = null;
let user = load('futnaticos_user', null);

// --- Navegação simples entre "telas" ---
function showScreen(selector) {
  qsa('.screen').forEach(s => s.classList.remove('show'));
  const target = qs(selector);
  if (target) target.classList.add('show');

  // Atualiza links ativos
  qsa('.nav-link').forEach(l => {
    const href = l.getAttribute('href');
    if (href === selector) l.classList.add('active');
    else l.classList.remove('active');
  });
}
qsa('[data-nav]').forEach(el => {
  el.addEventListener('click', (e) => {
    const nav = el.dataset.nav || el.getAttribute('href');
    if (!nav) return;
    e.preventDefault();
    showScreen(nav);
  });
});
qsa('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      showScreen(href);
    }
  });
});

// --- Render de partidas ---
function renderMatches(list = matches) {
  const listEl = qs('#matchesList');
  listEl.innerHTML = '';
  if (!list || list.length === 0) {
    qs('#emptyState').style.display = 'block';
    return;
  }
  qs('#emptyState').style.display = 'none';

  list.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card match-card';
    card.innerHTML = `
      <div class="card-body">
        <h4 class="card-title">${escapeHtml(m.title)}</h4>
        <div class="card-meta">${escapeHtml(m.local)} • ${m.date} ${m.time}</div>
        <div class="card-badges">
          <span class="badge">${escapeHtml(m.field)}</span>
          <span class="badge">${escapeHtml(m.level)}</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-small btn-outline open-match" data-id="${m.id}">Ver</button>
          <button class="btn btn-small btn-accent join-match" data-id="${m.id}">Confirmar</button>
        </div>
      </div>
    `;
    listEl.appendChild(card);
  });

  // ações dos botões
  qsa('.open-match').forEach(btn => {
    btn.addEventListener('click', () => openMatch(btn.dataset.id));
  });
  qsa('.join-match').forEach(btn => {
    btn.addEventListener('click', () => {
      joinMatch(btn.dataset.id);
    });
  });
}

function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

// --- Abrir partida e preencher detalhes ---
function openMatch(id) {
  const m = matches.find(x => x.id === id);
  if (!m) return alert('Partida não encontrada');
  currentMatchId = id;

  qs('#partidaTitulo').textContent = m.title;
  qs('#partidaLocal').textContent = m.local || '';
  qs('#partidaDataHora').textContent = `${m.date} ${m.time}`;
  qs('#partidaCampo').textContent = m.field;
  qs('#partidaNivel').textContent = m.level;
  qs('#partidaValor').textContent = m.value ? `R$ ${m.value}` : 'Grátis';
  qs('#partidaGenero').textContent = m.gender;

  // lista de jogadores confirmados
  renderPlayers(m);

  // detalhes
  const det = qs('#partidaDetalhes');
  det.innerHTML = '';
  const items = [
    ['Vagas', m.slots],
    ['Observações', m.notes || '-'],
    ['Criador', m.creatorName || 'Desconhecido']
  ];
  items.forEach(([k,v]) => {
    const li = document.createElement('li');
    li.textContent = `${k}: ${v}`;
    det.appendChild(li);
  });

  // mapa mock
  const pin = qs('#mapPartidaPin');
  if (m.lat && m.lng) {
    pin.style.display = 'block';
    // posicao aleatoria dentro do elemento (mock)
    const mapEl = qs('#mapPartida .map') || qs('#mapPartida');
    const rect = mapEl.getBoundingClientRect();
    // converter lat/lng para posicao mock
    const left = (parseFloat(m.lng) % 1) * rect.width;
    const top = (1 - (parseFloat(m.lat) % 1)) * rect.height;
    pin.style.left = `${Math.max(16, Math.min(rect.width-16, left))}px`;
    pin.style.top = `${Math.max(16, Math.min(rect.height-16, top))}px`;
  } else {
    pin.style.display = 'none';
  }

  showScreen('#partida');
}

// render jogadores
function renderPlayers(match) {
  const el = qs('#listaJogadores');
  el.innerHTML = '';
  const players = match.players || [];
  if (players.length === 0) {
    el.textContent = 'Nenhum jogador confirmado ainda.';
    return;
  }
  players.forEach(p => {
    const a = document.createElement('div');
    a.className = 'avatar small';
    a.textContent = p.name[0] || 'U';
    a.title = p.name;
    el.appendChild(a);
  });
}

// --- Confirmar presença (no detalhe) ---
function joinMatch(id) {
  if (!user) {
    alert('Você precisa entrar para confirmar presença.');
    showScreen('#login');
    return;
  }
  const m = matches.find(x => x.id === id);
  if (!m) return;
  m.players = m.players || [];
  if (m.players.find(p => p.id === user.id)) {
    alert('Você já confirmou presença.');
    if (currentMatchId === id) renderPlayers(m);
    return;
  }
  m.players.push({ id: user.id, name: user.name });
  saveMatches();
  if (currentMatchId === id) renderPlayers(m);
  renderMatches();
  alert('Presença confirmada!');
}

// botão confirmar presença na tela de partida
qs('#btnConfirmar').addEventListener('click', () => {
  if (!currentMatchId) return;
  joinMatch(currentMatchId);
});

// --- Chat (simulado com localStorage por partida) ---
function loadChat(id) {
  return load(`chat_${id}`, []);
}
function saveChat(id, arr) {
  save(`chat_${id}`, arr);
}
qs('#btnAbrirChat').addEventListener('click', () => {
  if (!currentMatchId) return;
  openChat(currentMatchId);
});
function openChat(id) {
  const modal = qs('#chatModal');
  const msgsEl = qs('#chatMensagens');
  msgsEl.innerHTML = '';
  const msgs = loadChat(id);
  msgs.forEach(m => {
    const p = document.createElement('div');
    p.className = 'chat-msg';
    p.innerHTML = `<strong>${escapeHtml(m.from)}</strong>: ${escapeHtml(m.text)}`;
    msgsEl.appendChild(p);
  });
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  msgsEl.scrollTop = msgsEl.scrollHeight;
}
qs('#chatClose').addEventListener('click', () => {
  qs('#chatModal').style.display = 'none';
});
qs('#chatForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentMatchId) return;
  const text = qs('#chatTexto').value.trim();
  if (!text) return;
  const from = user ? user.name : 'Visitante';
  const msgs = loadChat(currentMatchId);
  msgs.push({ from, text, at: new Date().toISOString() });
  saveChat(currentMatchId, msgs);
  qs('#chatTexto').value = '';
  openChat(currentMatchId);
});

// --- Criar Partida ---
qs('#criarForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = qs('#jogoNome').value.trim();
  const field = qs('#jogoCampo').value;
  const date = qs('#jogoData').value;
  const time = qs('#jogoHora').value;
  const slots = qs('#jogoVagas').value;
  const value = qs('#jogoValor').value;
  const gender = qs('#jogoGenero').value;
  const level = qs('#jogoNivel').value;
  const local = qs('#jogoLocal').value;
  const lat = qs('#jogoLat').value;
  const lng = qs('#jogoLng').value;
  const notes = qs('#jogoObs').value;
  if (!title || !field || !date || !time || !slots || !local) {
    alert('Preencha os campos obrigatórios.');
    return;
  }
  const m = {
    id: uid(),
    title,
    field,
    date,
    time,
    slots,
    value: value ? Number(value) : 0,
    gender,
    level,
    local,
    lat, lng,
    notes,
    players: [],
    creatorId: user ? user.id : null,
    creatorName: user ? user.name : 'Convidado',
    createdAt: new Date().toISOString()
  };
  matches.unshift(m);
  saveMatches();
  renderMatches();
  showScreen('#home');
  qs('#criarForm').reset();
  qs('#mapCriarPin').style.display = 'none';
  alert('Partida criada com sucesso!');
});

// mock de clique no mapa de criação
const mapCriar = qs('#mapCriar');
if (mapCriar) {
  mapCriar.addEventListener('click', (e) => {
    const rect = mapCriar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pin = qs('#mapCriarPin');
    pin.style.display = 'block';
    pin.style.left = `${x}px`;
    pin.style.top = `${y}px`;
    // guardar coords simuladas baseadas na posicao do clique
    // lat/lng mock: usar fração do elemento para criar números pseudo
    const lat = (y / rect.height).toFixed(6);
    const lng = (x / rect.width).toFixed(6);
    qs('#jogoLat').value = lat;
    qs('#jogoLng').value = lng;
  });
}

// --- Botões "Criar Partida" espalhados ---
['#header-criar', '#home-criar', '#empty-criar'].forEach(sel => {
  const el = qs(sel);
  if (el) el.addEventListener('click', (e) => {
    e.preventDefault();
    // obrigar login antes de criar
    if (!user) {
      if (!confirm('Você precisa entrar para criar uma partida. Entrar agora?')) return;
      showScreen('#login');
      return;
    }
    showScreen('#criar');
  });
});

// --- Busca / Filtros ---
qs('#buscaForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const local = qs('#inputLocal').value.toLowerCase();
  const date = qs('#inputData').value;
  let filtered = matches.slice();
  if (local) {
    filtered = filtered.filter(m => (m.local || '').toLowerCase().includes(local) || (m.title || '').toLowerCase().includes(local));
  }
  if (date) filtered = filtered.filter(m => m.date === date);
  renderMatches(filtered);
});
qs('#btnAplicarFiltros').addEventListener('click', () => {
  const bairro = qs('#filtroBairro').value.toLowerCase();
  const horario = qs('#filtroHorario').value;
  const campo = qs('#filtroCampo').value;
  const nivel = qs('#filtroNivel').value;
  let filtered = matches.slice();
  if (bairro) filtered = filtered.filter(m => (m.local || '').toLowerCase().includes(bairro));
  if (campo) filtered = filtered.filter(m => m.field === campo);
  if (nivel) filtered = filtered.filter(m => m.level === nivel);
  // horario mock: usa hora para agrupar
  if (horario) {
    filtered = filtered.filter(m => {
      if (!m.time) return false;
      const h = parseInt(m.time.split(':')[0], 10);
      if (isNaN(h)) return false;
      if (horario === 'manha') return h >= 6 && h < 12;
      if (horario === 'tarde') return h >= 12 && h < 18;
      if (horario === 'noite') return h >= 18 || h < 6;
      return true;
    });
  }
  renderMatches(filtered);
});

// --- Geolocalização (preencher inputLocal) ---
qs('#btnGeo').addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocalização não suportada neste navegador.');
    return;
  }
  qs('#btnGeo').disabled = true;
  qs('#btnGeo').textContent = 'Obtendo...';
  navigator.geolocation.getCurrentPosition(pos => {
    const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
    qs('#inputLocal').value = `Perto de ${coords}`;
    qs('#btnGeo').disabled = false;
    qs('#btnGeo').textContent = 'Usar minha localização';
  }, err => {
    alert('Não foi possível obter localização: ' + err.message);
    qs('#btnGeo').disabled = false;
    qs('#btnGeo').textContent = 'Usar minha localização';
  }, { timeout: 10000 });
});

// --- Login / Perfil ---
qs('#loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = qs('#loginNome').value.trim();
  const email = qs('#loginEmail').value.trim();
  if (!name || !email) return alert('Preencha nome e email.');
  user = { id: uid(), name, email };
  save('futnaticos_user', user);
  updateUIForUser();
  alert('Entrou como ' + name);
  showScreen('#home');
});
qs('#loginGoogle').addEventListener('click', () => {
  // simulação rápida
  user = { id: uid(), name: 'Google User', email: 'google@example.com' };
  save('futnaticos_user', user);
  updateUIForUser();
  alert('Entrou com Google (simulado).');
  showScreen('#home');
});
qs('#loginFacebook').addEventListener('click', () => {
  user = { id: uid(), name: 'FB User', email: 'fb@example.com' };
  save('futnaticos_user', user);
  updateUIForUser();
  alert('Entrou com Facebook (simulado).');
  showScreen('#home');
});

function updateUIForUser() {
  if (user) {
    qs('#menu-login').style.display = 'none';
    qs('#menu-perfil').style.display = '';
    qs('#header-criar').style.display = '';
    qs('#perfilNome').value = user.name || '';
    qs('#perfilAvaliacoes').value = '';
    qs('#perfilFoto').textContent = user.name ? user.name[0].toUpperCase() : '🙂';
  } else {
    qs('#menu-login').style.display = '';
    qs('#menu-perfil').style.display = 'none';
    qs('#header-criar').style.display = 'none';
  }
}
qs('#perfilSalvar').addEventListener('click', () => {
  if (!user) return alert('Faça login antes.');
  user.name = qs('#perfilNome').value.trim() || user.name;
  user.position = qs('#perfilPosicao').value;
  user.level = qs('#perfilNivel').value;
  user.reviews = qs('#perfilAvaliacoes').value;
  save('futnaticos_user', user);
  updateUIForUser();
  alert('Perfil salvo.');
});
qs('#perfilSair').addEventListener('click', () => {
  if (!confirm('Deseja realmente sair?')) return;
  user = null;
  localStorage.removeItem('futnaticos_user');
  updateUIForUser();
  showScreen('#home');
});

// --- Inicialização ---
function saveMatches() {
  save('futnaticos_matches', matches);
}

function seedExampleMatches() {
  if (matches.length === 0) {
    matches = [
      {
        id: uid(),
        title: 'Pelada do Parque',
        field: 'grama',
        date: getTodayOffset(1),
        time: '09:30',
        slots: 10,
        value: 0,
        gender: 'misto',
        level: 'intermediario',
        local: 'Parque Central, Centro',
        lat: '0.12',
        lng: '0.34',
        notes: 'Levar colete',
        players: [],
        creatorName: 'Admin',
        createdAt: new Date().toISOString()
      },
      {
        id: uid(),
        title: 'Society da Noite',
        field: 'society',
        date: getTodayOffset(0),
        time: '20:00',
        slots: 12,
        value: 20,
        gender: 'masculino',
        level: 'iniciante',
        local: 'Quadra do Bairro, Jardim',
        lat: '0.56',
        lng: '0.78',
        notes: '',
        players: [],
        creatorName: 'Ronaldo',
        createdAt: new Date().toISOString()
      }
    ];
    saveMatches();
  }
}
function getTodayOffset(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// --- Carregar estado inicial e montar UI ---
seedExampleMatches();
renderMatches();
updateUIForUser();

// --- Acessibilidade / Links do header brand para home ---
const brand = qs('.brand');
if (brand) brand.addEventListener('click', (e) => {
  e.preventDefault();
  showScreen('#home');
});

// --- Helpers finais ---
window.debugDump = () => ({ matches, user, currentMatchId });