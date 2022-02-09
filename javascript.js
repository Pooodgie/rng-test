var numberOfSuccesses = 0
var numRolls = [];
var arrayavg = 0;
var displayRolls = false;

function getVars() {
    arrayavg = 0;
    var numAVG = document.getElementById("rollAmount").value;
    var odds = document.getElementById("odds").value/100;
    var succeeds = document.getElementById("succeeds").value;
    var displayRolls = document.getElementById("display").value;
    console.log("odds are " + odds + " , roll amount is " + numAVG + ", succeeds are " + succeeds + ", displayRolls is " + displayRolls);
    document.getElementById("rollspam").innerHTML = " ";

    start(odds, succeeds, numAVG, displayRolls);
}

function start(odds, success_desired, numAVG, displayRolls) {
    for (var i = 0; i < numAVG; i++) {
        numRolls[i] = 0;
        function runRNG() {
            numRolls[i]++
            var result = Math.random();
            if (odds > result) {
                success();
            }
            if (odds < result) {
                fail();
            }
        }
        function success() {
            numberOfSuccesses++;
        }
        function fail() {
            numberOfSuccesses = 0;
        }

        while (numberOfSuccesses <= success_desired) {
            runRNG();
        }
        if (numberOfSuccesses >= success_desired) {
            if (displayRolls == 2) {
                document.getElementById("rollspam").innerHTML += ("To hit a " + odds*100 + "% chance " + success_desired + " times in a row required " + (numRolls[i] - 1) + " rolls");
            }
        }
        numberOfSuccesses = 0;
        if (displayRolls == 2) {
            document.getElementById("rollspam").innerHTML += ("<br>");
        }
    }
    for (var i = 0; i < numRolls.length; i++) {
        arrayavg = arrayavg + (numRolls[i] - 1);
    }
    var avg = Math.round(arrayavg / numRolls.length);
    document.getElementById("paste").innerHTML = ("The average odds across " + numRolls.length + " rolls was one in " + avg + "<br>");


}
