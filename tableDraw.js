function tableDraw(xPos, yPos) {
  stepDraw(xPos, yPos);
  
  // Headline
  push();
  textSize(16);
  text('Alternativer:', xPos, yPos + 56)
  pop();

  textAlign(RIGHT);
  let tableSpacing = 21;
  let tableDrop = yPos + 100;

  // Drawing titles
  let indent = xPos;
  let titlePos = yPos + 80;
  indent = indent + 18;
  text('alt.', indent, titlePos);
  indent = indent + 38;
  text('alloy', indent, titlePos);
  indent = indent + 64;
  text('diameter', indent, titlePos);
  if (layoutNumber != 2){
    indent = indent + 80;
    text('spenning', indent, titlePos);
    indent = indent - 10;
  }
  indent = indent + 80;
  text('lengde', indent, titlePos);
  indent = indent + 76;
  text('belastning', indent, titlePos);
  indent = indent + 58;
  text('klaring', indent, titlePos);
  indent = indent + 44;
  text('D/d', indent, titlePos);
  let xLine = indent + 14;
  indent = indent + 58;
  text('vekt', indent, titlePos);
  indent = indent + 72;
  text('ca. pris', indent, titlePos);

  // Drawing table
  let stringValue;
  let noRows = table.length;
  for (let y = 0; y < table.length; y++) {
    if (y == 30){
      noRows = 30;
      break;
    }
    indent = xPos;

    // no.
    indent = indent + 16;
    text(table[y][0], indent, tableDrop + y * tableSpacing);

    // alloy
    indent = indent + 40;
    text(table[y][1], indent, tableDrop + y * tableSpacing);

    // dia
    indent = indent + 70;
    let dia = table[y][2];
    stringValue = Number.parseFloat(dia).toFixed(1);
    text('Ø ' + stringValue + ' mm', indent, tableDrop + y * tableSpacing);
    
    // spenning
    if (layoutNumber != 2){
      indent = indent + 70;
      stringValue = Number.parseFloat(table[y][9]).toFixed(1);
      text(stringValue + ' V', indent, tableDrop + y * tableSpacing);
    }

    // lengde
    indent = indent + 80;
    stringValue = Number.parseFloat(table[y][3]).toFixed(2);
    text(stringValue + ' m', indent, tableDrop + y * tableSpacing);

    // belastning
    indent = indent + 60;
    let bel = table[y][5];
    push();
    if (bel > 105) { // fargekoder
      fill(255, 0, 0);
    } else if (bel > 85) {
      fill(0, 0, 255);
    } else if (bel > 1) {
      fill(0, 180, 0);
    }
    stringValue = Number.parseFloat(bel).toFixed(0);
    text(stringValue + ' %', indent, tableDrop + y * tableSpacing);

    // klaring
    indent = indent + 70;
    let klaring = table[y][6];
    let sd = klaring / dia + 1;
    if (sd < 1.4 || klaring < 2) { // fargekoder
      fill(255, 0, 0);
    } else if (sd < 2.5) {
      fill(0, 0, 255);
    } else {
      fill(0, 180, 0);
    }
    stringValue = Number.parseFloat(klaring).toFixed(1);
    text(stringValue + ' mm', indent, tableDrop + y * tableSpacing);
    
    // D/d
    indent = indent + 44;
    if (table[y][10] > 16) { // fargekoder
      fill(255, 0, 0);
    } else if (table[y][10] > 13) {
      fill(0, 0, 255);
    } else {
      fill(0, 180, 0);
    }
    stringValue = Number.parseFloat(table[y][10]).toFixed(1);
    text(stringValue, indent, tableDrop + y * tableSpacing);
    pop();
    
    // vekt
    fill(130);
    indent = indent + 66;
    stringValue = Number.parseFloat(table[y][4]).toFixed(1);
    text(stringValue + ' kg', indent, tableDrop + y * tableSpacing);

    // pris
    indent = indent + 68;
    let pris = table[y][7];
    stringValue = Number.parseFloat(pris).toFixed(0);
    text(stringValue + ' kr', indent, tableDrop + y * tableSpacing);


    // Drawing lines
    fill(0, 0, 0);
    push();
    stroke(200);
    line(xPos, tableDrop + 6 + y * tableSpacing, indent, tableDrop + 6 + y * tableSpacing);
    pop();
  }
  
  push();
  stroke(100);
  line(xLine, tableDrop - 32, xLine, tableDrop + noRows * tableSpacing + 10);
  pop();

  // Bunntekst
  textAlign(LEFT);
  push();
  if (table.length > 0) {
    // Forklaring på tabell
    
    fill(100);
    text('Tall for ett element', xLine - 240, tableDrop + noRows * tableSpacing + 6);
    text('Alle elementer totalt', xLine + 10, tableDrop + noRows * tableSpacing + 6);
    
  } else {
    textSize(18);
    fill(255,0,0);
    text('Ingen varmetråder passer', xPos, tableDrop + table.length * tableSpacing + 6);
  }
  pop();
  fill(0, 0, 0);


}