function voltList(voltP, tCoils) {
  // Lag liste over alle potensielle spenninger
  let voltList = [];
  // faktoriser tCoils
  let factors = [];
  let nFactors = 0;
  let rest;
  for (let i = 1; i < tCoils / 3 + 1; i++) {
    rest = tCoils / 3 / i;
    if (rest % 1 == 0) {
      nFactors = nFactors + 1;
      factors[nFactors] = rest;
    }
  }
  let nums = 0;
  for (let i = nFactors; i > 0; i--) {
    voltList[nums] = voltP / factors[i];
    voltList[nums + 1] = voltList[nums] / Math.sqrt(3);
    nums = nums + 2;
  }
  
  // sjekk om listen har endret seg
  if (vList != undefined) {
    if (voltList.length == vList.length) {
      for (let i = 0; i < vList.length; i++) {
        if (voltList[i] != vList[i]) {
          //ulikt
          vListUpdate = true;
          break;
        } else {
          //likt
          vListUpdate = false;
        }
      }
    } else {
      vListUpdate = true;
    }
  } else {
    vListUpdate = true;
  }
  //console.log(vListUpdate)

  return voltList;
}