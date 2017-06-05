import axios from 'axios'
let base = [],
  quote = [],
  result = {};
const baseCurrencyTemplate = {
  limitMax: 200000,
  limitMin: 0.001,
  marketMax: 200000,
  marketMin: 0.001,
  float: 4,
}
const quoteCurrencyTemplate = {
  limitMax: 1000000,
  limitMin: 0.01,
  marketMax: 100000000,
  marketMin: 1,
  float: 2,
}
function protype(o) {
  return Object.prototype.toString.call(o).split(" ")[1].replace(/[^\w]/g, "").toLowerCase();
}
function clone(o) {
  var tmp = protype(o) === "object" ? {} : [];
  for (var k in o) {
    if (protype(o[k]) === "object" || protype(o[k]) === "array") {
      tmp[k] = clone(o[k])
    } else {
      tmp[k] = o[k];
    }
  }
  return tmp;
}
axios.get('/api/common/symbols').then((r) => {
  r.data.data.forEach((i) => {
    base.push(i['base-currency'].toUpperCase())
    quote.push(i['quote-currency'].toUpperCase())
  })
  base.forEach((i) => {
    result[i] = clone(baseCurrencyTemplate)
  })
  quote.forEach((i) => {
    result[i] = clone(quoteCurrencyTemplate)
  })
})
window.base = base
window.quote = quote


export default result
