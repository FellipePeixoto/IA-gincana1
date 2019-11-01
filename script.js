var width = 800;
var height = 800;
var blockSize = 100;
var sizeMatrix = 8;
var delayToShow = 50;
var canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext('2d');
var qeue = [];
var org = null;
var dest = null;
var drawFunc;

class Node {
    constructor(x, y, i, j){
        this.x = x;
        this.y = y;
        this.i = i;
        this.j = j;
        this.w = 100;
        this.h = 100;
        this.parent = null;
    }
}

canvas.addEventListener('click', function(event){
    if (event.button == 0 && org == null){
        var i = Math.floor(event.y / blockSize);
        var j = Math.floor(event.x / blockSize);
        selectOrig(i,j);
    }
    else {
        var i = Math.floor(event.y / blockSize);
        var j = Math.floor(event.x / blockSize);
        selectDest(i,j);
    }
}, false);

ctx.fillStyle = '#0013ff';
ctx.fillRect(0,0,width,height);

var matrix = [];
for(i = 0; i < 8; i++){
    matrix[i] = [];
    for (j = 0; j < 8; j++){
        matrix[i][j] = new Node(j * blockSize, i * blockSize, i, j);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(j * blockSize, i * blockSize, blockSize, blockSize);
    }
}

function findPath() {
    pushQ(org);
    while(qeue.length > 0 || dest.parent == null) {

        //Esquerda
        var i = (qeue[0].i);
        var j = (qeue[0].j) - 1;
        if (j > -1 && j < sizeMatrix && matrix[i][j].parent == null && matrix[i][j] != org) {
            matrix[i][j].parent = qeue[0];
            pushQ(matrix[i][j]);
        }

        //Direita
        i = (qeue[0].i);
        j = (qeue[0].j) + 1;
        if (j > -1 && j < sizeMatrix && matrix[i][j].parent == null && matrix[i][j] != org){
            matrix[i][j].parent = qeue[0];
            pushQ(matrix[i][j]);
        }

        //Cima
        i = (qeue[0].i) - 1;
        j = (qeue[0].j);
        if (i > -1 && i < sizeMatrix && matrix[i][j].parent == null && matrix[i][j] != org){
            matrix[i][j].parent = qeue[0];
            pushQ(matrix[i][j]);
        }

        //Baixo
        i = (qeue[0].i) + 1;
        j = (qeue[0].j);
        if (i > -1 && i < sizeMatrix && matrix[i][j].parent == null && matrix[i][j] != org){
            matrix[i][j].parent = qeue[0];
            pushQ(matrix[i][j]);
        }

        qeue.shift();
    }
    
    var next = dest.parent;
    qeue = [];
    qeue.push(dest);

    while (next != null) {
        qeue.push(next);
        next = next.parent;        
    }
    qeue.pop();
    qeue.shift();
}

function showPath(){
	if (qeue.length < 1)
	{
		resetAll();
		clearInterval(drawFunc);
		return;
	}
	
	ctx.fillStyle = 'purple';
	ctx.fillRect(qeue[qeue.length - 1].j * blockSize, qeue[qeue.length - 1].i * blockSize, blockSize, blockSize);
	qeue.pop();
}

function drawAll(){
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,width,height);
    for (i = 0; i < sizeMatrix; i++){
        for (j = 0; j < sizeMatrix; j++){
            ctx.strokeRect(i*blockSize, j*blockSize, blockSize,blockSize);
        }
    }

    if (org != null){
        ctx.fillStyle = 'red'
        ctx.fillRect(org.x, org.y, blockSize, blockSize);
    }

    if (dest != null)
    {
        ctx.fillStyle = 'orange';
        ctx.fillRect(dest.x, dest.y, blockSize, blockSize);
    }
}

function selectOrig(i, j){
    org = matrix[i][j];
    drawAll();
}

function selectDest(i, j){
    dest = matrix[i][j];
    if (org == dest)
    {
        resetAll();
        drawAll();
        return;
    }
    drawAll();
    findPath();
	drawFunc = setInterval(showPath, delayToShow);
}

function resetAll(){
	org = null;
    dest = null;
    qeue = [];
	
	for (i = 0; i < sizeMatrix; i++){
		for (j = 0; j < sizeMatrix; j++) {
			matrix[i][j].parent = null;
		}
	}
}

function pushQ(element){
    if (qeue.includes(element))
        return;

    qeue.push(element);
}
