var playlvl1;
var end;
var playlvl2;
var playlvl3;
var gameState = "playlvl1";
var pigeon, pigeon_flying;
var crane, crane_flying;
var parrot, parrot_flying;
var beach, beachImg;
var forest, forestImg;
var jungle, jungleImg;
var bean, beanImg;
var fire, fireImg;
var iceberg, icebergImg;
var rock, rockImg;
var beanGrp, fireGrp, icebergGrp, rockGrp;
var foodCollected;

function preload() {
  pigeon_flying = loadAnimation("pigeon1.png", "pigeon2.png", "pigeon3.png", "pigeon4.png", "pigeon5.png", "pigeon6.png", "pigeon7.png", "pigeon8.png", "pigeon9.png");

  crane_flying = loadAnimation("crane1.png", "crane2.png", "crane3.png", "crane4.png", "crane5.png", "crane6.png", "crane7.png", "crane8.png");

  parrot_flying = loadAnimation("parrot1.png", "parrot2.png", "parrot3.png", "parrot4.png", "parrot5.png", "parrot6.png", "parrot7.png", "parrot8.png", "parrot9.png");

  beachImg = loadImage("beachbg.jpg");

  forestImg = loadImage("forest.bg.jpg");
  
  jungleImg = loadImage("j.jpg");

  beanImg = loadImage("beans.png");

  fireImg = loadImage("fire.png");

  icebergImg = loadImage("iceberg.png");

  rockImg = loadImage("rock.png");

  beanGrp = new Group();
  fireGrp = new Group();
  icebergGrp = new Group();
  rockGrp = new Group();

  foodCollected = 0;

}

function setup() {
  createCanvas(625, 600); 
  
  beach = createSprite(325, 300, 1, 1);
  beach.addImage(beachImg);

  forest = createSprite(325, 300, 1, 1);
  forest.addImage(forestImg);
  
  jungle = createSprite(325,300,1,1);
  jungle.addImage(jungleImg);  
  jungle.scale = 0.6;

  parrot = createSprite(100, 300, 1, 1);
  parrot.addAnimation("parrot_fly", parrot_flying);
  parrot.scale = 0.5;

  crane = createSprite(100, 200, 1, 1);
  crane.addAnimation("crane_fly", crane_flying);
  crane.scale = 0.8;

  pigeon = createSprite(100, 100, 1, 1);
  pigeon.addAnimation("pigeon_fly", pigeon_flying);
  pigeon.scale = 0.5;
  
}

