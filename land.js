(function() {

var Land = function(options) {
    this.ctx = options.ctx;
    this.img = options.img;
    this.speed = options.speed || 2;
    this.x = options.x || 0;
};

Land.prototype = {
    y: 488,
    update: function () {
        this.x -= this.speed;
        // 走出画布，向右拼接
        if (this.x < -this.img.width) {
            this.x += this.img.width * 4;
        }
    },
    draw: function () {
        this.update();
        this.ctx.drawImage(this.img, this.x, this.y);
    }
};

window.Land = Land;
})();