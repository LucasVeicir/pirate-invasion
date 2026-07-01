class Boat{
    constructor(x, y, w, h, boatPos, boatAnimation){
        let options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,
            label: "boat"
        }

        this.animation = boatAnimation;
        this.speed = 0.05;
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        this.boatPosition = boatPos;
        this.isBroken = false;
        World.add(world, this.body)
    }
    display(){
        let angle = this.body.angle;
        let pos = this.body.position;
        let index = floor(this.speed % this.animation.length);
        push()
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, this.boatPosition, this.w, this.h);
        noTint();
        pop();
    }

    remove(index){
        this.animation = brokenBoatAnimation;
        this.speed = 0.05;
        this.w = 300;
        this.h = 300;
        this.isBroken = true;
        setTimeout (() => {
            Matter.World.remove(world,boats[index].body);
            delete boats[index];
        }, 2000)
    }

    animate(){
        this.speed += 0.05 % 1.1;
    }
}