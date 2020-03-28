export function colorsForNumber(number) {
  if (number > 5000) {
    return {
      background: 'rgba(255, 99, 71, 0.5)',
      border: 'rgb(255, 99, 71)'
    };
  } else if (number > 1000) {
    return {
      background: 'rgba(255, 140, 0, 0.5)',
      border: 'rgb(255, 140, 0)'
    };
  } else {
    return {
      background: 'rgba(46, 139, 87, 0.5)',
      border: 'rgb(46, 139, 87)'
    };
  }
}

export function isDark(scheme) {
  return scheme === 'dark';
}
