(function() {

var Scene = function(options) {
	// this.init = options.init || this.voidFn;
	this.pre = options.pre || this.voidFn;
	this.post = options.post || this.voidFn;

	// this.roles = [];
	// this.init();
};

util.extend(Scene.prototype, {
	voidFn: function() {},
	play: function() {
		var self = this;

		var doPre = function() {
			// 设置当前场景
			Scene.currentScene = self;
			// 执行当前场景的入场动画
			self.pre();
		};

		if(Scene.currentScene) {
			// 其他场景
			// 先执行当前场景的出场动画，然后，执行下一个场景的入场动画
			Scene.currentScene.post(doPre);
		} else {
			// 第一个场景
			doPre();
		}
	}
});

window.Scene = Scene;
})(window);