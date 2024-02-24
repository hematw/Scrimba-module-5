import { catsData } from "./data.js";

const emotionsDiv = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");


emotionsDiv.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderCat);


function closeModal(){
  memeModal.style.display = "none";
}


function renderCat() {
  const cat = getSingleCatObject();

  memeModalInner.innerHTML = `
    <img
    class="cat-img"
    src="images/${cat.image}"
    alt="${cat.alt}"
    >
  `
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  
  if(catsArray.length === 1) {
    return catsArray[0];
  } else {
    let randomIndex = Math.floor(Math.random() * catsArray.length)
    return catsArray[randomIndex];
  }
}

function getMatchingCatsArray() {
  const isGif = gifOnlyOption.checked;

  if (document.querySelector("input[type='radio']:checked")) {
    const selectedEmotion = document.querySelector(
      "input[type='radio']:checked"
    ).value;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      }
      return cat.emotionTags.includes(selectedEmotion);
    });
    return matchingCatsArray;
  }
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionRadios(cats) {
  let emotionRadios = "";
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    emotionRadios += `
        <div class="radio">
          <label for="${emotion}">${emotion}</label>
          <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
        </div>`;
  }
  emotionsDiv.innerHTML = emotionRadios;
}

renderEmotionRadios(catsData);

function highlightCheckedOption(e) {
  let allRadios = document.getElementsByClassName("radio");

  for (let element of allRadios) {
    element.classList.remove("highlight");
  }

  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}