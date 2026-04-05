/* ── DPE · Application JavaScript ── */

/* ── Navigation mobile ── */
document.addEventListener('DOMContentLoaded',function(){
  var burger=document.querySelector('.nav-burger');
  var links=document.querySelector('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.toggle('open');});
    links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');});});
  }

  /* ── Reveal au scroll ── */
  var reveals=document.querySelectorAll('.reveal');
  if(reveals.length){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },{threshold:0.15});
    reveals.forEach(function(el){observer.observe(el);});
  }
});

/* ══════════════════════════════════════════
   AUTO-ÉVALUATION (chargé uniquement sur auto-evaluation.html)
   ══════════════════════════════════════════ */

var SECS={
  autre:    {l:"Tous secteurs",      s:42000,t:.17},
  tech:     {l:"Tech / Numerique",   s:54000,t:.22},
  conseil:  {l:"Conseil / Services", s:56000,t:.21},
  industrie:{l:"Industrie",          s:40000,t:.14},
  sante:    {l:"Sante",              s:34000,t:.20},
  finance:  {l:"Finance",            s:54000,t:.16},
  retail:   {l:"Commerce",           s:30000,t:.28},
  public:   {l:"Public / Asso.",     s:33000,t:.10}
};

var CS=[
  {id:"r",n:"01",name:"Confiance",col:"#c4603a",
   desc:"Est-ce que les gens se disent vraiment les choses ?",
   qs:[
     {id:"r1",lo:"Jamais",hi:"R\u00e9guli\u00e8rement",
      q:"Dans votre \u00e9quipe, les gens expriment-ils leurs d\u00e9saccords ouvertement \u2014 y compris avec vous ?",
      a:"Pensez \u00e0 une situation r\u00e9cente o\u00f9 quelqu\u2019un n\u2019\u00e9tait pas d\u2019accord."},
     {id:"r2",lo:"En priv\u00e9",hi:"Devant l\u2019\u00e9quipe",
      q:"Quand quelqu\u2019un fait une erreur, est-ce que \u00e7a se traite en \u00e9quipe ou plut\u00f4t en apart\u00e9 ?",
      a:"Comment \u00e7a s\u2019est pass\u00e9 la derni\u00e8re fois ?"},
     {id:"r3",lo:"Des semaines",hi:"Quelques jours",
      q:"Quand il y a un froid ou un non-dit dans l\u2019\u00e9quipe, combien de temps avant que quelqu\u2019un en parle ?",
      a:"Ces tensions qu\u2019on sent mais que personne ne nomme."}
   ],
   low:"La confiance est fragile. C\u2019est le premier levier \u00e0 travailler \u2014 tout le reste en d\u00e9pend.",
   high:"La confiance est solide. Les gens se parlent franchement, et les tensions se r\u00e8glent vite.",
   action:"Cr\u00e9er des moments d\u2019\u00e9change sans enjeu. Montrer l\u2019exemple en accueillant les d\u00e9saccords."},
  {id:"s",n:"02",name:"Cap",col:"#3d7040",
   desc:"Est-ce que tout le monde sait o\u00f9 on va et pourquoi ?",
   qs:[
     {id:"s1",lo:"Chacun sa version",hi:"Tous align\u00e9s",
      q:"Si vous demandiez \u00e0 chaque membre de votre \u00e9quipe \u00ab\u00a0pourquoi on fait ce qu\u2019on fait\u00a0\u00bb, auriez-vous la m\u00eame r\u00e9ponse ?",
      a:"Pensez \u00e0 des personnes pr\u00e9cises. Que diraient-elles ?"},
     {id:"s2",lo:"Par la rumeur",hi:"Expliqu\u00e9 en amont",
      q:"La derni\u00e8re fois que vous avez pris une d\u00e9cision importante, votre \u00e9quipe a-t-elle compris le pourquoi avant de l\u2019apprendre par hasard ?",
      a:"Un recrutement, un changement d\u2019organisation, une nouvelle priorit\u00e9\u2026"},
     {id:"s3",lo:"Chacun ses priorit\u00e9s",hi:"M\u00eame boussole",
      q:"Quand votre \u00e9quipe doit arbitrer entre deux urgences, se r\u00e9f\u00e8re-t-elle \u00e0 une direction commune \u2014 ou chacun d\u00e9cide selon ses propres crit\u00e8res ?",
      a:"Ce qui compte quand il faut choisir vite : y a-t-il un cap partag\u00e9 ?"}
   ],
   low:"Le cap n\u2019est pas assez partag\u00e9. Votre \u00e9quipe avance, mais sans boussole commune.",
   high:"Le cap est clair et partag\u00e9. Les gens comprennent le sens de ce qu\u2019ils font au quotidien.",
   action:"\u00c9changer r\u00e9guli\u00e8rement sur le pourquoi, pas seulement le quoi. Expliquer vos d\u00e9cisions."},
  {id:"g",n:"03",name:"D\u00e9cision",col:"#2a4a8b",
   desc:"Qui d\u00e9cide quoi ? Est-ce que c\u2019est clair pour tout le monde ?",
   qs:[
     {id:"g1",lo:"Souvent flou",hi:"Toujours clair",
      q:"Dans votre \u00e9quipe, chacun sait-il pr\u00e9cis\u00e9ment qui a le dernier mot sur quoi \u2014 sans avoir besoin de demander ?",
      a:"Budget, recrutement, priorit\u00e9s du mois\u2026 c\u2019est clair ?"},
     {id:"g2",lo:"Souvent",hi:"Presque jamais",
      q:"Vous arrive-t-il de devoir revenir sur une d\u00e9cision parce que quelqu\u2019un de concern\u00e9 n\u2019\u00e9tait pas au courant ?",
      a:"Ces d\u00e9cisions qui repartent en discussion alors qu\u2019on pensait avoir tranch\u00e9."},
     {id:"g3",lo:"Rarement",hi:"Toujours",
      q:"Quand une d\u00e9cision importante est prise, est-elle \u00e9crite quelque part et r\u00e9ellement utilis\u00e9e ensuite ?",
      a:"Pas un compte-rendu que personne ne relit \u2014 un vrai point de r\u00e9f\u00e9rence."}
   ],
   low:"Les r\u00e8gles du jeu ne sont pas assez claires. \u00c7a cr\u00e9e de la lenteur et de la frustration.",
   high:"C\u2019est clair et fluide. Chacun sait ce qu\u2019il peut d\u00e9cider et ce qui doit remonter.",
   action:"Clarifier qui d\u00e9cide quoi. \u00c9crire les d\u00e9cisions cl\u00e9s. Donner plus d\u2019autonomie."},
  {id:"o",n:"04",name:"Organisation",col:"#6b4a9b",
   desc:"Les r\u00e9unions servent-elles \u00e0 quelque chose ? L\u2019\u00e9quipe s\u2019adapte-t-elle vite ?",
   qs:[
     {id:"o1",lo:"Chacun comprend autre chose",hi:"Tous align\u00e9s",
      q:"Apr\u00e8s une r\u00e9union, tout le monde repart-il avec la m\u00eame compr\u00e9hension de qui fait quoi et pour quand ?",
      a:"Pensez \u00e0 votre derni\u00e8re r\u00e9union d\u2019\u00e9quipe."},
     {id:"o2",lo:"Tout s\u2019arr\u00eate",hi:"\u00c7a tourne",
      q:"Quand quelqu\u2019un est absent plusieurs jours, le travail continue-t-il normalement ?",
      a:"Cong\u00e9s, maladie\u2026 l\u2019\u00e9quipe tient-elle le coup ?"},
     {id:"o3",lo:"Plusieurs semaines",hi:"Quelques jours",
      q:"Quand les priorit\u00e9s changent brusquement, en combien de temps votre \u00e9quipe retrouve-t-elle ses marques ?",
      a:"Un client qui change d\u2019avis, une urgence, un d\u00e9part\u2026"}
   ],
   low:"L\u2019organisation est fragile. \u00c7a repose trop sur quelques personnes et quelques habitudes.",
   high:"L\u2019\u00e9quipe est bien rod\u00e9e. Les r\u00f4les sont clairs, les r\u00e9unions utiles, l\u2019adaptation rapide.",
   action:"Clarifier les r\u00f4les de chacun. Simplifier les r\u00e9unions. Pr\u00e9voir des rel\u00e8ves."},
  {id:"a",n:"05",name:"Apprentissage",col:"#b8924a",
   desc:"L\u2019\u00e9quipe progresse-t-elle vraiment \u2014 ou refait-elle toujours les m\u00eames erreurs ?",
   qs:[
     {id:"a1",lo:"On passe \u00e0 autre chose",hi:"On en parle ensemble",
      q:"La derni\u00e8re fois que quelque chose s\u2019est mal pass\u00e9, en avez-vous parl\u00e9 en \u00e9quipe pour \u00e9viter que \u00e7a se reproduise ?",
      a:"Pas pour chercher un coupable \u2014 pour comprendre ce qui s\u2019est pass\u00e9."},
     {id:"a2",lo:"Rien ne me vient",hi:"Oui, plusieurs",
      q:"Pouvez-vous citer une fa\u00e7on de travailler que votre \u00e9quipe a concr\u00e8tement chang\u00e9e ces 6 derniers mois ?",
      a:"Un processus simplifi\u00e9, une habitude abandonn\u00e9e, un outil adopt\u00e9\u2026"},
     {id:"a3",lo:"Non, \u00e7a reste isol\u00e9",hi:"Oui, \u00e7a se diffuse",
      q:"Quand quelqu\u2019un trouve une meilleure fa\u00e7on de faire, les autres l\u2019adoptent-ils ?",
      a:"Ou est-ce que chacun garde ses bonnes pratiques pour soi ?"}
   ],
   low:"L\u2019\u00e9quipe a du mal \u00e0 tirer les le\u00e7ons. Les m\u00eames probl\u00e8mes reviennent.",
   high:"L\u2019\u00e9quipe apprend de ses erreurs et s\u2019am\u00e9liore en continu. Les bonnes id\u00e9es circulent.",
   action:"Prendre 15 minutes apr\u00e8s les projets pour d\u00e9briefer. Partager les le\u00e7ons apprises."}
];

