var canvas, backgroundImage;
var allPlayers;
var gameState = 0;
var distance = 0;
var playerCount;
var index, name;

var database;

var form, player, game;

var car1, car2, car3, car4;
var cars;

function preload() {
  trackImg = loadImage("images/track.png");

  car1Img = loadImage("images/car1.png");
  car2Img = loadImage("images/car2.png");
  car3Img = loadImage("images/car3.png");
  car4Img = loadImage("images/car4.png");

}

function setup() {
  canvas = createCanvas(displayWidth-20, displayHeight-30);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  //when 4players join we want the game state to become 1/PLAY state
  if(playerCount===4) {
    game.update(1);
  }
     
  if(gameState===1) {
    clear();
    game.play();
  }

  if(gameState===2) {
    game.end();
  }
}

/*
var sum;
//normal function to find a sum
function any(a, b) {
  sum = a + b;
  return (sum);
}

console.log(any(5, 13));

//anonymous function
var any1 = function (a, b) {
  sum = a + b;
  console.log(sum);
}
any1(10, 20);

//arrow function
any2 = (a,b)=> a+b;
any2(20, 30);
*/
