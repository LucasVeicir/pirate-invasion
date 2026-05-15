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
    bgImg = loadImage('assets/background.gif')
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
    background(bgImg);

    Engine.update(engine);
    rect(ground.position.x, ground.position.y, width * 2, 1);
}