/* ── Initialisation auto-évaluation ── */
function initAutoEval(){
  if(!document.getElementById('s0'))return;

  CS.forEach(function(c,ci){
    var d=document.createElement('div');
    d.className='sc'; d.id='s'+(ci+2);
    d.innerHTML='<div class="inner"><div class="chdr">'
      +'<div class="cnum" style="color:'+c.col+'66">'+c.n+'</div>'
      +'<div><p class="ctag" style="color:'+c.col+'">Dimension</p>'
      +'<p class="cname" style="color:'+c.col+'">'+c.name+'</p>'
      +'<p class="cdesc">'+c.desc+'</p></div></div>'
      +c.qs.map(function(q,j){
        return '<div class="qcard" style="border-left-color:'+c.col+'55">'
          +'<p class="qnum">Question '+(j+1)+' / 3</p>'
          +'<p class="qtxt">'+q.q+'</p>'
          +'<p class="qanc">'+q.a+'</p>'
          +'<div class="slrow">'
          +'<span class="sll">'+q.lo+'</span>'
          +'<input type="range" min="1" max="5" value="3" oninput="uq(\''+q.id+'\',+this.value,\'d'+q.id+'\')">'
          +'<span class="slv" id="d'+q.id+'">3</span>'
          +'<span class="sll r">'+q.hi+'</span>'
          +'</div></div>';
      }).join('')
      +'<div class="btns">'
      +'<button class="btn" onclick="go('+(ci+1)+')">← Pr\u00e9c\u00e9dent</button>'
      +'<span class="stc">Cadre '+(ci+1)+' / 5</span>'
      +'<button class="btn p" onclick="go('+(ci+3)+')">'+(ci===4?'Voir mon score \u2192':'Suivant \u2192')+'</button>'
      +'</div></div>';
    document.getElementById('s7').insertAdjacentElement('beforebegin',d);
  });
}

