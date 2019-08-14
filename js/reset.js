function energyReset() {
    player.energy = 1;
    for (let i = 0; i < 5; i++) {
        player.energyGenerator[i].amount = 0;
        player.energyGenerator[i].level = 0;
        player.energyGenerator[i].cost = player.energyGenerator[i].basecost;
    }
}

function wattReset() {
    energyReset();
    displayEnergyAmounts();
    displayEnergyGenerators();
    displayJoule();
}

function jouleReset() {
    player.watt = 0;
    multiplierCalculation();
    wattReset();
}

function heatReset() {
    player.joule = 0
    for (i = 0; i < 5; i++) {
        player.energyGenerator[i].multBonus = 1;
    }
    jouleReset();
}