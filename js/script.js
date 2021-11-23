// pet plant object
plant = {
    name: "green",
    water: 90,
    sunlight: 90, 
    temperature: 60
}

// declare variables using jQuery
const waterBar = $("#waterBar");
const sunlightBar = $("#sunlightBar");
const tempBar = $("#tempBar");

// level setup using object value
waterBar.css("width", plant.water+"%");
sunlightBar.css("width", plant.sunlight+"%");
tempBar.css("width", plant.temperature+"%");

// button event listener
$("#water").on("click", giveWater);
$("#sunlight").on("click", giveSunlight);
$("#tempUp").on("click", tempUp);
$("#tempDown").on("click", tempDown);

// functions for buttons (event listener)
// give water
function giveWater() {
    if (plant.water < 100) {
        console.log("You gave water");
        plant.water += 5;
        waterBar.css("width", plant.water+"%")
    } else {
        console.log("Water is enough");
    }
}
// give sunlight
function giveSunlight() {
    if (plant.sunlight < 100) {
        console.log("You gave sunlight");
        plant.sunlight += 5;
        $("body").css("background", "floralwhite");
        sunlightBar.css("width", plant.sunlight+"%");
       
        setInterval(changeColor, 1000);
    } else {
        console.log("Sunlight is enough");
    }
}

// When you give sunlight, colors change.
function changeColor() {
    $("body").css("background", "#c5e1a5");
}

// warming
function tempUp() {
    if (plant.temperature < 100) {
        console.log("Warming");
        plant.temperature += 5;
        tempBar.css("width", plant.temperature+"%");
        tempBarColor();
    } else {
        console.log("Tooooo hot!!!");
    }
}

// cooling
function tempDown() {
    if (plant.temperature > 0 ) {
        console.log("Cooling");
        plant.temperature -= 10;
        tempBar.css("width", plant.temperature+"%");
        tempBarColor();
    } else {
        console.log("Toooo cold!!!");
    }    
}

function tempBarColor() {
    if (plant.temperature <= 20) {
        console.log("Too cold");
        tempBar.css("background-color", "blue");
    } else if (plant.temperature >=80) {
        console.log("Too hot"); 
        tempBar.css("background-color", "red");
    } else {
        tempBar.css("background-color", "salmon");
    }
}

// timer
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

// setInterval
let interval = setInterval(decreaseLevels, 300);

// setTimeout
let timeout = setTimeout(gameResult, 60000);

// function to clear interval, timeout
function gameEnd() {
    clearInterval(interval)
    clearTimeout(timeout)
}

// functions for gameset
function decreaseLevels() {
    // console.log("decreasing");
    plant.water = plant.water - 1;
    plant.sunlight = plant.sunlight -1;
    plant.temperature = plant.temperature -1;
    waterBar.css("width", plant.water+"%");
    sunlightBar.css("width", plant.sunlight+"%");
    tempBar.css("width", plant.temperature+"%");
    tempBarColor();
    gameEndCheck();
}

// plant is alive check
function gameEndCheck() {
    if (plant.water < 0 || plant.sunlight < 0 || plant.temperature< 0) {
        alert("Your plant is dead");
        gameEnd();
    } 
}

// plant flower check
function gameResult() {
    if (plant.water >0 && plant.sunlight>0 && plant.temperature>0) {
        if (20 <= plant.temperature <= 80) {
            alert("flowers");
            gameEnd();
        } else {
            alert("good job")
            gameEnd();
        }
    }
}