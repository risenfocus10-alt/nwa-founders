const RSS_URL = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://feeds.transistor.fm/nwa-founders');

async function fetchEpisodes() {
  try {
    const response = await fetch(RSS_URL);
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, 'text/xml');
    const items = xml.querySelectorAll('item');

    return Array.from(items).map(item => ({
      title: item.querySelector('title')?.textContent || '',
      description: item.querySelector('description')?.textContent || '',
      pubDate: item.querySelector('pubDate')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      duration: item.querySelector('duration')?.textContent || '',
      image: item.querySelector('image')?.getAttribute('href') ||
             item.querySelector('[url]')?.getAttribute('url') || ''
    }));
  } catch(err) {
    console.error('RSS fetch failed:', err);
    return [];
  }
}

function parseEpisodeNumber(title) {
  const match = title.match(/#(\d+)/);
  return match ? `EPISODE #${match[1]}` : 'EPISODE';
}

function parseGuestName(title) {
  return title.replace(/#\d+\s*-\s*/, '').split('(')[0].trim().toUpperCase();
}

function parseCompany(title) {
  const match = title.match(/\(([^)]+)\)/);
  return match ? match[1].toUpperCase() : '';
}

function stripHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function getExcerpt(description, maxLength = 200) {
  const text = stripHTML(description);
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

async function initEpisodePage() {
  const container = document.getElementById('all-episodes');
  if (!container) return;

  container.innerHTML = '<p style="color:var(--gray);font-family:DM Sans;padding:40px 0;">Loading episodes...</p>';

  const episodes = await fetchEpisodes();

  if (episodes.length === 0) {
    container.innerHTML = '<p style="color:var(--gray);font-family:DM Sans;padding:40px 0;">Episodes coming soon. <a href="https://open.spotify.com/show/4zJaXxp2mWZzPlL6FvIxiC" style="color:var(--gold)">Listen on Spotify →</a></p>';
    return;
  }

  container.innerHTML = episodes.map(ep => `
    <div class="episode-card" data-guest="${parseGuestName(ep.title)}">
      <div class="episode-img">
        <img src="${ep.image || 'assets/images/nwa-founders-logo.jpg'}" alt="${parseGuestName(ep.title)}" onerror="this.src='assets/images/nwa-founders-logo.jpg'" />
        <div class="episode-img-corner"></div>
      </div>
      <div class="episode-info">
        <p class="episode-num">${parseEpisodeNumber(ep.title)}</p>
        <h3 class="episode-guest">${parseGuestName(ep.title)}</h3>
        ${parseCompany(ep.title) ? `<p class="episode-company">${parseCompany(ep.title)}</p>` : ''}
        <p class="episode-desc">${getExcerpt(ep.description, 280)}</p>
        <div class="episode-platforms">
          <a href="${ep.link || 'https://open.spotify.com/show/4zJaXxp2mWZzPlL6FvIxiC'}" target="_blank" class="platform-btn">SPOTIFY</a>
          <a href="https://podcasts.apple.com/us/podcast/nwa-founders/id1778543715" target="_blank" class="platform-btn">APPLE PODCASTS</a>
          <a href="https://www.youtube.com/channel/UC9_jiHttOOT7O-f7s6WTLXw" target="_blank" class="platform-btn">YOUTUBE</a>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof window.setupScrollAnimations === 'function') {
    window.setupScrollAnimations();
  }
}

document.addEventListener('DOMContentLoaded', initEpisodePage);
