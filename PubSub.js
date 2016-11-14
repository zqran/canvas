(function(window) {

var PubSub = function() {
	this.subList = [];
};

PubSub.prototype = {
	// 订阅
    subscribe: function(callback) {
        this.subList.push(callback);
    },
    // 发布消息，通知所有订阅者
    publish: function(data) {
        var i = 0,
            len = this.subList.length;

        // 遍历整个订阅者数组，执行每一个回调。
        for (; i < len; i++) {
            this.subList[i](data);
        }        
    }
};

var instance = null;
window.PubSub = function() {
	if(instance === null) {
		instance = new PubSub();
	}

	return instance;
};
})(window);