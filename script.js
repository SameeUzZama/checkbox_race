(() => {
    // This line selects all "input" elements in the document and stores them in a "NodeList" object called "allCheckboxes".
    const allCheckboxes = document.querySelectorAll("input");
    // These lines select various elements in the document using the "querySelector" method and store them in variables.
  const checkboxWrapper = document.querySelector(".checkboxes");
  const scoreBoard = document.querySelector(".score");
  const currentScore = document.querySelector(".current");
  const tips = document.querySelector(".tips");
  const timer = document.querySelector(".timer");
  const flagPiece = document.querySelector(".flagPiece");
  const finalTime = document.querySelector(".finalTime");
  const resetButton = document.querySelector(".resetButton");
    const endBoard = document.querySelector(".end");
    // This array stores a list of words that will be displayed as a "boost" when a checkbox is checked.
  const boostWords = [
    "Speed!",
    "Nice!",
    "Fast!",
    "Power!",
    "Great!",
    "Awesome!",
    "Amazing!",
    "Super!",
  ];

    // This line adds an event listener to the "resetButton" element that listens for a "click" event. 
    // When the event occurs, the "reset" function is called.
  resetButton.addEventListener("click", reset);

    // This line sets a timeout that will execute a function after 50 milliseconds. 
    // The function uses the "scrollTo" method to scroll the window to the top of the page.
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);

    // These lines declare variables that will be used later in the code. 
    // "animationFrame" is a placeholder for a request animation frame id."startTime" is a timestamp 
    // that will be used to calculate the elapsed time."currentIndex" is the index of the current checkbox that is being checked.
  let animationFrame;
  let startTime;

  let currentIndex = 0;

    // The "startTimer" function sets the "startTime" variable to the current timestamp using the "Date.now" method. 
    // It then starts an animation frame using the "requestAnimationFrame" method and passes the "tick" function as an argument.
  function startTimer() {
    startTime = Date.now();
    animationFrame = window.requestAnimationFrame(tick);
  }

    // The "msToTime" function converts a duration in milliseconds to a formatted string representation in the format "mm:ss:SSS". 
    // It does this by dividing the duration by 1000 to get the number of seconds, then dividing by 60 to get the number of minutes.
    // It then formats the values using the "padStart" method to add leading zeros if necessary.
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 10)
        .toString()
        .padStart(2, "0"),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds + ":" + milliseconds;
  }

    // The "tick" function calculates the elapsed time in milliseconds by subtracting the "startTime" from the current 
    // timestamp using the "Date.now" method.It then passes the elapsed time to the "msToTime" function to convert it to a 
    // formatted string.It then updates the "innerHTML" property of the "timer" element with the formatted string.Finally, 
    // it requests a new animation frame and passes itself as an argument to keep the animation going.
  function tick() {
    var delta = Date.now() - startTime;
    timer.innerHTML = msToTime(delta);

    animationFrame = window.requestAnimationFrame(tick);
  }

