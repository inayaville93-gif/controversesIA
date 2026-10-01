/* ============================================
   FRISE CHRONOLOGIQUE INTERACTIVE
   Pour modifier un texte, changez simplement
   les champs "desc" (vue globale) ou "detail"
   (bulle) dans la liste DATA ci-dessous.
   ============================================ */
const DATA = [
  {year:"1956", color:"blue", name:"L'idée d'une machine pensante",
   desc:"Des chercheurs imaginent des machines capables de simuler l'intelligence humaine",
   detail:"La conférence de Dartmouth popularise le terme « intelligence artificielle », proposé par John McCarthy, et fait de l'IA une discipline de recherche à part entière."},
  {year:"1969", color:"green", name:"Les débuts d'Internet",
   desc:"Naissance du réseau ARPANET",
   detail:"Le Network Working Group voit le jour et les premiers ordinateurs sont reliés entre quatre universités américaines grâce à l'Interface Message Processor de Leonard Kleinrock. C'est la naissance d'ARPANET, l'ancêtre direct d'Internet."},
  {year:"1997", color:"blue", name:"Le premier réseau social",
   desc:"SixDegrees.com ouvre ses portes",
   detail:"SixDegrees.com permet pour la première fois de créer un profil, de lister ses amis et de parcourir leurs propres listes de contacts. Le principe fondateur des réseaux sociaux, le graphe social, est né."},
  {year:"2013", color:"green", name:"Le règne du contenu court",
   desc:"Vine, une application mobile, lance la vidéo en boucle",
   detail:"Vine lance la vidéo de six secondes en boucle, pensée pour le mobile et le partage instantané. Ce format bref impose une nouvelle façon de raconter, qui inspirera ensuite Stories, Snapchat puis TikTok."},
  {year:"2016", color:"blue", name:"Les premières vidéos générées",
   desc:"Les premiers visages synthétiques convaincants",
   detail:"Dans le sillage des réseaux antagonistes génératifs (GAN, 2014), des travaux comme Face2Face démontrent la réanimation de visages en temps réel. Les premiers « deepfakes » apparaissent peu après et ouvrent le débat sur l'authenticité des images."},
  {year:"2022", color:"green", name:"L'arrivée de ChatGPT",
   desc:"Le grand public découvre l'IA générative",
   detail:"Lancé le 30 novembre 2022 par OpenAI, ChatGPT atteint le million d'utilisateurs en cinq jours. Pour la première fois, un modèle de langage devient un outil grand public, utilisé au quotidien pour écrire, programmer et apprendre."},
  {year:"2022", color:"blue", name:"Le débat s'ouvre",
   desc:"Dès l'apparition de ChatGPT",
   detail:"L'usage massif de l'outil soulève aussitôt de nombreuses questions : triche scolaire et évaluation, fiabilité des réponses et « hallucinations », désinformation automatisée, avenir des métiers de la rédaction et de la création."},
  {year:"2023", color:"green", name:"Propriété intellectuelle",
   desc:"Les artistes répliquent devant la justice",
   detail:"Un groupe d'artistes saisit un tribunal fédéral de Californie contre Stability AI, Midjourney et DeviantArt. Dans l'affaire Andersen v. Stability AI, ils accusent ces entreprises de violer le droit d'auteur, ce qui ouvre le débat juridique sur l'utilisation des données d'entraînement."},
  {year:"2024", color:"blue", name:"Un cadre légal et éthique",
   desc:"L'Union européenne adopte l'AI Act",
   detail:"L'Union européenne adopte l'AI Act, premier texte au monde à encadrer l'intelligence artificielle de façon globale. Il classe les systèmes selon leur niveau de risque et impose des obligations de transparence : documentation des modèles, information des utilisateurs et marquage des contenus générés."},
  {year:"2026", color:"green", name:"Les films générés par IA",
   desc:"Le cinéma entièrement produit par la machine",
   detail:"En Inde, Maharaja in Denims devient le premier long-métrage de Bollywood entièrement généré par IA : décors, mise en scène et acteurs, seule la musique restant humaine. Adapté du roman de Khushwant Singh et produit par le studio Intelliflicks, le film coûte dix fois moins cher qu'une production classique."}
];

