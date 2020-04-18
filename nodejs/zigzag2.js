/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  let currentRow = 0;
  let direction = 1;
  let newArray = [];

  for (let i = 0; i < s.length; i++) {
    if (newArray[currentRow]) {
      newArray[currentRow].push(s[i]);
    } else {
      newArray[currentRow] = [s[i]];
    }

    currentRow = currentRow + direction;

    if (currentRow === numRows - 1 || currentRow === 0) {
      direction = direction * -1;
    }
  }

  return newArray.reduce((acc, current) => {
    acc += current.join("");
    return acc;
  }, "");
};

console.log(convert("PAYPALISHIRING", 4));
