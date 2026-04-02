/* ── DPE · Application JavaScript ── */

/* ── Navigation mobile ── */
document.addEventListener('DOMContentLoaded',function(){
  var burger=document.querySelector('.nav-burger');
  var links=document.querySelector('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.toggle('open');});
    links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');});});
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

function go(n){
  document.querySelectorAll('.sc').forEach(function(s){s.classList.remove('on');});
  document.getElementById('s'+n).classList.add('on');
  window.scrollTo(0,0);
  document.getElementById('nav').className=n===8?'light':'';
  document.getElementById('pf').style.width=(n/8*100)+'%';
  document.getElementById('ns').textContent=['','Profil','1/5','2/5','3/5','4/5','5/5','Score','Rapport'][n]||'';
  if(n===7)buildEmail();
  if(n===8)buildReport();
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

  /* ── Génération PDF ── */
  generatePDF(csc,sgp,S,t);
}

/* ══════════════════════════════════════════
   GÉNÉRATION PDF (jsPDF)
   ══════════════════════════════════════════ */
function generatePDF(csc,sgp,S,totalPot){
  if(typeof jspdf==='undefined'||!jspdf.jsPDF)return;
  var doc=new jspdf.jsPDF();
  var y=20;
  var pw=170;

  doc.setFontSize(18);
  doc.setTextColor(201,160,82);
  doc.text('DPE - Rapport Diagnostic',20,y);
  y+=10;

  doc.setFontSize(9);
  doc.setTextColor(120,106,85);
  doc.text('Dynamiques de Presences Energetiques',20,y);
  y+=8;
  doc.text('Date : '+new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'}),20,y);
  y+=12;

  doc.setDrawColor(201,160,82);
  doc.line(20,y,190,y);
  y+=10;

  doc.setFontSize(12);
  doc.setTextColor(30,21,16);
  doc.text('Score Global Pondere (SGP)',20,y);
  y+=8;

  doc.setFontSize(28);
  doc.setTextColor(201,160,82);
  doc.text(sgp.sgpNorm+'/25',20,y);
  y+=8;

  doc.setFontSize(10);
  doc.setTextColor(120,106,85);
  doc.text(sgp.pct+'% du potentiel active  |  sigma = '+sgp.sigma.toFixed(1),20,y);
  y+=6;
  doc.text('Robustesse evaluee : '+fmtp(fmt(totalPot))+' /an',20,y);
  y+=14;

  doc.setDrawColor(200,191,172);
  doc.line(20,y,190,y);
  y+=10;

  doc.setFontSize(12);
  doc.setTextColor(30,21,16);
  doc.text('Scores par cadre',20,y);
  y+=8;

  CS.forEach(function(c,i){
    var s=csc[i];
    var pctC=Math.round((s-3)/12*100);
    var r=parseInt(c.col.slice(1,3),16),g=parseInt(c.col.slice(3,5),16),b=parseInt(c.col.slice(5,7),16);

    doc.setFillColor(r,g,b);
    doc.rect(20,y-3,3,10,'F');

    doc.setFontSize(11);
    doc.setTextColor(r,g,b);
    doc.text(c.name,26,y+4);

    doc.setFontSize(11);
    doc.setTextColor(30,21,16);
    doc.text(s+'/15  ('+pctC+'% active)',80,y+4);

    var barX=130,barW=50,barH=4;
    doc.setFillColor(220,213,197);
    doc.rect(barX,y,barW,barH,'F');
    doc.setFillColor(r,g,b);
    doc.rect(barX,y,(s/15)*barW,barH,'F');

    y+=14;
  });

  y+=6;
  doc.setDrawColor(200,191,172);
  doc.line(20,y,190,y);
  y+=10;

  doc.setFontSize(9);
  doc.setTextColor(120,106,85);
  doc.text('Profil : '+(ST.role||'-')+' | '+S.l+' | '+ST.hc+' collaborateurs',20,y);
  y+=6;
  doc.text('Moyenne : '+sgp.mean.toFixed(1)+'/15 | Ecart-type : '+sgp.sigma.toFixed(2)+' | SGP brut : '+sgp.sgpRaw.toFixed(2)+'/15',20,y);
  y+=12;

  doc.setFontSize(8);
  doc.setTextColor(160,144,128);
  doc.text('DPE - Dynamiques de Presences Energetiques | Rapport genere automatiquement',20,y);

  doc.save('DPE-Rapport-'+new Date().toISOString().slice(0,10)+'.pdf');
}


/* ══════════════════════════════════════════
   FACILITATEURS (chargé sur facilitateurs.html)
   ══════════════════════════════════════════ */
function initFacilitateurs(){
  var grid=document.getElementById('fac-grid');
  if(!grid)return;

  fetch('facilitateurs.json')
    .then(function(r){return r.json();})
    .then(function(data){
      var regions=[];
      data.forEach(function(f){
        if(f.region&&regions.indexOf(f.region)===-1)regions.push(f.region);
      });

      var filterEl=document.getElementById('fac-filter');
      if(filterEl&&regions.length>0){
        var sel=document.createElement('select');
        sel.innerHTML='<option value="">Toutes les r\u00e9gions</option>'+regions.map(function(r){return'<option value="'+r+'">'+r+'</option>';}).join('');
        sel.addEventListener('change',function(){render(data,this.value);});
        filterEl.appendChild(sel);
      }

      render(data,'');
    });

  function render(data,region){
    var filtered=region?data.filter(function(f){return f.region===region;}):data;
    grid.innerHTML=filtered.map(function(f){
      var initials=f.nom.split(' ').map(function(w){return w[0];}).join('');
      return '<div class="fac-card">'
        +'<div class="fac-avatar">'+(f.photo?'<img src="'+f.photo+'" alt="'+f.nom+'" style="width:100%;height:100%;border-radius:50%;object-fit:cover">':initials)+'</div>'
        +'<h3>'+f.nom+'</h3>'
        +(f.region?'<p class="fac-region">'+f.region+'</p>':'')
        +'<p class="fac-desc">'+f.description+'</p>'
        +'<a href="mailto:'+f.email+'" class="fac-contact">Contacter</a>'
        +'</div>';
    }).join('');
  }
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded',function(){
  initAutoEval();
  initFacilitateurs();
});