(function(){
  const frise = document.getElementById('frise');
  if(!frise) return;
  const viewport = document.getElementById('frise-viewport');
  const scroller = document.getElementById('frise-scroller');
  const rowsEl = document.getElementById('frise-rows');
  const mq = window.matchMedia('(max-width:760px)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.setAttribute('role','status');
  bubble.setAttribute('aria-live','polite');
  frise.appendChild(bubble);

  let active = null;
  const itemEls = [];

  function build(){
    const row = document.createElement('div'); row.className = 'row';
    const line = document.createElement('div'); line.className = 'line';
    const items = document.createElement('div'); items.className = 'items';
    DATA.forEach(function(d, idx){
      const it = document.createElement('button');
      it.type = 'button';
      it.className = 'item';
      it.dataset.color = d.color;
      it.setAttribute('aria-expanded','false');
      it.innerHTML =
        '<span class="year">'+d.year+'</span><span class="dot"></span><span class="stem"></span>'+
        '<span class="name">'+d.name+'</span><span class="desc">'+d.desc+'</span>';
      it.addEventListener('click', function(e){ e.stopPropagation(); select(idx); });
      items.appendChild(it);
      itemEls[idx] = it;
    });
    row.append(line, items);
    rowsEl.appendChild(row);
  }

  /* ---------- défilement horizontal ---------- */
  function maxScroll(){ return Math.max(0, scroller.scrollWidth - scroller.clientWidth); }

  function sizeTrack(){
    const line = rowsEl.querySelector('.line'), items = rowsEl.querySelector('.items');
    if(!line || !items) return;
    if(mq.matches){ line.style.width = frise.style.minWidth = ''; return; }
    const w = items.scrollWidth;
    if(w){ line.style.right = 'auto'; line.style.width = w + 'px'; frise.style.minWidth = w + 'px'; }
  }

  function updateEdges(){
    const m = maxScroll(), on = !mq.matches;
    viewport.classList.toggle('can-left', on && scroller.scrollLeft > 4);
    viewport.classList.toggle('can-right', on && scroller.scrollLeft < m - 4);
  }
  scroller.addEventListener('scroll', updateEdges, {passive:true});

  function center(idx){
    if(mq.matches) return;
    const sr = scroller.getBoundingClientRect();
    const ir = itemEls[idx].getBoundingClientRect();
    const left = ir.left - sr.left + scroller.scrollLeft + ir.width/2 - scroller.clientWidth/2;
    scroller.scrollTo({left: Math.max(0, Math.min(left, maxScroll())), behavior: reduce.matches ? 'auto' : 'smooth'});
  }

  /* glisser à la souris (le tactile et le trackpad défilent nativement) */
  let down = false, dragging = false, sx = 0, sl = 0, pid = null, blockClick = false;
  scroller.addEventListener('pointerdown', function(e){
    if(mq.matches || e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('.bubble')) return;
    down = true; dragging = false; sx = e.clientX; sl = scroller.scrollLeft; pid = e.pointerId;
  });
  scroller.addEventListener('pointermove', function(e){
    if(!down || e.pointerId !== pid) return;
    const dx = e.clientX - sx;
    if(!dragging && Math.abs(dx) > 5){
      dragging = true;
      scroller.classList.add('dragging');
      try{ scroller.setPointerCapture(pid); }catch(_){}
    }
    if(dragging) scroller.scrollLeft = sl - dx;
  });
  function endDrag(){
    if(!down) return;
    down = false;
    if(dragging){
      dragging = false;
      blockClick = true; setTimeout(function(){ blockClick = false; }, 0);
      scroller.classList.remove('dragging');
      try{ scroller.releasePointerCapture(pid); }catch(_){}
    }
  }
  scroller.addEventListener('pointerup', endDrag);
  scroller.addEventListener('pointercancel', endDrag);
  scroller.addEventListener('dragstart', function(e){ e.preventDefault(); });
  /* un glissement ne doit jamais compter comme un clic */
  scroller.addEventListener('click', function(e){
    if(blockClick){ e.stopPropagation(); e.preventDefault(); }
  }, true);

  /* ---------- bulle ---------- */
  function place(idx){
    const item = itemEls[idx];
    if(mq.matches){
      bubble.classList.add('inline');
      bubble.style.left = bubble.style.top = '';
      item.after(bubble);
      return;
    }
    bubble.classList.remove('inline');
    if(bubble.parentNode !== frise) frise.appendChild(bubble);
    const fr = frise.getBoundingClientRect();
    const dot = item.querySelector('.dot').getBoundingClientRect();
    const nameBottom = item.querySelector('.name').getBoundingClientRect().bottom;
    const w = bubble.offsetWidth;
    const cx = dot.left + dot.width/2 - fr.left;
    const left = Math.max(8, Math.min(cx - w/2, fr.width - w - 8));
    bubble.style.left = left + 'px';
    bubble.style.top = (nameBottom - fr.top + 14) + 'px';
  }

  function select(idx){
    if(idx === active){ reset(); return; }
    const first = !bubble.classList.contains('show');
    const d = DATA[idx];
    active = idx;
    itemEls.forEach(function(el, i){
      el.classList.toggle('active', i === idx);
      el.setAttribute('aria-expanded', String(i === idx));
    });
    frise.classList.add('detail');
    bubble.dataset.color = d.color;
    bubble.innerHTML = '<b>'+d.year+' — '+d.name+'</b>'+d.detail;
    if(first) bubble.style.transitionProperty = 'opacity, visibility';
    place(idx);
    if(first){ void bubble.offsetWidth; bubble.style.transitionProperty = ''; }
    bubble.classList.add('show');
    if(mq.matches) bubble.scrollIntoView({behavior:'smooth', block:'nearest'});
    else center(idx);
  }

  function reset(){
    active = null;
    bubble.classList.remove('show');
    frise.classList.remove('detail');
    itemEls.forEach(function(el){ el.classList.remove('active'); el.setAttribute('aria-expanded','false'); });
  }

  document.addEventListener('click', function(e){
    if(active !== null && !e.target.closest('.bubble')) reset();
  });
  document.addEventListener('keydown', function(e){
    if(active === null) return;               // les flèches ne servent que quand une date est ouverte
    if(e.key === 'Escape') reset();
    else if(e.key === 'ArrowRight' && active < DATA.length-1){ e.preventDefault(); select(active+1); }
    else if(e.key === 'ArrowLeft' && active > 0){ e.preventDefault(); select(active-1); }
  });

  let rt;
  function refresh(){
    clearTimeout(rt);
    rt = setTimeout(function(){
      sizeTrack(); updateEdges();
      if(active === null) return;
      const i = active; active = null; bubble.classList.remove('show'); select(i);
    }, 120);
  }
  window.addEventListener('resize', sizeTrack);
  window.addEventListener('resize', refresh);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

  const section = frise.closest('details');
  if(section) section.addEventListener('toggle', function(){ if(!section.open) reset(); else { sizeTrack(); updateEdges(); } });

  /* utilisé par les liens « repères » du pied de page */
  window.friseSelect = function(i){ if(i !== active && DATA[i]) select(i); };

  build();
  sizeTrack();
  updateEdges();
})();
