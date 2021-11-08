let ITEMS_PER_PAGE = 9;
let PAGE_NUMBER = 1;
let POSTS;
let ACTIVE_POSTS;

function fetchList() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((res) => {
      POSTS = res;
      ACTIVE_POSTS = paginateItems(POSTS);
      ACTIVE_POSTS.forEach(createCard);
    });
}

fetchList();

function onClickPrevious() {
  if (PAGE_NUMBER === 2) {
    PAGE_NUMBER = 1;
    displayCards();
  }
  console.log("PAGE_NUMBER", PAGE_NUMBER);
}
function onClickNext(event) {
  if (PAGE_NUMBER === 1) {
    PAGE_NUMBER = 2;
    displayCards();
  }
  console.log("PAGE_NUMBER", PAGE_NUMBER);
}

function paginateItems() {
  console.log("PAGE_NUMBER", PAGE_NUMBER);
  console.log("ITEMS_PER_PAGE", ITEMS_PER_PAGE);
  const offset = (PAGE_NUMBER - 1) * (ITEMS_PER_PAGE - 1);

  return POSTS.slice(offset, offset + ITEMS_PER_PAGE - 1);
}

function displayCards() {
  const cards = document.getElementsByClassName("card");
  Array.from(cards).forEach(function (card) {
    card.remove();
  });
  const newPosts = paginateItems(POSTS);
  newPosts.forEach(createCard);
  // console.log("cards", cards);
}

function createCard(post) {
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
  // console.log("title", title);

  titleElt.innerText = title.split(" ")[0];

  const descriptionElt = document.createElement("div");
  descriptionElt.classList.add("description");
  descriptionElt.innerText = body;

  const tagsElt = document.createElement("div");
  tagsElt.classList.add("tags");

  const tags = Array(2)
    .fill(null)
    .forEach(function (_, index) {
      const tagElt = document.createElement("div");
      tagElt.classList.add("tag");

      tagElt.textContent = title.split(" ")[0 + index];
      tagsElt.appendChild(tagElt);
    });

  const bottomElt = document.createElement("div");
  bottomElt.classList.add("bottom");

  bottomElt.appendChild(titleElt);
  bottomElt.appendChild(descriptionElt);
  bottomElt.appendChild(tagsElt);

  // console.log("bottomElt", bottomElt);

  cardElt.appendChild(topElt);
  cardElt.appendChild(bottomElt);

  const cardContainer = document.getElementById("cards-container");
  cardContainer.appendChild(cardElt);
  // console.log("cardContainer", cardContainer);
}
