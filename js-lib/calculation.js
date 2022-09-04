function add(num1, num2) {
  const num1Digits = (num1.toString().split(".")[1] || "").length;
  const num2Digits = (num2.toString().split(".")[1] || "").length;
  const magnification = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (
    (Math.floor(num1 * magnification) + Math.floor(num2 * magnification)) /
    magnification
  );
}

add(0.1, 0.2);

function multiply(num1, num2) {
  const num1Digits = (num1.toString().split(".")[1] || "").length;
  const num2Digits = (num2.toString().split(".")[1] || "").length;
  const magnification = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (
    (Math.floor(num1 * magnification) * Math.floor(num2 * magnification)) /
    (magnification * magnification)
  );
}
