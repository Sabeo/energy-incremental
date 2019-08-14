var lastUpdate = Date.now()

let player = {
    energy: new Decimal('1'),
    energyGenerator: {},
    watt: new Decimal('0'),
    joule: new Decimal('0'),
    timeSpeed: new Decimal('1'),
    heat: new Decimal('0'),
    temperatureField: {},

    unlockedTemperature: false,
    unlockedJoule: false,
}

//-------------------------- UPDATE --------------------------

//Update energy and generators amounts
function updateEnergyAmounts(diff) {
    for (let i = 5; i > 1; i--) {
        player.energyGenerator[i - 2].amount = Decimal.add(player.energyGenerator[i - 2].amount, Decimal.times(player.energyGenerator[i - 1].amount, Decimal.times(player.energyGenerator[i - 1].mult, Decimal.times(diff, player.timeSpeed))));
    }
    player.energy = Decimal.add(player.energy, Decimal.times(player.energyGenerator[0].amount, Decimal.times(player.energyGenerator[0].mult, Decimal.times(diff, player.timeSpeed))));
    let temperatureCap = new Decimal('1e240')
    if (Decimal.gte(player.energy, temperatureCap)) {
        if (!player.unlockedTemperature) {
            document.getElementById("tab_temperature").style.display = "block";
            document.getElementById("heatPrestige").style.display = "block";
            unlockedTemperature = true;
        }
        player.heat = Decimal.add(player.heat, 1);
        displayHeat();
        heatReset();
    }
}

function temperatureFieldUpdate() {
    for (let i = 0; i < 5; i++) {
        if (Decimal.gte(player.temperatureField[i].level, 1)) {
            let fieldMult = Decimal.add(1, Decimal.times(0.01, player.temperatureField[i].level));
            player.temperatureField[i].mult = Decimal.times(player.temperatureField[i].mult, fieldMult);

            let fieldCap = Decimal.pow(100, player.temperatureField[i].level);
            if (Decimal.gte(player.temperatureField[i].mult, fieldCap)) {
                player.temperatureField[i].mult = fieldCap;
            }
        }
    }
    displayFieldMult();
    multiplierCalculation();
    displayEnergyGenerators();
}

//-------------------------- SAVE --------------------------

function save() {
    localStorage.setItem("energy-incremental-playerdata", JSON.stringify(player));
    console.log("Saved - " + Date.now());
}

function loadSave() {
    player = JSON.parse(localStorage.getItem("energy-incremental-playerdata"));
    player.energyGenerator.forEach(generator => {
        generator.amount = new Decimal(generator.amount);
        generator.level = new Decimal(generator.level);
        generator.mult = new Decimal(generator.mult);
        generator.multBonus = new Decimal(generator.multBonus);
        generator.cost = new Decimal(generator.cost);
        //generator.baseCost = new Decimal(generator.baseCost);
    });
    player.temperatureField.forEach(field => {
        field.level = new Decimal(field.level);
        field.mult = new Decimal(field.mult);
        field.cost = new Decimal(field.cost);
    });

    player.energy = new Decimal(player.energy);
    player.watt = new Decimal(player.watt);
    player.joule = new Decimal(player.joule);
    player.heat = new Decimal(player.heat);

    player.unlockedTemperature = player.unlockedTemperature;
    player.unlockedJoule = player.unlockedJoule

    if (player.unlockedTemperature) {
        document.getElementById("tab_temperature").style.display = "block";
        document.getElementById("heatPrestige").style.display = "block";
    }
    if (player.unlockedJoule) {
        document.getElementById("joulePrestige").style.display = "block";
    }
}

//-------------------------- FORMAT --------------------------

function format(variable, digits) {

    //Catch exponent
    let exponent = Decimal.log(variable, 10);

    //approx = floor( variable / (exponent - digit)^10 )
    let approx = Decimal.floor(Decimal.div(variable, Decimal.pow(Decimal.minus(exponent, digits), 10)));

    // firstPart = approx/10^digit-1
    let firstPart = Decimal.div(approx, Decimal.pow(digits - 1), 10);

    let final = String(approx + "e" + exponent);

    return final;
}

//-------------------------- LOOP & INIT --------------------------

function loop() {
    var diff = (Date.now() - lastUpdate) / 1000;
    displayEnergyAmounts();
    updateEnergyAmounts(diff);
    displayWatt();
    lastUpdate = Date.now();
}

function secondLoop() {
    temperatureFieldUpdate();
}

function init() {
    player.energyGenerator = getEnergyGenerators();
    player.temperatureField = getTemperatureFields();
    displayEnergyGenerators();

    //Put the player on generator tab
    hideEverything();
    generatorsTab();

    //Checking if a save already exist
    if (localStorage.getItem("energy-incremental-playerdata") != null) {
        // loadSave();
    }
}

init();
setInterval(loop, 50);
setInterval(secondLoop, 1000);
setInterval(save, 60000);