function getEnergyGenerators() {
    let energyGenerator = [];
    for (let i = 0; i < 5; i++) {
        energyGenerator.push(getNewGenerator('energyGen' + i));
    }

    energyGenerator[0].cost = new Decimal('1');
    energyGenerator[1].cost = new Decimal('1e3');
    energyGenerator[2].cost = new Decimal('1e8');
    energyGenerator[3].cost = new Decimal('1e16');
    energyGenerator[4].cost = new Decimal('1e30');

    for (let i = 0; i < 5; i++) {
        energyGenerator[i].basecost = energyGenerator[i].cost;
    }
    return energyGenerator;
}


function getNewGenerator(id, basecost, cost, mult, multBonus, amount, level) {
    let generator = {
        id: id,
        basecost: basecost,
        cost: cost,
        mult: mult,
        multBonus,
        amount: amount,
        level: level,
    }

    if (generator.mult == undefined) {
        generator.mult = new Decimal('1');
    }
    if (generator.multBonus == undefined) {
        generator.multBonus = new Decimal('1');
    }
    if (generator.amount == undefined) {
        generator.amount = new Decimal('0');
    }
    if (generator.level == undefined) {
        generator.level = new Decimal('0');
    }
    if (generator.cost == undefined) {
        generator.cost = new Decimal('10');
    }
    return generator;
}


function generatorScaling(g) {
    let basePow; //power of the first Joule
    let baseLvlScaling; //maximum level of the first Joule
    //Stats for each generator
    switch (g) {
        case 0:
            //Free levels at start of a new run
            if (Decimal.gte(8, player.energyGenerator[0].level)) {
                player.energyGenerator[0].cost = Decimal.times(player.energyGenerator[0].cost, 10);
                return;
            } else {
                basePow = new Decimal('2')
                baseLvlScaling = new Decimal('60')
            }
            break;
        case 1:
            basePow = new Decimal('4')
            baseLvlScaling = new Decimal('30')
            break
        case 2:
            basePow = new Decimal('6')
            baseLvlScaling = new Decimal('20')
            break;
        case 3:
            basePow = new Decimal('8')
            baseLvlScaling = new Decimal('15')
            break;
        case 4:
            basePow = new Decimal('10')
            baseLvlScaling = new Decimal('12')
            break;

    }
    // lvlScaling = floor((level+1)/baseLvlScaling) 
    // Determine soft caps levels in which price increase based on generator
    let lvlScaling = Decimal.floor(Decimal.div(Decimal.add(player.energyGenerator[g].level, 1), baseLvlScaling));

    // pow = basePow * (2^lvlScaling)
    // Determine the power of ten necessary
    let pow = Decimal.times(basePow, Decimal.pow(2, lvlScaling));

    // multCalculation = 10^pow
    // Calculate the power increase of the price for the generator
    let multCalculation = Decimal.pow(10, pow);

    // newPrice = OldPrice * powCalculation
    // Obtain the new price
    player.energyGenerator[g].cost = Decimal.times(player.energyGenerator[g].cost, multCalculation);
}