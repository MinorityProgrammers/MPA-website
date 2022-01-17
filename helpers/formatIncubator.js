export function numFormat(val) {
  return String(val).replace(/(.)(?=(\d{3})+$)/g, '$1,');
}

export function convert(val) {
  let newVal;
  if (val >= 1000000000000) {
    newVal = `${val / 1000000000000}T`;
    return `${newVal}T`;
  } if (val >= 1000000000) {
    newVal = `${val / 1000000000}B`;
    return newVal;
  } if (val >= 1000000) {
    newVal = `${val / 1000000}M`;
    return newVal;
  } if (val >= 1000) {
    newVal = `${val / 1000}K`;
    return newVal;
  }
  return val;
}

export function percentFund(total, current) {
  const result = (100 * current) / total;
  return result.toFixed(0);
}
