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
  {id:"r",n:"01",name:"Relationnel",col:"#c4603a",
   desc:"S\u00e9curit\u00e9 psychologique, confiance et authenticit\u00e9.",
   qs:[
     {id:"r1",lo:"Personne n'ose",hi:"Souvent",
      q:"Lors de votre derni\u00e8re r\u00e9union, quelqu'un a-t-il exprim\u00e9 ouvertement un d\u00e9saccord avec une d\u00e9cision de son manager ?",
      a:"Pensez \u00e0 une r\u00e9union concr\u00e8te de la semaine pass\u00e9e."},
     {id:"r2",lo:"En coulisses",hi:"Ouvertement",
      q:"Quand un collaborateur fait une erreur, est-ce que \u00e7a se r\u00e8gle ouvertement en \u00e9quipe ou plut\u00f4t en coulisses ?",
      a:"Pensez au dernier incident notable."},
     {id:"r3",lo:"Des semaines",hi:"Quelques jours",
      q:"Combien de temps dure en moyenne une tension non r\u00e9solue avant d'\u00eatre nomm\u00e9e et trait\u00e9e ?",
      a:"Froids, d\u00e9saccords ou non-dits qui s'\u00e9tirent."}
   ],
   low:"La s\u00e9curit\u00e9 psychologique est encore en construction. C'est le levier d'activation le plus fondamental.",
   high:"La confiance est solide. Les d\u00e9saccords s'expriment et les tensions se traitent au grand jour.",
   action:"Rituels de feedback sans enjeu hi\u00e9rarchique. Former les managers \u00e0 l'\u00e9coute active."},
  {id:"s",n:"02",name:"Sens",col:"#3d7040",
   desc:"Clart\u00e9 de la mission, coh\u00e9rence discours/actes, boussole commune.",
   qs:[
     {id:"s1",lo:"5 r\u00e9ponses diff\u00e9rentes",hi:"Message unifi\u00e9",
      q:"Si vous demandiez \u00e0 5 collaborateurs d'expliquer la raison d'\u00eatre en une phrase, obtiendriez-vous 5 r\u00e9ponses coh\u00e9rentes ?",
      a:"Testez mentalement avec des personnes concr\u00e8tes."},
     {id:"s2",lo:"Appris par rumeur",hi:"Expliqu\u00e9 en amont",
      q:"Lors du dernier changement important, les \u00e9quipes ont-elles compris le pourquoi avant d'apprendre le quoi par la rumeur ?",
      a:"Pensez \u00e0 la derni\u00e8re d\u00e9cision qui a surpris les collaborateurs."},
     {id:"s3",lo:"Trop risqu\u00e9",hi:"Toujours bienvenu",
      q:"Un collaborateur peut-il remettre en question une d\u00e9cision sans risquer sa r\u00e9putation ?",
      a:"Y a-t-il des sujets dont tout le monde parle \u2014 mais jamais en r\u00e9union ?"}
   ],
   low:"La boussole commune est \u00e0 renforcer. Fort potentiel d'activation sur ce cadre.",
   high:"Le sens est partag\u00e9 et v\u00e9cu. Les \u00e9quipes comprennent le pourquoi de leur travail.",
   action:"Co-construire la raison d'\u00eatre. Incarner les valeurs dans chaque d\u00e9cision visible."},
  {id:"g",n:"03",name:"Gouvernance",col:"#2a4a8b",
   desc:"Clart\u00e9 d\u00e9cisionnelle, distribution du pouvoir, l\u00e9gitimit\u00e9.",
   qs:[
     {id:"g1",lo:"Souvent flou",hi:"Toujours clair",
      q:"Savez-vous pr\u00e9cis\u00e9ment \u2014 sans demander \u2014 qui a le dernier mot sur une d\u00e9cision de budget dans votre p\u00e9rim\u00e8tre ?",
      a:"Pensez \u00e0 une d\u00e9cision prise la semaine derni\u00e8re."},
     {id:"g2",lo:"Plusieurs fois/mois",hi:"Presque jamais",
      q:"Combien de fois par mois une d\u00e9cision d\u00e9j\u00e0 prise doit-elle \u00eatre revue parce que les bonnes personnes n'\u00e9taient pas dans la salle ?",
      a:"Les absents qui contredisent, les d\u00e9cisions qui repartent en discussion."},
     {id:"g3",lo:"Rarement",hi:"Syst\u00e9matiquement",
      q:"Les d\u00e9cisions importantes sont-elles document\u00e9es et effectivement consult\u00e9es ?",
      a:"Pas seulement r\u00e9dig\u00e9es \u2014 r\u00e9ellement utilis\u00e9es."}
   ],
   low:"Les r\u00e8gles du jeu d\u00e9cisionnel sont \u00e0 clarifier. L'autorit\u00e9 distribu\u00e9e lib\u00e8re de l'\u00e9nergie.",
   high:"Les r\u00e8gles du jeu sont claires et l\u00e9gitimes. Le pouvoir circule vers la comp\u00e9tence.",
   action:"Cartographier les processus d\u00e9cisionnels. Distribuer l'autorit\u00e9."},
  {id:"o",n:"04",name:"Op\u00e9rationnel",col:"#6b4a9b",
   desc:"Clart\u00e9 des r\u00f4les, efficacit\u00e9 des rituels, capacit\u00e9 d'adaptation.",
   qs:[
     {id:"o1",lo:"Chacun comprend autre chose",hi:"M\u00eame compr\u00e9hension",
      q:"Apr\u00e8s une r\u00e9union d'une heure, chacun repart-il avec la m\u00eame compr\u00e9hension des actions \u00e0 faire, par qui et pour quand ?",
      a:"Pensez \u00e0 votre derni\u00e8re r\u00e9union de coordination."},
     {id:"o2",lo:"Tout s'arr\u00eate",hi:"L'\u00e9quipe continue",
      q:"Quand un collaborateur cl\u00e9 est absent plusieurs jours, son travail avance-t-il normalement ?",
      a:"Pensez aux derni\u00e8res absences impr\u00e9vues."},
     {id:"o3",lo:"Plusieurs semaines",hi:"Quelques heures",
      q:"La derni\u00e8re fois que votre contexte a chang\u00e9 rapidement, en combien de temps votre \u00e9quipe s'est-elle r\u00e9organis\u00e9e ?",
      a:"Pas la r\u00e9union de crise \u2014 le retour \u00e0 l'efficacit\u00e9 normale."}
   ],
   low:"Les rituels et r\u00f4les sont \u00e0 optimiser. C'est un levier direct de r\u00e9duction de friction.",
   high:"R\u00f4les clairs, rituels porteurs d'\u00e9nergie, adaptation fluide.",
   action:"Clarifier les r\u00f4les. Auditer les rituels. Adopter des m\u00e9thodes agiles."},
  {id:"a",n:"05",name:"Apprenance",col:"#b8924a",
   desc:"Apprentissage collectif, changement des pratiques, r\u00e9g\u00e9n\u00e9ration.",
   qs:[
     {id:"a1",lo:"On tourne la page",hi:"Analyse collective",
      q:"La derni\u00e8re erreur significative a-t-elle donn\u00e9 lieu \u00e0 une analyse collective \u2014 ou a-t-on surtout tourn\u00e9 la page ?",
      a:"Pas un blame game \u2014 une vraie mise en commun."},
     {id:"a2",lo:"Rien ne me vient",hi:"Plusieurs exemples",
      q:"Pouvez-vous citer une pratique concr\u00e8te que votre \u00e9quipe a chang\u00e9e suite \u00e0 un apprentissage collectif dans les 6 derniers mois ?",
      a:"Quelque chose qui a chang\u00e9 dans la m\u00e9thode."},
     {id:"a3",lo:"Reste isol\u00e9e",hi:"Devient la norme",
      q:"Quand quelqu'un d\u00e9couvre une meilleure fa\u00e7on de faire, cette pratique devient-elle la norme pour tous ?",
      a:"Pensez \u00e0 la derni\u00e8re bonne pratique que vous avez vue rester isol\u00e9e."}
   ],
   low:"La capacit\u00e9 d'apprentissage collectif est \u00e0 d\u00e9velopper. Cl\u00e9 de la r\u00e9g\u00e9n\u00e9ration organisationnelle.",
   high:"L'organisation sait apprendre collectivement. Les erreurs alimentent le progr\u00e8s.",
   action:"R\u00e9trospectives r\u00e9guli\u00e8res. Valoriser les apprentissages. Communaut\u00e9s de pratique."}
];

