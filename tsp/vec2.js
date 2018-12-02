class Vec2 {
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }
    distance(v) {
        return Math.sqrt( (this.x-v.x)**2 + (this.y-v.y)**2 );
    }
    center(v) {
        return new Vec2((this.x+v.x)/2, (this.y+v.y)/2);
    }
    static rand(maxX, maxY) {
        return new Vec2(
            Math.floor(Math.random() * (maxX + 1)),
            Math.floor(Math.random() * (maxY + 1))
        );
    }
}