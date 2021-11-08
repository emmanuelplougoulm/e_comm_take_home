const message = "Write your JavaScript in src/main.js";
console.log(message);

function fetchList() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      createCard(res[0]);
    });
}

fetchList();

function createCard(post) {
  console.log("createCard triggered");
  console.log("post", post);
  const { title, body } = post;
  const cardElt = document.createElement("div");
  cardElt.classList.add("card");

  const imageElt = document.createElement("img");
  imageElt.classList.add("image");
  imageElt.src = "https://picsum.photos/300/200";

  const topElt = document.createElement("div");
  topElt.classList.add("top");
  topElt.appendChild(imageElt);

  const titleElt = document.createElement("div");
  titleElt.classList.add("title");
  console.log("title", title);

  titleElt.innerText = title.split(" ")[0];

  const descriptionElt = document.createElement("div");
  descriptionElt.classList.add("description");
  descriptionElt.innerText = body;

  const tagElt = document.createElement("div");
  tagElt.classList.add("tag");

  const tags = Array(2)
    .fill(tagElt)
    .forEach(function (element, index) {
      element.textContent = title.split(" ")[2 + index];
    });

  const tagsElt = document.createElement("div");
  tagsElt.classList.add("tags");

  const bottomElt = document.createElement("div");
  bottomElt.classList.add("bottom");

  bottomElt.appendChild(titleElt);
  bottomElt.appendChild(descriptionElt);
  // bottomElt.appendChild(tagsElt);

  console.log("bottomElt", bottomElt);

  cardElt.appendChild(topElt);
  cardElt.appendChild(bottomElt);

  const cardContainer = document.getElementById("cards-container");
  cardContainer.appendChild(cardElt);
  console.log("cardContainer", cardContainer);
}
