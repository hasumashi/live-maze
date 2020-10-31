const socket = io();
let CANVAS;
console.log(CANVAS);
let POINTS = [];
let lastPosition = {};

socket.on('connect', () => {
    console.log('a connected to server');
    
});

socket.on('penUpdate', (data) => {
    // console.log('penUpdate:', data);
    let ctx = CANVAS.getContext('2d');
    ctx.strokeStyle = data.playerColor;
    ctx.beginPath();
    ctx.lineWidth = 4;
    if(lastPosition[data.playerColor])
        ctx.moveTo(lastPosition[data.playerColor].x, lastPosition[data.playerColor].y);
    for(let point of data.movement.points)
        ctx.lineTo(point.x, point.y);
    lastPosition[data.playerColor] = data.movement.points.pop();
    ctx.stroke();
    // ctx.fillRect(0, 0, 200, 200)
})


setInterval(function(){
    if (POINTS.length) {
        console.log('penMove');
        socket.emit('penMove', {points: POINTS});
        POINTS = [];
    }
}, 20);


window.onload = function() {
    CANVAS = document.querySelector('canvas');
    CANVAS.addEventListener('mousemove', function(event) {
        POINTS.push({x: event.offsetX, y: event.offsetY});

        // console.log('move', event.offsetX);
        // socket.emit('penMove', {points: [], event: event});
    });
};
