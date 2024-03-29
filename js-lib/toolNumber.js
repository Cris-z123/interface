/**
 * 超多数量级数字展示
 * @param {Number} num 
 * @returns 
 */
function toolNumber(num) {
  let num_str = num.toString();
  if (num_str.indexOf("+") != -1) {
    num_str = num_str.replace("+", "");
  }
  if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
    let resValue = "",
      power = "",
      result = null,
      dotIndex = 0,
      resArr = [],
      sym = "";
    // var numStr = num_str.toString();
    if (num_str[0] == "-") {
      // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
      num_str = num_str.substr(1);
      sym = "-";
    }
    if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
      var regExp = new RegExp(
        "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
        "ig"
      );
      let result = regExp.exec(num_str);
      if (result != null) {
        resValue = result[2];
        power = result[5];
        result = null;
      }
      if (!resValue && !power) {
        return false;
      }
      let dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
      resValue = resValue.replace(".", "");
      resArr = resValue.split("");
      if (Number(power) >= 0) {
        var subres = resValue.substr(dotIndex);
        power = Number(power);
        //幂数大于小数点后面的数字位数时，后面加0
        for (var i = 0; i <= power - subres.length; i++) {
          resArr.push("0");
        }
        if (power - subres.length < 0) {
          resArr.splice(dotIndex + power, 0, ".");
        }
      } else {
        power = power.replace("-", "");
        power = Number(power);
        //幂数大于等于 小数点的index位置, 前面加0
        for (var i = 0; i < power - dotIndex; i++) {
          resArr.unshift("0");
        }
        var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
        resArr.splice(n, 0, ".");
      }
    }
    resValue = resArr.join("");

    return sym + resValue;
  } else {
    return num_str;
  }
}

function formatThousandths1(number) {
  number = Math.floor(number)

  let str = ''
  let strN = number.toString()
  let length = strN.length

  for (let i = length - 1; i >= 0; i--) {
    let j = length - i
    if (j % 3 === 0) {
      str = ',' + strN[i] + str
    } else {
      str = strN[i] + str
    }
  }

  return str
}

function formatThousandths2(number) {
  return number.toLocaleString('en-us')
}
