/* ============================================
   ACTEURS DE LA CONTROVERSE
   Pour modifier une fiche, changez la liste ACTEURS.
   ============================================ */
const DOMAINES = {
  eco: { label: "Économique", color: "blue" },
  tech: { label: "Technique", color: "green" },
  pol: { label: "Politique", color: "blue" },
  jur: { label: "Juridique", color: "green" },
  eth: { label: "Éthique", color: "blue" },
  art: { label: "Artistique", color: "green" }
};

const ACTEURS = [
  {
    nom: "Sam Altman",
    domaine: "eco",
    photo: "sam.webp",
    statut: "PDG et cofondateur d'OpenAI (ChatGPT, DALL·E)",
    position: "Défend l'IA comme outil de création",
    bio: "Entrepreneur américain né en 1985, il a présidé l'incubateur Y Combinator avant de diriger OpenAI. Il reconnaît les bouleversements économiques à venir, mais présente l'IA générative comme un levier qui décuple la créativité humaine, à l'image de la photographie en son temps. Il plaide pour un équilibre entre innovation et partage de la valeur.",
    citation: "Si les gens ont quelque chose d'intéressant à dire, ils le font entendre, et le monde en profite. (traduction libre, interview de Varun Mayya, avril 2025)"
  },
  {
    nom: "David Holz",
    domaine: "tech",
    photo: "David-Holz.png",
    statut: "Fondateur et dirigeant de Midjourney",
    position: "Conçoit l'IA comme un moteur d'imagination",
    bio: "Défenseur d'une approche humaniste de la technologie, il décrit Midjourney comme une « voiture pour l'esprit ». Il affirme que le but n'est pas de remplacer les artistes, mais d'ouvrir un espace d'exploration visuelle accessible à tous pour imaginer de nouveaux mondes.",
    citation: "L'ordinateur n'est pas un substitut à l'artiste, c'est un amplificateur d'imagination pour l'humanité entière."
  },
  {
    nom: "Refik Anadol",
    domaine: "art",
    photo: "refik.jpg",
    statut: "Artiste numérique et pionnier de l'art assisté par l'IA",
    position: "Utilise les algorithmes comme un nouveau pigment",
    bio: "Pionnier reconnu de l'art génératif mondial, il mobilise des dizaines de millions de données publiques et institutionnelles (notamment en partenariat avec le MoMA) pour sculpter des architectures immersives. Pour lui, l'IA repousse les frontières de l'art contemporain.",
    citation: "L'intelligence artificielle n'est pas une menace : c'est un pinceau qui utilise les données et la mémoire comme pigments."
  },
  {
    nom: "Karla Ortiz",
    domaine: "jur",
    photo: "Karla.jpg",
    statut: "Concept Artist et illustratrice internationale",
    position: "Dénonce le pillage de l'identité des créateurs",
    bio: "Figure de proue de la fronde des artistes visuels, elle est l'une des principales plaignantes dans le recours collectif historique (class-action) intenté contre Stability AI, Midjourney et DeviantArt. Elle dénonce l'exploitation sans consentement de millions d'œuvres protégées.",
    citation: "Ce n'est pas de l'inspiration, c'est du vol pur et simple de notre travail et de notre identité artistique."
  },
  {
    nom: "Sarah Andersen",
    domaine: "art",
    photo: "sarah.jpg",
    statut: "Autrice de bande dessinée (Sarah's Scribbles)",
    position: "Alerte sur la copie industrielle de style",
    bio: "Créatrice de bandes dessinées lues par des millions de personnes à travers le monde, elle est co-plaignante dans le procès collectif contre les générateurs d'images. À travers des tribunes remarquées, elle témoigne de la dévalorisation du travail manuel et du pillage de style sans rétribution.",
    citation: "Quand des modèles s'entraînent à reproduire exactement mon style sans mon accord, c'est mon gagne-pain et ma voix qu'on confisque."
  },
  {
    nom: "Ed Newton-Rex",
    domaine: "eth",
    photo: "ed newton.png",
    statut: "Compositeur, ex-VP audio chez Stability AI, fondateur de Fairly Trained",
    position: "Refuse le « fair use » abusif et promeut des modèles éthiques",
    bio: "Ancien vice-président de la division audio chez Stability AI, il a démissionné publiquement car il refusait de cautionner l'entraînement sur des œuvres protégées sous couvert de fair use. Il a fondé l'organisme Fairly Trained, qui attribue un label aux modèles respectant le consentement des créateurs.",
    citation: "Je démissionne car je ne suis pas d'accord avec l'idée que l'entraînement d'IA sur des œuvres protégées relève du « fair use »."
  },
  {
    nom: "Suchir Balaji",
    domaine: "jur",
    photo: "suchir.png",
    statut: "Ancien chercheur chez OpenAI, lanceur d'alerte",
    position: "Estime la collecte de données massivement illégale",
    bio: "Après quatre ans chez OpenAI à développer les fondations de ChatGPT, il quitte l'entreprise à l'été 2024. Dans une tribune retentissante au New York Times, il a affirmé que l'entraînement commercial sur le Web outrepasse la doctrine légale du fair use et précarise les créateurs.",
    citation: "Si vous croyez ce que je crois, vous devez simplement quitter l'entreprise. (New York Times, 23 octobre 2024)"
  },
  {
    nom: "Ben Zhao",
    domaine: "tech",
    photo: "ben.png",
    statut: "Professeur d'informatique, Université de Chicago",
    position: "Arme techniquement les artistes contre l'aspiration des données",
    bio: "Chercheur en sécurité informatique, il a conçu avec son équipe les outils de protection Glaze et Nightshade. Ces solutions modifient subtilement les pixels d'une image pour la rendre inexploitable par l'apprentissage des IA sans altérer sa perception par l'œil humain.",
    citation: "J'aimerais faire advenir un monde où l'IA a des limites, des garde-fous, des frontières éthiques imposées par des outils."
  },
  {
    nom: "Thierry Breton",
    domaine: "pol",
    photo: "breton.png",
    statut: "Ancien commissaire européen au marché intérieur (2019-2024)",
    position: "Pose un cadre réglementaire contraignant",
    bio: "L'un des architectes majeurs de l'AI Act européen. Il a défendu l'obligation de transparence sur les jeux de données d'entraînement et le respect des droits de propriété intellectuelle par les éditeurs de modèles de fondation.",
    citation: "Nous réglementons le moins possible, mais autant que nécessaire. (mars 2024)"
  }
];

