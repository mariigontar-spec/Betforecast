fetch("data/news.json")
  .then(response => response.json())
  .then(data => {

    const newsContainer = document.getElementById("news");

    data.forEach(article => {

      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.category} | ${article.date}</p>
      `;

      newsContainer.appendChild(div);

    });

  });
