var width = 800;
var height = 800;
var blockSize = 100;
var sizeMatrix = 8;
var canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext('2d');
var qeue = [];

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

findAndShowPath(matrix[1][0], matrix[6][7]);

function findAndShowPath(org, dest) {

    ctx.fillStyle = 'red';
    ctx.fillRect(org.j * blockSize, org.i * blockSize, blockSize, blockSize);
    ctx.fillStyle = 'orange';
    ctx.fillRect(dest.j * blockSize, dest.i * blockSize, blockSize, blockSize);
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
    var detrasfrente = [];
    detrasfrente.push(dest);
    //console.log(dest);

    while (next != null) {
        //TODO: monta array
        detrasfrente.push(next);
        next = next.parent;
        //console.log(next);        
    }

    detrasfrente.push(org);
    console.log(detrasfrente);

    for(i = detrasfrente.length  - 1;  i >= 0; i--){
        ctx.fillStyle = 'purple';
        ctx.fillRect(detrasfrente[i].j * blockSize, detrasfrente[i].i * blockSize, blockSize, blockSize);
    }

    //TODO: mostra graficamente
}

function popQ(element){
    
}

function pushQ(element){
    if (qeue.includes(element))
        return;

    qeue.push(element);
}
