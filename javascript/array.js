const rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

for (let i = 0; i < rainbowColors.length; i++) {
  console.log(rainbowColors[i]);
}

for (const color of rainbowColors) {
  console.log(color);
}

const arr = [1000, 2000, 30000, 4000, 5000, 6000, 7000, 8000, 9000, 15000];
let sum = 0;
for (const price of arr) {
  sum += price;
}
const avg = sum / arr.length;
console.log(sum, avg);
