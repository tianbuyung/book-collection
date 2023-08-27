class Calculator {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    return a / b;
  }

  static mood(a, b) {
    return a % b;
  }

  static square(a) {
    return a * a;
  }

  static cube(a) {
    return a * a * a;
  }

  static absoluteValue(a) {
    return Math.abs(a);
  }

  static power(base, exponent) {
    return Math.pow(base, exponent);
  }
}

module.exports = Calculator;
