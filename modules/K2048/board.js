/**
 * 
 * @param {object} array
 * @returns {string} 
 */

module.exports = function (array) {
  let form = Math.sqrt(array.length); // 4 x 4? 5 x 5?
  let _BSTN = []; let numArray = [];
  array.forEach(e => {
    e.forEach(f => {
      _BSTN.push(f);
      numArray.push(f);
    })
  });
  _BSTN.sort(function (a,b) {
    return b - a;
  });
  let aL = function (x) {
    x = String(x);
    return x.padStart(String(_BSTN[0]).length, "0");
  }
  return (numArray.map((e,i) => {
     return (((i) % 4) || !i? String(e) : "\n"+ String(e));
  })).join("  ");
}