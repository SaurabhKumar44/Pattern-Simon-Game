var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

$(document).keypress(function () {
  if (!start) {
    $("h1").text("level " + level);
    nextSequence();
    start = true;
  }
});
  

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  sound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout( function() {
        nextSequence();
      }, 1000);
    }
  }
  else{
    sound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);

  $("#" + randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(randomChosenColors);
  
}

function sound(color) {
  var a = new Audio("./sounds/" + color + ".mp3");
  a.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}




function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}