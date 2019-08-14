//-------------------------- TEMPERATURE FIELDS --------------------------

function getTemperatureFields() {
    let temperatureField = [];
    for (let i = 0; i < 5; i++) {
        temperatureField.push(getNewTemperatureField('temperatureField' + i));
    }
    return temperatureField;
}


function getNewTemperatureField(id, cost, mult, level) {
    let field = {
        id: id,
        cost: cost,
        mult: mult,
        level: level,
    }

    if (field.mult == undefined) {
        field.mult = new Decimal('1');
    }
    if (field.level == undefined) {
        field.level = new Decimal('0');
    }
    if (field.cost == undefined) {
        field.cost = new Decimal('1');
    }
    return field;
}

function temperatureFieldScaling(i) {
    if (Decimal.gte(player.temperatureField[i].level, 4 - i)) {
        player.temperatureField[i].cost = Decimal.add(player.temperatureField[i].cost, 1);
    }
}

//-------------------------- IFY --------------------------