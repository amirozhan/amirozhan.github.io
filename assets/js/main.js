/* =========================================================
   Brain explorer
   To add or edit a project, change the PROJECTS list below.
   x / y place the node on the brain drawing (600 × 480 grid):
   left is the front of the brain, right is the back (visual cortex).
   cat: "r" research, "a" applied projects, "c" community.
   Projects in the same cluster are joined by the lines in the
   brain-links group of index.html.
   ========================================================= */
const PROJECTS = [
  {
    id: "cb-som", cat: "r", x: 492, y: 212, label: "CB-SOM",
    title: "Credit-based self-organizing maps",
    org: "Bashivan Lab, McGill / Mila. ICLR 2025, first author",
    period: "2024–25",
    desc: "A novel approach on implementing self-organization rules, so deep networks develop brain-like topography with minimal loss in ImageNet accuracy.",
    chips: ["ICLR 2025", "PyTorch", "Topographic networks"],
    links: [
      { label: "Paper", href: "https://openreview.net/pdf?id=wMgr7wBuUo" },
      { label: "Project page", href: "https://amirozhan.github.io/CBSOM/" },
      { label: "Code", href: "https://github.com/BashivanLab/CBSOM" }
    ]
  },
  {
    id: "lateral-connectivity", cat: "r", x: 468, y: 292, label: "Lateral connectivity",
    title: "Local lateral connectivity is enough",
    org: "Nature Communications, co-author",
    period: "2026",
    desc: "Shows that local lateral connectivity alone is sufficient to reproduce cortex-like topographical organization in deep neural networks.",
    chips: ["Nature Communications", "Topography"],
    links: [] // TODO: add { label: "Paper", href: "..." }
  },
  {
    id: "visual-learning", cat: "r", x: 400, y: 250, label: "Visual learning",
    title: "Representational geometry predicts visual learning",
    org: "Université de Montréal. Healthy Brains, Healthy Lives Symposium 2024",
    period: "2023–24",
    desc: "Led an end-to-end project testing whether the representational geometry of neural networks predicts how specific human visual learning is. Designed online experiments in PsychoJS with real-time data collection.",
    chips: ["PsychoJS", "Human behaviour", "Representational similarity"],
    links: [{ label: "Abstract", href: "https://mjm.mcgill.ca/article/view/1140/880" }]
  },
  {
    id: "kernel-pooling", cat: "r", x: 440, y: 140, label: "Kernel avg. pooling",
    title: "Robust kernel ensembles",
    org: "Bashivan Lab, co-author. arXiv 2022",
    period: "2022",
    desc: "Co-authored kernel average pooling, a layer that lets networks learn ensembles of kernels for greater robustness.",
    chips: ["Robustness", "Deep learning"],
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2210.00062" }]
  },
  {
    id: "mineral-mapping", cat: "a", x: 178, y: 215, label: "Mineral mapping",
    title: "Canada Mineral Mapping",
    org: "Mila – Quebec AI Institute, Applied AI Research Intern",
    period: "2026",
    desc: "Designed and deployed deep-learning architectures for mineral resource identification. Worked in a multidisciplinary team with production-grade code review.",
    chips: ["Self-Supervised Learning", "Data pipelines"],
    links: []
  },
  {
    id: "aivalon", cat: "a", x: 232, y: 140, label: "AIVALON",
    title: "Detecting heart disease from body signals",
    org: "AIVALON, Data Scientist",
    period: "2024–25",
    desc: "Built models that detect coronary artery disease from heart rate, EKG and BVP signals using engineered signal features.",
    chips: ["Signal processing", "Full-stack"],
    links: []
  },
  {
    id: "pharmahacks", cat: "c", x: 215, y: 290, label: "PharmaHacks",
    title: "PharmaHacks",
    org: "President",
    period: "2021–23",
    desc: "Led McGill’s pharma and biotech hackathon, bringing in early sponsors such as Pfizer Canada. As president, ran the 2023 edition at Mila with 200+ participants, grew the team from 3 to 15+, and secured $18K+ in sponsorship.",
    chips: ["200+ participants", "$18K+ raised", "Team of 15+"],
    links: []
  },
  {
    id: "pharmahacks-ml", cat: "c", x: 290, y: 322, label: "Hackathon ML tracks",
    title: "Machine learning tracks for PharmaHacks 2025",
    org: "PharmaHacks, VP Machine Learning",
    period: "2024–25",
    desc: "Led the design of the PharmaHacks 2025 machine learning challenges: two tracks built around real-world biomedical problems, checked for feasibility and relevance with industry partners and researchers.",
    chips: ["2 ML tracks", "Biomedical applications"],
    links: []
  }
];

const KIND = { r: "Research", a: "Applied project", c: "Community" };

