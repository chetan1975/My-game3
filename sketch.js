var backImg, back;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var thief, thiefImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var coin, coinImg, coinCount=0 , coinGroup;

function preload(){
  backImg = loadImage("tower.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  thiefImg = loadImage("spriteThief.jpg");
  coinImg = loadImage("coin.png");

}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  back = createSprite(300,300);
  back.addImage("tower",towerImg);
  back.velocityY = 1;
  back.scale = 2.0
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  coinGroup = new Group();

  thief = createSprite(200,200,50,50);
  thief.scale = 0.2;
  thief.addImage("thief", thiefImg);
}

function draw(){
  background(0);
  drawSprites();
textSize(25)
text("Coins: "+coinCount, width-120, 50);

  if (gameState === "play") {
    if(keyDown("left_arrow")){
      thief.x = thief.x - 3;
    }
    
    if(keyDown("right_arrow")){
      thief.x = thief.x + 3;
    }
    
    if(keyDown("space")){
      thief.velocityY = -10;
    }
    
    thief.velocityY = thief.velocityY + 0.8
    
    if(back.y > 400){
      back.y = 300
    }

    if(coinCount>50){
    spawnDoors();
    }
    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      thief.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      thief.destroy();
      gameState = "end"
    }

    spawnCoins();

    if(coinGroup.isTouching(thief)){
      coinCount+=1
      
      coinGroup[0].destroy();
    }
    
    
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}


function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    thief.depth = door.depth;
    thief.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
function spawnCoins(){

  if(frameCount%40 === 0){
    coin =createSprite(random(10,400),random(10,200))
    coin.addImage(coinImg);
    coin.velocityY  =2
    coin.scale =0.2
    
    coinGroup.add(coin)
  }
}
