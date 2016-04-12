// Your game will go here
var player;
var handImg;
var foodSprites;
var flowerImg;
var score = 0;
var lives = 3;
var badGuys;
var moneyImg;


function preload(){
  handImg = loadImage('blue hand.png');
  flowerImg = loadImage('daisy.png');
  moneyImg = loadImage('crumpled-dollar-bills-isolated-white-background-36013873.png');

}

function setup(){
  createCanvas (400,400);
  player = createSprite (width/2, 330);
  player.addImage(handImg);

  foodSprites = new Group();
  var timer = setInterval(createFood, 3000);

  badGuys = new Group();
  var timer = setInterval(createPoison,1000);
}
function createFood(){
    for(var i=0; i<10; i++){
      var food = createSprite(random(0, width), random(-height,0));
      food.addImage(flowerImg);
      food.setVelocity(0,3);
      food.life = 300;
      foodSprites.add(food);
  }
}

function createPoison(){
  for(var i=0; i<1; i++){
    var poison = createSprite(random(0, width), random(-height,0),15,15);
    poison.addImage(moneyImg);
    poison.setVelocity(0,4);
    poison.life = 300;
    badGuys.add(poison);
  }
}



function draw(){
  background("#F78181");
  drawSprites();

  if(keyIsPressed){
    if(keyCode == LEFT_ARROW){
      player.setVelocity(-3,0);
    }
    if(keyCode == RIGHT_ARROW){
      player.setVelocity(3,0);
    }
  } else{
    player.setVelocity(0,0);
  }

  player.overlap(foodSprites, eat);

  player.overlap(badGuys,attack);

  textSize(10);
  fill(0,0,0);
  text("SCORE:",320,30);

  textSize(20);
  fill(0,0,0);
  text(score,360,30);

  textSize(10);
  fill(0,0,0);
  text("LIVES:",320,60);

  textSize(20);
  fill(0,0,0);
  text(lives,360,60);

  if(lives<0){
    fill("#F78181");
    rect(0,0,400,400);
    textSize(50);
    fill("#FF0000");
    text("GAME OVER",50,200);
  }


}


function eat(spriteA, spriteB){
  spriteB.remove();
  score = score + 1;

}

function attack(player, poison){
  poison.remove();
  lives = lives - 1;

}


// For performance reasons, use a small canvas size for your project (< 500 px)
