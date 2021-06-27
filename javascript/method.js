class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  printInfo() {
    console.log(`name: ${this.name}, price: ${this.price}`);
  }
}
const notebook = new Product("Macbook", 200000);
notebook.printInfo();

const computer = {
  name: "apple Macbook",
  price: 190000,
  print: function () {
    console.log(`상품명: ${this.name}, 가격: ${this.price}`);
  },
};
computer.print();

class Cloth {
  constructor(color, size, price) {
    this.color = color;
    this.size = size;
    this.price = price;
  }
  printInfo() {
    console.log(`${this.color}, ${this.size}, ${this.price}`);
  }
}

const coat = new Cloth("navy", "L", 20000);
coat.printInfo();

const Clothes = {
  color: "navy",
  size: "L",
  price: 18000,
  print: function () {
    console.log(`색상: ${this.color}, 사이즈: ${this.size}, 가격: ${this.price}`);
  },
};
Clothes.print();
