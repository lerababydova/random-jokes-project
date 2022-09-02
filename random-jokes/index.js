const audio = new Audio();
audio.src = "./assets/meow.mp3";

document.addEventListener("DOMContentLoaded", ready);
function ready() {
  const button = document.getElementById("button");
  button.addEventListener("click", handleFireAction);
  getQuote();
  const langContainer = document.getElementById("lang-container");
  langContainer.addEventListener("click", switchLanguage);
  const language = localStorage.getItem("lang");
  const langBtn = document.querySelector(`[data-language="${language}"]`);
  if (langBtn) {
    langBtn.classList.add("active");
  }
}

function handleFireAction() {
  audio.play();
  const catPic = document.getElementById("cat-pic");
  catPic.classList.remove("animated-cat");
  catPic.offsetWidth;
  catPic.classList.add("animated-cat");
  getQuote();
}

async function getQuote() {
  const ruApi = "quotes.json";
  const enApi = "https://type.fit/api/quotes";
  let url;
  const language = localStorage.getItem("lang");
  url = language === "ru" ? ruApi : enApi;

  let response = await fetch(url);
  let json = await response.json();
  const minIndex = 0;
  const maxIndex = json.length - 1;
  const randomNumber =
    Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
  const randomQuote = json[randomNumber];
  const quoteText = randomQuote.text;
  const quoteAuthor = randomQuote.author;

  const quoteElement = document.querySelector("#quote");
  const authorElement = document.querySelector("#author");
  quoteElement.innerHTML = quoteText;
  authorElement.innerHTML = quoteAuthor;
}

function switchLanguage(event) {
  const language = event.target.dataset.language;
  const langContainer = document.getElementById("lang-container");
  const langBtn = document.querySelector(`[data-language="${language}"]`);
  if (language) {
    localStorage.setItem("lang", language);
    getQuote();
    [...langContainer.children].forEach((el) => {
      el.classList.remove("active");
    });
    langBtn.classList.add("active");
  }
}
