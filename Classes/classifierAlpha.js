// 자연수 분류 Origin, RefactoringClasses 를 이용해서 2-100까지 자연수 중에서
// 약수중 완전수(perfect), 과잉수(Abundant), 부족수(Deficient)인지 판단하는 Origin 클래스.

class ClassifierAlpha {

    constructor(number) {
        this.number = number;
    }

    isFactor(potentialFactor) {
        return this.number % potentialFactor == 0;
    }

    factors() {
        var factorSet = [];
        for (var pod = 1; pod <= Math.sqrt(this.number); pod++ ) {
            if (this.isFactor(pod)) {
                factorSet.push(pod);
                factorSet.push(this.number / pod);
            }
        }
        return factorSet;
    }

    isPerfect() {
        var currentFactor = this.factors();
        return (this.sum(currentFactor) - this.number) == this.number
    }

    isAbundant() {
        var currentFactor = this.factors();
        return (this.sum(currentFactor) - this.number) > this.number
    }

    isDeficient() {
        var currentFactor = this.factors();
        return (this.sum(currentFactor) - this.number) < this.number
    }

    sum(factors) {
        var total = 0;
        factors.forEach( function(factor) {
            total += factor;
        });
        return total;
    }
}

var alpha1 = new ClassifierAlpha(10);
var alpha2 = new ClassifierAlpha(6);
var alpha3 = new ClassifierAlpha();

console.log(alpha1.isPerfect());
console.log(alpha2.isPerfect());
console.log(alpha3.isPerfect());


// 소수(Prime) 인지를 판단하는 클래스.

class PrimeAlpha {
    constructor(number) {
        this.number = number
    }

    equalSet(aset, bset) {
        if (aset.length!== bset.length) return false;
        for (var a of aset) if (!bset.includes(a)) return false;
        return true;
    }

    isPrime() {
        var primeSet = [1, this.number];
        return this.number > 1 && this.equalSet(this.factors(), primeSet);
    }

    isFactor(potentialFactor) {
        return this.number % potentialFactor == 0;
    }

    factors() {
        var factorSet = [];
        for (var pod = 1; pod <= Math.sqrt(this.number); pod++ ) {
            if (this.isFactor(pod)) {
                factorSet.push(pod);
                factorSet.push(this.number / pod);
            }
        }
        return factorSet;
    }
}

var prime1 = new PrimeAlpha(10);
var prime2 = new PrimeAlpha(7);

console.log(prime1.isPrime());
console.log(prime2.isPrime());