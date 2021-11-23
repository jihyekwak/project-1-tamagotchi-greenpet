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

// functions
// give water
function giveWater() {
    if (plant.water < 100) {
        console.log("You gave water");
        plant.water += 10;
        waterBar.css("width", plant.water+"%")
    } else {
        console.log("Water is enough");
    }
}
// give sunlight
function giveSunlight() {
    if (plant.sunlight < 100) {
        console.log("You gave sunlight");
        plant.sunlight += 10;
        $("body").css("background", "gold");
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
        plant.temperature += 10;
        tempBar.css("width", plant.temperature+"%");
        if (plant.temperature >= 80) {
            console.log("Too hot");
            tempBar.css("background-color", "red");
        } else {
            tempBar.css("background-color", "lightgreen");
        }
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
        if (plant.temperature <= 20) {
            console.log("Too cold");
            tempBar.css("background-color", "blue");
        } else {
            tempBar.css("background-color", "lightgreen");
        }
    } else {
        console.log("Toooo cold!!!");
    }
    
}

