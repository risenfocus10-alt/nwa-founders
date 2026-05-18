const guestData = [
  { name: "Joe Ehrhardt",   company: "Teslar Software",              img: "assets/images/guests/joe-ehrhardt.jpg" },
  { name: "Are Traasdahl",  company: "Crisp / Arkade",               img: "assets/images/guests/are-traasdahl.jpg" },
  { name: "Burt Hanna",     company: "Hanna's Candle Company",       img: "assets/images/guests/burt-hanna.jpg" },
  { name: "Eric Howerton",  company: "AdFury.ai",                    img: "assets/images/guests/eric-howerton.jpg" },
  { name: "Brad Henry",     company: "Natural Capital",              img: "assets/images/guests/brad-henry.jpg" },
  { name: "Chris Chandler", company: "Chandler Capital Group",       img: "assets/images/guests/chris-chandler.jpg" },
  { name: "Jeremy Hudson",  company: "Specialized Real Estate Group", img: "assets/images/guests/jeremy-hudson.jpg" },
  { name: "Todd Simmons",   company: "Simmons Foods",                img: "assets/images/guests/todd-simmons.jpg" },
  { name: "John Musser",    company: "Custom Electronics",           img: "assets/images/guests/john-musser.jpg" },
  { name: "TJ Lefler",      company: "Lefler Capital",               img: "assets/images/guests/tj-lefler.jpg" },
  { name: "Mark Zweig",     company: "Zweig Group",                  img: "assets/images/guests/mark-zweig.jpg" },
  { name: "Cameron Clark",  company: "NWA Founders Host",            img: "assets/images/hosts/cameron-clark.jpg" },
  { name: "Nick Beyer",     company: "NWA Founders Host",            img: "assets/images/hosts/nick-beyer.jpg" }
];

function buildTile(guest) {
  const tile = document.createElement('div');
  tile.className = 'marquee-tile';

  const img = document.createElement('img');
  img.alt = guest.name;
  img.src = guest.img;
  img.onerror = () => tile.remove();

  const label = document.createElement('span');
  label.className = 'marquee-tile-label';
  label.textContent = guest.name + ' · ' + guest.company;

  tile.appendChild(img);
  tile.appendChild(label);
  return tile;
}

function buildMarquee(trackId, guests) {
  const track = document.getElementById(trackId);
  if (!track) return;
  if (!guests || guests.length === 0) return;
  const tiles = guests.map(buildTile).filter(Boolean);
  const clones = tiles.map(t => t.cloneNode(true));
  tiles.forEach(t => track.appendChild(t));
  clones.forEach(t => track.appendChild(t));
}

function buildAboutMarquee() {
  const tracks = [
    { id: 'about-track-1', guests: guestData },
    { id: 'about-track-2', guests: [...guestData].reverse() },
    { id: 'about-track-3', guests: guestData }
  ];
  tracks.forEach(({ id, guests }) => {
    const track = document.getElementById(id);
    if (!track) return;
    const tiles = guests.map(g => {
      const tile = document.createElement('div');
      tile.className = 'about-tile';
      const img = document.createElement('img');
      img.src = g.img;
      img.alt = g.name;
      img.onerror = () => tile.remove();
      tile.appendChild(img);
      return tile;
    });
    tiles.forEach(t => track.appendChild(t));
    tiles.forEach(t => track.appendChild(t.cloneNode(true)));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildMarquee('track-1', guestData);
  buildMarquee('track-2', [...guestData].reverse());
  buildMarquee('track-3', guestData);
  buildAboutMarquee();
});
