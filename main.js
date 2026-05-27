const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constrain = Matter.Constrain;

let engine;
let  world;
let ground;
let bgImg;
let tower;
let cannon;
let angle;

function preload(){
    bgImg = loadImage('assets/background.gif')
}
function setup(){
    createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(0,height-1,width*2,1);
    tower = new Tower(150,350,160,310);
}

function draw(){
    background(bgImg);

    Engine.update(engine);

    ground.display();
    tower.display();
}