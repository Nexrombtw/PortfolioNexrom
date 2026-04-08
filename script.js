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
   2. INSIGHTS DATA (Veille Tech: L'IA au Service du Développeur)
----------------------------------------------------------- */
const insightsData = [
  {
    date: "Aujourd'hui",
    tag: "Workflow & Productivité",
    title: "L'IA comme véritable Copilote de développement",
    desc: "Avant, on codait chaque ligne manuellement. Aujourd'hui, j'intègre des agents (LLMs) pour m'assister sur la création de structures de base (boilerplate), résoudre des erreurs de compilation ou optimiser mes algorithmes. Mon temps d'ingénierie se concentre désormais davantage sur l'architecture logicielle plutôt que sur la syntaxe pure.",
    link: "#"
  },
  {
    date: "Recherche",
    tag: "Moteur IA",
    title: "Perplexity AI : Une recherche sourcée",
    desc: "Plutôt que des requêtes classiques sur les moteurs de recherche, j’utilise Perplexity comme outil de pointe pour chercher des solutions techniques documentées. L’avantage majeur est d'obtenir une synthèse immédiate tout en ayant accès directement à la documentation officielle citée en source, réduisant mon temps de résolution de problèmes.",
    link: "https://www.perplexity.ai"
  },
  {
    date: "Code & IDE",
    tag: "Assistance Native",
    title: "L'intégration d'Assistants (IntelliJ, AntiGravity...)",
    desc: "L'intégration native d'outils d'intelligence artificielle au sein même de l'IDE (comme les plugins intelligents sur IntelliJ ou des agents de codage) transforme l'expérience de développement. Ces outils procurent des retours contextuels, de l'auto-complétion intelligente, et identifient instantanément les 'code smells' pour garantir un code propre.",
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

