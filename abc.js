let game = {
    square: undefined,
    xVals: 'abcdefghh'.split(''),
    yVals: '12345678'.split(''),
    setSquare: function () {
        let res = this.xVals[Math.floor((Math.random() * this.xVals.length))] + this.yVals[Math.floor((Math.random() * this.yVals.length))];
        this.square = res;
        disp()
        return res;
    },
    display: 'w'
}

function loading() {
    game.setSquare();
    dispCoords();
    changeCHB()
}

function retSquare(coord) {
    const letters = 'abcdefgh'.split('')
    if (game.display === 'w') { return letters[coord.x - 1] + coord.y }
    else if (game.display === 'b') { return letters[8 - coord.x] + (9 - coord.y) }
}

function retCoord(square) {
    const letters = 'abcdefgh'.split('')
    if (game.display === 'w') { return { x: letters.indexOf(square.split('')[0]) + 1, y: Number(square.split('')[1]) } }
    else if (game.display === 'b') { return { x: 8 - letters.indexOf(square.split('')[0]), y: 9 - Number(square.split('')[1]) } }
}

function changeCHB() {
    if (document.getElementById('coordCHB').checked === true) { coordVisibility(true) }
    else {coordVisibility(false)}
}


function getSquare(evt) {
    let x = evt.pageX - $('#board').offset().left;
    let y = evt.pageY - $('#board').offset().top;
    let xDiv = $("#board").width();
    let yDiv = $("#board").height();

    if (x < 0 || y < 0 || x > xDiv || y > yDiv) { return false }
    let coord = { x: Math.trunc(8 * x / xDiv) + 1, y: 8 - Math.trunc(8 * y / yDiv) }
    return retSquare(coord)
}

function clicked(evt) {
    if (game.square === undefined) { return }
    let square = getSquare(evt);
    if (square === false) { return false }

    if (square === game.square) { right() }
    else { wrong(square) }

}

function right() {
    colorSquare(game.square, 'green');
    game.setSquare();
}

function wrong(square) {
    colorSquare(square, 'red')
    document.getElementById('dispSquare').style.color = '#800';
    setTimeout(function () { document.getElementById('dispSquare').style.color = 'black' }, 600);
}

function disp() {
    document.getElementById('dispSquare').innerHTML = game.square;
}

function colorSquare(square, color) {
    let coord = retCoord(square)
    let parent = document.getElementById('coloredSquares');
    let el = document.createElement('DIV');
    el.className = 'square';
    el.style.left = $('#board').offset().left + (coord.x - 1) * 75;
    el.style.top = $('#board').offset().top + (8 - coord.y) * 75;
    el.style.backgroundColor = color
    parent.appendChild(el)
    setTimeout(function () { el.style.opacity = '0.75' }, 1);
    setTimeout(function () { el.style.opacity = 0 }, 400);
    setTimeout(function () { parent.removeChild(el) }, 850);
}

// displays coords
function dispCoords() {
    const letters = 'ABCDEFGH'.split('')
    let children1 = document.getElementById('svg1').children;
    let children2 = document.getElementById('svg2').children;

    for (i = 0; i < 8; i++) {
        if (game.display === 'w') {
            children1[i].innerHTML = 8 - i;
            children2[i].innerHTML = letters[i];
        } else if (game.display === 'b') {
            children1[i].innerHTML = i + 1;
            children2[i].innerHTML = letters[7 - i];
        }
    }
}

// hide or unhide coords
function coordVisibility(bool) {
    if (bool === true) { document.getElementById('svg').style.visibility = "visible"; }
    else if (bool === false) { document.getElementById('svg').style.visibility = "hidden"; }
    else console.error('error ' + bool + ' is not a boolean value');
}

// changes board orientations
function rotateBoard() {
    let txt
    if (game.display === 'w') { game.display = 'b'; txt = 'black' }
    else if (game.display === 'b') { game.display = 'w'; txt = 'white' }
    dispCoords()
    document.getElementById('rotdiv').children[4].innerHTML = '&nbsp;&nbsp; Orientation: ' + txt
}

