function buyEnergyGenerator(i) {
    if (Decimal.gte(player.energy, player.energyGenerator[i].cost)) {
        player.energy = Decimal.minus(player.energy, player.energyGenerator[i].cost);
        player.energyGenerator[i].amount = Decimal.add(player.energyGenerator[i].amount, 1);
        player.energyGenerator[i].level = Decimal.add(player.energyGenerator[i].level, 1)
        generatorScaling(i);
        displayEnergyGenerators();
    }
}

function buyTemperatureField(i) {
    if (Decimal.gte(9, player.temperatureField[i].level)) {
        if (Decimal.gte(player.heat, player.temperatureField[i].cost)) {
            player.heat = Decimal.minus(player.heat, player.temperatureField[i].cost);

            player.temperatureField[i].level = Decimal.add(player.temperatureField[i].level, 1);

            //cost increase
            temperatureFieldScaling(i);
            displayFieldCost();
            displayHeat();
        }
    }
}

function wattPrestige() {
    let wattGain = new Decimal(wattCalculation())
    if (Decimal.gte(wattGain, 0.5)) {
        player.watt = Decimal.add(player.watt, wattGain);
        if (Decimal.gte(player.watt, 135)) {
            document.getElementById("joulePrestige").style.display = "block";
        }
        multiplierCalculation();
        wattReset();
    }
}

function joulePrestige() {
    if (Decimal.gte(player.watt, WATTMIN)) {
        player.joule = Decimal.add(player.joule, jouleCalculation());
        for (let i = 0; i < 5; i++) {
            player.energyGenerator[i].multBonus = Decimal.pow(JOULEMULT, player.joule);
        }
        multiplierCalculation();
        jouleReset();
    }
}