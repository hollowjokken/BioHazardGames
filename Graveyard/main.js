class Auto {
    constructor(model) {
        this.model = model;
    }

    // present() {
    //     console.dir(this.model);
    // }
}

Auto.prototype.present = function() {
        console.dir(this.model);
    }
    // Q: where is .this in here ???
    // A: WINDOW
    // Auto.prototype.present = () => {
    //     console.log('TCL: Auto.prototype.present -> this', this);
    //     console.dir(this.model);
    // }

class Audi extends Auto {
    constructor(series, model) {
        super(model);
        this.series = series;
    }
}

// Audi.prototype = Object.create(Auto.prototype);
// Audi.prototype.constructor = Audi;

let audi = new Audi('5', '2000');
audi.present();

class Bmv {
    constructor(series) {
        this.series = series;
    }
}

function Car(type, model) {
    this.type = type;
    this.model = model;
}

Car.prototype.present = function() {
    console.dir(this.model);
}

function Fiat(series, model) {
    Car.call(this);
    this.series = series;
    this.model = model;

}
Fiat.prototype = Car.prototype;
// Fiat.prototype = Object.create(Car.prototype);
// Fiat.prototype.constructor = Fiat;

let fiat = new Fiat('5', 'Fiat2000');
fiat.present();

function Opel(series) {
    this.series = series;
}