(function(){
  const grid = document.getElementById('acteurs-grid');
  if(!grid) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const initiales = n => n.split(' ').map(w => w[0]).slice(0,2).join('');
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');

  ACTEURS.forEach(function(a, i){
    const d = DOMAINES[a.domaine] || { label: "Débat", color: "blue" };
    const c = document.createElement('article');
    c.className = 'acteur ' + (i % 2 ? 'droite' : 'gauche');
    c.dataset.color = d.color;
    // C'est ici que sont appliqués les modifications "Secteur : " et "« »"
    c.innerHTML =
      '<div class="acteur-photo"><span>'+initiales(a.nom)+'</span><img src="'+a.photo+'" alt="Portrait de '+esc(a.nom)+'" loading="lazy" onerror="this.remove()"></div>'+
      '<div class="acteur-texte">'+
        '<span class="acteur-tag">Secteur : '+d.label+'</span>'+
        '<h3>'+esc(a.nom)+'</h3>'+
        '<p class="acteur-statut">'+esc(a.statut)+'</p>'+
        '<p class="acteur-bio">'+esc(a.bio)+'</p>'+
        '<blockquote>« '+esc(a.citation)+' »</blockquote>'+
      '</div>';
    grid.appendChild(c);
  });

  const cards = grid.querySelectorAll('.acteur');
  if(reduce || !('IntersectionObserver' in window)){ cards.forEach(c => c.classList.add('vu')); return; }
  const io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('vu'); io.unobserve(e.target); } });
  }, {threshold:.2});
  cards.forEach(c => io.observe(c));
})();