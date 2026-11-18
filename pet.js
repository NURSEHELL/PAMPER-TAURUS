function startGame() {
    document.body.innerHTML =
        '<div onclick="taurusClick()">\
<input id="Name" type="text" value="Taurus" placeholder="Please give Taurus a name!">\
<br>\
<br>\
<img id="taurus" style = "width: 400px; height: auto;" src="Images/taurus_stage1.png">\
    </div>\
    <div>\
<button onclick="grabBottle()">Feed!</button>\
		<p>Times Fed: <span id="timesfed"> </span></p>\
        		<p>Times Petted: <span id="timespet"> </span></p>\
	</div>';
}


startGame();

var transformLou = new Audio('Images/tambourine.mp3');
var stage1Bark = new Audio('Images/bark.mp3');
let hand = "none";
let timesFed = 0;
let timesPet = 0;
let taurusStage = 1;
let taurusVariant = "Default";
let taurusCurrentAction = null;

// Checks for Taurus variants.
function variantCheck() {
    switch (taurusVariant) {
        case "Louise":
            document.getElementById('taurus').src = 'Images/taurusLouise_stage1.png';
            break;

        case "Aiden":
            document.getElementById('taurus').src = 'Images/taurusAiden_stage1.png';
            break;

        default:
            document.getElementById('taurus').src = 'Images/taurus_stage1.png';
    }
};

// Checks if Taurus has been renamed.
const nameInput = document.getElementById("Name");
nameInput.addEventListener("input", (event) => {
    const Name = event.target.value;
    // Changes a blank name to "Taurus"
    if (Name === "") {
        Name = "Taurus";
    }

    // Checks for easter eggs
    switch (Name) {
        case "Louise":
            taurusVariant = "Louise";
            transformLou.play();
            break;

        case "Aiden":
            taurusVariant = "Aiden";
            break;

        default:
            taurusVariant = "Taurus";
            break;
    }
    // Doesn't immediately switch sprites if animation is being performed
    if (taurusCurrentAction === null) {
        variantCheck()
    }
});

/* const intervalId = setInterval(() => {
    Name = document.getElementById("Name").value;
     (Name === "") {
        Name = "Taurus";
    }
    if (Name === "Louise") {
        document.getElementById('taurus').src = 'Images/taurusLouise_stage1.png';
    }
    if (Name === "Aiden") {
        document.getElementById('taurus').src = 'Images/taurusAiden_stage1.png';
    }
}, 1);
*/

// Setup
document.getElementById('timesfed').innerHTML = timesFed;
document.getElementById('timespet').innerHTML = timesPet;

function grabBottle() {
    hand = "bottle";
    document.body.style.cursor = "url('Images/bottle.png'), grab";
}

function bottleFeed() {
    taurusCurrentAction = "feeding";
    hand = "none";
    document.body.style.cursor = 'default';
    document.getElementById('taurus').src = 'Images/taurus_stage1_feeding.png';
    setTimeout(() => { variantCheck(); taurusCurrentAction = null; }, 3000);
    timesFed++;
    document.getElementById('timesfed').innerHTML = timesFed;
}


function taurusPet() {
    taurusCurrentAction = "petting";
    stage1Bark.play();
    document.getElementById('taurus').src = 'Images/taurus_stage1_pet.gif';
    timesPet++;
    setTimeout(() => { variantCheck(); taurusCurrentAction = null; }, 2000);
    document.getElementById('timespet').innerHTML = timesPet;
    console.log(Name);
}

function taurusClick() {

    if (taurusCurrentAction === null && hand === "bottle") {
        bottleFeed();
    }

    else if (taurusCurrentAction === null && hand === "none") {
        taurusPet();
    }
}