/* ── Initialisation auto-évaluation ── */
function initAutoEval(){
  if(!document.getElementById('s0'))return;

  CS.forEach(function(c,ci){
    var d=document.createElement('div');
    d.className='sc'; d.id='s'+(ci+2);
    d.innerHTML='<div class="inner"><div class="chdr">'
      +'<div class="cnum" style="color:'+c.col+'66">'+c.n+'</div>'
      +'<div><p class="ctag" style="color:'+c.col+'">Cadre Syst\u00e9mique</p>'
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

  /* ── Génération PDF + envoi données (lazy load jsPDF) ── */
  var email=document.getElementById('em').value.trim();
  loadJsPDF(function(){
    var pdfB64=generatePDF(csc,sgp,S,t);
    if(email&&pdfB64){
      submitEvaluation({
        email:email,
        role:ST.role,
        secteur:ST.sec,
        effectif:ST.hc,
        scores:csc,
        sgp_norm:sgp.sgpNorm,
        sgp_pct:sgp.pct,
      sigma:parseFloat(sgp.sigma.toFixed(2)),
      pdf:pdfB64
    });
  }
  });
}

/* ── Chargement différé de jsPDF ── */
function loadJsPDF(cb){
  if(typeof jspdf!=='undefined'&&jspdf.jsPDF)return cb();
  var s=document.createElement('script');
  s.src='libs/jspdf.min.js';
  s.onload=cb;
  document.head.appendChild(s);
}

/* ══════════════════════════════════════════
   GÉNÉRATION PDF (jsPDF) — Corporate
   ══════════════════════════════════════════ */
function generatePDF(csc,sgp,S,totalPot){
  if(typeof jspdf==='undefined'||!jspdf.jsPDF)return;
  var doc=new jspdf.jsPDF();
  var mx=20,mr=190,pw=mr-mx;
  var gold=[201,160,82],dark=[30,21,16],muted=[120,106,85],light=[200,191,172],bg=[248,245,240];
  var dateStr=new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
  var w=dissipRate(sgp.sgpNorm),tex=te(sgp.sgpNorm),mex=me(sgp.sgpNorm);
  var ms=Math.round(ST.hc*S.s*1.45);
  var pwv=Math.round(ms*w),twv=Math.round(ST.hc*tex*S.s*0.85),mwv=Math.round(ms*mex);
  var pp=ST.hc>0?Math.round(totalPot/ST.hc):0;
  var sgpP1=Math.min(25,sgp.sgpNorm+1),t1=potentiel(sgpP1,ms,ST.hc,S.s),gain1=totalPot-t1;
  var ga=ST.hc>0?Math.round(gain1*12/ST.hc):0,rf=ga>0?Math.round(ga/2000):0;
  var srt=[].concat(CS.map(function(c,i){return{c:c,s:csc[i]};})).sort(function(a,b){return a.s-b.s;});
  var q=sqLabel(sgp.pct);

  function rgb(hex){return[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];}
  function hr(y,c){doc.setDrawColor.apply(doc,c||gold);doc.setLineWidth(0.4);doc.line(mx,y,mr,y);return y+1;}
  function footer(pg,total){
    doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.2);doc.line(mx,282,mr,282);
    doc.setFontSize(7);doc.setTextColor.apply(doc,muted);
    doc.text('DPE \u00b7 Dynamiques de Presences Energetiques \u00b7 Rapport genere le '+dateStr,mx,287);
    doc.text('Page '+pg+(total?' / '+total:''),mr,287,{align:'right'});
  }
  function wrap(txt,x,y,maxW,lh){
    var lines=doc.splitTextToSize(txt,maxW);
    doc.text(lines,x,y);
    return y+lines.length*(lh||doc.getLineHeight()/doc.internal.scaleFactor);
  }
  function sectionTitle(num,title,y){
    doc.setFontSize(9);doc.setTextColor.apply(doc,gold);
    doc.text(num,mx,y);
    y+=7;
    doc.setFontSize(16);doc.setTextColor.apply(doc,dark);
    doc.text(title,mx,y);
    y+=4;
    y=hr(y,gold);
    return y+8;
  }

  /* ═══════════════════ PAGE 1 — COUVERTURE ═══════════════════ */
  doc.setFillColor(248,245,240);
  doc.rect(0,0,210,297,'F');

  /* Bande dorée haute */
  doc.setFillColor.apply(doc,gold);
  doc.rect(0,0,210,4,'F');

  /* Titre principal */
  var y=70;
  doc.setFontSize(11);doc.setTextColor.apply(doc,gold);
  doc.text('DYNAMIQUES DE PRESENCES ENERGETIQUES',105,y,{align:'center'});
  y+=20;
  doc.setDrawColor.apply(doc,gold);doc.setLineWidth(0.6);doc.line(60,y,150,y);
  y+=20;
  doc.setFontSize(28);doc.setTextColor.apply(doc,dark);
  doc.text("Rapport d'auto-evaluation",105,y,{align:'center'});
  y+=12;
  doc.setFontSize(11);doc.setTextColor.apply(doc,muted);
  doc.text('Diagnostic systemique des presences energetiques',105,y,{align:'center'});

  /* Bloc métadonnées central */
  y=155;
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.3);
  doc.roundedRect(50,y,110,62,3,3,'FD');
  y+=14;
  var metaL=68,metaV=115;
  doc.setFontSize(9);doc.setTextColor.apply(doc,muted);doc.text('Role',metaL,y);
  doc.setTextColor.apply(doc,dark);doc.text(ST.role||'\u2014',metaV,y);
  y+=11;
  doc.setTextColor.apply(doc,muted);doc.text('Secteur',metaL,y);
  doc.setTextColor.apply(doc,dark);doc.text(S.l,metaV,y);
  y+=11;
  doc.setTextColor.apply(doc,muted);doc.text('Effectif',metaL,y);
  doc.setTextColor.apply(doc,dark);doc.text(ST.hc+' collaborateurs',metaV,y);
  y+=11;
  doc.setTextColor.apply(doc,muted);doc.text('Date',metaL,y);
  doc.setTextColor.apply(doc,dark);doc.text(dateStr,metaV,y);
  y+=11;
  doc.setTextColor.apply(doc,muted);doc.text('SGP',metaL,y);
  doc.setTextColor.apply(doc,gold);doc.setFontSize(11);doc.text(sgp.sgpNorm+'/25 \u00b7 '+sgp.pct+'% active',metaV,y);

  /* Bande dorée basse */
  doc.setFillColor.apply(doc,gold);
  doc.rect(0,293,210,4,'F');

  footer(1,6);

  /* ═══════════════════ PAGE 2 — SYNTHÈSE EXÉCUTIVE ═══════════════════ */
  doc.addPage();
  doc.setFillColor(248,245,240);doc.rect(0,0,210,297,'F');
  y=sectionTitle('01','Synthese executive',25);

  doc.setFontSize(9);doc.setTextColor.apply(doc,muted);
  y=wrap('Ce diagnostic evalue la vitalite de votre organisation a travers cinq cadres systemiques interdependants. Il n\'existe pas de reference objective externe a un systeme vivant : seul le systeme peut se decrire lui-meme. Ce diagnostic est donc un miroir, non une norme.',mx,y,pw,4.5);
  y+=8;

  /* KPI Box — SGP */
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.3);
  doc.roundedRect(mx,y,pw/2-4,44,2,2,'FD');
  doc.setFontSize(8);doc.setTextColor.apply(doc,muted);
  doc.text('SCORE GLOBAL PONDERE (SGP)',mx+6,y+9);
  doc.setFontSize(32);doc.setTextColor.apply(doc,gold);
  doc.text(sgp.sgpNorm+'',mx+6,y+30);
  doc.setFontSize(14);doc.setTextColor.apply(doc,light);
  doc.text('/25',mx+6+doc.getTextWidth(sgp.sgpNorm+'')+2,y+30);
  /* Badge qualité */
  var bw=doc.setFontSize(8).getTextWidth(q.t)+8;
  var qc=sgp.pct>=80?[74,122,74]:sgp.pct>=60?[122,138,58]:sgp.pct>=40?[184,146,74]:[139,90,58];
  doc.setDrawColor.apply(doc,qc);doc.setLineWidth(0.4);
  doc.roundedRect(mx+6,y+34,bw,7,1,1,'D');
  doc.setFontSize(7);doc.setTextColor.apply(doc,qc);doc.text(q.t,mx+10,y+39);

  /* KPI Box — Robustesse */
  var rx=mx+pw/2+4;
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);
  doc.roundedRect(rx,y,pw/2-4,44,2,2,'FD');
  doc.setFontSize(8);doc.setTextColor.apply(doc,muted);
  doc.text('ROBUSTESSE ORGANISATIONNELLE / AN',rx+6,y+9);
  doc.setFontSize(22);doc.setTextColor.apply(doc,gold);
  doc.text(fmtp(fmt(totalPot)),rx+6,y+28);
  doc.setFontSize(8);doc.setTextColor.apply(doc,muted);
  doc.text(fmtp(fmt(pp))+' / collaborateur',rx+6,y+39);

  y+=54;

  /* Texte exécutif */
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,gold);doc.setLineWidth(0.5);
  doc.roundedRect(mx,y,pw,1,0,0,'D');
  y+=6;
  doc.setFontSize(9);doc.setTextColor.apply(doc,dark);
  var execLines=doc.splitTextToSize(execTxt(sgp,sgp.pct,totalPot).replace(/\u202f/g,' '),pw-8);
  doc.text(execLines,mx+4,y+4);
  y+=execLines.length*4.5+10;

  /* Mini KPIs en ligne */
  var kpiW=pw/3;
  [{l:'SGP',v:sgp.sgpNorm+' / 25'},{l:'Taux de dissipation',v:Math.round(w*100)+'%'},{l:'Ecart-type',v:'\u03c3 = '+sgp.sigma.toFixed(1)}].forEach(function(k,i){
    var kx=mx+i*kpiW;
    doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.2);
    doc.roundedRect(kx,y,kpiW-3,22,2,2,'FD');
    doc.setFontSize(7);doc.setTextColor.apply(doc,muted);doc.text(k.l,kx+5,y+8);
    doc.setFontSize(14);doc.setTextColor.apply(doc,dark);doc.text(k.v,kx+5,y+18);
  });
  y+=32;

  /* Sigma interprétation */
  var sigmaColor=sgp.sigma>4?rgb('#c4603a'):sgp.sigma>2?rgb('#b8924a'):rgb('#5a7a5a');
  var sigmaMsg=sgp.sigma>4
    ?'Tensions fortes entre cadres (sigma='+sgp.sigma.toFixed(1)+', delta='+sgp.delta+'). Le cadre '+srt[0].c.name+' ('+srt[0].s+'/15) tire significativement l\'ensemble vers le bas.'
    :sgp.sigma>2
    ?'Tensions moderees entre cadres (sigma='+sgp.sigma.toFixed(1)+'). Un reequilibrage progressif libere de l\'energie.'
    :'Cadres relativement equilibres (sigma='+sgp.sigma.toFixed(1)+'). La dissipation est coherente et distribuee.';
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,sigmaColor);doc.setLineWidth(0.8);
  doc.line(mx,y,mx,y+14);
  doc.setFontSize(8);doc.setTextColor.apply(doc,sigmaColor);
  var sigLines=doc.splitTextToSize(sigmaMsg,pw-8);
  doc.text(sigLines,mx+5,y+5);

  footer(2,6);

  /* ═══════════════════ PAGE 3 — ROBUSTESSE ORGANISATIONNELLE ═══════════════════ */
  doc.addPage();
  doc.setFillColor(248,245,240);doc.rect(0,0,210,297,'F');
  y=sectionTitle('02','Robustesse organisationnelle',25);

  doc.setFontSize(9);doc.setTextColor.apply(doc,muted);
  y=wrap('La robustesse organisationnelle (O. Hamant, La Troisieme Voie du Vivant) n\'est pas la performance maximale mais la capacite a maintenir sa vitalite face aux perturbations. L\'energie dissipee par le desalignement des cadres est quantifiable.',mx,y,pw,4.5);
  y+=6;

  /* Grand montant */
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,gold);doc.setLineWidth(0.4);
  doc.roundedRect(mx,y,pw,38,2,2,'FD');
  doc.setFontSize(8);doc.setTextColor.apply(doc,muted);
  doc.text('ROBUSTESSE ORGANISATIONNELLE EVALUEE',mx+8,y+10);
  doc.setFontSize(26);doc.setTextColor.apply(doc,gold);
  doc.text(fmtp(fmt(totalPot))+' / an',mx+8,y+26);
  doc.setFontSize(8);doc.setTextColor.apply(doc,muted);
  doc.text('Fourchette : '+fmtp(fmt(Math.round(totalPot*.70)))+' \u2014 '+fmtp(fmt(Math.round(totalPot*1.35)))+'  |  '+fmtp(fmt(pp))+' par collaborateur \u00b7 '+ST.hc+' pers.',mx+8,y+34);
  y+=48;

  /* Décomposition en 4 blocs */
  var bkData=[
    {icon:'Productivite',val:fmtp(fmt(pwv)),detail:fmtp(fmt(ms))+' x '+Math.round(w*100)+'%'},
    {icon:'Turnover',val:fmtp(fmt(twv)),detail:ST.hc+' x '+Math.round(tex*100)+'% x '+Math.round(S.s/1000)+'K x 85%'},
    {icon:'Reunions',val:fmtp(fmt(mwv)),detail:fmtp(fmt(ms))+' x '+Math.round(mex*100)+'%'},
    {icon:'Par collaborateur',val:fmtp(fmt(pp)),detail:fmtp(fmt(totalPot))+' / '+ST.hc}
  ];
  var bkW=(pw-6)/4;
  bkData.forEach(function(b,i){
    var bx=mx+i*(bkW+2);
    doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.2);
    doc.roundedRect(bx,y,bkW,32,2,2,'FD');
    doc.setFontSize(14);doc.setTextColor.apply(doc,dark);doc.text(b.val,bx+4,y+14);
    doc.setFontSize(8);doc.setTextColor.apply(doc,gold);doc.text(b.icon,bx+4,y+21);
    doc.setFontSize(6.5);doc.setTextColor.apply(doc,muted);doc.text(b.detail,bx+4,y+28);
  });
  y+=42;

  /* Formule de calcul */
  doc.setFontSize(10);doc.setTextColor.apply(doc,dark);
  doc.text('Score Global Pondere (SGP) \u2014 Formule et calculs',mx,y);
  y+=6;
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.2);
  var calcH=50;
  doc.roundedRect(mx,y,pw,calcH,2,2,'FD');
  doc.setFontSize(7.5);doc.setTextColor.apply(doc,muted);
  var cscStr=CS.map(function(c,i){return c.name.substring(0,3)+'.='+csc[i];}).join(', ');
  var calcLines=[
    '1. Scores par cadre (sur 15) : '+cscStr,
    '2. Moyenne : ('+csc.join('+')+') / 5 = '+sgp.mean.toFixed(1)+'/15',
    '3. Ecart-type sigma : racine(variance) = '+sgp.sigma.toFixed(2),
    '4. SGP = moyenne - sigma = '+sgp.mean.toFixed(1)+' - '+sgp.sigma.toFixed(2)+' = '+sgp.sgpRaw.toFixed(2)+'/15 -> '+sgp.sgpNorm+'/25',
    '5. Taux de dissipation : 38% - (34% x ('+sgp.sgpNorm+'-5)/20) = '+Math.round(w*100)+'%',
    '6. Masse salariale : '+ST.hc+' x '+S.s.toLocaleString('fr-FR')+'E x 1,45 = '+fmtp(fmt(ms))
  ];
  calcLines.forEach(function(l,i){doc.text(l,mx+5,y+8+i*6.5);});
  y+=calcH+10;

  /* ROI */
  doc.setFontSize(10);doc.setTextColor.apply(doc,dark);
  doc.text('Et si votre SGP augmentait d\'un seul point ?',mx,y);
  y+=6;
  doc.setFillColor(40,35,30);doc.roundedRect(mx,y,pw,34,2,2,'F');
  doc.setFontSize(8);doc.setTextColor(180,170,155);
  doc.text('ROBUSTESSE SUPPLEMENTAIRE',mx+8,y+9);
  doc.text('ROI ATELIER (2 000E)',mx+pw/2+8,y+9);
  doc.setFontSize(20);doc.setTextColor.apply(doc,gold);
  doc.text(fmtp(fmt(ga)),mx+8,y+23);
  doc.setFontSize(20);doc.setTextColor(127,191,127);
  doc.text(rf>0?rf+'x':'\u2014',mx+pw/2+8,y+23);
  doc.setFontSize(7);doc.setTextColor(180,170,155);
  var roiTxt='Potentiel pour +1 pt SGP sur '+ST.hc+' collab. = '+fmtp(fmt(gain1))+' x 12/'+ST.hc+' = '+fmtp(fmt(ga))+'. Pour un atelier a 2 000E, le ROI est de '+rf+'x.';
  doc.text(doc.splitTextToSize(roiTxt,pw-16),mx+8,y+30);

  footer(3,6);

  /* ═══════════════════ PAGE 4 — LES 5 CADRES ═══════════════════ */
  doc.addPage();
  doc.setFillColor(248,245,240);doc.rect(0,0,210,297,'F');
  y=sectionTitle('03','Les 5 cadres systemiques',25);

  doc.setFontSize(9);doc.setTextColor.apply(doc,muted);
  y=wrap('Cinq cadres interdependants composent le DPE. Un cadre en retrait affecte tous les autres \u2014 la sante du systeme depend de l\'equilibre autant que du niveau absolu.',mx,y,pw,4.5);
  y+=6;

  /* Cadres détaillés */
  CS.forEach(function(c,i){
    var s=csc[i],pctC=Math.round((s-3)/12*100),col=rgb(c.col),cc=cadreColor(s),ccRgb=rgb(cc);

    /* Card */
    doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.2);
    doc.roundedRect(mx,y,pw,38,2,2,'FD');
    /* Accent bar top */
    doc.setFillColor.apply(doc,col);doc.rect(mx,y,pw,1.5,'F');

    /* Name + desc */
    doc.setFontSize(12);doc.setTextColor.apply(doc,col);
    doc.text(c.n+' \u00b7 '+c.name,mx+6,y+10);
    doc.setFontSize(8);doc.setTextColor.apply(doc,muted);
    doc.text(c.desc,mx+6,y+17);

    /* Progress bar */
    var barX=mx+6,barW=pw-60,barH=4,barY=y+22;
    doc.setFillColor(230,225,215);doc.roundedRect(barX,barY,barW,barH,1,1,'F');
    doc.setFillColor.apply(doc,col);
    var fillW=Math.max(1,(s/15)*barW);
    doc.roundedRect(barX,barY,fillW,barH,1,1,'F');

    /* Score + badge */
    doc.setFontSize(16);doc.setTextColor.apply(doc,col);
    doc.text(s+'',mx+pw-48,y+14);
    doc.setFontSize(9);doc.setTextColor.apply(doc,light);
    doc.text('/15',mx+pw-48+doc.getTextWidth(s+'')+1,y+14);
    /* Badge */
    var badgeTxt=pctC+'% active';
    var badgeW=doc.setFontSize(7).getTextWidth(badgeTxt)+6;
    doc.setFillColor.apply(doc,ccRgb);
    doc.roundedRect(mx+pw-48,y+18,badgeW,7,1,1,'F');
    doc.setTextColor(255,255,255);doc.text(badgeTxt,mx+pw-45,y+23);

    /* Interpretation */
    doc.setFontSize(7.5);doc.setTextColor.apply(doc,muted);
    var interpTxt=pctC<50?c.low:c.high;
    doc.text(doc.splitTextToSize(interpTxt,barW),mx+6,y+32);

    y+=43;
  });

  footer(4,6);

  /* ═══════════════════ PAGE 5 — PRIORITÉS D'ACTIVATION ═══════════════════ */
  doc.addPage();
  doc.setFillColor(248,245,240);doc.rect(0,0,210,297,'F');
  y=sectionTitle('04','Priorites d\'activation',25);

  doc.setFontSize(9);doc.setTextColor.apply(doc,muted);
  y=wrap('La theorie des contraintes (E. Goldratt) montre qu\'un systeme ne progresse qu\'en activant son maillon le plus faible. Activer en priorite le cadre le moins present reduit mecaniquement l\'ecart-type sigma, ce qui augmente le SGP davantage que n\'importe quel autre investissement.',mx,y,pw,4.5);
  y+=8;

  /* Top 3 priorités */
  srt.slice(0,3).forEach(function(x,i){
    var col=rgb(x.c.col),pctC=Math.round((x.s-3)/12*100);
    doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.2);
    doc.roundedRect(mx,y,pw,28,2,2,'FD');
    /* Numéro priorité */
    doc.setFillColor.apply(doc,col);doc.circle(mx+10,y+14,6,'F');
    doc.setFontSize(12);doc.setTextColor(255,255,255);doc.text(''+(i+1),mx+10,y+18,{align:'center'});
    /* Texte */
    doc.setFontSize(11);doc.setTextColor.apply(doc,col);
    doc.text(x.c.name+' \u00b7 '+x.s+'/15 \u00b7 '+pctC+'% active',mx+22,y+11);
    doc.setFontSize(8);doc.setTextColor.apply(doc,muted);
    doc.text(doc.splitTextToSize(x.c.action,pw-30),mx+22,y+19);
    y+=33;
  });

  y+=6;

  /* Potentiel upside */
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,gold);doc.setLineWidth(0.4);
  doc.roundedRect(mx,y,pw,34,2,2,'FD');
  doc.setFontSize(8);doc.setTextColor.apply(doc,gold);
  doc.text('ROBUSTESSE \u00b7 POTENTIEL \u00b7 12\u201324 MOIS',mx+8,y+10);
  doc.setFontSize(18);doc.setTextColor.apply(doc,dark);
  doc.text(fmtp(fmt(Math.round(totalPot*.50)))+' a '+fmtp(fmt(Math.round(totalPot*.72))),mx+8,y+23);
  doc.setFontSize(8);doc.setTextColor.apply(doc,muted);
  doc.text(ST.hc+' collab. \u00b7 '+S.l+' \u00b7 En activant : '+srt[0].c.name+', '+srt[1].c.name+', '+srt[2].c.name+'.',mx+8,y+30);
  y+=44;

  /* Atelier DPE */
  doc.setFontSize(10);doc.setTextColor.apply(doc,dark);
  doc.text('Atelier DPE \u00b7 1 journee en equipe',mx,y);
  y+=7;
  doc.setFontSize(8.5);doc.setTextColor.apply(doc,muted);
  var atelierItems=[
    'Partage collectif des resultats du diagnostic',
    'Identification des tensions inter-cadres et leviers prioritaires',
    'Co-construction d\'un plan d\'activation sur 90 jours',
    'Alignement de l\'equipe autour d\'une vision commune'
  ];
  atelierItems.forEach(function(item){
    doc.text('\u2022  '+item,mx+4,y);
    y+=6;
  });
  y+=6;
  doc.setFontSize(8);doc.setTextColor.apply(doc,gold);
  doc.text('Contactez votre facilitateur DPE pour organiser un atelier avec votre equipe.',mx,y);

  footer(5,6);

  /* ═══════════════════ PAGE 6 — SOURCES & MÉTHODOLOGIE ═══════════════════ */
  doc.addPage();
  doc.setFillColor(248,245,240);doc.rect(0,0,210,297,'F');
  y=sectionTitle('05','Sources et methodologie',25);

  doc.setFontSize(9);doc.setTextColor.apply(doc,muted);
  y=wrap('Ce diagnostic s\'appuie sur des donnees publiques et des recherches academiques validees. Les estimations financieres sont des ordres de grandeur destines a eclairer la decision, non des predictions comptables.',mx,y,pw,4.5);
  y+=6;

  /* Table des sources */
  var sources=[
    ['Gallup 2023','Desengagement','9% du PIB','Base du taux de dissipation'],
    ['McKinsey 2022','Perte productivite','20-25%','Calibrage fourchette haute'],
    ['Institut Sapiens 2023','Cout desengagement','14 310E/an','Cout par collaborateur desengage'],
    ['Microsoft WTI 2023','Reunions improductives','31h/mois','Base du facteur reunions'],
    ['SHRM','Cout remplacement','50-200% salaire','Calibrage turnover'],
    ['DARES/INSEE 2023','Salaires de reference','Par secteur','Masse salariale estimee']
  ];
  var colW=[42,38,36,pw-42-38-36];
  var headers=['Source','Indicateur','Valeur','Usage'];
  /* Header row */
  doc.setFillColor.apply(doc,gold);doc.rect(mx,y,pw,8,'F');
  doc.setFontSize(7);doc.setTextColor(255,255,255);
  var cx=mx;
  headers.forEach(function(h,i){doc.text(h,cx+3,y+5.5);cx+=colW[i];});
  y+=8;
  /* Data rows */
  sources.forEach(function(row,ri){
    if(ri%2===0)doc.setFillColor(255,255,255);else doc.setFillColor(248,245,240);
    doc.rect(mx,y,pw,8,'F');
    doc.setFontSize(7);doc.setTextColor.apply(doc,dark);
    cx=mx;
    row.forEach(function(cell,ci){doc.text(cell,cx+3,y+5.5);cx+=colW[ci];});
    y+=8;
  });
  doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.2);doc.line(mx,y,mr,y);
  y+=12;

  /* Méthodologie résumé */
  doc.setFontSize(10);doc.setTextColor.apply(doc,dark);
  doc.text('Methodologie',mx,y);
  y+=7;
  doc.setFillColor(255,255,255);doc.setDrawColor.apply(doc,light);doc.setLineWidth(0.2);
  doc.roundedRect(mx,y,pw,38,2,2,'FD');
  doc.setFontSize(7.5);doc.setTextColor.apply(doc,muted);
  var methLines=[
    ST.hc+' collaborateurs \u00b7 '+S.l+' \u00b7 Salaire ref. : '+S.s.toLocaleString('fr-FR')+'E',
    'SGP = '+sgp.mean.toFixed(1)+' - '+sgp.sigma.toFixed(2)+' = '+sgp.sgpRaw.toFixed(2)+'/15 -> '+sgp.sgpNorm+'/25 \u00b7 '+sgp.pct+'% active',
    'Dissipation : '+Math.round(w*100)+'% \u00b7 ROI +1pt : '+fmtp(fmt(gain1))+' x 12/'+ST.hc+' = '+fmtp(fmt(ga))+' -> '+rf+'x / atelier 2 000E',
    '',
    'Les cinq mecanismes (Senge, Morwitz, Carver & Scheier, Bandura, JMIR) s\'activent',
    'simultanement lors d\'une journee DPE collective.'
  ];
  methLines.forEach(function(l,i){doc.text(l,mx+5,y+8+i*5);});
  y+=48;

  /* Disclaimer final */
  doc.setFontSize(7);doc.setTextColor.apply(doc,muted);
  y=wrap('Ce rapport a ete genere automatiquement a partir des reponses fournies lors de l\'auto-evaluation. Les montants sont des estimations basees sur des donnees sectorielles moyennes et des recherches publiees. Ils ne constituent pas un audit financier.',mx,y,pw,3.5);

  footer(6,6);

  /* Retourner le PDF en base64 pour l'envoi par email (pas de téléchargement automatique) */
  try{return btoa(doc.output());}catch(e){return null;}
}


/* ══════════════════════════════════════════
   ENVOI DONNÉES AU BACKEND
   ══════════════════════════════════════════ */
function submitEvaluation(data){
  var confirm=document.getElementById('emailConfirm');
  if(confirm)confirm.innerHTML='<p class="email-sending">Envoi de votre rapport en cours\u2026</p>';
  fetch('api/submit.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  })
  .then(function(r){return r.json();})
  .then(function(res){
    if(confirm){
      if(res.success){
        confirm.innerHTML='<p class="email-sent">\u2713 Votre rapport PDF a \u00e9t\u00e9 envoy\u00e9 \u00e0 <strong>'+data.email+'</strong></p>';
      }else{
        confirm.innerHTML='<p class="email-error">L\u2019envoi a \u00e9chou\u00e9. V\u00e9rifiez votre adresse email et r\u00e9essayez.</p>';
      }
    }
  })
  .catch(function(){
    if(confirm)confirm.innerHTML='<p class="email-error">Erreur de connexion. Veuillez r\u00e9essayer.</p>';
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
