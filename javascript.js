var numberOfSuccesses = 0
var numRolls = [];
var arrayavg = 0;
var displayRolls = false;

function hideStupidStuff() {
    document.getElementById("rollspam").style.borderStyle = "none";
    document.getElementById("paste").style.borderStyle = "none";
}

function getVars() {
    arrayavg = 0;
    var numAVG = document.getElementById("rollAmount").value;
    var odds = document.getElementById("odds").value / 100;
    var succeeds = document.getElementById("succeeds").value;
    var displayRolls = document.getElementById("display").value;
    document.getElementById("rollspam").innerHTML = " ";

    start(odds, succeeds, numAVG, displayRolls);
}
function median(numbers) {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}


function start(odds, success_desired, numAVG, displayRolls) {
    if (displayRolls == 2) {
        document.getElementById("rollspam").style.borderStyle = "solid";
    }
    document.getElementById("paste").style.borderStyle = "solid";
    var nums = [];
    var numRolls = [];
    function success() {
        numberOfSuccesses++;
    }
    function fail() {
        numberOfSuccesses = 0;
    }

    for (var i = 0; i < numAVG; i++) {
        numRolls[i] = 0;
        var failtrack = "";
        function runRNG() {
            numRolls[i]++
            var result = Math.random();
            if (odds >= result) {
                success();
                failtrack += "<span id='success'>S</span>"
            }
            if (odds < result) {
                fail();
                failtrack += "<span id='fail'>F</span>"
            }
        }
        while (numberOfSuccesses < success_desired) {
            runRNG();
        }
        if (numberOfSuccesses >= success_desired) {
            nums[i] = numRolls[i];
            if (displayRolls == 2) {
                document.getElementById("rollspam").innerHTML += ("To hit a " + odds * 100 + "% chance " + success_desired + " times in a row required <span id='weird'>" + (numRolls[i]) + "</span> rolls <div id='failtrack'>" + failtrack + "</div>");
            }

            if (displayRolls == 2) {
                document.getElementById("rollspam").innerHTML += ("<br>");
            }
            numberOfSuccesses = 0;
        }
    }
    for (var i = 0; i < numRolls.length; i++) {
        arrayavg = arrayavg + (numRolls[i]);
    }
    var avg = Math.round(median(nums));
    var highest = Math.max(...nums);
    var lowest = Math.min(...nums);
    document.getElementById("paste").innerHTML = ("The median odds across " + numRolls.length + " rolls was one in " + avg + " (highest =  " + highest + ", lowest = " + lowest + ") " + "<br>");
}