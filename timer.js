(function() {

var Timer = function(ctx) {
	this.ctx = ctx;
	this.durationTime = 0;  // 游戏运行时长
    this.text = '坚持了0小时0分钟0秒！'; // 默认的文本
};

Timer.prototype.draw = function(delay) {
	this.update(delay);
	// 把默认的状态保存一份
    this.ctx.save();

    this.ctx.font = "24px 微软雅黑";
    this.ctx.textAlign = "right";
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "deeppink";
    this.ctx.fillText(this.text, this.ctx.canvas.width, 0);

    // 文本绘制完毕后，恢复默认的状态
    this.ctx.restore();
};

Timer.prototype.update = function(delay) {
	// 更新游戏运行时长(单位秒)
    // 然后根据这个时长，动态设置text为可读性比较强的文本
    this.durationTime += delay / 1000;
    var hours = Math.floor(this.durationTime / (60 * 60));
    var minutes = Math.floor(this.durationTime % (60 * 60) / 60);
    var seconds = Math.floor(this.durationTime % 60);
    this.text = '坚持了' + hours + '小时' + minutes + '分钟' + seconds + '秒！';
};

window.Timer = Timer;
})();