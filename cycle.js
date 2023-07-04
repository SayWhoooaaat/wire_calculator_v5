function registerInput() {
  // Update input parameters
  tempUI.value = float(tempUI.inputField.value());
  lengthUI.value = float(lengthUI.inputField.value());
  diaUI.value = float(diaUI.inputField.value());
  
  // Conditionals
  if (currentLayout[0][0] == 1) { // Sjekker SF
    lVoltUI.value = float(lVoltUI.inputField.value());
    tPowerUI.value = float(tPowerUI.inputField.value());
    zonesUI.value = float(zonesUI.inputField.value());
    panelsUI.value = float(panelsUI.inputField.value());
    coilsUI.value = float(coilsUI.inputField.value());
  } else {
    voltUI.value = float(voltUI.inputField.value());
    powerUI.value = float(powerUI.inputField.value());
  }
}


function calculate() {
  // Spenningsfordeling
  if (currentLayout[0][0] == 1) {
    zPowerUI.value = tPowerUI.value / zonesUI.value;
    gPowerUI.value = zPowerUI.value / panelsUI.value;
    powerUI.value = gPowerUI.value / coilsUI.value * 1000;
    // Beregn spenninger
    vList = voltList(lVoltUI.value, panelsUI.value * coilsUI.value);
    vChoices = checkVboxes();
  } else {
    // Direkte beregning
    vList = [];
    vList[0] = voltUI.value;
    vChoices = vList;
  }
  

  // calculate R & temp
  resUI.value = voltUI.value * voltUI.value / powerUI.value; // burde være liste?
  elementTemp = tempUI.value + 100;

  // calculate table
  tableCalc();

}




