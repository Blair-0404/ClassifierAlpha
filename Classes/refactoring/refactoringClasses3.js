Number.prototype.isFactor = function (potentialFactor) {
    return this % potentialFactor === 0;
}


Number.prototype.factors = function () {

    return [...Array(Math.ceil(Math.sqrt(this))).keys()].reduce((acc, val) => {
        if (val !== 0 && this.isFactor(val)) {
            acc.push(val);
            acc.push(this / val);
        }

        return acc;
    }, []);
}


Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}

Number.prototype.isAbundant = function () {
    return this.getCheck() > this
}
Number.prototype.isDeficient = function () {
    return this.getCheck() < this
}
Number.prototype.isPerfect = function () {
    return this.getCheck() == this
}
Number.prototype.isPrime = function () {
    const cd = this.factors();
    return this.factors().sum() - this
}
Number.prototype.getCheck = function () {
    const cd = this.factors();
    return this.factors().sum() - this
}

Number.prototype.equalSet = function (aset, bset) {
    if (aset.length !== bset.length) return false;
    for (var a of aset) if (!bset.includes(a)) return false;
    return true;
}

Number.prototype.isPrime = function () {
    var primeArr = [1, this.valueOf()];
    return this.valueOf() > 1 && this.equalSet(this.factors(), primeArr);
}


const result = [...Array(101).keys()].filter(val => val >= 2).reduce((acc, val) => {
    let result = [];

    if (val.isPerfect()) result.push("perfect");
    if (val.isAbundant()) result.push("abundant");
    if (val.isDeficient()) result.push("deficient");
    if (val.isPrime()) result.push("prime");

    acc[val] = result; // 숫자에 맞는 키를 찾아 값을 넣음
    return acc;
}, {});

Object.keys(result).forEach(key => {
    console.log(key + ' : ' + result[key].join(", "));
});