function draw() {
  
  background(0);

  if (gameState === "playlvl1") {
    forest.visible = true;
    pigeon.visible = true;
    
    beach.visible = false;
    crane.visible = false;
    parrot.visible = false;
    jungle.visible = false;
    
    forest.velocityX = -2;

    if (forest.x < 0 && gameState === "playlvl1") {
      forest.x = 300;
    }

    spawnFire();
    spawnBean();

    if (keyDown("space") && gameState === "playlvl1") {
      pigeon.velocityY = -10;
    }

    pigeon.velocityY = pigeon.velocityY + 0.8;

    if (keyDown("LEFT_ARROW") && gameState === "playlvl1") {
      pigeon.x = pigeon.x - 4;
    }

    if (keyDown("RIGHT_ARROW") && gameState === "playlvl1") {
      pigeon.x = pigeon.x + 4; 
    }

    if (pigeon.isTouching(beanGrp) && gameState === "playlvl1") {
      foodCollected = foodCollected + 1;
      beanGrp.destroyEach();
    }

    if (foodCollected === 20 && gameState === "playlvl1") {
      gameState = "playlvl2";
      foodCollected = 0;

    }

    if ((pigeon.isTouching(fireGrp) || pigeon.y > 610) && gameState === "playlvl1") {
      pigeon.destroy();
      fireGrp.destroyEach();
      beanGrp.destroyEach();
      beanGrp.setVelocityXEach(0);
      fireGrp.setVelocityXEach(0);
      forest.velocityX = 0;
      gameState = "end";
    }

  }

  if (gameState === "playlvl2") {

    crane.visible = true;
    beach.visible = true;
    
    pigeon.visible = false;
    parrot.visible = false;
    forest.visible = false;
    jungle.visible = false;

    beach.velocityX = -2;

    if (beach.x < 0 && gameState === "playlvl2") {
      beach.x = 300;
    }

    crane.depth = forest.depth;
    crane.depth = crane.depth++;

    if (keyDown("space") && gameState === "playlvl2") {
      crane.velocityY = -10;
    }

    crane.velocityY = crane.velocityY + 0.8;

    if (keyDown("LEFT_ARROW") && gameState === "playlvl2") {
      crane.x = crane.x - 4;
    }

    if (keyDown("RIGHT_ARROW") && gameState === "playlvl2") {
      crane.x = crane.x + 4;
    }

    if (crane.isTouching(beanGrp) && gameState === "playlvl2") {
      beanGrp.destroyEach();
      foodCollected = foodCollected + 1;

    }

    if (crane.isTouching(icebergGrp) || crane.y > 610 &&             gameState === "playlvl2") {
      crane.destroy();
      icebergGrp.destroyEach();
      beanGrp.destroyEach();
      icebergGrp.setVelocityXEach(0);
      beanGrp.setVelocityXEach(0);
      beach.velocityX = 0;
      gameState = "end"
    }

    spawnBean();
    spawnIceberg();

    if (foodCollected === 35 && gameState === "playlvl2") {
      gameState = "playlvl3";
      foodCollected = 0;
    }

  }

  if (gameState === "playlvl3") {
    
    parrot.visible = true;
    jungle.visible = true;
    
    forest.visible = false;
    beach.visible = false;
    pigeon.visible = false;
    crane.visible = false;
    
    jungle.velocityX = -2;

    if (jungle.x < 0 && gameState === "playlvl3") {
      jungle.x = 300;
    }
    
    if (keyDown("space") && gameState === "playlvl3") { 
      parrot.velocityY = -10;
    } 

    parrot.velocityY = parrot.velocityY + 0.8;

    if (keyDown("LEFT_ARROW") && gameState === "playlvl3") {
      parrot.x = parrot.x - 4;
    }

    if (keyDown("RIGHT_ARROW") && gameState === "playlvl3") {
      parrot.x = parrot.x + 4;
    }
    
    if (parrot.isTouching(beanGrp) && gameState === "playlvl3") {
      beanGrp.destroyEach();
      foodCollected = foodCollected + 1;
    }
    
    if (parrot.isTouching(rockGrp) || parrot.y > 610 && gameState === "playlvl3") {
      parrot.destroy();
      rockGrp.destroyEach();
      beanGrp.destroyEach();
      rockGrp.setVelocityX(0);
      beanGrp.setVelocityX(0);
      gameState = "end";
    }
    
    spawnBean();
    spawnRock();
    
    if (foodCollected === 50 && gameState === "playlvl3") {
      pigeon.visible = false;
      crane.visible = false;
      parrot.visible = false;
      forest.visible = false;
      beach.visible = false;
      jungle.visible = false;
      bean.visible = false;
      fire.visible = false;
      iceberg.visible = false;
      rock.visible = false;
      
      textSize(40);
      textFont(fontBold);
      fill("red");
      text("YOU WON!", 230,300)
    }

  }

  drawSprites();

  textSize(20);
  fill("blue");
  text("Food Collected: " + foodCollected, 50, 50);

  if (gameState === "end") {
    background(0);
    fill("yellow");
    textSize(30);
    text("GAME OVER", 230, 300);
  }
}

function spawnFire() {
  if (frameCount % 550 === 0) {
    fire = createSprite(width, 480, 1, 1);
    fire.addImage(fireImg);
    fire.scale = 0.35;
    fire.velocityX = -4;
    fireGrp.add(fire);

  }

}

function spawnBean() {
  if (frameCount % 160 === 0) {
    bean = createSprite(width, 400, 1, 1);
    bean.addImage(beanImg);
    bean.scale = 0.1;
    bean.y = Math.round(random(200, 580));
    bean.velocityX = -4;
    beanGrp.add(bean);

  }
}

function spawnIceberg() {
  if (frameCount % 550 === 0) {
    iceberg = createSprite(width, 600, 1, 1);
    iceberg.addImage(icebergImg);
    iceberg.scale = 1;
    iceberg.velocityX = -4;
    icebergGrp.add(iceberg);

  }
}

function spawnRock() {
  if (frameCount % 550) {
    rock = createSprite(width, 465, 1, 1);
    rock.addImage(rockImg);
    rock.scale = 0.6;
    rock.velocityX = -4;
    rockGrp.add(rock);

  }
}