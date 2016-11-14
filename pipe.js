(function() {

var Pipe = function (options) {
    this.ctx = options.ctx;
    this.imgUp = options.imgUp;
    this.imgDown = options.imgDown;
    this.speed = options.speed || 2;
    this.x = options.x;
    this.width = this.imgUp.width;
    this.height = this.imgDown.height;
    this.pipeSpace = options.pipeSpace;
    this._initPipeY();
};

Pipe.prototype = {
    // 绘制管道
    draw: function () {
        this.ctx.drawImage( this.imgDown, this.x, this.downY );
        this.ctx.drawImage( this.imgUp, this.x, this.upY );
        this._drawPath();

        this.update();
    },
    // 根据管道的宽度以及坐标绘制相应的矩形路径
    _drawPath: function () {
        this.ctx.rect( this.x, this.downY, this.width, this.height );
        this.ctx.rect( this.x, this.upY, this.width, this.height );
        // this.ctx.fill();
    },

    // 随机生成上下管道的y轴坐标
    _initPipeY: function () {
        // // 随机生成上管道的高度在30 ~ 230之间
        // var downPipeHeight = Math.floor(Math.random() * 200) + 50;
        // this.downY = downPipeHeight - this.height  // 口朝下管道的y轴坐标

        // // var tempUpy = downPipeHeight + this.pipeSpace;
        // this.upY = downPipeHeight + this.pipeSpace;    // 口朝上管道的y轴坐标

        // 其他思路 (保证管子)
        var h = Math.floor(Math.random() * 200) + 50;
        var downH = h + this.pipeSpace;
        if(downH < this.height) {
        	h += 50;
        }
        this.downY = h - this.height;
        this.upY = h + this.pipeSpace;
    },
    update: function (dt) {
        this.x -= this.speed;
        // 管道走出画布，重新生成管道的上下y轴坐标，再向右拼接，
        if ( this.x < -this.width ) {
            this.x += this.width * 3 * 6;
            this._initPipeY();
        }
    }
};

window.Pipe = function (configs) {
    return new Pipe(configs);
};

})();