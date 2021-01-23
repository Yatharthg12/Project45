var aircraft;
var aircraftImg;
var enemy1;
var backgroundImg;
var enemyGroup,weaponGroup;
var enemyImg1,enemyImg2;
var gameState;
gameState = "start";
var playImg;


function preload(){
  aircraftImg = loadAnimation("Images/aircraft1.png","Images/aircraft2.png","Images/aircraft3.png","Images/aircraft4.png")
  backgroundImg = loadImage("Images/Background Img3.PNG");
  enemyImg1 = loadAnimation("Images/Enemy1.png");
  slide1 = loadImage("Opening Slide/Slide1.JPG");
  playImg = loadImage("Images/Play Button.PNG");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  /*background = createSprite(200,200);
  background.addImage(backgroundImg);*/
  
  
  enemyGroup = new Group();
  weaponGroup = new Group();
}

function draw() {
  
  /*background.velocityX = -3;
  if(background.x<0){
    background.x = background.width/2;
  }*/

  if(gameState === "start"){
    background(slide1);
    playButton = createSprite(width/2,30,50,50);
    playButton.scale = 0.3;
    playButton.addImage(playImg);
    if(mousePressedOver(playButton)){
      gameState = "play";
      playButton.visible = false;
    }
  }
if(gameState === "play"){
  background(backgroundImg);
  
  aircraft = createSprite(50,350);
  aircraft.addAnimation("aircraftimg",aircraftImg);
  if(keyDown(UP_ARROW)){
    aircraft.y -= 5;
  }
  if(keyDown(DOWN_ARROW)){
    aircraft.y += 5;
  }
  if(keyDown(LEFT_ARROW)){
    aircraft.x -= 5;
  }
  if(keyDown(RIGHT_ARROW)){
    aircraft.x += 5;
  }
  edges = createEdgeSprites();
  aircraft.bounceOff(edges);
  
  if(keyDown("space")){
  spawnWeapon();
  }
    enemy();
  
    for(var i = 0;i<enemyGroup.length;i++){
      if(enemyGroup.get(i).isTouching(weaponGroup)){
        enemyGroup.get(i).destroy();
      }
    }
}


  drawSprites();
  
}

function enemy(){
  if(frameCount %30 === 0){
    
  
  enemy1 = createSprite(Math.round(random(0,width)),Math.round(random(0,height)),70,70);
  enemy1.addAnimation("enemy1.img",enemyImg1);
  enemy1.velocityX = -3;
 enemy1.scale = 0.3;
  

  enemyGroup.add(enemy1);
  
}}

function spawnWeapon(){
  if(frameCount %10 === 0){
    weapon = createSprite(aircraft.x+20,aircraft.y,100,100);
    weapon.velocityX = 5;
    weapon.shapeColor = "red";
    weaponGroup.add(weapon)
    //console.log(weapon.depth);
    //console.log(enemy1.depth);
    //enemy.depth = weapon.depth
    //enemy.depth += 1;
  }
}