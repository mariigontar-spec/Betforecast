fetch("data/news.json")
  .then(response => response.json())
  .then(data => {

    const newsList = document.getElementById("news-list");

    data.forEach(article => {

      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <img src="${article.image}">
<h3>${article.title}</h3>
<p>${article.text}</p>
      `;

      newsList.appendChild(card);

    });

  });
