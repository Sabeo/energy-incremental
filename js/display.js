//-------------------------- NUMBER DISPLAY --------------------------

function displayEnergyGenerators() {
    for (let i = 0; i < 5; i++) {
        document.getElementById("multEGen" + i).textContent = player.energyGenerator[i].mult.toPrecision(3);
        document.getElementById("levelEGen" + i).textContent = player.energyGenerator[i].level.toPrecision(3);
        document.getElementById("costEGen" + i).textContent = "cost : " + player.energyGenerator[i].cost //.toPrecision(1);
    }
}

//Display energy and generators amounts
function displayEnergyAmounts() {
    for (let i = 0; i < 5; i++) {
        document.getElementById("amountEGen" + i).textContent = player.energyGenerator[i].amount.toPrecision(3);
    }
    document.getElementById("energy").textContent = player.energy.toPrecision(3);
    document.getElementById("prodSec").textContent = Decimal.times(player.energyGenerator[0].amount, Decimal.times(player.energyGenerator[0].mult, player.timeSpeed)).toPrecision(3);
    //document.getElementById("time").textContent = player.timeSpeed.toPrecision(3);
}

function displayWatt() {
    document.getElementById("currentWatt").textContent = player.watt.toPrecision(4);
    if (Decimal.gte(0.5, wattCalculation())) {
        document.getElementById("obtainableWatt").textContent = "You need " + (wattCalculation() * -1 + 1).toPrecision(3) + " more levels for extra Watts";
    } else {
        document.getElementById("obtainableWatt").textContent = "Reset all dimensions for " + wattCalculation().toPrecision(3) + " Watts";
    }
}

function displayJoule() {
    document.getElementById("currentJoule").textContent = player.joule.toPrecision(3);
    if (Decimal.gt(WATTMIN, player.watt)) {
        document.getElementById("obtainableJoule").textContent = "You need to reach 135 Watts";
    } else {
        document.getElementById("obtainableJoule").textContent = "Reset for " + jouleCalculation().toPrecision(3) + " Joules";
    }
}

function displayHeat() {
    document.getElementById("currentHeat").textContent = player.heat.toPrecision(3);
}

function displayFieldCost() {
    for (let i = 0; i < 5; i++) {
        document.getElementById("fieldLvl" + i).textContent = player.temperatureField[i].level;
        if (Decimal.gte(9, player.temperatureField[i].level)) {
            document.getElementById("fieldCost" + i).textContent = "Upgrade for " + player.temperatureField[i].cost + " heats"
        } else {
            document.getElementById("fieldCost" + i).textContent = "Maxed";
        }
    }
}

function displayFieldMult() {
    for (let i = 0; i < 5; i++) {
        document.getElementById("fieldMult" + i).textContent = player.temperatureField[i].mult.toPrecision(3)
    }
}

//-------------------------- TAB DISPLAY --------------------------

function hideEverything() {
    document.getElementById("generators").style.display = "none";
    document.getElementById("submenu").style.display = "none";
    //document.getElementById("sub_temperature").style.display = "none";
    document.getElementById("temperatureFields").style.display = "none";
}

function generatorsTab() {
    hideEverything();
    document.getElementById("generators").style.display = "block";
}

function temperatureTab() {
    hideEverything();
    document.getElementById("submenu").style.display = "block";
    document.getElementById("temperatureFields").style.display = "block";
    //document.getElementById("sub_temperature").style.display = "block";
}

function temperatureFieldsTab() {
    hideEverything();
    document.getElementById("submenu").style.display = "block";
    document.getElementById("temperatureFields").style.display = "block";
}