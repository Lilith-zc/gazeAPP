function screenFull() {
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    GazeCloudAPI.StartEyeTracking();
}


function PlotGaze(GazeData) {
    document.getElementById("GazeData").innerHTML = "GazeX: " + GazeData.GazeX + " GazeY: " + GazeData.GazeY;

    var x = GazeData.docX;
    var y = GazeData.docY;

    var gaze = document.getElementById("gaze");
    x -= gaze.clientWidth / 2;
    y -= gaze.clientHeight / 2;

    gaze.style.left = x + "px";
    gaze.style.top = y + "px";

    if (GazeData.state != 0) {
        gaze.style.display = 'none';
    }
    else {
        gaze.style.display = 'block';
        if (GazeData.GazeX > document.getElementById("Right").getBoundingClientRect().left) {
            newDirection = "Right";
        }
        else if (GazeData.GazeX < document.getElementById("Left").getBoundingClientRect().right) {
            newDirection = "Left";
        }

        else {
            if (GazeData.GazeY > document.getElementById("Down").getBoundingClientRect().top) {
                newDirection = "Down";
            }
            else if (GazeData.GazeY < document.getElementById("Top").getBoundingClientRect().bottom) {
                newDirection = "Top";
            }
        }

        if(newDirection != ""){
            if (currentDirection != newDirection) {
                document.querySelectorAll(".card").forEach(card => {
                    if(card.id == newDirection){
                        card.className = "card h-100 input-card-active";
                    }
                    else{
                        card.className = "card h-100 input-card-not-active";
                    }
                });
                document.getElementById(newDirection + "input").focus();
                currentDirection = newDirection;
            }
        }
        else{
            document.querySelectorAll(".card").forEach(card => {
                card.className = "card h-100 input-card-not-active";
            });
            currentDirection = newDirection;
        }

        newDirection = "";
    }
}

//////set callbacks/////////
window.addEventListener("load", function () {
    GazeCloudAPI.OnCalibrationComplete = function () { console.log('gaze Calibration Complete') }
    GazeCloudAPI.OnCamDenied = function () { console.log('camera  access denied') }
    GazeCloudAPI.OnError = function (msg) { console.log('err: ' + msg) }
    GazeCloudAPI.UseClickRecalibration = false;
    GazeCloudAPI.OnResult = PlotGaze;
});

var currentDirection = "";
var newDirection = "";

var trickList = ["Top", "Down", "Left", "Right"];
var trickSign = trickList[Math.floor(Math.random() * trickList.length + 1) - 1];
document.querySelectorAll(".form-control").forEach(input => {
    if(input.id == trickSign + "input"){
        input.className = "form-control trick-input";
    }
});