function Circle (spec)
{
    this.temperature = spec.temperature;
    this.radius = spec.radius;
    this.temporalRadius = spec.temporalRadius;
    Entity.call(this, spec.x, spec.y)
}

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

Circle.prototype = Entity.prototype;
Circle.prototype.constructor = Circle;

Circle.prototype.update = function () {
    this.temperature = Math.random();
    // gm.em.entities.forEach((entity) =>
    // {
    //     if (entity typeof Circle)
    //     {
    //         if (distance(entity, this) >= this.temporalRadius)
    //         {
    //             entity.temperature -= 5;
    //         }
    //     }
    // })
}

Circle.prototype.collideRight = function () {
    return this.x + this.radius > gm.ctx.width;
};
Circle.prototype.collideLeft = function () {
    return this.x - this.radius < 0;
};
Circle.prototype.collideBottom = function () {
    return this.y + this.radius > gm.ctx.height;
};
Circle.prototype.collideTop = function () {
    return this.y - this.radius < 0;
};

Circle.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};
// Stolen from Chromo.js
Circle.prototype.temperature2rgb = function(kelvin) {
    var b, g, r, temp;
    temp = kelvin / 100;
    if (temp < 66) {
      r = 255;
      g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * Math.log(g);
      b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * Math.log(b);
    } else {
      r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * Math.log(r);
      g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * Math.log(g);
      b = 255;
    }
    return this.clip_rgb([r, g, b]);
  };
  
  Circle.prototype.clip_rgb = function(rgb) {
    var i;
    for (i in rgb) {
      if (i < 3) {
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 255) {
          rgb[i] = 255;
        }
      } else if (i === 3) {
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 1) {
          rgb[i] = 1;
        }
      }
    }
    return rgb
 }

Circle.prototype.draw = function (ctx) {
    ctx.beginPath();
    let rgb = this.temperature2rgb(this.temperature * 20000)
    ctx.fillStyle = "rgb(" + Math.round(rgb[0]) + "," + Math.round(rgb[1]) + "," + Math.round(rgb[2]) + ")";
    console.log(ctx.fillStyle)
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}