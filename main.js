const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constrain = Matter.Constrain;

let engine;
let  world;
let ground;
let bgImg;
let tower;
let towerImg;
let cannon;
let angle;

function preload(){
    bgImg = loadAnimation('assets/bg0','assets/bg1','assets/bg2','assets/bg3','assets/bg4','assets/bg5','assets/bg6','assets/bg7','assets/bg8','assets/bg9');
}
function setup(){
    createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    let groundProperties = {
        isStatic: true
    }

    ground = Bodies.rectangle(0, height - 1, width * 2, 1, groundProperties);
    World.add(world, ground);
    rectMode(CENTER);
}

function draw(){
    animation(bgImg,0,0,1200,600);
    Engine.update(engine);
    rect(ground.position.x, ground.position.y, width * 2, 1);
}