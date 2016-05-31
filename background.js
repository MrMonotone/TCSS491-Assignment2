function Background() 
{
	Entity.call(this, 0, 0);
};

Background.prototype = Object.create(Entity.prototype);
Background.prototype.constructor = Background;

Background.prototype.draw = function (ctx) {
	var width = Math.floor(ctx.canvas.width);
	var height = Math.floor(ctx.canvas.height);
	ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0, 500, width, height);
};

Background.prototype.update = function () {

};
