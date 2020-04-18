/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  // define a pointer then decrease the pointer until 0, then start again
  const result = [];
  let i = -1;
  let startRow;
  var column = 0;
  while (i < s.length) {
    startRow = startRow > 0 ? (startRow -= 1) : 0;

    if (startRow !== 0) {
      i += 1;
      result[column] = Array.from({ length: numRows });
      result[column][startRow] = s[i];
      column += 1;
      continue;
    }

    for (let j = 0; j < numRows; j++) {
      i += 1;
      if (j === 0) {
        result[column] = [s[i]];
      } else {
        result[column].push(s[i]);
      }
    }

    column += 1;
    startRow = numRows - 1; // 3
  }

  // connect the dots
  let finalResult = "";
  for (let rowNum = 0; rowNum < result[0].length; rowNum++) {
    for (let i = 0; i < result.length; i++) {
      finalResult += result[i][rowNum] || "";
    }
  }

  return finalResult;
};
