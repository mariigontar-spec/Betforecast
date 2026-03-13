const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

fetch("data/news.json")
.then(response => response.json())
.then(data => {

const article = data.find(n => n.id == articleId);

const container = document.getElementById("article");

container.innerHTML = `
<h2>${article.title}</h2>
<img src="${article.image}" style="width:100%;max-width:700px">
<p>${article.text}</p>
`;

});
