let img;
let alloyData;
let table = [];
let tableWidth;
let elementTemp;
let vList = [];
let vListUpdate = true;
let vChoices = [];


let move = false;
let layoutNumber = 1;
let oldLayoutNumber;
let layouts = [ 
  [ //layout1 (coil)
    [1, 20, 20], // G1
    [1, 20, 330], // G2
    [1, 20, 650], // G3
    [0, 20, -300], // G4
    [1, 540, 20], 
    [1, 540, 250]
  ],
  [ // Layout2 (coil direkte)
    [0, -500, 29], 
    [0, -500, 350], 
    [0, -500, 650], 
    [1, 50, 50], 
    [1, 50, 350], 
    [1, 50, 590]
  ]
];
let currentLayout = [];


function preload() {
  img = loadImage('Sketch1.png');
  img2 = loadImage('Sketch9.png');
  img3 = loadImage('Sketch3.png');
  img4 = loadImage('Sketch4.png');
  img5 = loadImage('Sketch5.png');
  img6 = loadImage('Sketch6.png');
  alloyData = loadJSON("alloys.json");
}

function setup() {
  createCanvas(1200, 1400);
  
  // Creating UI boxes
  createBoxes();
  
  button = createButton('Setup');
  // Initializing layout
  initCurrent();
  
}


function keyPressed() {
  if (keyCode === ENTER) {
    registerInput();
    calculate();
    reDraw();
  }
}


// ENDRE LAYOUT
function layoutchange1() {
  oldLayoutNumber = layoutNumber;
  if (layoutNumber == 1) {
    layoutNumber = 2;
  } else if (layoutNumber == 2) {
    layoutNumber = 1;
  }
  move = true;
}


 // Brukes for animasjoner:
function draw() {
  if (move) { 
    // slide
    slidePos(oldLayoutNumber,layoutNumber);
    reDraw();
    
    if (move == false){
      // Motion complete
      initCurrent();
    }
  }
}


function slidePos(oldLay,newLay){
  for (let i = 0; i < layouts[oldLay-1].length; i++){
    if (/*layouts[oldLay-1][i][0] == 1*/true){
      currentLayout[i] = updateGroupPos(i,oldLay,newLay);
    }
  }
}


/* UNØYAKTIGHETER:

Er ikke toggle for kontaktor/thyristor
Elementtemp kan variere

 - UP NEXT:

display step 1, step 2...

display 2s, 3s ...

display enter animation




materialvalg

panel-coils-coils i stein
paneltabell


Ekspert - kontorfyr - unge


*/