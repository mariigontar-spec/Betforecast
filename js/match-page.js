const urlParams = new URLSearchParams(window.location.search);
const game = urlParams.get("game");

// база матчей (как мини backend)
const urlParams = new URLSearchParams(window.location.search);
const game = urlParams.get("game");

const matches = {
  mci_ars: {
    teams: ["Man City", "Arsenal"],
    score: "2 - 2",
    probs: [54, 24, 22],
    summary: "Man City controls more territory, but Arsenal still carries enough quality to keep the match balanced."
  },

  rm_bar: {
    teams: ["Real Madrid", "Barcelona"],
    score: "1 - 1",
    probs: [32, 46, 22],
    summary: "Balanced game expected. Midfield control and first-goal timing will shape the match."
  },

  liv_tot: {
    teams: ["Liverpool", "Tottenham"],
    score: "2 - 1",
    probs: [48, 28, 24],
    summary: "Liverpool projects stronger shot volume, while Tottenham remains dangerous in transition."
  },

  psg_lyo: {
    teams: ["PSG", "Lyon"],
    score: "3 - 1",
    probs: [61, 21, 18],
    summary: "PSG rates higher in possession control and expected goal output, especially at home."
  }
};

const match = matches[game] || matches["mci_ars"];

document.querySelector(".match-feature-card h3").innerText =
  `${match.teams[0]} vs ${match.teams[1]}`;

document.querySelector(".featured-scoreline").innerText =
  match.score;

document.querySelectorAll(".team-name")[0].innerText =
  match.teams[0];

document.querySelectorAll(".team-name")[1].innerText =
  match.teams[1];

const probBoxes = document.querySelectorAll(".featured-prob-box strong");
probBoxes[0].innerText = match.probs[0] + "%";
probBoxes[1].innerText = match.probs[1] + "%";
probBoxes[2].innerText = match.probs[2] + "%";

document.querySelector(".match-summary-text").innerText =
  match.summary;

// если матч не найден
const match = matches[game] || matches["ars_che"];


// === ВСТАВКА В HTML ===

// заголовок
document.querySelector(".match-feature-card h3").innerText =
  `${match.teams[0]} vs ${match.teams[1]}`;

// счет
document.querySelector(".featured-scoreline").innerText =
  match.score;

// команды слева и справа
document.querySelectorAll(".team-name")[0].innerText =
  match.teams[0];

document.querySelectorAll(".team-name")[1].innerText =
  match.teams[1];

// вероятности
const probBoxes = document.querySelectorAll(".featured-prob-box strong");

probBoxes[0].innerText = match.probs[0] + "%";
probBoxes[1].innerText = match.probs[1] + "%";
probBoxes[2].innerText = match.probs[2] + "%";

// текст
document.querySelector(".match-summary-text").innerText =
  match.summary;
