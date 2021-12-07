export function numFormat(val) {
  return String(val).replace(/(.)(?=(\d{3})+$)/g, '$1,');
}

export function convert(val) {
  if (val >= 1000000000000) {
    val = `${val / 1000000000000}T`;
    return `${val}T`;
  } if (val >= 1000000000) {
    val = `${val / 1000000000}B`;
    return val;
  } if (val >= 1000000) {
    val = `${val / 1000000}M`;
    return val;
  } if (val >= 1000) {
    val = `${val / 1000}K`;
    return val;
  }
  return val;
}

export function percentFund(total, current) {
  const result = (100 * current) / total;
  return result.toFixed(0);
}
