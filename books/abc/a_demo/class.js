function Shape() {
    this.x = 0;
    this.y = 0;
}
Shape.prototype = {
    constructor :Shape
};
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info("Shape moved.");
};