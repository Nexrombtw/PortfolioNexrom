/* -----------------------------------------------------------
   1. THEME MANAGEMENT (Dark/Light + Persistence)
----------------------------------------------------------- */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

// Icons
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');

function applyTheme(theme) {
  // DOM Update
  htmlEl.setAttribute('data-theme', theme);

  // Icon Update
  if (theme === 'dark') {
    if (iconSun) iconSun.style.display = 'block';
    if (iconMoon) iconMoon.style.display = 'none';
    if (metaThemeColor) metaThemeColor.setAttribute('content', '#0C0A09');
  } else {
    if (iconSun) iconSun.style.display = 'none';
    if (iconMoon) iconMoon.style.display = 'block';
    if (metaThemeColor) metaThemeColor.setAttribute('content', '#FAFAF9');
  }

  // Persistence
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
}

// Event Listener
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

// Run immediately
initTheme();


/* -----------------------------------------------------------
   2. INSIGHTS DATA (Veille Tech: IA & Recherche)
   Timeline: Août 2025 -> Février 2026
----------------------------------------------------------- */
const insightsData = [
  {
    date: "Août 2025",
    tag: "Découverte IA",
    title: "Premiers usages des LLM en développement",
    desc: "Exploration initiale de ChatGPT pour la génération de boilerplate code et la compréhension rapide de nouvelles documentations.",
    link: "#"
  },
  {
    date: "Sept. 2025",
    tag: "Productivité",
    title: "L'art du Prompt Engineering",
    desc: "Apprentissage des techniques de prompting (Context, Instruction, Output) pour obtenir des résultats de code plus précis et maintenables.",
    link: "#"
  },
  {
    date: "Oct. 2025",
    tag: "Qualité Code",
    title: "Refactoring assisté par l'IA",
    desc: "Utilisation de l'IA pour identifier les code smells et proposer des refactorisations (clean code) dans mes projets scolaires.",
    link: "#"
  },
  {
    date: "Nov. 2025",
    tag: "Documentation",
    title: "Génération de documentation technique",
    desc: "Test d'outils pour automatiser la rédaction de JSDoc et de README complets à partir du code source existant.",
    link: "#"
  },
  {
    date: "Déc. 2025",
    tag: "Recherche & Veille",
    title: "Découverte de Perplexity pour le dev",
    desc: "Basculement vers Perplexity pour une recherche technique sourcée et synthétisée, remplaçant partiellement les recherches Google classiques.",
    link: "https://www.perplexity.ai"
  },
  {
    date: "Janv. 2026",
    tag: "Workflow Pro",
    title: "L’IA intégrée au quotidien (Stage)",
    desc: "Intégration fluide dans mon workflow de stage : debugging complexe, explications d'erreurs et suggestions d'optimisation en temps réel.",
    link: "#"
  },
  {
    date: "Fév. 2026",
    tag: "Éthique & Limites",
    title: "Flexibilité, Hallucinations et RGPD",
    desc: "Prise de recul critique : vérification systématique du code généré (sécurité) et vigilance stricte sur la confidentialité des données injectées.",
    link: "#"
  }
];

const insightsContainer = document.getElementById('insights-container');

if (insightsContainer) {
  insightsContainer.innerHTML = insightsData.map((item, index) => `
        <a href="${item.link}" target="_blank" class="insight-card fade-up" style="--stagger: ${index + 1}">
            <span class="insight-meta">${item.date} • ${item.tag}</span>
            <h3 class="insight-title">${item.title}</h3>
            <p class="insight-excerpt">${item.desc}</p>
        </a>
    `).join('');
}


/* -----------------------------------------------------------
   3. NAVIGATION MOBILE
----------------------------------------------------------- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Close on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


/* -----------------------------------------------------------
   4. SCROLL ANIMATIONS (Intersection Observer)
----------------------------------------------------------- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  // Extract visible entries and stagger them dynamically based on DOM order or entry order
  let visibleEntries = entries.filter(entry => entry.isIntersecting);
  
  visibleEntries.forEach((entry, index) => {
    // If it doesn't have an inline stagger, assign one dynamically
    if (!entry.target.style.getPropertyValue('--stagger')) {
      entry.target.style.setProperty('--stagger', index + 1);
    }
    
    // Slight delay to ensure CSS variable is applied before the visible class triggers the transition
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, 10);
      
    observer.unobserve(entry.target);
  });
}, observerOptions);

// Observe existent elements + newly added ones
setTimeout(() => {
  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });
}, 100); // Small delay to ensure dynamic content is ready

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* -----------------------------------------------------------
   5. BENTO SPOTLIGHT EFFECT (Mouse Tracking)
----------------------------------------------------------- */
document.querySelectorAll('.bento-cell').forEach(cell => {
  cell.addEventListener('mousemove', e => {
    const rect = cell.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cell.style.setProperty('--mouse-x', `${x}px`);
    cell.style.setProperty('--mouse-y', `${y}px`);
  });
});

/* -----------------------------------------------------------
   6. SKILLS MATRIX MODAL (Interactive Proofs)
----------------------------------------------------------- */
const proofModal = document.getElementById('proof-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const proofCells = document.querySelectorAll('.has-proofs');

if (proofModal && proofCells.length > 0) {
  // Open modal on cell click
  proofCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const skillTitle = cell.getAttribute('data-skill-title');
      const targetId = cell.getAttribute('data-proof-target');
      const proofsHtml = cell.getAttribute('data-proofs');
      
      if (skillTitle) {
        modalTitle.textContent = skillTitle;
        
        if (targetId) {
            // New Template System
            const template = document.getElementById(targetId);
            if (template) {
                modalBody.innerHTML = '';
                modalBody.appendChild(template.content.cloneNode(true));
                proofModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        } else if (proofsHtml) {
            // Old fallback system
            modalBody.innerHTML = proofsHtml;
            proofModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  // Close modal logic
  const closeModal = () => {
    proofModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    // Delay to clear content after animation
    setTimeout(() => {
      if (!proofModal.classList.contains('active')) {
        modalTitle.textContent = 'Détails';
        modalBody.innerHTML = '';
      }
    }, 400); 
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close when clicking outside of modal-content
  proofModal.addEventListener('click', (e) => {
    // If we click on the modal overlay directly, not its content
    if (e.target === proofModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && proofModal.classList.contains('active')) {
      closeModal();
    }
  });
}

