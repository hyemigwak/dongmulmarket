function num2han(num) {
  num = parseInt((num + "").replace(/[^0-9]/g, ""), 10) + ""; // 숫자/문자/돈 을 숫자만 있는 문자열로 변환
  if (num == "0") return "영";
  var number = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  var unit = ["", "만", "억", "조"];
  var smallUnit = ["천", "백", "십", ""];
  var result = []; //변환된 값을 저장할 배열
  var unitCnt = Math.ceil(num.length / 4); //단위 갯수. 숫자 10000은 일단위와 만단위 2개이다.
  num = num.padStart(unitCnt * 4, "0"); //4자리 값이 되도록 0을 채운다
  var regexp = /[\w\W]{4}/g; //4자리 단위로 숫자 분리
  var array = num.match(regexp);
  //낮은 자릿수에서 높은 자릿수 순으로 값을 만든다(그래야 자릿수 계산이 편하다)
  for (var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
    var hanValue = _makeHan(array[i]); //한글로 변환된 숫자
    if (hanValue == "")
      //값이 없을땐 해당 단위의 값이 모두 0이란 뜻.
      continue;
    result.unshift(hanValue + unit[unitCnt]); //unshift는 항상 배열의 앞에 넣는다.
  }
  //여기로 들어오는 값은 무조건 네자리이다. 1234 -> 일천이백삼십사
  function _makeHan(text) {
    var str = "";
    for (var i = 0; i < text.length; i++) {
      var num = text[i];
      if (num == "0")
        //0은 읽지 않는다
        continue;
      str += number[num] + smallUnit[i];
    }
    return str;
  }
  return result.join("");
}

num2han()