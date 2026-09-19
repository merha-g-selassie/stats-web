// Detect base path — works from both root and chapitres/
const isChapter = location.pathname.includes('/chapitres/');
const base      = isChapter ? '../' : './';
const chapBase  = isChapter ? ''    : 'chapitres/';

document.querySelector('.nav').innerHTML = `
  <div class="nav-theme nav-theme-top">
    <div class="nav-theme-label">Apparence</div>
    <div class="theme-switch" role="group" aria-label="Thème d’affichage">
      <button type="button" data-theme-choice="auto" aria-pressed="false" title="Suivre le thème du système">Auto</button>
      <button type="button" data-theme-choice="light" aria-pressed="false">Clair</button>
      <button type="button" data-theme-choice="dark" aria-pressed="false">Sombre</button>
    </div>
  </div>

  <div class="nav-section-label">Introduction</div>
  <a href="${base}index.html"><span class="ch-num">—</span> Table des matières</a>

  <div class="nav-section-label">Fondements</div>
  <a href="${chapBase}ch01.html"><span class="ch-num">01</span> Définitions de base</a>
  <a href="${chapBase}ch02.html"><span class="ch-num">02</span> Variables ind. vs dép.</a>
  <a href="${chapBase}ch03.html"><span class="ch-num">03</span> Types de données</a>
  <a href="${chapBase}ch04.html"><span class="ch-num">04</span> Distributions de fréquences</a>

  <div class="nav-section-label">Statistiques descriptives</div>
  <a href="${chapBase}ch05.html"><span class="ch-num">05</span> Visualisation — qualitatif</a>
  <a href="${chapBase}ch06.html"><span class="ch-num">06</span> Visualisation — quantitatif</a>
  <a href="${chapBase}ch07.html"><span class="ch-num">07</span> Tendance centrale</a>
  <a href="${chapBase}ch08.html"><span class="ch-num">08</span> Mesures de dispersion</a>

  <div class="nav-section-label">Distribution & probabilités</div>
  <a href="${chapBase}ch09.html"><span class="ch-num">09</span> Distribution normale</a>
  <a href="${chapBase}ch10.html"><span class="ch-num">10</span> Z-scores</a>
  <a href="${chapBase}ch11.html"><span class="ch-num">11</span> Probabilités</a>
  <a href="${chapBase}ch12.html"><span class="ch-num">12</span> Permutations & combinaisons</a>
  <a href="${chapBase}ch13.html"><span class="ch-num">13</span> Loi des grands nombres</a>

  <div class="nav-section-label">Corrélation & inférence</div>
  <a href="${chapBase}ch14.html"><span class="ch-num">14</span> Scatter plots</a>
  <a href="${chapBase}ch15.html"><span class="ch-num">15</span> Corrélation de Pearson</a>
  <a href="${chapBase}ch16.html"><span class="ch-num">16</span> Hypothesis testing</a>
  <a href="${chapBase}ch17.html"><span class="ch-num">17</span> Corrélation de Spearman</a>
  <a href="${chapBase}ch18.html"><span class="ch-num">18</span> Régression linéaire</a>
  <a href="${chapBase}ch19.html"><span class="ch-num">19</span> Corrélation vs causalité</a>

`;

// Active link
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === current) a.classList.add('active');
});

// Mobile toggle
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove('open');
  });
}

if (window.statsTheme && document.readyState !== 'loading') {
  document.querySelectorAll('[data-theme-choice]').forEach(b => b.setAttribute('aria-pressed', b.dataset.themeChoice === window.statsTheme.getPreference() ? 'true' : 'false'));
}
