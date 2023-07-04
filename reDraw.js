let cbList = [];
let stepCount;

function reDraw(){
  background(255);
  
  // Tittelfelt
  line(510, 100, 510, 1100)
  line(520, 100, 520, 1100)
  button.position(4, 4);
  
  
  // Grupper
  stepCount = 0;
  if (currentLayout[0][0] == 1){
    stepCount = stepCount + 1;
    drawG1(currentLayout[0][1],currentLayout[0][2]);
  }
  if (currentLayout[1][0] == 1){
    stepCount = stepCount + 1;
    drawG2(currentLayout[1][1],currentLayout[1][2]);
  }
  if (currentLayout[2][0] == 1){
    stepCount = stepCount + 1;
    drawG3(currentLayout[2][1],currentLayout[2][2]);
  }
  if (currentLayout[3][0] == 1){
    stepCount = stepCount + 1;
    drawG4(currentLayout[3][1],currentLayout[3][2]);
  }
  if (currentLayout[4][0] == 1){
    stepCount = stepCount + 1;
    drawG5(currentLayout[4][1],currentLayout[4][2]);
  }
  if (currentLayout[5][0] == 1){
    stepCount = stepCount + 1;
    tableDraw(currentLayout[5][1],currentLayout[5][2]);
  }
}

function stepDraw(xP, yP){
  push();
  strokeWeight(1);
  line(xP,yP,xP+450,yP);
  strokeWeight(1);
  fill(255);
  ellipse(xP + 28, yP + 10, 42, 42);
  pop();
  text("Steg " + stepCount, xP + 10, yP + 14);
}


// ---------------- TEGNE -----------------

function drawG1(xP, yP) {
  image(img4, xP + 30, yP + 20, 440, 230);
  stepDraw(xP, yP);
  
  lVoltUI.show(xP, yP + 138);
  tPowerUI.show(xP + 210, yP + 30);
  zonesUI.show(xP + 250, yP + 258);

}

function drawG2(xP, yP) {
  image(img5, xP, yP + 50, 200, 230);
  stepDraw(xP, yP);
  
  zPowerUI.showOutput(xP + 50, yP + 34, 1);
  panelsUI.show(xP + 200, yP + 20);
  tempUI.show(xP + 44, yP + 266);

  image(img6, xP + 260, yP + 80, 160, 160);
  gPowerUI.showOutput(xP + 330, yP + 60, 1);
  coilsUI.show(xP + 220, yP + 220);
}


function drawG3(xP, yP) {
  image(img, xP, yP + 60, 190, 200);
  stepDraw(xP, yP);
  
  push();
  textSize(18);
  text('V =', xP + 120, yP + 60);
  fill(255);
  noStroke();
  rect(xP, yP + 180, 100, 80);
  pop();
  powerUI.showOutput(xP + 50, yP + 190, 0);

  let xC = xP + 186;
  let xCb = xC + 168;
  let yC = yP + 16;
  let yCb = yC + 20 + vList.length * 12;
  line(xC, yC, xC + 10, yC);
  line(xC, yC, xC, yCb);
  line(xC, yCb, xC + 10, yCb);
  line(xCb, yC, xCb - 10, yC);
  line(xCb, yC, xCb, yCb);
  line(xCb, yCb, xCb - 10, yCb);
  push();
  noFill();
  triangle(xC + 26, yC + 14, xC + 40, yC + 14, xC + 33, yC + 2);
  pop();
  line(xC + 112, yC, xC + 112, yC + 8);
  line(xC + 112, yC + 8, xC + 120, yC + 14);
  line(xC + 112, yC + 8, xC + 104, yC + 14);

  // Sjekk om bokser må endres
  if (vListUpdate == true) {
    for (let i = 0; i < cbList.length; i++) {
      cbList[i].remove();
    }
    cbList = [];
  }
  // Vis checkbokser
  for (let i = 0; i < vList.length; i += 2) {
    text(Number.parseFloat(vList[i]).toFixed(1) + ' V', xC + 10, yC + 32 + i * 12);
    text(Number.parseFloat(vList[i + 1]).toFixed(1) + ' V', xC + 90, yC + 32 + i * 12);
    if (vListUpdate == true) {
      cbList[i] = createCheckbox('', true);
      cbList[i].position(xC + 56, yC + 18 + i * 12);
      cbList[i].input(showHint);
      cbList[i + 1] = createCheckbox('', true);
      cbList[i + 1].position(xC + 136, yC + 18 + i * 12);
      cbList[i + 1].input(showHint);
    }
  }
  for (let i = 0; i < cbList.length; i++) {
    cbList[i].show();
  }
  // Vis koblingsmuligheter
  if (vList.length == 0){
    push();
    fill(255,0,0);
    textSize(12);
    text('Antall grupper eller \nantall coils må \nkunne deles på 3!',xC + 10,yCb + 16);
    pop();
  }

}

// Gruppe for direkte utregning
function drawG4(xP, yP) {
  image(img, xP + 6, yP + 54, 190, 200);
  stepDraw(xP, yP);
  button.position(xP + 200, yP);
  line(xP + 190, yP + 10, xP + 170, yP + 10);
  line(xP + 190, yP + 10, xP + 170, yP + 10);
  line(xP + 170, yP + 10, xP + 176, yP + 5);
  line(xP + 170, yP + 10, xP + 176, yP + 15);
  line(xP + 220, yP + 30, xP + 220, yP + 50);
  line(xP + 220, yP + 50, xP + 225, yP + 44);
  line(xP + 220, yP + 50, xP + 215, yP + 44);
  voltUI.show(xP + 78, yP + 30);
  powerUI.show(xP + 194, yP + 196);
  tempUI.show(xP, yP + 230);
}


function drawG5(xP, yP) {
  image(img2, xP, yP + 20, 300, 200);
  stepDraw(xP, yP);
  
  lengthUI.show(xP + 80, yP + 70);
  diaUI.show(xP + 128, yP + 174);
  image(img3, xP + 330, yP + 98, 90, 100);
}





function hideBoxes() {
  for (let i = 0; i < vList.length; i++) {
    cbList[i].hide();
  }
  showHint();
}

function showHint(){
  push();
  textSize(14);
  fill(255,0,0);
  text('Trykk ENTER for å beregne',200,18);
  pop();
}




