class ClassifierAlpha {
    number = 0;

    constructor(number) {
        this.number = number;
    }

    isFactor(potentialFactor) {
        return this.number % potentialFactor === 0;
    }

    factors() {
        // var factorSet = new Set();
        // for (var pod = 1; pod <= Math.sqrt(this.number); pod++) {
        //     if (this.isFactor(pod)) {
        //         factorSet.add(pod);
        //         factorSet.add(this.number / pod);
        //     }
        // }
        // return factorSet;


        //this.number를 30이라고 가정했을때 sqrt루트를 씌인 후 ceil로 반올림을 해서(=6) Array로 배열에 [ , , , , , ]넣고 .keys()로 인덱스번호를 value화시켜서
        // 이터레이트로 만들고 ...으로 다시 찢고 , []씌어서 배열로 만들었다;.
        return [...Array(Math.ceil(Math.sqrt(this.number))).keys()].reduce((acc, val) => {
            if (val !== 0 && this.isFactor(val)) { //처음에 acc
                acc.add(val);
                acc.add(this.number / val);
            }

            return acc;
        }, new Set());
    }

    // 완전수
    isPerfect() {
        return this.getCheck() === this.number
    }

    // 과잉
    isAbundant() {
        return this.getCheck() > this.number
    }

    // 부족수
    isDeficient() {
        return this.getCheck() < this.number
    }

    // 반복되는 부분 뺴고 함수로 생
    getCheck() {
        return ClassifierAlpha.sum(this.factors()) - this.number;
    }

    static sum(factors) {
        // var total = 0;
        // factors.forEach((factor) => {
        //     total += factor;
        // });
        // return total;
        return [...factors].reduce((acc, val) => acc + val);
    }

}

var alpha1 = new ClassifierAlpha(10);
var alpha2 = new ClassifierAlpha(6);

console.log(alpha1.isPerfect());
console.log(alpha2.isPerfect());

// 프라임
class PrimeAlpha {
    number = 0;

    constructor(number) {
        this.number = number
    }

    equalSet(aset, bset) {
        if (aset.size !== bset.size) return false;
        for (var a of aset) if (!bset.has(a)) return false;
        return true;
    }

    isPrime() {
        var primeSet = new Set([1, this.number]);
        return this.number > 1 && this.equalSet(this.factors(), primeSet);
    }

    isFactor(potentialFactor) {
        return this.number % potentialFactor === 0;
    }

    factors() {
        // var factorSet = new Set();
        // for (var pod = 1; pod <= Math.sqrt(this.number); pod++) {
        //     if (this.isFactor(pod)) {
        //         factorSet.add(pod);
        //         factorSet.add(this.number / pod);
        //     }
        // }
        // return factorSet;
        return [...Array(Math.ceil(Math.sqrt(this.number))).keys()].reduce((acc, val) => {
            if (val !== 0 && this.isFactor(val)) {
                acc.add(val);
                acc.add(this.number / val);
            }

            return acc;
        }, new Set());
    }
}

// const prime1 = new PrimeAlpha(10);
// const prime2 = new PrimeAlpha(7);
//
// console.log(prime1.isPrime());
// console.log(prime2.isPrime());

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

// console.log(result)
// result 를 다듬어서 출력
Object.keys(result).forEach(key => {
    console.log(key + ' : ' + result[key].join(", "));
});