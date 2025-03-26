var particleCount = 200;
var particleMax = 1000;
var sky = document.querySelector('.sky');
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var width = sky.clientWidth;
var height = sky.clientHeight;
var i = 0;
var active = false;
var leaves = [];
var leaf;

canvas.style.position = 'absolute';
canvas.style.left = canvas.style.top = '0';
sky.style.position = 'relative';

function createLeafCanvas(color) {
    var leafCanvas = document.createElement('canvas');
    leafCanvas.width = 20;
    leafCanvas.height = 20;
    var leafCtx = leafCanvas.getContext('2d');
    
    leafCtx.fillStyle = color;
    leafCtx.beginPath();
    leafCtx.moveTo(10, 0);
    leafCtx.bezierCurveTo(20, 5, 15, 20, 10, 20);
    leafCtx.bezierCurveTo(5, 20, 0, 5, 10, 0);
    leafCtx.fill();
    
    return leafCanvas;
}

var leafImages = [
    createLeafCanvas('#FF9800'), // Naranja
    createLeafCanvas('#FF5722'), // Rojo
    createLeafCanvas('#795548')  // Marrón
];

var Leaf = function () {
    this.x = 10;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.size = 0;
    this.angle = 0;
    this.angularSpeed = 0;
    this.image = null;
    
    this.reset();
};

Leaf.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.size = 15 + Math.random() * 20;
    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = (Math.random() - 0.5) * 0.02;
    this.image = leafImages[Math.floor(Math.random() * leafImages.length)];
};

function generateLeaves() {
    leaves = [];
    for (i = 0; i < particleMax; i++) {
        leaf = new Leaf();
        leaf.reset();
        leaves.push(leaf);
    }
}

generateLeaves();

function update() {
    ctx.clearRect(0, 0, width, height);

    if (!active) {
        return;
    }

    for (i = 0; i < particleCount; i++) {
        leaf = leaves[i];
        leaf.y += leaf.vy;
        leaf.x += leaf.vx + Math.sin(leaf.angle) * 0.5;
        leaf.angle += leaf.angularSpeed;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);
        ctx.drawImage(leaf.image, -leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size);
        ctx.restore();

        if (leaf.y > height) {
            leaf.reset();
        }
    }

    requestAnimFrame(update);
}

function onResize() {
    width = sky.clientWidth;
    height = sky.clientHeight;
    canvas.width = width;
    canvas.height = height;
    
    var wasActive = active;
    active = true;

    if (!wasActive && active) {
        requestAnimFrame(update);
    }
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

onResize();
window.addEventListener('resize', onResize, false);

sky.appendChild(canvas);

var gui = new dat.GUI();
gui.add(window, 'particleCount').min(1).max(particleMax).step(1).name('Particles count').onFinishChange(function () {
    requestAnimFrame(update);
});