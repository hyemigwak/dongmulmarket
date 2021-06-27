class Notebook {
  constructor(name, price, company) {
    this.name = name;
    this.price = price;
    this.company = company;
  }
}

const notebook1 = new Notebook("Gram", 2000000, "Samsung");
console.log(notebook1.name);
console.log(notebook1.price);
console.log(notebook1.company);
