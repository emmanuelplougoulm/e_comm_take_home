"use strict";

var message = "Write your JavaScript in src/main.js";
console.log(message);

function fetchList() {
  fetch("https://jsonplaceholder.typicode.com/posts").then(function (response) {
    return response.json();
  }).then(function (res) {
    console.log(res);
    createCard(res[0]);
  });
}

fetchList();

function createCard(post) {
  console.log("createCard triggered");
  console.log("post", post);
  var title = post.title,
      body = post.body;
  var cardElt = document.createElement("div");
  cardElt.classList.add("card");
  var imageElt = document.createElement("img");
  imageElt.classList.add("image");
  imageElt.src = "https://picsum.photos/300/200";
  var topElt = document.createElement("div");
  topElt.classList.add("top");
  topElt.appendChild(imageElt);
  var titleElt = document.createElement("div");
  titleElt.classList.add("title");
  console.log("title", title);
  titleElt.innerText = title.split(" ")[0];
  var descriptionElt = document.createElement("div");
  descriptionElt.classList.add("description");
  descriptionElt.innerText = body;
  var tagElt = document.createElement("div");
  tagElt.classList.add("tag");
  var tags = Array(2).fill(tagElt).forEach(function (element, index) {
    element.textContent = title.split(" ")[2 + index];
  });
  var tagsElt = document.createElement("div");
  tagsElt.classList.add("tags");
  var bottomElt = document.createElement("div");
  bottomElt.classList.add("bottom");
  bottomElt.appendChild(titleElt);
  bottomElt.appendChild(descriptionElt); // bottomElt.appendChild(tagsElt);

  console.log("bottomElt", bottomElt);
  cardElt.appendChild(topElt);
  cardElt.appendChild(bottomElt);
  var cardContainer = document.getElementById("cards-container");
  cardContainer.appendChild(cardElt);
  console.log("cardContainer", cardContainer);
}