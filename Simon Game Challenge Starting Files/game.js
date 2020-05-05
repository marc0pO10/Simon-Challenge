//Create a new pattern
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

//User gamePattern
var userClickedPattern = [];

//next Level
var level = 0;
var started = false;

//Detecting Keyboard Keypress
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});


//Check user answer against the game sequence
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    //Wrong Audio
    playSound("wrong");

    //Game Over title
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Game Over red flash
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


//Check which button is pressed
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {
  //Reset userClickedPattern as an empty array for next level
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Show the sequence
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  //Next level
  level++;
  $("#level-title").text("Level " + level);

}

//Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animations to User Clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