// The first line of the function uses the ternary operator to assign either "-1" or "1" to the variable "posOrNeg" based 
// on a random probability.If "Math.random()" returns a value less than "0.5", "posOrNeg" will be "-1", and if "Math.random()" 
// returns a value greater than or equal to "0.5", "posOrNeg" will be "1".
// The second line of the function returns a random number that is between "0" and "number", multiplied by "posOrNeg" and then 
// limited by the height of the current window using "Math.min()".The "Math.min()" function returns the smaller of two values, 
// so in this case it will return the smaller of the randomly generated number and the height of the window minus 10. 
// This ensures that the returned value will not be larger than the height of the window.
// Finally, the returned value is multiplied by "posOrNeg", which will either make it positive or negative depending on the 
// value assigned to "posOrNeg".
  function randomPosOrNeg(number) {
    const posOrNeg = Math.random() < 0.5 ? -1 : 1;
    return Math.min(Math.random() * number, window.innerHeight - 10) * posOrNeg;
  }

    // The "reset" function resets the game by looping through all the checkboxes and setting their "style.transform", 
    // "disabled", and "checked" properties to their default values.It also resets the "currentIndex", "currentScore.innerHTML",
    // "tips.classList", "startTime", "scoreBoard.classList", "timer.innerHTML", "flagPiece.style.fill", and "endBoard.classList" 
    // properties.
  function reset() {
    allCheckboxes.forEach((checkbox, index) => {
      checkbox.style.transform = "none";
      if (index !== 0) {
        checkbox.disabled = true;
      }
      checkbox.checked = false;
    });

    currentIndex = 0;
    checkboxWrapper.style.transform = `translateX(${-20 * currentIndex}px)`;
    currentScore.innerHTML = 0;
    tips.classList.remove("hide");
    startTime = null;
    scoreBoard.classList.remove("show");
    timer.innerHTML = "00:00:00";
    flagPiece.style.fill = "red";
    endBoard.classList.remove("show");
  }

    // The "addBoost" function adds a boost element to the page. It does this by creating a new "div" element, 
    // adding the "boost" class to it, and setting its "style.top" and "style.left" properties based on the position 
    // of the "element" argument.It then sets the innerHTML property of the boost element to a randomly selected word 
    // from the boostWords array.Finally, it appends the boost element to the "checkboxWrapper" element.
  function addBoost(element) {
    let verticalMovement = new DOMMatrixReadOnly(
      window.getComputedStyle(element).transform
    ).f;

    const boostElement = document.createElement("div");
    boostElement.classList.add("boost");
    boostElement.style.top = `${
      checkboxWrapper.clientHeight / 2 + verticalMovement - 60
    }px`;
    boostElement.style.left = `${element.offsetLeft}px`;
    boostElement.innerHTML =
      boostWords[Math.floor(Math.random() * boostWords.length)];
    checkboxWrapper.appendChild(boostElement);
  }

    // The final block of code is an event listener that listens for clicks on the "body" element. When a click occurs, 
    // it checks if the current index is at the beginning or end of the checkboxes.If it is, it returns and does nothing.Otherwise, 
    // it disables the current checkbox, enables the previous checkbox, and updates the "currentIndex", "currentScore.innerText", 
    // "checkboxWrapper.style.transform", and "addBoost" functions.If the current index is at the beginning of the checkboxes, 
    // it shows the score board, hides the tips, cancels the animation frame, updates the timer, shows the end board, 
    // and changes the color of the flag piece.
  document.body.addEventListener("click", () => {
    if (currentIndex === 0 || currentIndex === allCheckboxes.length) return;

    allCheckboxes[currentIndex].disabled = true;
    allCheckboxes[currentIndex - 1].checked = false;
    allCheckboxes[currentIndex - 1].disabled = false;
    currentIndex--;
    currentScore.innerText = currentIndex.toString().padStart(3, "0");
    checkboxWrapper.style.transform = `translateX(${-20 * currentIndex}px)`;
  });

  allCheckboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("click", (event) => {
      if (!startTime) {
        startTimer();
      }

      if (index === currentIndex) {
        if (currentIndex === 0) {
          tips.classList.add("hide");
          scoreBoard.classList.add("show");
        }

        event.stopPropagation();

        if (Math.random() > 0.6) addBoost(checkbox);

        currentIndex++;
        currentScore.innerText = currentIndex.toString().padStart(3, "0");

        if (currentIndex === allCheckboxes.length) {
          flagPiece.style.fill = "#00c800";
          cancelAnimationFrame(animationFrame);
          scoreBoard.classList.remove("show");

          var delta = Date.now() - startTime;
          finalTime.innerHTML = msToTime(delta);
          endBoard.classList.add("show");
          return;
        }

        allCheckboxes[currentIndex].disabled = false;
        checkboxWrapper.style.transform = `translateX(${-20 * currentIndex}px)`;

        allCheckboxes[
          currentIndex
        ].style.transform = `translateY(${randomPosOrNeg(5 + currentIndex)}px)`;
      } else if (currentIndex === allCheckboxes.length) {
        if (currentIndex === allCheckboxes.length) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    });
  });
})();
