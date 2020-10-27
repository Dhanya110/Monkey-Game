var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, invisibleGround
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyDead=loadImage("sprite_7.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  
 createCanvas(600, 600);
   background = createSprite(0,0,1300,1300);
  monkey=createSprite(100,450,10,10);
  monkey.addAnimation("abc",monkey_running);
  monkey.addAnimation ("xyz",monkeyDead);
  monkey.setCollider("rectangle",0,0,180,560);

  monkey.scale=0.2;
  
   ground = createSprite(300,520,1200,20);
    ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(300,520,600,20);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
  background.shapeColor="lightblue";
 
  
  if(gameState === PLAY){
    bananas();
  obstacles();
     survivalTime=Math.ceil(frameCount/frameRate())
    ground.velocityX = -4;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >=448) {
        monkey.velocityY = -21;
    }
    
    //add gravity
   monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround); 
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
    
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY=0;
     monkey.velocityX=0;
     monkey.changeAnimation("xyz",monkeyDead);
     
   }
  
 
  drawSprites();
   
  stroke("black");
  textSize(20);
  fill("black");
 
  text("Survival Time: "+ survivalTime,100,50);
}


function bananas() {
  //write code here to spawn the clouds
   if (frameCount % 80 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
   bananaGroup.add(banana);
   }
        
   }

function obstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(400,480,10,40);
    obstacle.addImage("abc",obstacleImage);
   obstacle.velocityX = -6;
   
  //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
 //adjust the depth
  obstacle.depth = ground.depth;
  ground.depth =ground.depth + 1;
    
 }
 
}







