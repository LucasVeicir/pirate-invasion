class Tower{
    constructor(x,y,w,h){
        let properties = {
            isStatic:true
        }
    this.towerImage = loadImage("./assets/tower.png");
    this.w = w;
    this.w = h;
    this.body = Bodies.rectangle(x,y,this.w,this.h,properties);
    World.add(world,this.body);    
    }
    display(){
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.towerImage,0,0,this.w,this.h);
        pop();

    }
}