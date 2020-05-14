//get element needed for the page
document.addEventListener("DOMContentLoaded", function () {
  const qwerty = document.getElementById("qwerty");
  const phrase = document.getElementById("phrase");
  const startScreen = document.getElementById("overlay");

  //initiate missed to 0 and add to it
  var missed = 0;

  // List of array phrases to be guessed by player
  const phrases = [
    "I am going to church",
    "You are too cool for me",
    "Do you want to play a song",
    "where are we going",
    "All done",
  ];

  //Event handler to liesten to the start button
  startScreen.addEventListener("click", (e) => {
    let phraseArray = getRandomPhraseAsArray(phrases);
    if (e.target.className === "btn__reset") {
      startScreen.style.display = "none";
      addPhraseToDisplay(phraseArray);
    }
  });

  //get random phrases from the list of array created
  const getRandomPhraseAsArray = (arr) => {
    const arrRandom = arr[Math.floor(Math.random() * arr.length)];
    return arrRandom.split("");
  };

  //display the phrases to the screen
  const addPhraseToDisplay = (arr) => {
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
  };

  //Checking if user get the letter in the phrase right
  const checkLetter = (guess) => {
    const classLetter = document.getElementsByClassName("letter");
    let match = null;
    for (i = 0; i < classLetter.length; i++) {
      if (classLetter[i].textContent.toUpperCase() === guess.toUpperCase()) {
        classLetter[i].classList.add("show");
        match = guess;
      }
    }
    return match;
  };

  //event handler to listen to the keyboard and check if letter found or not
  qwerty.addEventListener("click", (e) => {
    const chosenButton = e.target;
    if (chosenButton.tagName === "BUTTON") {
      chosenButton.classList = "chosen";
      chosenButton.setAttribute("disabled", true);
      const foundLetter = checkLetter(chosenButton.textContent);
      if (foundLetter == null) {
        missed += 1;
        const hearts = document.getElementsByTagName("img");
        hearts[5 - missed].src = "images/lostHeart.png";
      }
    }
    checkWin();
  });

  //function for wiining or loosing
  const checkWin = () => {
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
      headline.textContent = "Way To Go (You Win)";
      button.textContent = "Wanna Play Again!";
      button.classList.remove("btn__reset");
      button.classList.add("finished");
    } else if (missed >= 5) {
      overlay.style.display = "";
      overlay.classList.remove("start");
      if (overlay.classList == "win") {
        overlay.classList.remove("win");
      }
      overlay.classList.add("lose");
      headline.textContent = "You Ran Out Of Guesses.";
      button.textContent = "Try Again!";
      button.classList.remove("btn__reset");
      button.classList.add("finished");
    }
  };

  overlay.addEventListener("click", (e) => {
    if (e.target.className === "finished") {
      let phraseArray = getRandomPhraseAsArray(phrases);

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

      const hearts = document.querySelectorAll("img");
      for (i = 0; i < hearts.length; i++) {
        hearts[i].src = "images/liveHeart.png";
      }

      overlay.style.display = "none";

      addPhraseToDisplay(phraseArray);
    }
  });
});
