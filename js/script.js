// pet plant object
const plant = {
    name: "",
    water: 90,
    sunlight: 90, 
    temperature: 60,
    isAlive: true,
    hasFlowers: false,
    img:"",
    time: 0,
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
            sunlightBar.css("width", plant.sunlight+"%");
            gameSet.giveSunshine();
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
const timeBar = $("#timeBar");

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
        timeBar.css("width", plant.time);
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
        console.log("light");
        $(".play").css("background", "gold");
        setTimeout(function () {
            $(".play").css("background", "#c5e1a5");
        }, 1000); 
    },
    decreaseLevels() {
        plant.water = plant.water - 1;
        plant.sunlight = plant.sunlight -1;
        plant.temperature = plant.temperature -1;
        waterBar.css("width", plant.water+"%");
        sunlightBar.css("width", plant.sunlight+"%");
        tempBar.css("width", plant.temperature+"%");
        gameSet.tempBarColor();
        gameEndCheck();
    },
    timer() {
        plant.time = plant.time + (100/45);
        timeBar.css("width", plant.time+"%");
        gameEndCheck();
    },
    plantCharacter() {
        const plantImg = document.querySelector("#plantImg");
        const plantImgs = ["/images/plantImgs/0.png", "/images/plantImgs/1.png", "/images/plantImgs/2.png", "/images/plantImgs/3.png", "/images/plantImgs/4.png"];
        let randomImg = plantImgs[Math.floor(Math.random() * plantImgs.length)];
        plantImg.setAttribute("src", randomImg);
        plant.img = plantImg.getAttribute("src");
        // console.log(plant.img);
    },
}

// Button click sound effect
const submitSound = new Audio();
submitSound.src = "/sound/click-1.mp3";
function submitEffect() {
    submitSound.play();
}
const sound = new Audio();
sound.src = "/sound/click-4.wav";
function soundEffect() {
    sound.play();
}
// plant.isAlive check
function gameEndCheck() {
    if (plant.water < 0 || plant.sunlight < 0 || plant.temperature< 0 || plant.time == 100) {
        // alert("Your plant is dead");
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
const yesBtn = document.querySelector("#yesBtn");
const submit = document.querySelector("input[type='submit']");
const play = document.querySelector(".play");
const startForm1 = document.querySelector(".start-form1");
const startForm2 = document.querySelector(".start-form2");
const startForm3 = document.querySelector(".start-form3");
const userNameInput = document.querySelector(".userName");
const petNameInput = document.querySelector(".petName");
const startBtn = document.querySelector("#startBtn");
let userName;

// want to play? yes
yesBtn.addEventListener("click", function() {
    startForm1.classList.add("inactive");
    startForm2.classList.remove("inactive");
});

// enter user name, pet name
submit.addEventListener("click", function() {
    startForm2.classList.add("inactive");
    startForm3.classList.remove("inactive");
    userName = userNameInput.value;
    plant.name = petNameInput.value;
});

// game start
startBtn.addEventListener("click", function() {
    const userNameBar = document.querySelector("#userName");
    const petNameBar = document.querySelector("#petName");
    if(userName != "") {
        userNameBar.innerHTML = `Player: ${userName}`;
    } else {
        userNameBar.innerHTML = `Player`;
    }
    if (plant.name != "") {
        petNameBar.innerHTML = `Pet Name: ${plant.name}`;
    } else {
        petNameBar.innerHTML = `Pet Name: Green`;
    }
    
    document.querySelector("#title").style.height = "80px";
    startForm3.classList.add("inactive");
    start.classList.add("inactive");
    play.classList.remove("inactive");
    // document.querySelector(".time").classList.remove("inactive");
    gamePlay();
});
let interval1;
let interval2;
let timeout;
let timerInterval;
let seconds = 60;

// BGM sound
const bgmSound = new Audio();
bgmSound.src= "/sound/Komiku_-_04_-_Shopping_List.mp3";

// BGM button display
function displayBgmBtn() {
    if ($(".bgmPause").hasClass("inactive")) {
        $(".bgmPause").removeClass("inactive");
    } else {
        $(".bgmPause").addClass("inactive");    
    }
}

// BGM button event listener
$(".bgmPause").on("click", function () {
    
    if($(".bgmPause").text() == "BGM pause")
    {
        console.log("stop music");
        bgmSound.pause();
        $(".bgmPause").html("BGM play");
    } else {
        console.log("start music");
        bgmSound.play();
        $(".bgmPause").html("BGM pause");
    }
})



// game start function 
function gamePlay() {
    gameSet.plantCharacter();
    gameSet.initialBars;
    // setInterval
    interval1 = setInterval(gameSet.decreaseLevels, 200);
    interval2 = setInterval(gameSet.timer, 1000);
    // setTimeout
    timeout = setTimeout(gameResult, 45000);
    bgmSound.play();
    displayBgmBtn();
}

// function to clear interval, timeout
function gameStop() {
    clearInterval(interval1);
    clearInterval(interval2);
    clearTimeout(timeout);
    displayResult();
    bgmSound.pause();
    displayBgmBtn();
};

// result page
const result = document.querySelector(".result");
const resultMsgP = document.querySelector("#resultMsg");
const playAgainBtn = document.querySelector("#playAgain");

function displayResult() {
    play.classList.add("inactive");
    // document.querySelector(".time").classList.add("inactive");
    result.classList.remove("inactive");
    resultMsg();
}

function resultMsg() {
    const resultImg = document.querySelector("#resultPlant");
    document.querySelector("#resultUserName").innerHTML = userName;
    if(plant.isAlive == false) {
        // result img
        resultImg.setAttribute("src", plant.img);
        resultImg.style.filter="grayscale(100%)";
        // result msg
        resultMsgP.innerHTML = `I'm sorry!<br />Your plant ${plant.name} is dead.<br/>If you want to play again click the button.`;
    } else if (plant.isAlive == true && plant.hasFlowers == true) {
        resultImg.setAttribute("src", plant.img);
        resultMsgP.innerHTML = `Excellent!<br />Your plant ${plant.name} has beautiful flowers!<br/>If you want to play again click the button.`;

    } else {
        resultImg.setAttribute("src", plant.img);
        resultMsgP.innerHTML = `Good job!<br />Your plant ${plant.name} is growing well. <br/>If you want to play again click the button.`;
    }
}

playAgainBtn.addEventListener("click", function() {
    gameReset();
    gameSet.initialBars;
    result.classList.add("inactive");
    start.classList.remove("inactive");
    startForm1.classList.remove("inactive");
    startForm2.classList.add("inactive");
    
});

function gameReset() {
    userNameInput.value = "";
    petNameInput.value = "";
    plant.name = "",
    plant.water = 90,
    plant.sunlight = 90, 
    plant.temperature = 60,
    plant.isAlive = true,
    plant.hasFlowers = false,
    plant.img = "",
    plant.time = 0
}