var ST={role:null,sec:'autre',hc:0};
var SC={};
CS.forEach(function(c){c.qs.forEach(function(q){SC[q.id]=3;});});

var _goLock=false;
function go(n){
  if(_goLock)return;
  var cur=document.querySelector('.sc.on');
  var nxt=document.getElementById('s'+n);
  if(!nxt||nxt===cur)return;

  /* Update nav immediately */
  document.getElementById('nav').className=n===8?'light':'';
  document.getElementById('pf').style.width=(n/8*100)+'%';
  document.getElementById('ns').textContent=['','Profil','1/5','2/5','3/5','4/5','5/5','Score','Rapport'][n]||'';
  if(n===7)buildEmail();
  if(n===8)buildReport();

  if(!cur){
    /* First load — no animation */
    nxt.classList.add('on');
    window.scrollTo(0,0);
    return;
  }

  _goLock=true;

  /* Phase 1: fade out current */
  cur.classList.remove('on');
  cur.classList.add('out');

  /* Phase 2: after out transition, fade in next */
  setTimeout(function(){
    cur.classList.remove('out');
    window.scrollTo(0,0);
    /* Force display:block first, then trigger transition on next frame */
    nxt.classList.add('entering');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        nxt.classList.remove('entering');
        nxt.classList.add('on');
        _goLock=false;
      });
    });
  },350);
}

