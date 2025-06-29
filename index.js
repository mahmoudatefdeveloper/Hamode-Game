const buttonCoulers = ['red', 'blue', 'green', 'yellow'];
let level = 0;

let gamePattern = [];
let userClickedPattern = [];


// Making the sequence of the game
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let chosenCouler = buttonCoulers[randomNumber];
  gamePattern.push(chosenCouler);
  // Flash with animation
  $("#" + chosenCouler).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(chosenCouler);
  // Play sound
  playSound(chosenCouler);
  $("h1").text("Level " + level);
  level++;
}

// It handles the click events on the buttons from the user
function handlerFunction() {
  $(".btn").click(function () {
    let userChosenCouler = $(this).attr("id");
    userClickedPattern.push(userChosenCouler);
    // Flash with animation
    $("#" + userChosenCouler).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(userChosenCouler);
    // Play sound
    playSound(userChosenCouler);
    // Check the user's answer
    checkAnswer(userClickedPattern.length - 1);
  });
}

// نداء الدالة لتفعيل الأحداث
handlerFunction();

// Check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // If the user has completed the sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("h1").text("Press Any Key to Start");
}

// Play the sound of the button
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate the pressed button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Detect the First Key Press
$(document).keypress(function () {
  if (level === 0) {
    $("h1").text("Level " + level);
    nextSequence();
  }
});