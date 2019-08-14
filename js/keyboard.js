window.addEventListener('keydown', function(event) {
    //console.log(event.keyCode) // console log id of key pressed
    switch (event.keyCode) {
        case 77: // M
            maxAllEnergy();
            break;
    }
}, false);

function maxAllEnergy() {
    for (let i = 0; i < 5; i++) {
        while (Decimal.gte(player.energy, player.energyGenerator[i].cost)) {
            buyEnergyGenerator(i);
        }
    }
}