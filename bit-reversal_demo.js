
/* tests */

mySVG=document.querySelector("#mySVG");



var k=6;
var step=10;
var xSize=1<<k;
var ySize=1<<k;

var gridColor="grey"
var gridWidth=1;

var pixelColor="black"
var pixelSize= step-4;

setDimmensions( mySVG,(xSize-1)*step , (ySize-1)*step, step, step);

mySVG.innerHTML= '<g id="myGroup"></g>';

var myGroup=document.querySelector('#myGroup');


myGroup.innerHTML = grid( xSize, ySize, step, gridColor, gridWidth);

myGroup.innerHTML+= graphOfFunction( function(x){ return revBits(k, x); }, 0, (1<<k)-1, step, pixelColor, pixelSize);

// myGroup.setAttribute("transform", 'scale(1,1) translate(0,'+(ySize*step)+')');
myGroup.setAttribute("transform", 'translate(0,'+((ySize-1)*step)+') scale(1,-1)');