function sr(el,r){document.querySelectorAll('#rp .pill').forEach(function(p){p.classList.remove('on');});el.classList.add('on');ST.role=r;ck();}
function ss(el,s){document.querySelectorAll('#sp .pill').forEach(function(p){p.classList.remove('on');});el.classList.add('on');ST.sec=s;}
function ck(){ST.hc=parseInt(document.getElementById('hci').value)||0;document.getElementById('bs').disabled=!(ST.role&&ST.hc>0);}
function uq(id,v,did){SC[id]=v;document.getElementById(did).textContent=v;}

function ce(){
  var emailOk=/\S+@\S+\.\S+/.test(document.getElementById('em').value);
  var rgpdOk=document.getElementById('rgpd')&&document.getElementById('rgpd').checked;
  document.getElementById('bgo').disabled=!(emailOk&&rgpdOk);
}

function getCsc(){return CS.map(function(c){return c.qs.reduce(function(s,q){return s+SC[q.id];},0);});}

function sgpCalc(csc){
  var mean=csc.reduce(function(s,v){return s+v;},0)/csc.length;
  var variance=csc.reduce(function(s,v){return s+Math.pow(v-mean,2);},0)/csc.length;
  var sigma=Math.sqrt(variance);
  var sgpRaw=Math.max(0,mean-sigma);
  return {mean:mean,sigma:sigma,sgpRaw:sgpRaw,sgpNorm:Math.round(sgpRaw*25/15),pct:Math.round(sgpRaw/15*100),delta:Math.max.apply(null,csc)-Math.min.apply(null,csc)};
}

function dissipRate(n){var c=Math.max(5,Math.min(25,n));return 0.38-(0.38-0.04)*((c-5)/20);}
function te(n){return(1-Math.max(5,Math.min(25,n))/25)*0.10;}
function me(n){return 0.15*(1-Math.max(5,Math.min(25,n))/25)*0.32;}
function potentiel(n,ms,hc,sal){return Math.round(ms*dissipRate(n))+Math.round(hc*te(n)*sal*0.85)+Math.round(ms*me(n));}

function sqLabel(pct){
  var c=pct>=80?'#4a7a4a':pct>=60?'#7a8a3a':pct>=40?'#b8924a':'#8b5a3a';
  return{t:pct+'% du potentiel activ\u00e9',c:c};
}

function cadreColor(s){var p=(s-3)/12;if(p>=0.83)return'#3d7040';if(p>=0.58)return'#7a8a3a';if(p>=0.33)return'#b8924a';return'#8b5a3a';}

function execTxt(sgp,pct,pot){
  var f=fmtp(fmt(pot));
  var tension=sgp.sigma>3?' Les tensions inter-cadres (\u03c3='+sgp.sigma.toFixed(1)+') amplifient la dissipation \u2014 un cadre en retrait affecte l\u2019\u00e9nergie des autres.':'';
  var base='SGP '+sgp.sgpNorm+'/25 \u00b7 '+pct+'% du potentiel activ\u00e9. ';
  if(pct>=80)return base+'L\u2019organisation exprime une coh\u00e9rence \u00e9nerg\u00e9tique forte. La robustesse r\u00e9siduelle estimable est de '+f+'/an.'+tension;
  if(pct>=60)return base+'Plusieurs cadres sont bien activ\u00e9s\u00a0; d\u2019autres rec\u00e8lent encore un fort potentiel. Robustesse disponible\u202f: '+f+'/an.'+tension;
  if(pct>=40)return base+'Des leviers d\u2019activation significatifs sont disponibles. Robustesse estimable\u202f: '+f+'/an.'+tension;
  return base+'L\u2019ensemble des cadres offre un potentiel d\u2019activation important. Robustesse estim\u00e9e\u202f: '+f+'/an. Commencer par le Relationnel cr\u00e9e les conditions pour que les autres progressent.'+tension;
}

function fmt(n){if(!n&&n!==0)return'\u2014';if(n>=1e6)return(n/1e6).toFixed(1).replace('.0','')+'\u202fM\u20ac';if(n>=1e3)return Math.round(n/1e3)+'\u202fK\u20ac';return n.toLocaleString('fr-FR')+'\u202f\u20ac';}
function fmtp(s){return(typeof s==='string'?s:fmt(s)).replace(/\u202f/g,' ');}

