
let greenButton = document.getElementById("green");
let redButton = document.getElementById("red");
let yellowButton = document.getElementById("yellow");
let blueButton = document.getElementById("blue");

const ColorOptions = ["green", "red", "yellow", "blue"]
let ColorArray = []
let UserInputArray = []

let score = 0;
let cookieHighScore = getCookie("highscore");

let green = new Audio('green.wav');
let red = new Audio('red.wav');
let yellow = new Audio('yellow.wav');
let blue = new Audio('blue.wav');
let wrong = new Audio('wrong.wav');

let isGameOver = false;
let AreColorsBlinking = true;

window.addEventListener('load', BeforeStart);

function BeforeStart() {
    document.getElementById("highScore").innerHTML = "Highscore: " + cookieHighScore;
}

function Start() {
    document.getElementById("highScore").innerHTML = "Highscore: " + cookieHighScore;
    ColorArray = []
    UserInputArray = []
    score = 0;
    RandomColor()
    BlinkColors()
    window.requestAnimationFrame(Main);
}

// Main Loop
function Main() {
    Update();
    window.requestAnimationFrame(Main);
}

function Update() {
    if (UserInputArray.length == ColorArray.length && !isGameOver) {
        CheckAnswer()
    }
}

function BlinkGreen() {
    green.play();
    greenButton.style.backgroundColor = "#ffffff"
    setTimeout(function () {
        greenButton.style.backgroundColor = "#00ff00"
    }, 200);
}

function BlinkRed() {
    red.play();
    redButton.style.backgroundColor = "#ffffff"
    setTimeout(function () {
        redButton.style.backgroundColor = "#ff0000"
    }, 200);
}

function BlinkYellow() {
    yellow.play();
    yellowButton.style.backgroundColor = "#ffffff"
    setTimeout(function () {
        yellowButton.style.backgroundColor = "#fff000"
    }, 200);
}

function BlinkBlue() {
    blue.play();
    blueButton.style.backgroundColor = "#ffffff"
    setTimeout(function () {
        blueButton.style.backgroundColor = "#0000ff"
    }, 200);
}

function PressedGreen() {
if (!AreColorsBlinking) {
    BlinkGreen()
    UserInputArray.push("green")
}
}

function PressedRed() {
if (!AreColorsBlinking) {
    BlinkRed()
    UserInputArray.push("red")
}
}

function PressedYellow() {
if (!AreColorsBlinking) {
    BlinkYellow()
    UserInputArray.push("yellow")
}
}

function PressedBlue() {
if (!AreColorsBlinking) {
    BlinkBlue()
    UserInputArray.push("blue")
}
}

function RandomColor() {
    let randomNumber = Math.floor(Math.random() * ColorOptions.length);
    ColorArray.push(ColorOptions[randomNumber]);
}

function BlinkColors() {
    let forLoopCycleNumber = 1;
    for (let i = 0; i < ColorArray.length; i++) {
        if (ColorArray[i] == "green") {
            setTimeout(function () {
                AreColorsBlinking = true;
                BlinkGreen()
            }, forLoopCycleNumber * 500);
        }
        if (ColorArray[i] == "red") {
            setTimeout(function () {
                AreColorsBlinking = true;
                BlinkRed()
            }, forLoopCycleNumber * 500);
        }
        if (ColorArray[i] == "yellow") {
            setTimeout(function () {
                AreColorsBlinking = true;
                BlinkYellow()
            }, forLoopCycleNumber * 500);
        }
        if (ColorArray[i] == "blue") {
            setTimeout(function () {
                AreColorsBlinking = true;
                BlinkBlue()
            }, forLoopCycleNumber * 500);
        }
        forLoopCycleNumber++;
    }
    setTimeout(function () {
        AreColorsBlinking = false
    }, forLoopCycleNumber * 500);

}

function CheckAnswer() {
    let aantalGoed = 0;
    for (let i = 0; i < ColorArray.length; i++) {
        if (ColorArray[i] == UserInputArray[i]) {
            aantalGoed++
        }
    }

    if (aantalGoed == ColorArray.length) {
        score = aantalGoed;
        document.getElementById("score").innerHTML = "Score: " + score;
        UpdateHighScore()
        UserInputArray = []
        RandomColor()
        BlinkColors()
    }
    else {
        isGameOver = true;
        wrong.play();
        document.getElementById("GameOver").style.display = "flex";
    }
}

function GameOver() {
    isGameOver = false;
    setTimeout(function () {
    }, 2000);
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("GameOver").style.display = "none";
    UserInputArray = []
    ColorArray = []
    RandomColor()
    BlinkColors()
}

function UpdateHighScore() {
    if (score > cookieHighScore) {
        cookieHighScore = score
        document.getElementById("highScore").innerHTML = "Highscore: " + cookieHighScore;
    }
}

window.addEventListener("beforeunload", function (event) {
    document.cookie = "highscore = " + cookieHighScore + "; expires=1 Jan 2077 12:00:00 UTC"
});

// Source: https://www.tabnine.com/academy/javascript/how-to-get-cookies/
function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}