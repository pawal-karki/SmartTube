window.__rv = 1;
// Entrances: parts of each section rise in as they scroll into view.
const rv = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  rv.forEach((el) => io.observe(el));
} else {
  rv.forEach((el) => el.classList.add('in'));
}

// The live thing: the remote. Arrow keys or the cells move between the four real screens.
const imgs = [...document.querySelectorAll('#stage img')];
const tabs = [...document.querySelectorAll('.tabs button')];
const text = document.getElementById('try-text');
let cur = 0;
function show(i) {
  cur = (i + imgs.length) % imgs.length;
  imgs.forEach((im, k) => im.classList.toggle('on', k === cur));
  tabs.forEach((t, k) => t.setAttribute('aria-selected', String(k === cur)));
  text.textContent = imgs[cur].dataset.text;
}
tabs.forEach((t, k) => t.addEventListener('click', () => show(k)));
document.getElementById('prev').addEventListener('click', () => show(cur - 1));
document.getElementById('next').addEventListener('click', () => show(cur + 1));
document.addEventListener('keydown', (e) => {
  const inView = document.getElementById('try').getBoundingClientRect();
  if (inView.bottom < 0 || inView.top > innerHeight) return;
  if (e.key === 'ArrowRight') show(cur + 1);
  if (e.key === 'ArrowLeft') show(cur - 1);
});

// The download picker: points the button at the file for the chosen TV.
const base = 'https://github.com/pawal-karki/SmartTube/releases/latest/download/SmartTube_Pawal_32.68_';
const notes = {
  universal: 'Universal file, about 40 MB. Works on every box.',
  'armeabi-v7a': '32-bit file, about 27 MB. For most boxes, even ones with 64-bit chips.',
  'arm64-v8a': '64-bit file, about 29 MB. If it will not install, take the 32-bit one.'
};
const go = document.getElementById('pick-go');
document.querySelectorAll('#pick input').forEach((r) => r.addEventListener('change', () => {
  go.href = base + r.value + '.apk';
  document.getElementById('pick-note').textContent = notes[r.value];
}));

// Copy the release link for the Downloader app.
const copyBtn = document.getElementById('copy');
const linkEl = document.getElementById('dl-link');
copyBtn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(linkEl.value); } catch { linkEl.select(); document.execCommand('copy'); }
  copyBtn.textContent = 'Copied';
  setTimeout(() => { copyBtn.textContent = 'Copy link'; }, 2000);
});
