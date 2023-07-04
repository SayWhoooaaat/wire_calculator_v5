// ------------ THIS MAKES ANIMATIONS ---------

function updateGroupPos(pIndex, lay1, lay2) {
  // ex: group1, 0, 2
  let xi = currentLayout[pIndex][1];
  let yi = currentLayout[pIndex][2];

  let xs = layouts[lay1 - 1][pIndex][1];
  let ys = layouts[lay1 - 1][pIndex][2];

  let xf = layouts[lay2 - 1][pIndex][1];
  let yf = layouts[lay2 - 1][pIndex][2];

  let steps = 18;
  let xi2 = xi + (xf - xs) / steps;
  let yi2 = yi + (yf - ys) / steps;

  if (abs(xi - xs) > abs(xf - xs) || abs(yi - ys) > abs(yf - ys)) {
    // stop
    move = false;    
  }

  return [1, xi2, yi2]; // bieffekt: endrer alle grupper til "vises"

}