/* ---------- INITIALIZING NEW LAYOUT ------
When changing layout:
1: Delete old UI-boxes & buttons
2: Update positions
3: Do motion
4: Generate new UI-boxes & buttons (CUSTOM)
5: Cycle registerInput, calculate, reDraw
*/

function initCurrent(){
  if (layoutNumber == 1){
    init1();
  } else if (layoutNumber == 2){
    init2();
  }
}


function init1(){
  layoutNumber = 1;
  genericInit();
  
  //button = createButton('Direkte coilberegning');
  //button.mousePressed(layoutchange1);
  
  registerInput();
  calculate();
  vListUpdate = true;
  reDraw();
}

function init2(){
  layoutNumber = 2;
  genericInit();
  
  powerUI.value = round(powerUI.value, 0);
  powerUI.resetValue();
  
  button = createButton('Vis utregning');
  button.mousePressed(layoutchange1);
  
  registerInput();
  calculate();
  reDraw();
}

function genericInit(){
  // Hides everything
  voltUI.hide();
  lVoltUI.hide();
  tPowerUI.hide();
  zonesUI.hide();
  panelsUI.hide();
  coilsUI.hide();
  button.remove();
  
  // updates coordinates
  for (let i = 0; i < layouts[layoutNumber-1].length; i++) {
    currentLayout[i] = [];
    currentLayout[i][0] = layouts[layoutNumber-1][i][0];
    currentLayout[i][1] = layouts[layoutNumber-1][i][1];
    currentLayout[i][2] = layouts[layoutNumber-1][i][2];
  }
  
  // hides checkboxes
  for (let i = 0; i < vList.length; i++) {
    cbList[i].hide();
  }
}


// ------- ONLY SETUP ON STARTUP ------
function createBoxes(){
  // GUI1 boxes
  voltUI = new UIparameter('Spenning:', 'V', 230, true);
  powerUI = new UIparameter('Effekt:', 'W', 4700, true);
  tempUI = new UIparameter('Ovnstemp.:', '\u00B0C', 630, true);
  resUI = new UIparameter('Motstand:', '\u03A9', 0, false);
  lengthUI = new UIparameter('Spirallengde', 'mm', 840, true);
  diaUI = new UIparameter('Innerspiraldia.', 'mm', 33, true);
  
  // UI-boxes SF
  lVoltUI = new UIparameter('Linjespenning:', 'V', 400, true);
  lVoltUI.autoDetect();
  tPowerUI = new UIparameter('Total effekt:', 'kW', 120, true);
  zonesUI = new UIparameter('# temp.reguleringssoner:', 'stk', 2, true);
  panelsUI = new UIparameter('# grupper per sone:', 'stk', 4, true);
  panelsUI.autoDetect();
  zPowerUI = new UIparameter('Effekt i sone:', 'kW', 60, true);
  gPowerUI = new UIparameter('Effekt gruppe:', 'kW', 15, true);
  coilsUI = new UIparameter('Antall coils:', 'stk', 3, true);
  coilsUI.autoDetect();
  
}



