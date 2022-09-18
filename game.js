var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress", function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", handlerFunction);

function handlerFunction(e) {
    userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playAudio(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
            userClickedPattern  = [];            
          }
    } else {
        console.log("wrong");
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    console.log("userClickedPattern is " + userClickedPattern);
    console.log("gamePattern is " + gamePattern)
}


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
    level += 1;
    $("#level-title").text("you are at level " + level);
};


function playAudio(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern =[];
    started = false;
}