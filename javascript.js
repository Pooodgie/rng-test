var numberOfSuccesses = 0
var numRolls = [];
var arrayavg = 0;
var displayRolls = false;

function getVars() {
    arrayavg = 0;
    var numAVG = document.getElementById("rollAmount").value;
    var odds = document.getElementById("odds").value / 100;
    var succeeds = document.getElementById("succeeds").value;
    var displayRolls = document.getElementById("display").value;
    console.log("odds are " + odds + " , roll amount is " + numAVG + ", succeeds are " + succeeds + ", displayRolls is " + displayRolls);
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
    var nums = [];
    function success() {
        numberOfSuccesses++;
    }
    function fail() {
        numberOfSuccesses = 0;
    }

    for (var i = 0; i < numAVG; i++) {
        numRolls[i] = 0;
        function runRNG() {
            numRolls[i]++
            var result = Math.random();
            if (odds >= result) {
                success();
            }
            if (odds < result) {
                fail();
            }
        }
        while (numberOfSuccesses < success_desired) {
            runRNG();
        }
        if (numberOfSuccesses >= success_desired) {
            nums[i] = numRolls[i];
            if (displayRolls == 2) {
                document.getElementById("rollspam").innerHTML += ("To hit a " + odds * 100 + "% chance " + success_desired + " times in a row required <span id='weird'>" + (numRolls[i]) + "</span> rolls");
            }

            if (displayRolls == 2) {
                document.getElementById("rollspam").innerHTML += ("<br>");
            }
            numberOfSuccesses = 0;
            console.log(numRolls[i]);
        }
    }
    for (var i = 0; i < numRolls.length; i++) {
        arrayavg = arrayavg + (numRolls[i]);
    }
    var avg = Math.round(median(nums));
    document.getElementById("paste").innerHTML = ("The median odds across " + numRolls.length + " rolls was one in " + avg + "<br>");
}
