const urlParams = new URLSearchParams(window.location.search);
const game = urlParams.get("game");

// база матчей (как мини backend)
const matches = {
  ars_che: {
    league: "Premier League",
    teams: ["Arsenal", "Chelsea"],
    score: "2 - 1",
    probs: [47, 28, 25],
    summary: "Arsenal stronger in structure and chance creation. Chelsea dangerous in transitions."
  },

  liv_tot: {
    league: "Premier League",
    teams: ["Liverpool", "Tottenham"],
    score: "2 - 1",
    probs: [52, 24, 24],
    summary: "Liverpool high press dominates. Tottenham relies on counter attacks."
  },

  rm_bar: {
    league: "La Liga",
    teams: ["Real Madrid", "Barcelona"],
    score: "1 - 1",
    probs: [38, 34, 28],
    summary: "Balanced game expected. Midfield battle defines tempo."
  }
};

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
