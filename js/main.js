const API_URL = 'YOUR_WEB_APP_URL_HERE'; // Remplace ceci par ton URL Web App

function fetchJournee(journee = 1) {
  fetch(`${API_URL}?journee=${journee}`)
    .then(response => response.json())
    .then(data => renderPage(data))
    .catch(err => console.error('Erreur chargement données', err));
}

function renderPage(data) {
  document.getElementById('journee-title').textContent = 'Journée ' + data.journee;
  const matchsContainer = document.getElementById('matchs');
  matchsContainer.innerHTML = '';

  data.matchs.forEach((match, index) => {
    const matchDiv = document.createElement('div');
    matchDiv.className = 'match';
    const result = match.score && match.score !== "" ? match.score : "À VENIR";

    matchDiv.innerHTML = `
      <div class="team-line">
        <span>${match.homeTeam}</span>
        <span>${result}</span>
        <span>${match.awayTeam}</span>
      </div>
      <div class="predictions">
        <div><strong>1</strong><br>${renderPronos(match.prono1, result, '1', index)}</div>
        <div><strong>N</strong><br>${renderPronos(match.pronoN, result, 'N', index)}</div>
        <div><strong>2</strong><br>${renderPronos(match.prono2, result, '2', index)}</div>
      </div>
    `;
    matchsContainer.appendChild(matchDiv);
  });

  const classementList = document.getElementById('classement-list');
  classementList.innerHTML = '';
  data.classement.forEach((joueur, i) => {
    const li = document.createElement('li');
    li.textContent = `${joueur.name} - ${joueur.gain}€`;
    classementList.appendChild(li);
  });
}

function renderPronos(pronos, score, type, index) {
  return pronos.map(p => {
    let label = p.name;
    if (index === 9 && p.prono) label += ` (${p.prono})`;
    if (score && score !== "À VENIR") label += ` (${p.pts} pts)`;
    const highlight = (score && score !== "À VENIR" && p.pts > 0) ? 'highlight' : '';
    return `<div class="${highlight}">${label}</div>`;
  }).join('');
}

fetchJournee(1); // Par défaut journée 1
