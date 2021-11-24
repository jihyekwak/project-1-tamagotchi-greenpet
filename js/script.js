// pet plant object
const plant = {
    name: "green",
    water: 90,
    sunlight: 90, 
    temperature: 60,
    isAlive: true,
    hasFlowers: false,
    giveWater() {
        if (plant.water < 100) {
            console.log("You gave water");
            plant.water += 5;
            waterBar.css("width", plant.water+"%")
        } else {
            console.log("Water is enough");
        }
    },
    giveSunlight() {
        if (plant.sunlight < 100) {
            console.log("You gave sunlight");
            plant.sunlight += 5;
            $("body").css("background", "floralwhite");
            sunlightBar.css("width", plant.sunlight+"%");
            setInterval(gameSet.giveSunshine, 1000);
        } else {
            console.log("Sunlight is enough");
        }
    },
    tempUp() {
        if (plant.temperature < 100) {
            console.log("Warming");
            plant.temperature += 5;
            tempBar.css("width", plant.temperature+"%");
            gameSet.tempBarColor();
        } else {
            console.log("Tooooo hot!!!");
        }
    },
    tempDown() {
        if (plant.temperature > 0 ) {
            console.log("Cooling");
            plant.temperature -= 5;
            tempBar.css("width", plant.temperature+"%");
            gameSet.tempBarColor();
        } else {
            console.log("Toooo cold!!!");
        }    
    }
}

// declare variables using jQuery
const waterBar = $("#waterBar");
const sunlightBar = $("#sunlightBar");
const tempBar = $("#tempBar");

// button event listener
$("#water").on("click", plant.giveWater);
$("#sunlight").on("click", plant.giveSunlight);
$("#tempUp").on("click", plant.tempUp);
$("#tempDown").on("click", plant.tempDown);

// game object
const gameSet = {
    initialBars() {
        waterBar.css("width", plant.water);
        sunlightBar.css("width", plant.sunlight);
        tempBar.css("width", plant.temperature);
    },
    tempBarColor() {
        if (plant.temperature <= 20) {
            console.log("Too cold");
            tempBar.css("background-color", "blue");
        } else if (plant.temperature >= 80) {
            console.log("Too hot"); 
            tempBar.css("background-color", "red");
        } else {
            tempBar.css("background-color", "salmon");
        }
    },
    giveSunshine() {
        $("body").css("background", "#c5e1a5");
    },
    decreaseLevels() {
        // console.log("decreasing");
        plant.water = plant.water - 1;
        plant.sunlight = plant.sunlight -1;
        plant.temperature = plant.temperature -1;
        waterBar.css("width", plant.water+"%");
        sunlightBar.css("width", plant.sunlight+"%");
        tempBar.css("width", plant.temperature+"%");
        gameSet.tempBarColor();
        gameEndCheck();
    }
}

// plant.isAlive check
function gameEndCheck() {
    if (plant.water < 0 || plant.sunlight < 0 || plant.temperature< 0) {
        alert("Your plant is dead");
        plant.isAlive = false;
        gameStop();
    } 
}

// plant.hasFlower check
function gameResult() {
    if (plant.water > 0 && plant.sunlight > 0 && plant.temperature > 0) {
        if (plant.temperature <= 20 || plant.temperature >= 80) {
            console.log("good job");
            plant.isAlive = true;
            plant.hasFlowers = false;
            gameStop();
        } else  {
            console.log("flowers");
            plant.isAlive = true;
            plant.hasFlowers = true;
            gameStop();
        }
    }
}

// Click Game Start button event listener
const start = document.querySelector(".start");
const startBtn = document.querySelector("#startBtn");
const submit = document.querySelector("input[type='submit']");
const play = document.querySelector(".play");

startBtn.addEventListener("click", function() {
    document.querySelector(".form1").classList.add("inactive");
    document.querySelector(".form2").classList.remove("inactive");
});

submit.addEventListener("click", gamePlay);

// setInterval
let interval = setInterval(gameSet.decreaseLevels, 300);
// setTimeout
let timeout = setTimeout(gameResult, 60000);

// game start function 
function gamePlay() {
    start.classList.add("inactive");
    play.classList.remove("inactive");
    gameSet.initialBars;
    interval;
    timeout; 
}

// function to clear interval, timeout
function gameStop() {
    clearInterval(interval);
    clearTimeout(timeout);
    stopTimer();
    printResult();
};

// set timer
let seconds = 60;
let timerInterval = setInterval(function() {
    const timer = document.querySelector("#timer");
    timer.innerHTML = `Timer: ${seconds--}`;
    if (seconds == 0) {
        timer.innerHTML = `Timer: 00`;
        stopTimer();
    }
}, 1000);

function stopTimer() {
    clearInterval(timerInterval);
}

// result page
function printResult() {
    play.classList.add("inactive");
    const result = document.querySelector(".result");
    result.classList.remove("inactive");
    resultMsg();
}

function resultMsg() {
    const resultMsgP = document.querySelector("#resultMsg");
    if(plant.isAlive == false) {
        resultMsgP.innerHTML = `I'm sorry! Your plant is dead.<br/>If you want to play again click the button.`;
    } else if (plant.isAlive == true && plant.hasFlowers == true) {
        resultMsgP.innerHTML = `Excellent! Your plant has beautiful flowers!<br/>If you want to play again click the button.`;
    } else {
        resultMsgP.innerHTML = `Good job!<br/>If you want to play again click the button.`;
    }
}