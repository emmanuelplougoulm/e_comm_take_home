"use strict";

var ITEMS_PER_PAGE = 9;
var PAGE_NUMBER = 1;
var POSTS;
var ACTIVE_POSTS;

function fetchList() {
  fetch("https://jsonplaceholder.typicode.com/posts").then(function (response) {
    return response.json();
  }).then(function (res) {
    POSTS = res;
    ACTIVE_POSTS = paginateItems(POSTS);
    ACTIVE_POSTS.forEach(createCard);
    createGreyCard();
  });
}

fetchList();

function onClickPrevious() {
  if (PAGE_NUMBER === 2) {
    PAGE_NUMBER = 1;
    displayCards();
  }
}

function onClickNext(event) {
  if (PAGE_NUMBER === 1) {
    PAGE_NUMBER = 2;
    displayCards();
  }
}

function paginateItems() {
  var offset = (PAGE_NUMBER - 1) * (ITEMS_PER_PAGE - 1);
  return POSTS.slice(offset, offset + ITEMS_PER_PAGE - 1);
}

function displayCards() {
  var cards = document.getElementsByClassName("card");
  Array.from(cards).forEach(function (card) {
    card.remove();
  });
  var newPosts = paginateItems(POSTS);
  newPosts.forEach(createCard);
}

function createGreyCard() {
  var greyElt = document.createElement("div");
  greyElt.classList.add("grey-card");
  var cardContainer = document.getElementById("cards-container");
  cardContainer.appendChild(greyElt);
}

function createCard(post) {
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
  titleElt.innerText = title.split(" ")[0];
  var descriptionElt = document.createElement("div");
  descriptionElt.classList.add("description");
  descriptionElt.innerText = body;
  var tagsElt = document.createElement("div");
  tagsElt.classList.add("tags");
  var tags = Array(2).fill(null).forEach(function (_, index) {
    var tagElt = document.createElement("div");
    tagElt.classList.add("tag");
    tagElt.textContent = title.split(" ")[0 + index];
    tagsElt.appendChild(tagElt);
  });
  var bottomElt = document.createElement("div");
  bottomElt.classList.add("bottom");
  bottomElt.appendChild(titleElt);
  bottomElt.appendChild(descriptionElt);
  bottomElt.appendChild(tagsElt);
  cardElt.appendChild(topElt);
  cardElt.appendChild(bottomElt);
  var cardContainer = document.getElementById("cards-container");
  cardContainer.appendChild(cardElt);
}