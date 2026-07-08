const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine;
let  world;
let ground;
let bgImg;
let tower;
let cannon;
let cannonBall;
let angle;
let balls = [];
let waterSplashAnimation = [];
let waterSplashSpriteData;
let waterSplashSpriteSheet;
let boat;
let boats = [];
let boatAnimation = [];
let boatSpriteData;
let boatSpriteSheet;
let brokenBoatAnimation = [];
let brokenBoatSpriteData;
let brokenBoatSpriteSheet;
let score = 0;
let isGameOver = false;
let isLaughing = false;
let backgroundMusic;
let waterSound;
let cannonExplosion;
let pirateLaughSound;

function preload(){
    bgImg = loadImage('assets/background.gif');
    waterSplashSpriteData = loadJSON("assets/water_splash.json");
    waterSplashSpriteSheet = loadImage("assets/water_splash.png");
    boatSpriteData = loadJSON ("assets/boat.json");
    boatSpriteSheet = loadImage("assets/boat1.png");  
    brokenBoatSpriteData = loadJSON ("assets/broken_boat.json");
    brokenBoatSpriteSheet = loadImage("assets/broken_boat.png");
    backgroundMusic = loadSound("assets/background_music.mp3");
    cannonExplosion = loadSound("assets/cannon_explosion.mp3");
    waterSound = loadSound("assets/cannon_water.mp3");
    pirateLaughSound = loadSound("assets/pirate_laugh.mp3");
}

function setup(){
    createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    angleMode(DEGREES);
    angle = 15;
    
    ground = new Ground(0,height-1,width*2,1);
    tower = new Tower(150,350,160,310);
    cannon = new Cannon(180,110,130,100,angle);
    cannonBall = new CannonBall(cannon.x, cannon.y);

    let boatFrames = boatSpriteData.frames;
    for(let i = 0; i<boatFrames.length; i++){
        let pos = boatFrames[i].position;
        let img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        boatAnimation.push(img);
    }

    let brokenBoatFrames= brokenBoatSpriteData.frames;
    for(let i = 0; i<brokenBoatFrames.length; i++){
        let pos = brokenBoatFrames[i].position;
        let img = brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        brokenBoatAnimation.push(img);
    }

    let waterSplashFrames= waterSplashSpriteData.frames;
    for(let i = 0; i<waterSplashFrames.length; i++){
        let pos = waterSplashFrames[i].position;
        let img = waterSplashSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        waterSplashAnimation.push(img);
    }

}

function draw(){
    background(bgImg);

    if(!backgroundMusic.isPlaying()){
        backgroundMusic.play();
        backgroundMusic.setVolume(0.1);
    }
    Engine.update(engine);

    ground.display();

    showBoats();

    for(let i = 0; i< balls.length; i++){
        showCannonBalls(balls[i], i);
        for(let j = 0; j< boats.length; j++){
            if (balls[i] !== undefined && boats [j] !== undefined){
                let collision = Matter.SAT.collides(balls[i].body, boats[j].body);
                if (collision.collided){
                    if (!boats[j].isBroken && !balls[i].isSink){
                        score += 5;
                        boats[j].remove(j);
                        j--;
                    }
                    Matter.World.remove(world,balls[i].body);
                    delete balls[i];
                    i--;

                } 
            }
        }
    }

    tower.display();
    cannon.display();

    fill("#6d4c41");
    textSize(40);
    text(`pontuação: ${score}`, width -200, 50);
    textAlign(CENTER, CENTER);
    
}

function keyPressed(){
    if(keyCode === DOWN_ARROW){
        let cannonBall = new CannonBall(cannon.x, cannon.y);
        cannonBall.trajectory = [];
        Matter.Body.setAngle(cannonBall.body, cannon.angle);
        balls.push(cannonBall);

    }
}

function keyReleased(){
    if(keyCode === DOWN_ARROW && !isGameOver){
        cannonExplosion.play();
        balls[balls.length - 1].shoot();
    }
}

function showBoats(){
    if(boats.length>0){
        if(boats[boats.length-1] === undefined || boats[boats.length-1].body.position.x < width - 300){
            let positions = [-40, -60, -70, -20];
            let position = random(positions);
            let boat = new Boat(width, height -100, 170, 170, position, boatAnimation);
            boats.push(boat);
        }

        for(let i = 0; i< boats.length; i++){
            if(boats[i]){
                Matter.Body.setVelocity(boats[i].body, {x:-0.9, y:0});
                boats[i].display();
                boats[i].animate();
                let collision = Matter.SAT.collides(tower.body, boats[i].body);
                if(collision.collided && !boats[i].isBroken){
                    if(!isLaughing && !pirateLaughSound.isPlaying()){
                        pirateLaughSound.play();
                        isLaughing = true;
                    }
                    isGameOver = true;
                    gameOver();
                }
            }
            else{
                boats[i];
            }
        }
    }
    else{
        let boat = new Boat(width, height - 100, 170, 170, -60, boatAnimation);
        boats.push(boat)
    }
}

function showCannonBalls(ball, index){
    if (ball){
        ball.display();
        ball.animate();
        if(ball.body.position.x >= width || ball.body.position.y >= height -50){
            if(!ball.isSink){
                waterSound.play();
                ball.remove(index);
            }
        }
    }
}

function gameOver(){
    swal(
        {
            title:"game over!",
            text:"thank you for playing",
            imageUrl:"https://i.postimg.cc/850Rwj7x/boat.png",
            imageSize:"150x150",
            confirmButtonText:"play again",
        },
        function(isConfirm){
            if(isConfirm){
                location.reload();
            }
        }
    )
}