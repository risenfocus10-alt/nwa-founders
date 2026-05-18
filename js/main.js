const nav = document.getElementById('main-nav');
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menu-overlay');
const overlayLinks = menuOverlay.querySelectorAll('a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

function openMenu() {
  hamburger.classList.add('open');
  menuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  menuOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlayLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ── Featured Episodes ── */
const featuredEpisodes = [
  {
    num: "EPISODE #40",
    guest: "JOE EHRHARDT",
    company: "TESLAR SOFTWARE",
    hook: "What does it look like to build a software company in a highly regulated industry while remaining innovative?",
    desc: "Joe shares the story behind building one of the fastest-growing fintech companies serving community banks across the country — from navigating early growth to scaling a mission-driven software business in NWA.",
    tags: ["FINTECH", "COMMUNITY BANKING", "COMPANY CULTURE"],
    img: "assets/images/guests/joe-ehrhardt.jpg",
    spotify: "https://open.spotify.com/show/4zJaXxp2mWZzPlL6FvIxiC",
    youtube: "https://www.youtube.com/channel/UC9_jiHttOOT7O-f7s6WTLXw",
    apple: "https://podcasts.apple.com/us/podcast/nwa-founders/id1778543715"
  },
  {
    num: "EPISODE #39",
    guest: "ARE TRAASDAHL",
    company: "CRISP / ARKADE",
    hook: "What if one of the biggest business opportunities in the world was hiding inside a problem most people never think about?",
    desc: "Are shares the story of building Crisp into a global data intelligence platform — and what brought him to Northwest Arkansas to build his next company, Arkade.",
    tags: ["DATA INTELLIGENCE", "SERIAL FOUNDER", "GLOBAL SCALE"],
    img: "assets/images/guests/are-traasdahl.jpg",
    spotify: "https://open.spotify.com/show/4zJaXxp2mWZzPlL6FvIxiC",
    youtube: "https://www.youtube.com/channel/UC9_jiHttOOT7O-f7s6WTLXw",
    apple: "https://podcasts.apple.com/us/podcast/nwa-founders/id1778543715"
  },
  {
    num: "EPISODE #27",
    guest: "BURT HANNA",
    company: "HANNA'S CANDLE COMPANY",
    hook: "What does it take to go from three truckloads of wax a month to 27 — and survive the chaos that follows?",
    desc: "Burt recounts the high-stakes early days of Hanna's Candle Company, buying into the business and scaling it through sheer grit, relationship-building, and servant leadership.",
    tags: ["MANUFACTURING", "SCALING", "SERVANT LEADERSHIP"],
    img: "assets/images/guests/burt-hanna.jpg",
    spotify: "https://open.spotify.com/show/4zJaXxp2mWZzPlL6FvIxiC",
    youtube: "https://www.youtube.com/channel/UC9_jiHttOOT7O-f7s6WTLXw",
    apple: "https://podcasts.apple.com/us/podcast/nwa-founders/id1778543715"
  },
  {
    num: "EPISODE #36",
    guest: "CHRIS CHANDLER",
    company: "CHANDLER CAPITAL GROUP",
    hook: "What does it look like to take a small, family-run manufacturing shop and turn it into a diversified, innovation-driven company competing on a national level?",
    desc: "Chris shares the real story behind building, losing, rebuilding, and ultimately redefining what success looks like in business. From taking on massive debt to buy the family company to navigating industry crashes and launching entirely new product lines.",
    tags: ["MANUFACTURING", "FAMILY BUSINESS", "DIVERSIFICATION"],
    img: "assets/images/guests/chris-chandler.jpg",
    spotify: "https://open.spotify.com/show/4zJaXxp2mWZzPlL6FvIxiC",
    youtube: "https://www.youtube.com/channel/UC9_jiHttOOT7O-f7s6WTLXw",
    apple: "https://podcasts.apple.com/us/podcast/nwa-founders/id1778543715"
  },
  {
    num: "EPISODE #29",
    guest: "MARK ZWEIG",
    company: "ZWEIG GROUP",
    hook: "What does it take to not only build a thriving company but to buy it back after it fails and make it stronger than ever?",
    desc: "Mark opens up about his multi-decade entrepreneurial journey. From fixing up houses and starting a consultancy from scratch, to surviving bankruptcy, private equity disasters, and buying back his own business.",
    tags: ["ENTREPRENEURSHIP", "RESILIENCE", "CONSULTING"],
    img: "assets/images/guests/mark-zweig.jpg",
    spotify: "https://open.spotify.com/show/4zJaXxp2mWZzPlL6FvIxiC",
    youtube: "https://www.youtube.com/channel/UC9_jiHttOOT7O-f7s6WTLXw",
    apple: "https://podcasts.apple.com/us/podcast/nwa-founders/id1778543715"
  }
];

function renderEpisodeCard(ep) {
  const tags = ep.tags.map(t => `<span class="episode-tag">${t}</span>`).join('');
  return `
    <article class="episode-card">
      <div class="episode-img">
        <img src="${ep.img}" alt="${ep.guest}" />
        <div class="episode-img-corner"></div>
      </div>
      <div class="episode-info">
        <p class="episode-num">${ep.num}</p>
        <h3 class="episode-guest">${ep.guest}</h3>
        <p class="episode-company">${ep.company}</p>
        <p class="episode-hook">${ep.hook}</p>
        <p class="episode-desc">${ep.desc}</p>
        <div class="episode-tags">${tags}</div>
        <div class="episode-platforms">
          <a href="${ep.spotify}" class="platform-btn" target="_blank" rel="noopener">Spotify</a>
          <a href="${ep.youtube}" class="platform-btn" target="_blank" rel="noopener">YouTube</a>
          <a href="${ep.apple}" class="platform-btn" target="_blank" rel="noopener">Apple</a>
        </div>
      </div>
    </article>
  `;
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about-inner, .host-card').forEach(el => {
    observer.observe(el);
  });

  document.querySelectorAll('.episode-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(el);
  });
}
window.setupScrollAnimations = setupScrollAnimations;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('featured-episodes');
  if (container) {
    container.innerHTML = featuredEpisodes.map(renderEpisodeCard).join('');
  }

  const searchInput = document.getElementById('episode-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('#all-episodes .episode-card').forEach(card => {
        const guest = (card.dataset.guest || '').toLowerCase();
        card.style.display = !query || guest.includes(query) ? '' : 'none';
      });
    });
  }

  setupScrollAnimations();
});
