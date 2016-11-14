(function(w) {
/*
主游戏对象：
1 全局中只有一个游戏对象，使用单例模式
2 小鸟碰撞：使用观察者模式
 */

var FlappyBird = function() {

    var Game = function(options) {
        this.ctx = options.ctx;
        this.cv = this.ctx.canvas;
        this.imgs = ["birds", "land", "pipe1", "pipe2", "sky", "scene-1"];
        this.imgsList = {length: 0};
        this.roles = [];
        this.bird = null;

        // 场景列表
        this.sceneIndex = 0;
        this.sceneList = [];
    };

    Game.prototype = {
        // 开始游戏
        start: function() {
            var self = this;
            // 初始化图片
            util.loadImgs(this.imgs, function(images) {
                // 初始化游戏角色
                // self.initRoles(images);
                self.initScene(images);
                self.sceneList[0].play();
                // 绘制
                // self.draw.call(self, images);
            });
            self.bindEvent();
            
            PubSub().subscribe(function() {
                // 结束游戏
                self.clearGame();
                
                // 进入 结束游戏 场景
                self.sceneIndex = 2;
                self.sceneList[2].play();
            });
        },
        // 重新开始游戏
        restart: function(images) {
            this.initRoles(images);
            this.draw(images);
        },
        // 清理游戏
        clearGame: function() {
            this.roles.length = 0;
            this.bird = null;
            this.isRuning = false;

            // 修改上一次的时间
            this.lastTime = 0;
        },
        // 绘制
        draw: function(images) {
            // 获取所有的 图片对象
            // console.log(images);
            var self = this;

            // 记录游戏进度
            this.isRuning = true;
            
            (function draw() {
                ctx.clearRect(0, 0, cv.width, cv.height);
                ctx.beginPath();

                self.curTime = new Date();
                self.lastTime = self.lastTime || new Date();
                self.delta = self.curTime - self.lastTime;
                self.lastTime = self.curTime;
                // console.log(self.delta);
                // 顺序
                self.roles.forEach(function(role) {
                    role.draw(self.delta);
                });

                self.bird.draw(self.delta);
                if (!self.gameOver(images)) {

                    requestAnimationFrame(draw);
                }

            })();
        },
        // 绑定事件
        bindEvent: function() {
            var self = this;
            // 单击事件
            this.cv.addEventListener("click", function() {
                // self.bird.speed = -.2;
                if(self.sceneIndex === 0) {
                    self.sceneIndex = 1;
                    self.sceneList[1].play();
                } else if(self.sceneIndex === 1) {
                    self.bird.speed = -.2;
                } else {
                    self.sceneIndex = 1;
                    self.sceneList[1].play();
                }
            });
        },
        // 初始化游戏角色
        initRoles: function(images) {
            // 清空所有角色
            this.roles.length = 0;

            // 创建天空背景
            var sky1 = new Sky({
                ctx: this.ctx,
                img: images["sky"],
                x: 0
            });
            this.roles.push(sky1);
            var sky2 = new Sky({
                ctx: this.ctx,
                img: images["sky"],
                x: 800
            });
            this.roles.push(sky2);

            // 创建管道
            for (var i = 0; i < 6; i++) {
                var pipe = Pipe({
                    ctx: this.ctx,
                    imgUp: images["pipe1"],
                    imgDown: images["pipe2"],
                    pipeSpace: 100,
                    x: 300 + images.pipe1.width * 3 * i
                });
                this.roles.push(pipe);
            }

            // 创建陆地背景
            for (var i = 0; i < 4; i++) {
                var land = new Land({
                    ctx: this.ctx,
                    img: images["land"],
                    x: 336 * i
                });
                this.roles.push(land);
            }

            // 创建时间
            var timer = new Timer(this.ctx);
            this.roles.push(timer);

            // 创建鸟
            var bird = new Bird({
                ctx: this.ctx,
                img: images['birds']
            });
            this.bird = bird;
        },
        // 初始化场景
        initScene: function(images) {
            var self = this;

            var loadScene = new Scene({
                sceneIndex: 0,
                pre: function() {
                    var cvW = self.cv.width,
                        cvH = self.cv.height,
                        x = cvW / 2 - 100,
                        y = cvH / 2 - 50,
                        ctx = self.ctx;

                    ctx.save();

                    // 绘制背景图
                    ctx.drawImage(images["scene-1"], 0, 0);
                    // 绘制背景遮罩
                    ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
                    ctx.fillRect(0, 0, cvW, cvH);
                    // 绘制文字 - 开始游戏
                    ctx.restore();
                    ctx.save();
                    ctx.font = "900 40px 微软雅黑";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "yellow";
                    ctx.fillText("开始游戏", cvW / 2, cvH / 2);

                    // 绘制标题
                    ctx.restore();
                    ctx.save();
                    ctx.font = "40px 微软雅黑";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "yellow";
                    ctx.fillText("FlappyBird - 传智前端", cvW / 2, cvH / 2 - 150);

                    // 绘制文字外框
                    ctx.strokeStyle = "yellow";
                    ctx.lineWidth = 5;
                    ctx.strokeRect(cvW / 2 - 150, cvH / 2 - 50, 300, 100);

                    ctx.restore();
                },
                post: function(dopre) {

                    dopre();
                }
            });
            this.sceneList.push(loadScene);

            var gameScene = new Scene({
                sceneIndex: 1,
                pre: function() {
                    
                    self.restart(images);
                },
                post: function(dopre) {

                    dopre();
                }
            });
            this.sceneList.push(gameScene);

            var overScene = new Scene({
                sceneIndex: 2,
                pre: function() {
                    var cvW = self.cv.width,
                        cvH = self.cv.height,
                        x = cvW / 2 - 100,
                        y = cvH / 2 - 50,
                        ctx = self.ctx;

                    ctx.save();

                    // 绘制背景图
                    // ctx.drawImage(images["scene-1"], 0, 0);
                    // 绘制背景遮罩
                    ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
                    ctx.fillRect(0, 0, cvW, cvH);
                    // 绘制文字
                    ctx.restore();
                    ctx.save();
                    ctx.font = "900 40px 微软雅黑";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "red";
                    ctx.fillText("重新开始", cvW / 2, cvH / 2);

                    // 绘制标题
                    ctx.restore();
                    ctx.save();
                    ctx.font = "40px 微软雅黑";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "red";
                    ctx.fillText("Gameover", cvW / 2, cvH / 2 - 150);

                    // 绘制文字外框
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 5;
                    ctx.strokeRect(cvW / 2 - 150, cvH / 2 - 50, 300, 100);

                    ctx.restore();
                },
                post: function(dopre) {

                    dopre();
                }
            });
            this.sceneList.push(overScene);
        },
        // 游戏结束，碰撞检测，如果发生碰撞则通知所有观察者
        gameOver: function(images) {
            // 碰撞检测
            var bird = this.bird;
            
            var bX = bird.x;
            var bY = bird.y;
            if (bY <= 0 || bY > this.cv.height - images["land"].height || ctx.isPointInPath(bX, bY)) {
                PubSub().publish(false);

                this.initRoles(images);

                return true;
            }

            return false;
        }
    };

    var flappyBird = null;

    return {
        getFlappyBird: function(option) {
            if(flappyBird === null) {
                flappyBird = new Game(option);
            }

            return flappyBird;
        }
    };
}();

w.FlappyBird = FlappyBird;
})(window);