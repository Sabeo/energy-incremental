//-------------------------- CONSTANT --------------------------

const WATTMIN = 135
const WATTSCALE = 10
const WATTCAP = 3

const WATTMULT = 1.2
const WATTGENMULT = 0.1

const JOULEMULT = 1.5

//-------------------------- PRESTIGE CALCULATION --------------------------


function wattCalculation() {
    let wattGain = new Decimal('0');

    //Sum of all levels
    for (let i = 0; i < 5; i++) {
        wattGain = Decimal.add(wattGain, Decimal.times(player.energyGenerator[i].level, 1));
    }

    //watt Gain = player.watt - sum
    wattGain = Decimal.minus(wattGain, player.watt);
    return wattGain;
}

function jouleCalculation() {
    let jouleGain = new Decimal('0');
    jouleGain = Decimal.minus(player.watt, WATTMIN - 1);
    jouleGain = Decimal.div(jouleGain, WATTSCALE);
    jouleGain = Decimal.floor(jouleGain);

    if (Decimal.gt(WATTCAP, jouleGain)) {
        jouleGain = Decimal.minus(player.watt, WATTMIN - 1);
        if (Decimal.gte(jouleGain, WATTCAP)) {
            jouleGain = new Decimal(WATTCAP);
        }
    }
    return jouleGain;
}

//-------------------------- OTHER CALCULATIONS --------------------------


function multiplierCalculation() {
    for (let i = 1; i <= 5; i++) {
        player.energyGenerator[i - 1].mult = Decimal.pow(WATTMULT + WATTGENMULT * (6 - i), player.watt);
        player.energyGenerator[i - 1].mult = Decimal.times(player.energyGenerator[i - 1].mult, player.temperatureField[i - 1].mult);
        player.energyGenerator[i - 1].mult = Decimal.times(player.energyGenerator[i - 1].mult, player.energyGenerator[i - 1].multBonus);
    }
}

function stabilityCalculation() {
    let logE = Decimal.log(player.energy, 10);
    let stabilityCoef = Decimal.div(logE, player.forcedCap);
    let stabilityPercent = Decimal.times(stabilityCoef, 100);
    return stabilityPercent;
}