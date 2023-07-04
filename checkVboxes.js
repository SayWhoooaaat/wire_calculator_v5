function checkVboxes() {
  vChoices = [];
  if (vListUpdate) {
    // listen er ikke vist for bruker enda
    // anta at alle valg er innafor
    vChoices = vList;
  } else {
    let nChoices = 0;
    for (let i = 0; i < vList.length; i++) {
      if (cbList[i].checked()) {
        vChoices[nChoices] = vList[i];
        nChoices++;
      }
    }
  }
  //console.log(vChoices);
  return vChoices;
}