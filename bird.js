(function(window) {

var Bird = function(options) {
    this.ctx = options.ctx;
    this.img = options.img;
    this.y = 200;
    this.speed = 0;
    this.accelerate = 0.0003; // 加速度
    this.frameIndex = 0;
    // 控制绘制速度
    // this.waitTime = 0;
};

Bird.prototype = {
    // x坐标固定
    x: 150,
    draw: function(delta) {
        this.update(delta);

        this.ctx.save();

        // 根据速度计算小鸟倾斜角度
        var temp = this.speed;
        var speedAtMaxAngle = 0.5;
        if (temp > speedAtMaxAngle) {
            temp = speedAtMaxAngle;
        } else if (temp < -speedAtMaxAngle) {
            temp = -speedAtMaxAngle;
        }
        var angle = 45 * (temp / speedAtMaxAngle);
        // 根据鸟的速度改变鸟的朝向
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate( util.toRadian(angle) );
        this.ctx.drawImage(this.img,
            52 * this.frameIndex, 0, 52, 45,
            -26, -22.5, 52, 45
        );

        // this.ctx.drawImage(this.img, 52 * this.frameIndex, 0, 52, 45,
        //     this.x - 26, this.y - 22.5, 52, 45);

        this.ctx.restore();
    },
    update: function(delta) {
        this.frameIndex = ++this.frameIndex % 3;

        // 控制鸟的绘制速度
        /*// 精灵在这一帧等待的时间 = 原等待时间 + 全局传来的两帧间隔时间
        this.waitTime = this.waitTime + delta;
        if (this.waitTime >= 50) {
            // 如果这一帧的等待时间超过200毫秒，则播放下一帧，并将等待时间减去200毫秒
            this.waitTime = this.waitTime - 50;
            this.frameIndex = ++this.frameIndex % 3;
        }*/
        // vt = v0 + at
        this.speed = this.speed + this.accelerate * delta;
        // s = s + vt + 1/2at^2
        this.y = this.y + this.speed * delta + 1/2 * this.accelerate * delta * delta;
    }
};

window.Bird = Bird;
})(window);