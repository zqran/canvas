(function() {

var util = {
	toRadian: function(angle) {
		return angle / 180 * Math.PI;
	},
	extend: function(o1, o2) {
		for(var k in o2) {
			o1[k] = o2[k];
		}
	},
	loadImgs: function(imgs, callback) {
		// 图片对象
		var imgsList = {length: 0};
		// 数量统计
		var count = 0;

		imgs.forEach(function(v) {
			var img = new Image();
			// imgs/birds.png
			img.src = "imgs/" + v + ".png";
			img.addEventListener("load", function() {
				imgsList.length += 1;
				imgsList[v] = img;

				if(++count === imgs.length) {
					callback(imgsList);
				}
			});
		});
	}
};

window.util = util;
})();