function ClassifierAlpha(number) {
    this.number = number || 0;

    this.isFactor = function (potentialFactor) {
        return this.number % potentialFactor === 0;
    }

    this.factors = function () {
        return [...Array(Math.ceil(Math.sqrt(this.number))).keys()].reduce((acc, val) => {
            if (val !== 0 && this.isFactor(val)) { //처음에 acc
                acc.add(val);
                acc.add(this.number / val);
            }

            return acc;
        }, new Set());
    }

    // 완전수
    this.isPerfect = function () {
        return this.getCheck() === this.number
    }

    // 과잉
    this.isAbundant = function () {
        return this.getCheck() > this.number
    }

    // 부족수
    this.isDeficient = function () {
        return this.getCheck() < this.number
    }

    // 반복되는 부분 뺴고 함수로 생성
    this.getCheck = function () {
        return this.sum(this.factors()) - this.number;
    }

    this.sum = function (factors) {
        return [...factors].reduce((acc, val) => acc + val);
    }

}

const alpha1 = new ClassifierAlpha(10);
const alpha2 = new ClassifierAlpha(6);

console.log(alpha1.isPerfect());
console.log(alpha2.isPerfect());

function PrimeAlpha(number) {
    this.number = number || 0;

    this.equalSet = function (aset, bset) {
        if (aset.size !== bset.size) return false;
        for (var a of aset) if (!bset.has(a)) return false;
        return true;
    }

    this.isPrime = function () {
        var primeSet = new Set([1, this.number]);
        return this.number > 1 && this.equalSet(this.factors(), primeSet);
    }

    this.isFactor = function (potentialFactor) {
        return this.number % potentialFactor === 0;
    }

    this.factors = function () {

        return [...Array(Math.ceil(Math.sqrt(this.number))).keys()].reduce((acc, val) => {
            if (val !== 0 && this.isFactor(val)) {
                acc.add(val);
                acc.add(this.number / val);
            }

            return acc;
        }, new Set());
    }
}

const prime1 = new PrimeAlpha(10);
const prime2 = new PrimeAlpha(7);
console.log(prime1.isPrime());
console.log(prime2.isPrime());

const result = [...Array(101).keys()].filter(val => val >= 2).reduce((acc, val) => {
    const classifier = new ClassifierAlpha(val);
    const prime = new PrimeAlpha(val);

    // 객체로 관리 - 키:숫자 값:결과
    let result = [];
    if (classifier.isPerfect()) result.push("perfect");
    if (classifier.isAbundant()) result.push("abundant");
    if (classifier.isDeficient()) result.push("deficient");
    if (prime.isPrime()) result.push("prime");

    acc[val] = result; // 숫자에 맞는 키를 찾아 값을 넣음
    return acc;
}, {});


Object.keys(result).forEach(key => {
    console.log(key + ' : ' + result[key].join(", "));
});

