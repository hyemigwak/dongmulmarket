//쿠키생성
const setCookie = (name, value, exp = 1) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 24);
  document.cookie = "";
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;

  if (document.cookie.indexOf("G_AUTHUSER_H") !== -1) {
    document.cookie.replace("G_AUTHUSER_H", "");
  }
};

//쿠키삭제
const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

//쿠키 가져오기
const getCookie = (name) => {
  let cookieArr = [];
  cookieArr = document.cookie.split("; ");

  for (const makeCookie of cookieArr) {
    if (makeCookie.indexOf("user_login") !== -1) {
      let value = "; " + makeCookie;
      let parts = value.split(";  " + name + "=");
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      } else if (parts === "; ") {
        return undefined;
      } else {
        return parts.pop().split("=")[1];
      }
    }
  }
};

export { setCookie, deleteCookie, getCookie };
