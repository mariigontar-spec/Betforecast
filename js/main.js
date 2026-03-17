fetch("data/news.json")
  .then(response => response.json())
  .then(data => {
    const newsList = document.getElementById("news-list");
    if (!newsList) return;

    data.slice(0, 6).forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <img src="${article.image}" alt="${article.title}">
        <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
        <p>${article.text}</p>
      `;

      newsList.appendChild(card);
    });
  })
  .catch(error => console.log("News error:", error));

fetch("data/matches.json")
  .then(response => response.json())
  .then(data => {
    const matchesList = document.getElementById("matches-list");
    if (!matchesList) return;

    data.forEach(match => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><a href="match.html?id=${match.id}">${match.home} vs ${match.away}</a></td>
        <td>${match.date}</td>
        <td>${match.league}</td>
      `;

      matchesList.appendChild(row);
    });
  })
  .catch(error => console.log("Matches error:", error));
