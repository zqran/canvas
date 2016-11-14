(function() {

var Sky = function(options) {
    Base.call(this, options);
};

util.extend(Sky.prototype, {
    update: function () {
        this.x -= this.speed;
        // 走出画布，向右拼接
        if (this.x < -this.img.width) {
            this.x += this.img.width * 2;
        }
    },
    draw: function () {
        this.update();
        this.ctx.drawImage(this.img, this.x, 0);
    }
});

window.Sky = Sky;
})();