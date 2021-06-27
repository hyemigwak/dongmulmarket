let nums = [
  [1, "일"],
  [2, "이"],
  [3, "삼"],
  [4, "사"],
  [5, "오"],
  [6, "육"],
  [7, "칠"],
  [8, "팔"],
  [9, "구"],
];
let unit = [
  [10, "십"],
  [100, "백"],
  [1000, "천"],
  [10000, "만"],
  [100000000, "억"],
  [1000000000000, "조"],
];

function textTonum(a, b) {
  for (let i = 0; i < nums.length; i++) {
    if (a === nums[i][1]) {
      return nums[i][0] * myUnit(b);
    }
  }
  return 0;
}

function myUnit(c) {
  for (let i = 0; i < unit.length; i++) {
    if (c === unit[i][1]) {
      return unit[i][0];
    }
  }
  return 1;
}

function getNums(a) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    temp = textTonum(a.substring(i, i + 1), a.substring(i + 1, i + 2));
    sum += temp;
    if (temp === 0) {
      sum += myUnit(a.substring(i, i + 1));
    } else {
      i++;
    }
  }
  return sum;
}
console.log(getNums("오백삼십삼조일억천팔백구십이만사천오백사십팔"));

function sum(a, b) {
  return getNums(a) + getNums(b);
}

console.log(sum("오백삼십조칠천팔백구십만천오백삼십구", "삼조사천이만삼천구"));
