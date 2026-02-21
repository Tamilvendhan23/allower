// ── Live clock ──
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function updateClock() {
  const dateEl = document.getElementById('clockDate');
  const timeEl = document.getElementById('clockTime');
  if (!dateEl || !timeEl) return;
  const now = new Date();
  dateEl.textContent = `${months[now.getMonth()]} ${now.getDate()}`;
  timeEl.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(n => String(n).padStart(2,'0')).join(':');
}
updateClock();
setInterval(updateClock, 1000);

// ── Tab navigation ──
const navItems    = document.querySelectorAll('.nav-item');
const pages       = document.querySelectorAll('.page');
const mainHeader  = document.getElementById('mainHeader');
const headerTitle = document.getElementById('headerTitle');

const HEADER_PAGES = ['passes'];

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.dataset.page;
    const title  = item.dataset.title;

    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');

    pages.forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + target).classList.add('active');

    headerTitle.textContent = title;

    // Show header only on passes page
    mainHeader.style.display = HEADER_PAGES.includes(target) ? 'flex' : 'none';
  });
});

// ── Register Service Worker (offline support) ──
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

// disable right click
document.addEventListener('contextmenu', e => e.preventDefault());
// ── QR code alternator ──
const qrImages = [
  'assets/images/qr_code.png',
  'assets/images/qr_code2.png'
];
let qrIndex = 0;

setInterval(() => {
  qrIndex = (qrIndex + 1) % qrImages.length;
  document.getElementById('qrImage').src = qrImages[qrIndex];
}, 4000);

// ── Ticket keypad logic ──
let ticketInput = '';
const MAX_LEN = 5;

function updateTicketDisplay() {
  for (let i = 0; i < MAX_LEN; i++) {
    const slot = document.getElementById('slot' + i);
    if (slot) {
      slot.textContent = ticketInput[i] ? ticketInput[i] : '_';
    }
  }
  const btn = document.getElementById('activateBtn');
  btn.classList.toggle('ready', ticketInput.length === MAX_LEN);
}

function keyPress(char) {
  if (ticketInput.length >= MAX_LEN) return;
  ticketInput += char;
  updateTicketDisplay();
}

function keyDelete() {
  if (ticketInput.length === 0) return;
  ticketInput = ticketInput.slice(0, -1);
  updateTicketDisplay();
}

function activatePass() {
  if (ticketInput.length < MAX_LEN) return;

  const enteredCode = ticketInput;

  // Switch to passes page
  navItems.forEach(n => n.classList.remove('active'));
  document.querySelector('[data-page="passes"]').classList.add('active');
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById('page-passes').classList.add('active');
  headerTitle.textContent = 'Passes';
  mainHeader.style.display = 'flex';

  // Show activated stamp with entered code
  const wrap = document.getElementById('activatedStampWrap');
  const text = document.getElementById('activatedStampText');
  text.innerHTML = `<span style="font-size:12px;letter-spacing:2px; line-height:7;">${enteredCode}</span>`;
  wrap.style.display = 'block';

  // Reset ticket input
  ticketInput = '';
  updateTicketDisplay();
}

// Init ticket display
updateTicketDisplay();

// ── Splash ──
const splash      = document.getElementById('splash');
const splashVideo = document.getElementById('splashVideo');

function hideSplash() {
  if (splash.style.display === 'none') return;
  splash.style.transition = 'opacity 0.5s ease';
  splash.style.opacity = '0';
  setTimeout(() => splash.style.display = 'none', 500);
}

splashVideo.addEventListener('ended', hideSplash);
setTimeout(hideSplash, 5000);