function buildEmail(){
  var csc=getCsc(),sgp=sgpCalc(csc),S=SECS[ST.sec]||SECS.autre;
  var ms=Math.round(ST.hc*S.s*1.45),t=potentiel(sgp.sgpNorm,ms,ST.hc,S.s);
  var q=sqLabel(sgp.pct);
  document.getElementById('sb').innerHTML=sgp.sgpNorm+'<span class="sden">/25</span>';
  var qel=document.getElementById('sq');qel.textContent=q.t;qel.style.color=q.c;qel.style.border='1px solid '+q.c;
  document.getElementById('sc2').innerHTML='Robustesse \u00e9valu\u00e9e\u202f: <strong>'+fmt(t)+'</strong>\u202f/\u202fan';
}

function buildReport(){
  var csc=getCsc(),sgp=sgpCalc(csc),S=SECS[ST.sec]||SECS.autre;
  var ms=Math.round(ST.hc*S.s*1.45);
  var w=dissipRate(sgp.sgpNorm),tex=te(sgp.sgpNorm),mex=me(sgp.sgpNorm);
  var pw=Math.round(ms*w),tw=Math.round(ST.hc*tex*S.s*0.85),mw=Math.round(ms*mex);
  var t=pw+tw+mw,pp=ST.hc>0?Math.round(t/ST.hc):0;
  var sgpP1=Math.min(25,sgp.sgpNorm+1);
  var t1=potentiel(sgpP1,ms,ST.hc,S.s),gain1=t-t1;
  var ga=ST.hc>0?Math.round(gain1*12/ST.hc):0,rf=ga>0?Math.round(ga/2000):0;
  var srt=[...CS.map(function(c,i){return{c:c,s:csc[i]};})].sort(function(a,b){return a.s-b.s;});
  var q=sqLabel(sgp.pct);
  document.getElementById('rr').textContent=ST.role||'\u2014';
  document.getElementById('rsec').textContent=S.l;
  document.getElementById('rhc').textContent=ST.hc+' collaborateurs';
  document.getElementById('rsc').textContent=sgp.sgpNorm+'/25 \u00b7 '+sgp.pct+'% activ\u00e9 \u00b7 \u03c3='+sgp.sigma.toFixed(1);
  document.getElementById('rd').textContent=new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
  document.getElementById('rdkv').innerHTML=sgp.sgpNorm+'<span style="font-size:.35em;opacity:.3">/25</span>';
  var db=document.getElementById('rdkb');db.textContent=q.t;db.style.color=q.c;db.style.border='1px solid '+q.c;
  document.getElementById('rdkc').innerHTML=fmt(t);
  document.getElementById('rdkp').innerHTML=fmtp(fmt(pp))+' / collaborateur';
  document.getElementById('rex').textContent=execTxt(sgp,sgp.pct,t);
  document.getElementById('rfa').innerHTML=fmt(t)+'<span style="font-size:.37em;opacity:.35"> /an</span>';
  document.getElementById('rfr').innerHTML='Fourchette\u202f: '+fmt(Math.round(t*.70))+' \u2014 '+fmt(Math.round(t*1.35));
  document.getElementById('rfp').innerHTML=fmtp(fmt(pp))+' par collaborateur \u00b7 '+ST.hc+' pers. \u00b7 '+S.l;
  document.getElementById('rk1').innerHTML=sgp.sgpNorm+'/25';
  document.getElementById('rk2').textContent=Math.round(w*100)+'%';
  document.getElementById('rk3').textContent='\u03c3='+sgp.sigma.toFixed(1);
  document.getElementById('rbk').innerHTML=[
    ['\u26a1','Productivit\u00e9',fmt(pw),fmtp(fmt(ms))+' \u00d7 '+Math.round(w*100)+'%'],
    ['\ud83d\udd04','Turnover',fmt(tw),ST.hc+' \u00d7 '+Math.round(tex*100)+'% \u00d7 '+Math.round(S.s/1000)+'K\u20ac \u00d7 85%'],
    ['\ud83d\udd50','R\u00e9unions',fmt(mw),fmtp(fmt(ms))+' \u00d7 '+Math.round(mex*100)+'%'],
    ['\ud83d\udc64','Par collaborateur',fmt(pp),fmtp(fmt(t))+' \u00f7 '+ST.hc]
  ].map(function(b){return'<div class="bkc"><span class="bki">'+b[0]+'</span><div class="bka">'+b[2]+'</div><p class="bkn">'+b[1]+'</p><p class="bkf">'+b[3]+'</p></div>';}).join('');
  var cscStr=CS.map(function(c,i){return c.name.substring(0,3)+'.='+csc[i];}).join(', ');
  var sigmaColor=sgp.sigma>4?'#c4603a':sgp.sigma>2?'#b8924a':'#5a7a5a';
  var sigmaMsg=sgp.sigma>4
    ?'Tensions fortes entre cadres (\u03c3='+sgp.sigma.toFixed(1)+', \u0394='+sgp.delta+'). Le cadre '+srt[0].c.name+' ('+srt[0].s+'/15) tire significativement l\u2019ensemble vers le bas.'
    :sgp.sigma>2
    ?'Tensions mod\u00e9r\u00e9es entre cadres (\u03c3='+sgp.sigma.toFixed(1)+'). Un r\u00e9\u00e9quilibrage progressif lib\u00e8re de l\u2019\u00e9nergie.'
    :'Cadres relativement \u00e9quilibr\u00e9s (\u03c3='+sgp.sigma.toFixed(1)+'). La dissipation est coh\u00e9rente et distribu\u00e9e.';
  document.getElementById('rcalc').innerHTML=
    '<div class="ct">Score Global Pond\u00e9r\u00e9 (SGP) \u2014 Formule et calculs</div>'
    +'<div class="cb">'
    +'\u2460 Scores par cadre (sur 15) : '+cscStr+'\n'
    +'\u2461 Moyenne : ('+csc.join('+')+') \u00f7 5 = '+sgp.mean.toFixed(1)+'/15\n'
    +'\u2462 \u00c9cart-type \u03c3 : \u221a(variance) = '+sgp.sigma.toFixed(2)+'\n'
    +'\u2463 SGP = moyenne \u2212 \u03c3 = '+sgp.mean.toFixed(1)+' \u2212 '+sgp.sigma.toFixed(2)+' = '+sgp.sgpRaw.toFixed(2)+'/15 \u2192 '+sgp.sgpNorm+'/25\n'
    +'\u2464 Taux de dissipation : 38%\u2212(34%\u00d7('+sgp.sgpNorm+'\u22125)/20) = '+Math.round(w*100)+'%\n'
    +'\u2465 Masse salariale : '+ST.hc+'\u00d7'+S.s.toLocaleString('fr-FR')+'\u20ac\u00d71,45 = '+fmtp(fmt(ms))
    +'</div>'
    +'<div class="sgp-note" style="border-left-color:'+sigmaColor+';color:'+sigmaColor+'"><strong>'+sigmaMsg+'</strong></div>';
  document.getElementById('roi1').innerHTML=fmt(ga);
  document.getElementById('roi2').textContent=rf>0?rf+'x':'\u2014';
  document.getElementById('roidet').innerHTML=
    'Calcul\u202f: potentiel pour +1 pt SGP sur '+ST.hc+' collaborateurs = '+fmtp(fmt(gain1))
    +'\u202f\u00d7\u202f12/'+ST.hc+' = <strong style="color:#c9a052">'+fmtp(fmt(ga))+'</strong>.'
    +' Pour un atelier \u00e0 <strong style="color:#fff">2\u202f000\u202f\u20ac</strong>, le ROI est de <strong style="color:#7fbf7f">'+rf+'x</strong>.'
    +' La prise de conscience collective est le premier levier \u2014 et le moins co\u00fbteux.';
  var svg=document.getElementById('rad'),cx=110,cy=110,rv=80,nv=5,h='';
  for(var lv=1;lv<=5;lv++){var rd=rv*lv/5,pts=[];for(var i=0;i<nv;i++){var a=(2*Math.PI*i/nv)-Math.PI/2;pts.push((cx+rd*Math.cos(a)).toFixed(1)+','+(cy+rd*Math.sin(a)).toFixed(1));}h+='<polygon points="'+pts.join(' ')+'" fill="none" stroke="#cbbfac" stroke-width="'+(lv===5?1:.5)+'" opacity=".5"/>';}
  for(var i=0;i<nv;i++){var a=(2*Math.PI*i/nv)-Math.PI/2;h+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+rv*Math.cos(a)).toFixed(1)+'" y2="'+(cy+rv*Math.sin(a)).toFixed(1)+'" stroke="#cbbfac" stroke-width=".5" opacity=".5"/>';}
  h+='<polygon points="'+csc.map(function(s,i){var a=(2*Math.PI*i/nv)-Math.PI/2,v=(s/15)*rv;return(cx+v*Math.cos(a)).toFixed(1)+','+(cy+v*Math.sin(a)).toFixed(1);}).join(' ')+'" fill="rgba(201,160,82,.12)" stroke="#c9a052" stroke-width="2"/>';
  CS.forEach(function(c,i){var a=(2*Math.PI*i/nv)-Math.PI/2,v=(csc[i]/15)*rv,lx=(cx+(rv+21)*Math.cos(a)).toFixed(1),ly=(cy+(rv+21)*Math.sin(a)).toFixed(1),anc=parseFloat(lx)<cx-4?'end':parseFloat(lx)>cx+4?'start':'middle';h+='<circle cx="'+(cx+v*Math.cos(a)).toFixed(1)+'" cy="'+(cy+v*Math.sin(a)).toFixed(1)+'" r="4.5" fill="'+c.col+'" stroke="white" stroke-width="1.5"/><text x="'+lx+'" y="'+(parseFloat(ly)+4).toFixed(1)+'" text-anchor="'+anc+'" font-size="9" font-family="Georgia,serif" fill="'+c.col+'">'+c.name+'</text>';});
  svg.innerHTML=h;
  document.getElementById('rcc').innerHTML=CS.map(function(c,i){
    var s=csc[i],pctC=Math.round((s-3)/12*100),col=cadreColor(s);
    return '<div class="ccc" style="border-top-color:'+c.col+'">'
      +'<style>.ccc:nth-child('+(i+1)+')::before{background:'+c.col+'}</style>'
      +'<p class="ccn" style="color:'+c.col+'">'+c.name+'</p>'
      +'<p class="ccd">'+c.desc+'</p>'
      +'<div class="ccbt"><div class="ccb" style="background:'+c.col+';width:'+((s/15)*100)+'%"></div></div>'
      +'<div class="ccrow"><span class="ccnum" style="color:'+c.col+'">'+s+'</span><span class="ccmax">/15</span>'
      +'<span class="ccbadge" style="background:'+col+'">'+pctC+'% activ\u00e9</span></div>'
      +'<p class="cctxt">'+(pctC<50?c.low:c.high)+'</p></div>';
  }).join('');
  document.getElementById('rprio').innerHTML=srt.slice(0,3).map(function(x,i){
    var pctC=Math.round((x.s-3)/12*100);
    return '<li class="pi"><span class="pn" style="color:'+x.c.col+'">'+(i+1)+'</span>'
      +'<div><p class="ph" style="color:'+x.c.col+'">'+x.c.name+' \u00b7 '+x.s+'/15 \u00b7 '+pctC+'% activ\u00e9</p>'
      +'<p class="pd">'+x.c.action+'</p></div></li>';
  }).join('');
  document.getElementById('rups').innerHTML=
    '<span class="utag">Robustesse \u00b7 potentiel \u00b7 12\u201324 mois</span>'
    +'<div class="uamt">'+fmtp(fmt(Math.round(t*.50)))+' \u00e0 '+fmtp(fmt(Math.round(t*.72)))+'</div>'
    +'<p class="udesc">'+ST.hc+' collab. \u00b7 '+S.l+' \u00b7 En activant\u202f: '+srt[0].c.name+', '+srt[1].c.name+', '+srt[2].c.name+'.</p>';
  document.getElementById('rmth').innerHTML='<div class="cb">'
    +ST.hc+' collaborateurs \u00b7 '+S.l+' \u00b7 Salaire r\u00e9f.\u202f: '+S.s.toLocaleString('fr-FR')+'\u20ac\n'
    +'SGP = '+sgp.mean.toFixed(1)+'\u2212'+sgp.sigma.toFixed(2)+' = '+sgp.sgpRaw.toFixed(2)+'/15 \u2192 '+sgp.sgpNorm+'/25 \u00b7 '+sgp.pct+'% activ\u00e9\n'
    +'Dissipation\u202f: '+Math.round(w*100)+'% \u00b7 ROI +1pt\u202f: '+fmtp(fmt(gain1))+' \u00d7 12/'+ST.hc+' = '+fmtp(fmt(ga))+' \u2192 '+rf+'x / atelier 2\u202f000\u202f\u20ac'
    +'</div>';

  /* ── Envoi des données au serveur (PDF généré côté serveur) ── */
  var email=document.getElementById('em').value.trim();
  if(email){
    submitEvaluation({
      email:email,
      role:ST.role,
      secteur:ST.sec,
      effectif:ST.hc,
      scores:csc
    });
  }
}


