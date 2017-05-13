/* jshint ignore:start */ ! function (a) {
  var b = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global;
  "function" == typeof define && define.amd ? define(["exports"], function (c) {
    b.ParticleNetwork = a(b, c)
  }) : "object" == typeof module && module.exports ? module.exports = a(b, {}) : b.ParticleNetwork = a(b, {})
}(function (a, b) {
  var c = function (a) {
    this.canvas = a.canvas, this.g = a.g, this.particleColor = a.options.particleColor, this.x = Math.random() * this.canvas.width, this.y = Math.random() * this.canvas.height, this.velocity = {
      x: (Math.random() - .5) * a.options.velocity,
      y: (Math.random() - .5) * a.options.velocity
    }
  };
  return c.prototype.update = function () {
    (this.x > this.canvas.width + 20 || this.x < -20) && (this.velocity.x = -this.velocity.x), (this.y > this.canvas.height + 20 || this.y < -20) && (this.velocity.y = -this.velocity.y), this.x += this.velocity.x, this.y += this.velocity.y
  }, c.prototype.h = function () {
    this.g.beginPath(), this.g.fillStyle = this.particleColor, this.g.globalAlpha = .7, this.g.arc(this.x, this.y, 1.5, 0, 2 * Math.PI), this.g.fill()
  }, b = function (a, b) {
    this.i = a, this.i.size = {
      width: this.i.offsetWidth,
      height: this.i.offsetHeight
    }, b = void 0 !== b ? b : {}, this.options = {
      particleColor: void 0 !== b.particleColor ? b.particleColor : "#fff",
      interactive: void 0 !== b.interactive ? b.interactive : !0,
      velocity: this.setVelocity(b.speed),
      density: this.j(b.density)
    }, this.init()
  }, b.prototype.init = function () {
    if (this.k = document.createElement("div"), this.i.appendChild(this.k), this.l(this.k, {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        "z-index": -10
      }));
    this.canvas = document.createElement("canvas"), this.i.appendChild(this.canvas), this.g = this.canvas.getContext("2d"), this.canvas.width = this.i.size.width, this.canvas.height = this.i.size.height, this.l(this.i, {
      position: "relative"
    }), this.l(this.canvas, {
      "z-index": "-10",
      "position": "absolute",
      "top": "0"
    }), window.addEventListener("resize", function () {
      return this.i.offsetWidth === this.i.size.width && this.i.offsetHeight === this.i.size.height ? !1 : (this.canvas.width = this.i.size.width = this.i.offsetWidth, this.canvas.height = this.i.size.height = this.i.offsetHeight, clearTimeout(this.m), void(this.m = setTimeout(function () {
        this.o = [];
        for (var a = 0; a < this.canvas.width * this.canvas.height / this.options.density; a++) this.o.push(new c(this));
        this.options.interactive && this.o.push(this.p), requestAnimationFrame(this.update.bind(this))
      }.bind(this), 500)))
    }.bind(this)), this.o = [];
    for (var a = 0; a < this.canvas.width * this.canvas.height / this.options.density; a++) this.o.push(new c(this));
    this.options.interactive && (this.p = new c(this), this.p.velocity = {
      x: 0,
      y: 0
    }, this.o.push(this.p), this.canvas.addEventListener("mousemove", function (a) {
      this.p.x = a.clientX - this.canvas.offsetLeft, this.p.y = a.clientY - this.canvas.offsetTop
    }.bind(this)), this.canvas.addEventListener("mouseup", function (a) {
      this.p.velocity = {
        x: (Math.random() - .5) * this.options.velocity,
        y: (Math.random() - .5) * this.options.velocity
      }, this.p = new c(this), this.p.velocity = {
        x: 0,
        y: 0
      }, this.o.push(this.p)
    }.bind(this))), requestAnimationFrame(this.update.bind(this))
  }, b.prototype.update = function () {
    this.g.clearRect(0, 0, this.canvas.width, this.canvas.height), this.g.globalAlpha = 1;
    for (var a = 0; a < this.o.length; a++) {
      this.o[a].update(), this.o[a].h();
      for (var b = this.o.length - 1; b > a; b--) {
        var c = Math.sqrt(Math.pow(this.o[a].x - this.o[b].x, 2) + Math.pow(this.o[a].y - this.o[b].y, 2));
        c > 120 || (this.g.beginPath(), this.g.strokeStyle = this.options.particleColor, this.g.globalAlpha = (120 - c) / 120, this.g.lineWidth = .7, this.g.moveTo(this.o[a].x, this.o[a].y), this.g.lineTo(this.o[b].x, this.o[b].y), this.g.stroke())
      }
    }
    0 !== this.options.velocity && requestAnimationFrame(this.update.bind(this))
  }, b.prototype.setVelocity = function (a) {
    return "fast" === a ? 1 : "slow" === a ? .33 : "none" === a ? 0 : .66
  }, b.prototype.j = function (a) {
    return "high" === a ? 5e3 : "low" === a ? 2e4 : isNaN(parseInt(a, 10)) ? 1e4 : a
  }, b.prototype.l = function (a, b) {
    for (var c in b) a.style[c] = b[c]
  }, b
});

// Initialisation

var canvasDiv = document.getElementById('particle-canvas');
var options = {
  particleColor: '#dedede',
  interactive: true,
  speed: 'easy',
  density: 'easy'
};
var particleCanvas = new ParticleNetwork(canvasDiv, options);

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 38,
      "density": {
        "enable": true,
        "value_area": 710.2328774690454
      }
    },
    "color": {
      "value": "#d8d8d8"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 2.4362316369040355,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 336.7165327817598,
      "color": "#eeeeee",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1.603412060865523,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 73.08694910712106,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
/* jshint ignore:end */