:root{
  --green:#2E7D32;
  --black:#000000;
  --white:#FFFFFF;
  --yellow:#FFD600;
  --light:#F5F5F5;
  --text:#1b1b1b;
  --muted:#6b6b6b;
  --card: #ffffff;
  --shadow: 0 8px 24px rgba(0,0,0,0.08);
  --radius: 14px;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  color:var(--text);
  background:var(--white);
  font-family: "Open Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

/* Cabeçalho */
.header{
  position:sticky; top:0; z-index:50;
  background:var(--white);
  border-bottom:1px solid #eaeaea;
}
.container{width:min(1120px, 92%); margin:0 auto}
.header-inner{
  display:flex; align-items:center; justify-content:space-between;
  padding:12px 0;
}
.brand{display:flex; align-items:center; gap:10px; cursor:pointer}
.logo-mark{
  width:36px; height:36px; display:grid; place-items:center;
  background:var(--green); color:#fff; border-radius:10px; font-size:18px;
}
.logo-text{
  font-family:"Montserrat", sans-serif; font-weight:800; letter-spacing:0.5px;
}
.logo-text.small{font-weight:700; font-size:14px}
.nav{display:flex; align-items:center; gap:16px}
.nav-link{
  text-decoration:none; color:var(--text); padding:8px 10px; border-radius:8px;
}
.nav-link.active{background:var(--light)}
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  border:none; border-radius:12px; padding:12px 18px; cursor:pointer;
  font-weight:600; box-shadow:var(--shadow); transition:transform .02s ease-in;
}
.btn:active{transform:translateY(1px)}
.btn-small{padding:8px 12px; border-radius:10px; font-size:14px; box-shadow:none}
.btn-primary{background:var(--green); color:#fff}
.btn-accent{background:var(--yellow); color:#1b1b1b}
.btn-outline{background:#fff; color:var(--text); border:1px solid #ddd; box-shadow:none}
.btn-light{background:#fff; color:var(--text); border:1px solid #ddd}
.btn-ghost{background:transparent; color:var(--text); box-shadow:none}

.icon{font-size:18px; line-height:1}

/* Panic button */
.panic-button{
  position:fixed; right:16px; bottom:16px; z-index:60;
  width:64px; height:64px; border-radius:50%;
  background:#ff3b30; color:#fff; display:grid; place-items:center;
  text-decoration:none; font-weight:800; box-shadow:0 10px 24px rgba(255,59,48,.3);
}

/* Screens */
.screen{display:none; padding-top:16px}
.screen.show{display:block}

/* Hero com textura de “grama” */
.hero{
  position:relative;
  min-height:44vh;
  display:flex; align-items:center;
  background:
    repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 6px, transparent 6px, transparent 12px),
    linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.15)),
    radial-gradient(ellipse at center, #2e7d32 0%, #245e27 100%);
  color:#fff;
}
.hero-overlay{position:absolute; inset:0; background:rgba(0,0,0,0.25)}
.hero-content{position:relative; z-index:1; padding:36px 0}
.hero-title{
  font-family:"Montserrat", sans-serif; font-weight:800; margin:0 0 18px 0; max-width:820px;
}
.search-bar{
  display:grid; grid-template-columns: 1.2fr 0.8fr auto; gap:12px;
  background:rgba(255,255,255,0.9); padding:12px; border-radius:14px; color:var(--text);
  box-shadow: var(--shadow);
}
.search-bar .input{display:flex; flex-direction:column; gap:6px}
.search-bar label{font-size:12px; color:var(--muted)}
.search-bar input{padding:12px; border:1px solid #ddd; border-radius:10px}
.search-bar .actions{display:flex; align-items:flex-end}
.search-bar .btn-primary{min-width:140px}

/* Grid Home */
.content-grid{
  display:grid; grid-template-columns: 280px 1fr; gap:24px; margin:28px auto 40px auto;
}
.filters{
  position:sticky; top:76px; align-self:start;
  background:var(--card); border-radius:var(--radius); padding:16px; box-shadow:var(--shadow);
}
.filter-group{display:flex; flex-direction:column; gap:8px; margin-bottom:12px}
.filter-group input, .filter-group select{
  padding:10px; border:1px solid #e3e3e3; border-radius:10px; background:#fff;
}
.matches .list-header{
  display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;
}
.section-title{
  font-family:"Montserrat", sans-serif; font-weight:800; margin:0 0 8px 0;
}

/* Cards */
.cards{
  display:grid; grid-template-columns: repeat( auto-fill, minmax(280px, 1fr)); gap:16px;
}
.card{
  background:var(--card); border-radius:var(--radius); box-shadow:var(--shadow);
  padding:14px; display:flex; flex-direction:column; gap:10px;
}
.card .title{font-weight:700}
.badge{
  display:inline-flex; align-items:center; gap:6px;
  background:var(--light); border-radius:999px; padding:6px 10px; font-size:12px; color:#333;
}
.card .meta{display:flex; flex-wrap:wrap; gap:8px}
.card .mini-map{
  background:linear-gradient(135deg, #ececec, #fafafa);
  border-radius:12px; height:120px; position:relative;
}
.card .mini-pin{
  position:absolute; width:12px; height:12px; border-radius:50%; background:var(--green); border:2px solid #fff;
  transform:translate(-50%,-50%);
}
.card .footer{display:flex; align-items:center; justify-content:space-between; margin-top:8px}

/* Empty state */
.empty-state{
  background:var(--card); border-radius:var(--radius); box-shadow:var(--shadow);
  padding:24px; text-align:center; margin:12px 0;
}
.empty-illustration{font-size:36px; margin-bottom:6px}

/* Criar Partida */
.page-title{
  font-family:"Montserrat", sans-serif; font-weight:800; margin:8px 0 16px 0;
}
.narrow{max-width:860px}
.form-card{
  background:var(--card); border-radius:var(--radius); box-shadow:var(--shadow);
  padding:18px; display:flex; flex-direction:column; gap:14px;
}
.form-row{display:grid; grid-template-columns: repeat(3, 1fr); gap:12px}
.field{display:flex; flex-direction:column; gap:6px}
.field.checkbox{flex-direction:row; align-items:center; gap:8px}
.field input, .field select{
  padding:12px; border:1px solid #e3e3e3; border-radius:10px; background:#fff;
}
.hint{color:var(--muted); font-size:13px}
.actions{display:flex; gap:10px; align-items:center}

.map-wrapper{display:grid; grid-template-columns: 1fr 220px; gap:12px; align-items:start}
.map{
  background:linear-gradient(90deg, #eaeaea 10px, transparent 1px) center/22px 22px,
             linear-gradient(#eaeaea 10px, transparent 1px) center/22px 22px,
             #f7f7f7;
  height:220px; border-radius:12px; position:relative; border:1px solid #e5e5e5;
}
.map-help{
  position:absolute; bottom:10px; left:10px; font-size:12px; color:#666; background:#fff;
  padding:4px 8px; border-radius:8px; border:1px solid #eee;
}
.map-coords input{width:100%; margin-bottom:8px}
.pin{
  position:absolute; width:16px; height:16px; border-radius:50%; background:var(--green);
  border:3px solid #fff; box-shadow:0 4px 12px rgba(0,0,0,0.25);
  transform:translate(-50%,-50%);
}

/* Partida */
.back-btn{margin:8px 0}
.match-header{
  display:grid; grid-template-columns: 160px 1fr; gap:16px; margin-bottom:16px;
}
.match-photo{
  width:100%; height:160px; border-radius:16px; background:linear-gradient(135deg, #d9f0dc, #a6d6ad);
  display:grid; place-items:center; font-size:42px;
}
.match-info .meta{display:flex; flex-wrap:wrap; gap:8px; margin:8px 0}
.match-body{
  display:grid; grid-template-columns: 1.2fr 0.8fr; gap:16px; align-items:start;
}
.match-map .map{height:320px}
.avatars{display:flex; flex-wrap:wrap; gap:10px}
.avatar{
  width:44px; height:44px; border-radius:50%; background:#eaeaea; display:grid; place-items:center; font-weight:700;
}
.avatar-xl{width:80px; height:80px; border-radius:50%; background:#eaeaea; display:grid; place-items:center; font-size:34px}
.details{list-style:none; padding:0; margin:0}
.details li{padding:8px 10px; background:#fff; border:1px solid #eee; border-radius:10px; margin-bottom:8px}

/* Modal */
.modal{position:fixed; inset:0; display:none; place-items:center; background:rgba(0,0,0,0.45); z-index:70}
.modal.show{display:grid}
.modal-content{
  width:min(720px, 92%); background:#fff; border-radius:16px; box-shadow:var(--shadow); overflow:hidden;
  display:grid; grid-template-rows: auto 1fr auto;
}
.modal-header{display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-bottom:1px solid #eee}
.chat{padding:14px; display:flex; flex-direction:column; gap:10px; max-height:50vh; overflow:auto; background:#fafafa}
.chat .msg{
  background:#fff; border:1px solid #eee; border-radius:10px; padding:10px 12px; max-width:80%;
}
.chat .me{align-self:flex-end; background:#e7f7ea; border-color:#d7eedc}
.chat-input{display:flex; gap:10px; padding:10px; border-top:1px solid #eee}
.chat-input input{flex:1; padding:12px; border:1px solid #e3e3e3; border-radius:10px}

/* Perfil */
.profile-card{
  display:grid; grid-template-columns: 140px 1fr; gap:16px;
  background:#fff; border-radius:16px; box-shadow:var(--shadow); padding:16px;
}
.profile-left{display:flex; flex-direction:column; align-items:center; gap:10px}
.stats{display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; margin:10px 0}
.stat{background:#fff; border:1px solid #eee; border-radius:12px; padding:10px; text-align:center}
.stat-value{font-family:"Montserrat"; font-weight:800; font-size:20px}

/* Notificações */
.notifications{display:flex; flex-direction:column; gap:10px}
.notification{
  background:#fff; border:1px solid #eee; border-radius:12px; padding:12px; display:flex; justify-content:space-between; align-items:center;
}

/* Rodapé */
.footer{border-top:1px solid #eee; background:#fff; margin-top:40px}
.footer-inner{display:flex; align-items:center; justify-content:space-between; padding:16px 0}
.footer-links, .footer-social{display:flex; gap:14px}
.footer-link, .social{color:var(--muted); text-decoration:none}

/* Responsivo */
@media (max-width: 980px){
  .content-grid{grid-template-columns: 1fr}
  .filters{position:relative; top:auto}
  .form-row{grid-template-columns: 1fr}
  .map-wrapper{grid-template-columns: 1fr}
  .match-header{grid-template-columns: 1fr}
  .match-body{grid-template-columns: 1fr}
}
