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
        if (!player.unlockedJoule) {
            if (Decimal.gte(player.watt, 135)) {
                document.getElementById("joulePrestige").style.display = "block";
                document.getElementById("jouleExplanation").style.display = "block";
                player.forcedCap = 240;
                player.unlockedJoule = true;
            }
        }
        multiplierCalculation();
        wattReset();
    }
}

function joulePrestige() {
    if (Decimal.gte(player.watt, WATTMIN)) {
        player.joule = Decimal.add(player.joule, jouleCalculation());

        let exponent = Decimal.times(player.joule, 0.12);
        for (let i = 0; i < 5; i++) {
            player.energyGenerator[i].multBonus = Decimal.pow(10, exponent);
            if (Decimal.gte(2, player.energyGenerator[i].multBonus)) {
                player.energyGenerator[i].multBonus = 2;
            }
        }

        multiplierCalculation();
        jouleReset();
    }
}