(function () {
  const brain = document.getElementById("brain");
  const card = document.getElementById("project-card");
  const list = document.getElementById("project-list");
  if (!brain || !card) return;

  let current = -1;
  const nodes = [];
  const listButtons = [];

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function icon(path) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    const p = document.createElementNS(ns, "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    return svg;
  }

  // Nodes on the brain
  PROJECTS.forEach((p, i) => {
    const b = el("button", "node");
    b.type = "button";
    b.dataset.cat = p.cat;
    b.style.left = (p.x / 600 * 100).toFixed(2) + "%";
    b.style.top = (p.y / 480 * 100).toFixed(2) + "%";
    b.style.animationDelay = (1.1 + i * 0.08).toFixed(2) + "s";
    b.setAttribute("aria-pressed", "false");
    b.setAttribute("aria-label", p.label + ", " + KIND[p.cat]);
    const hit = el("span", "node-hit");
    hit.appendChild(el("span", "node-dot"));
    b.appendChild(hit);
    b.appendChild(el("span", "node-label", p.label));
    b.addEventListener("click", () => select(i, true));
    brain.appendChild(b);
    nodes.push(b);

    if (list) {
      const lb = el("button", null, p.label);
      lb.type = "button";
      lb.setAttribute("aria-pressed", "false");
      lb.addEventListener("click", () => select(i, false));
      list.appendChild(lb);
      listButtons.push(lb);
    }
  });

  // Intro card: one button to start the tour
  const intro = card.querySelector(".card-intro");
  if (intro) {
    const start = el("button", "btn btn-ghost", "Start with CB-SOM");
    start.type = "button";
    start.addEventListener("click", () => select(0, false));
    intro.appendChild(start);
  }

  const links = Array.from(brain.querySelectorAll(".brain-links line"));
  const clusters = Array.from(brain.querySelectorAll(".brain-clusters g[data-cat]"));

  function render(p) {
    card.style.setProperty("--c", "var(--" + (p.cat === "r" ? "research" : p.cat === "a" ? "applied" : "community") + ")");
    card.replaceChildren();

    const top = el("div", "card-top");
    const kind = el("p", "card-kind");
    kind.appendChild(document.createTextNode(KIND[p.cat] + " "));
    kind.appendChild(el("time", null, p.period));
    top.appendChild(kind);

    const navBox = el("div", "card-nav");
    const prev = el("button", "icon-btn");
    prev.type = "button";
    prev.setAttribute("aria-label", "Previous project");
    prev.appendChild(icon("M15 6l-6 6 6 6"));
    prev.addEventListener("click", () => select((current + PROJECTS.length - 1) % PROJECTS.length, false));
    const next = el("button", "icon-btn");
    next.type = "button";
    next.setAttribute("aria-label", "Next project");
    next.appendChild(icon("M9 6l6 6-6 6"));
    next.addEventListener("click", () => select((current + 1) % PROJECTS.length, false));
    navBox.append(prev, next);
    top.appendChild(navBox);
    card.appendChild(top);

    card.appendChild(el("h2", null, p.title));
    card.appendChild(el("p", "card-org", p.org));
    card.appendChild(el("p", "card-desc", p.desc));

    if (p.chips.length) {
      const chips = el("div", "chips");
      p.chips.forEach((c) => chips.appendChild(el("span", "chip", c)));
      card.appendChild(chips);
    }

    if (p.links.length) {
      const box = el("div", "card-links");
      p.links.forEach((l, j) => {
        const a = el("a", "btn " + (j === 0 ? "btn-primary" : "btn-ghost"), l.label);
        a.href = l.href;
        if (/^https?:/.test(l.href) && l.href.indexOf("amirozhan.github.io") === -1) {
          a.target = "_blank";
          a.rel = "noopener";
          a.appendChild(icon("M7 17L17 7M9 7h8v8"));
        }
        box.appendChild(a);
      });
      card.appendChild(box);
    }
  }

  function select(i, fromBrain) {
    current = i;
    const p = PROJECTS[i];
    nodes.forEach((n, j) => {
      n.classList.toggle("is-active", j === i);
      n.setAttribute("aria-pressed", j === i ? "true" : "false");
    });
    listButtons.forEach((b, j) => b.setAttribute("aria-pressed", j === i ? "true" : "false"));
    links.forEach((l) => l.classList.toggle("is-on", l.dataset.a === p.id || l.dataset.b === p.id));
    clusters.forEach((g) => g.classList.toggle("is-on", g.dataset.cat === p.cat));
    render(p);
    if (history.replaceState) history.replaceState(null, "", "#project-" + p.id);
    // If the card is mostly out of view (below the brain), bring it up.
    if (fromBrain) {
      const r = card.getBoundingClientRect();
      if (r.top > window.innerHeight - 200) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
      }
    }
  }

  // Open a project straight from a shared link, e.g. /#project-cb-som
  const m = location.hash.match(/^#project-(.+)$/);
  if (m) {
    const idx = PROJECTS.findIndex((p) => p.id === m[1]);
    if (idx > -1) {
      select(idx, false);
      document.getElementById("work").scrollIntoView();
    }
  }
})();

/* Mobile menu */
(function () {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("nav-links");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });
})();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
