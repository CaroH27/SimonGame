const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
var level = 0;

//add event listener for a clicked button (class btn, id "colour")
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    // add user chosen colour to the pattern clicked by the user
    userClickedPattern.push(userChosenColour);
    // call function to play sound according to colour
    playSound(userChosenColour);
    // call function to add animation for clicked button
    animationPress(userChosenColour);
    // call function to check the answer according to clicked pattern array
    checkAnswer(userClickedPattern.length-1);
});

// Detect keyboard pressed for first time (one ensures that event is only executed once)
$(document).keydown(function() {
    if (level === 0){
        // change h1 title to "Level 0" and call nextSequence for first time
        $("#level-title").text("Level 0");
        nextSequence();
    }
});

// function to generate the next sequence
function nextSequence()
{
    var randomNumber;
    var randomChosenColour;

    //clear userClickedPattern for next sequence
    userClickedPattern.length = 0;
    // increase level and update h1
    level++;
    $("#level-title").text("Level " + level);
    // generate random integer from 0 to 3
    randomNumber = Math.floor(Math.random() * 4);
    // Choose random colour from buttonColours
    randomChosenColour = buttonColours[randomNumber];
    // Add the choosen colour to the empty game pattern array
    gamePattern.push(randomChosenColour);
    // Use jQuery to select button with same id as randomChosenColour and add flash animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // call function to play sound according to colour
    playSound(randomChosenColour);
}

// Function to play sound according to the name of a colour
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to add animation for clicked button
function animationPress(currentColour){
    //Add class pressed to button according to current colour
    $("#" + currentColour).addClass("pressed");
    //Remove pressed class after 100 Millisecounds
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);  
}

//Function to check if the user clicked sequence corresponds to the generated one
function checkAnswer(currentLevel){
    // check if user clicked the correct sequence
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");
        // check if pattern length is reached
        if (userClickedPattern.length === gamePattern.length)
        {
            //Start next sequence after 1000 miliseconds
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong");
        //Add sound for failing
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        //Add class game over to the body
        $("body").addClass("game-over");
        //Remove game-over class after 200 Millisecounds
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        //Change h1 title
        $("#level-title").text("Game Over, Press Any Key to Restart");
        //Call function to restart
        startOver();
    }
}

function startOver()
{
    //reset values to be able to start again
    level = 0;
    gamePattern = [];
}

