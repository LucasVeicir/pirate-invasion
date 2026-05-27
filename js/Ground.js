class Ground{
    constructor(x,y,w,h){
        let properties = {
            isStatic:true
        }
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x,y,this.w,this.h,properties);
        World.add(world,this.body);
    }
    display(){
        let pos = this.body.position;
        push();
        translate(pos.x,pos.y);
        fill("brown");
        rectMode(CENTER);
        rect(0,0,this.w,this.h);
        pop();
    }
}