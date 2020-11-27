var PLAY = 1;
var END = 2;
var gamestate = PLAY;

var monkey, monkey_running;
var banana, bananaImage;
var stone, stoneImage;
var jungle, jungleImage, invisibleGround;
var survivalTime;

function preload() {
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  stoneImage = loadImage("stone.png");
  
  jungleImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  jungle = createSprite(width-600, height-400);
  jungle.addImage("jungle", jungleImage);
  jungle.scale = 2;
  
  monkey = createSprite(100, height-10, 20, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  survivalTime = 0;
}

function draw() {
  background("white");
  
  if(gamestate === PLAY) {
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
   if((touches.length > 0 || keyDown("space"))&& monkey.y >= 100){
      monkey.velocityY = -12;
      touches = [];
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    jungle.velocityX = -1;
    
    spawnObstacle();
    spawnBanana();
    
    if(jungle.x < 370) {
      jungle.x = 600;
    }
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      monkey.scale = monkey.scale+0.01;
    }
    
    if(obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.1;
      //gamestate = END;
    }
  }
   
  if(gamestate === END) {
    monkey.velocityY = 0;
    jungle.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
  }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  stroke("black");
  fill("black");
  textSize(30);
  text("Survival Time: "+ survivalTime,width-350,height-420);
}

function spawnObstacle() {
  if(frameCount %300 === 0){
   obstacle = createSprite(600,height-130,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage("obstacle", stoneImage);
   obstacle.scale = 0.3;
   obstacle.lifetime = 200;
     
   obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  if(frameCount %100 === 0) {
    banana = createSprite(600,140,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1 ;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}