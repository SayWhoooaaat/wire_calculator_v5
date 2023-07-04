function tableCalc() {
  //Making table
  table = []; // clearing
  let r;
  let maxBel;
  let maxSD = 3;
  let density;
  let minDia = 1.6;
  let maxDia = 6;
  let diaInc = 0.1;
  let noDia = round((maxDia - minDia) / diaInc + 1);
  let noMaterials = alloyData.names.length;

  let d;
  let l;
  let m;
  let load;
  let klaring;
  let flimsiness; // d > Dy/14 evt Dy/10
  let SD;
  let price;
  let y = 0;
  let R;
  
  let nCoils = 1;
  if (currentLayout[0][0] == 1) {
    nCoils = zonesUI.value * panelsUI.value * coilsUI.value;
  }

  // -------- Datafelt ----------
  
  // Loop alle spenninger
  for (let i = 0; i < vChoices.length; i++) {
    R = vChoices[i]*vChoices[i]/powerUI.value;
    // Loop alle materialer
    for (let a = 0; a < noMaterials; a++) {
      r = getRes(elementTemp, a);
      maxBel = getMaxLoad(elementTemp, a);
      density = alloyData.density[a];

      // Loop alle diametre
      for (let D = 0; D < noDia; D++) {
        d = minDia + D * diaInc;
        l = R * PI * d * d / 4 / r;
        load = powerUI.value / PI / d / l / 10 / maxBel * 100;
        // Sjekk om alternativet er helt dust
        if (load < 150) {
          klaring = PI * (diaUI.value + d) * lengthUI.value / l / 1000 - d;
          SD = klaring / d + 1;
          if (klaring > 1) {
            // Alternativet er verdt å vise
            flimsiness = (diaUI.value + d)/d; // mellom 10 og 14, lavt er bra
            m = PI / 4 * d * d * l * density / 1000000;
            price = m * alloyData.price[a];
            // regn ut kostnad ink. levetid
            let tCost = getCost(load, SD, price, klaring, flimsiness);

            table[y] = [];
            table[y][0] = y + 1;
            table[y][1] = alloyData.names[a];
            table[y][2] = d;
            table[y][3] = round(l, 2);
            table[y][4] = round(m * nCoils, 2);
            table[y][5] = round(load);
            table[y][6] = round(klaring, 1);
            table[y][7] = round(price * nCoils, 2);
            table[y][8] = tCost;
            table[y][9] = vChoices[i];
            table[y][10] = round(flimsiness,1);
            //console.log(stability,load,tCost);
            y = y + 1;

          } else {
            // ingen større diametre vil gå
            break;
          }
        }
      }
    }
  }
  // Tabell komplett
  // Sorter tabell
  table.sort(sortFunction);
  for (let a = 0; a < table.length; a++) {
    table[a][0] = a + 1;
    //console.log(table[a][0],table[a][5],table[a][8]);
  }

}

function sortFunction(aP, bP) {
  let sortColumn = 8;
  if (aP[sortColumn] === bP[sortColumn]) {
    return 0;
  } else {
    return (aP[sortColumn] < bP[sortColumn]) ? -1 : 1;
  }
}


function getRes(passedTemp, passedAlloy) {
  // Retrieving correct res from table
  let i = 0
  for (i = 0; i < alloyData.resistivity.length; i++) {
    let dataTemp = alloyData.resistivity[i][0];
    if (dataTemp > passedTemp) {
      break;
    }
  }

  let higherTemp = alloyData.resistivity[i][0];
  let lowerTemp = alloyData.resistivity[i - 1][0];
  let higherRes = alloyData.resistivity[i][passedAlloy + 1];
  let lowerRes = alloyData.resistivity[i - 1][passedAlloy + 1];

  let r = lowerRes + (passedTemp - lowerTemp) * (higherRes - lowerRes) / (higherTemp - lowerTemp);

  return r;
}


function getMaxLoad(passedTemp, passedAlloy) {
  // Retrieving correct res from table
  let i = 0
  for (i = 0; i < alloyData.maxLoad.length; i++) {
    let dataTemp = alloyData.maxLoad[i][0];
    if (dataTemp > passedTemp) {
      break;
    }
  }
  let higherTemp = alloyData.maxLoad[i][0];
  let lowerTemp = alloyData.maxLoad[i - 1][0];
  let higherLoad = alloyData.maxLoad[i][passedAlloy + 1];
  let lowerLoad = alloyData.maxLoad[i - 1][passedAlloy + 1];

  let mLoad = lowerLoad + (passedTemp - lowerTemp) * (higherLoad - lowerLoad) / (higherTemp - lowerTemp);
  //console.log(mLoad);
  return mLoad;
}

function getCost(loadP, SDP, priceP, klaring, flimsiness) {
  // Regner ut total kostnad ink. reparasjoner
  let dumbLoad = 120;
  let dumbSD = 1;
  let dumbFlimsiness = 20;

  let prodCost = priceP + 200;
  let repCost = 15000 / 20; // kost per coil!

  //console.log(stability,loadP);
  if (loadP >= dumbLoad) {
    return 1000000 * pow(loadP,2) * flimsiness;
  } else if (SDP < dumbSD) {
    return Infinity;
  } else if (flimsiness >= dumbFlimsiness) {
    return 1000000 * pow(loadP,2) * flimsiness;
  }
  
  let annualRepsBecauseLoad = 200/pow(dumbLoad-loadP,2);
  let annualRepsBecausePitch = 1/20/pow(SDP-1,2)+1/pow(klaring,2);
  let annualRepsBecauseFlimsiness = 1 / pow(18-flimsiness,2);

  
  let noReps = annualRepsBecauseLoad + annualRepsBecausePitch + annualRepsBecauseFlimsiness;

  let tCost = prodCost + (repCost + priceP) * noReps;
  return tCost;

}