/* ══════════════════════════════════════════
   ENVOI DONNÉES AU BACKEND
   ══════════════════════════════════════════ */
function submitEvaluation(data){
  var st=document.getElementById('thankyou-status');
  if(st)st.textContent='Votre rapport est en cours de pr\u00e9paration\u2026';
  fetch('api/submit.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  })
  .then(function(r){return r.json();})
  .then(function(res){
    if(st){
      if(res.success){
        st.innerHTML='\u2713 Votre rapport a \u00e9t\u00e9 envoy\u00e9 \u00e0 <strong>'+data.email+'</strong>. Consultez votre bo\u00eete mail.';
        st.className='hsub thankyou-ok';
      }else{
        st.innerHTML='L\u2019envoi a \u00e9chou\u00e9. V\u00e9rifiez votre adresse email et r\u00e9essayez.';
        st.className='hsub thankyou-err';
      }
    }
  })
  .catch(function(){
    if(st){
      st.innerHTML='Erreur de connexion. Veuillez r\u00e9essayer.';
      st.className='hsub thankyou-err';
    }
  });
}

/* ══════════════════════════════════════════
   FACILITATEURS (chargé sur facilitateurs.html)
   ══════════════════════════════════════════ */
var _facData=[];
function initFacilitateurs(){
  var grid=document.getElementById('fac-grid');
  if(!grid)return;

  fetch('facilitateurs.json')
    .then(function(r){return r.json();})
    .then(function(data){
      _facData=data;
      var regions=[];
      data.forEach(function(f){
        if(f.region&&regions.indexOf(f.region)===-1)regions.push(f.region);
      });

      var filterEl=document.getElementById('fac-filter');
      if(filterEl&&regions.length>0){
        var sel=document.createElement('select');
        sel.id='fac-region';
        sel.innerHTML='<option value="">Toutes les r\u00e9gions</option>'+regions.map(function(r){return'<option value="'+r+'">'+r+'</option>';}).join('');
        sel.addEventListener('change',function(){filterFac();});
        filterEl.appendChild(sel);
      }

      filterFac();
    });
}

function filterFac(){
  var grid=document.getElementById('fac-grid');
  if(!grid)return;
  var region=(document.getElementById('fac-region')||{}).value||'';
  var search=((document.getElementById('fac-search')||{}).value||'').toLowerCase();
  var filtered=_facData.filter(function(f){
    if(region&&f.region!==region)return false;
    if(search){
      var haystack=(f.nom+' '+f.description+' '+f.region+' '+f.email).toLowerCase();
      return haystack.indexOf(search)!==-1;
    }
    return true;
  });
  grid.innerHTML=filtered.length?filtered.map(function(f){
    var initials=f.nom.split(' ').map(function(w){return w[0];}).join('');
    return '<div class="fac-card">'
      +'<div class="fac-avatar">'+(f.photo?'<img src="'+f.photo+'" alt="'+f.nom+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover">':initials)+'</div>'
      +'<h3>'+f.nom+'</h3>'
      +(f.region?'<p class="fac-region">'+f.region+'</p>':'')
      +'<p class="fac-desc">'+f.description+'</p>'
      +'<a href="mailto:'+f.email+'" class="fac-contact">Contacter</a>'
      +'</div>';
  }).join(''):'<p style="color:var(--dim);font-family:Arial,sans-serif;font-size:13px;grid-column:1/-1;text-align:center">Aucun facilitateur trouv\u00e9.</p>';
}

/* ── Formulaire devenir facilitateur ── */
function submitFacForm(e){
  e.preventDefault();
  var btn=document.getElementById('ff-btn');
  var status=document.getElementById('ff-status');
  var nom=document.getElementById('ff-nom').value.trim();
  var email=document.getElementById('ff-email').value.trim();
  var activite=document.getElementById('ff-activite').value.trim();
  var message=document.getElementById('ff-message').value.trim();
  if(!nom||!email)return false;
  btn.disabled=true;
  btn.textContent='Envoi en cours\u2026';
  fetch('api/contact.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({nom:nom,email:email,activite:activite,message:message})
  })
  .then(function(r){return r.json();})
  .then(function(res){
    if(res.success){
      status.innerHTML='<span style="color:#4a7a4a">\u2713 Votre demande a \u00e9t\u00e9 envoy\u00e9e. Nous vous recontacterons rapidement.</span>';
      btn.textContent='Envoy\u00e9';
    }else{
      status.innerHTML='<span style="color:#c4603a">Erreur lors de l\u2019envoi. Veuillez r\u00e9essayer.</span>';
      btn.disabled=false;btn.textContent='Envoyer ma demande \u2192';
    }
  })
  .catch(function(){
    status.innerHTML='<span style="color:#c4603a">Erreur de connexion. Veuillez r\u00e9essayer.</span>';
    btn.disabled=false;btn.textContent='Envoyer ma demande \u2192';
  });
  return false;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded',function(){
  initAutoEval();
  initFacilitateurs();
});
