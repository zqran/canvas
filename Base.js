(function() {

var Base = function(options) {
    this.ctx = options.ctx;
    this.img = options.img;
    this.speed = options.speed || 2;
    this.x = options.x || 0;
};

window.Base = Base;
})();