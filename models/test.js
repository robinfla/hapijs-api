class Triple {
  constructor(number) {
    this.number = number;
  }

  show() {
    console.log(this.number);
  }

  get double() {
    console.log(this.number * 2);
  }

  static triple(n) {
    if (n === undefined) {
      n = 1;
    }
    return n * 3;
  }
}

class SuperTriple extends Triple {
  static triple(n) {
    return super.triple(n) * super.triple(n);
  }
}

console.log(Triple.triple());       // 3
console.log(Triple.triple(6));      // 18
console.log(SuperTriple.triple(4)); // 144
var tp = new Triple(2);
console.log(SuperTriple.triple(4)); // 144 (pas d'impact de l'affectation du parent)
// console.log(tp.triple()); // tp.triple n'est pas une fonction
tp.show;
// tp.double;
