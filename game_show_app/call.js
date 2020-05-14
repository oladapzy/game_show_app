const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let missed = 0;
const overlay = document.getElementById("overlay");
const phrases = [
  "Not all who wander are lost",
  "It is about the journey not the destination",
  "For the joy of the Lord is my refuge",
  "Jesus plus nothing equals everything",
  "Therego I but for the grace of God",
];

function getRandomPhraseAsArray(arr) {
  let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase.split("");
}

function addPhraseToDisplay(arr) {
  const ul = phrase.firstElementChild;

  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    li.textContent = arr[i];
    if (li.textContent !== " ") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
    ul.appendChild(li);
  }
}

//Removes Start screen and starts game
overlay.addEventListener("click", (e) => {
  let phraseArray = getRandomPhraseAsArray(phrases);
  if (e.target.className === "btn__reset") {
    overlay.style.display = "none";
    addPhraseToDisplay(phraseArray);
  }
});

//Checks to see if letter is correct guess
function checkLetter(guess) {
  const classLetter = document.getElementsByClassName("letter");
  let match = null;

  for (i = 0; i < classLetter.length; i++) {
    if (classLetter[i].textContent.toLowerCase() === guess.toLowerCase()) {
      classLetter[i].classList.add("show");
      match = guess;
    }
  }
  return match;
}

function checkWin() {
  const show = document.getElementsByClassName("show");
  const letter = document.getElementsByClassName("letter");
  const headline = document.querySelector("h2");
  const button = document.querySelector("a");

  if (show.length === letter.length) {
    overlay.style.display = "";
    overlay.classList.remove("start");
    if (overlay.classList == "lose") {
      overlay.classList.remove("lose");
    }
    overlay.classList.add("win");
    headline.textContent = "You Win Friend!";
    button.textContent = "Play Again!";
    button.classList.remove("btn__reset");
    button.classList.add("finished");
  } else if (missed >= 5) {
    overlay.style.display = "";
    overlay.classList.remove("start");
    if (overlay.classList == "win") {
      overlay.classList.remove("win");
    }
    overlay.classList.add("lose");
    headline.textContent = "Ah bummer! You ran out of guesses.";
    button.textContent = "Give it another try!";
    button.classList.remove("btn__reset");
    button.classList.add("finished");
  }
}

//When user clicks button on Keyboard
//adds chosen class
//checks to see if guess is correct
//if not then adds to miss counter and removes heart
//Checks to see if user wins
qwerty.addEventListener("click", (e) => {
  let chosenButton = e.target;
  if (chosenButton.tagName === "BUTTON") {
    chosenButton.classList.add("chosen");
    chosenButton.setAttribute("disabled", true);
    let foundLetter = checkLetter(chosenButton.textContent);
    if (foundLetter === null) {
      missed += 1;
      let hearts = document.getElementsByTagName("img");
      hearts[5 - missed].src = "images/lostHeart.png";
    }
  }
  checkWin();
});

//Game reset for win and lose screen
//removes chosen and show class
//removes old phrase and adds new phrase
//replaces missed hearts
//Hides win or lose screen
overlay.addEventListener("click", (e) => {
  if (e.target.className === "finished") {
    let phraseArray = getRandomPhraseAsArray(phrases);

    missed = 0;

    let chosen = document.querySelectorAll(".chosen");
    for (i = 0; i < chosen.length; i++) {
      chosen[i].removeAttribute("disabled");
      chosen[i].classList.remove("chosen");
    }

    let show = document.querySelectorAll(".show");
    for (i = 0; i < show.length; i++) {
      show[i].classList.remove("show");
    }

    let oldPhrase = document.querySelectorAll("ul > li");
    for (i = 0; i < oldPhrase.length; i++) {
      oldPhrase[i].remove();
    }

    let hearts = document.querySelectorAll("img");
    for (i = 0; i < hearts.length; i++) {
      hearts[i].src = "images/liveHeart.png";
    }

    overlay.style.display = "none";

    addPhraseToDisplay(phraseArray);
  }
});
