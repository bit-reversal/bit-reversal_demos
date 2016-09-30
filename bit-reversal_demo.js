
/* tests */

mySVG=document.querySelector("#mySVG");



var k=6;
var s=2;
var step=10;

drawRboTrees= function (mySVG, k,s, step){
    var xSize=1<<k;
    var ySize=1<<k;

    var gridColor="grey";
    var gridWidth=1;

    var pixelColor="black";
    var pixelSize= step-4;

    var startLineColor="red";
    var startLineWidth=1;


    setDimmensions( mySVG,(xSize-1)*step , (ySize-1)*step, step, step);

    mySVG.innerHTML= '<g id="myGroup"></g>';

    var myGroup=document.querySelector('#myGroup');


    myGroup.innerHTML = grid( xSize, ySize, step, gridColor, gridWidth);

    myGroup.innerHTML+= graphOfFunction( function(x){ return revBits(k, x); }, 0, (1<<k)-1, step, pixelColor, pixelSize);

    myGroup.innerHTML+=line( s*step, 0*step, s*step, ySize*step,startLineColor ,  startLineWidth);

    var trees= treeDecopmositions( k, s);

    var i;

    for(i=0; i<Math.max(1,trees.length-1); i++) // the last tree is on the entire range 
	myGroup.innerHTML+= edgesByX( function(x){ return revBits(k, x); }, trees[i], "black", 1)

    // myGroup.setAttribute("transform", 'scale(1,1) translate(0,'+(ySize*step)+')');
    myGroup.setAttribute("transform", 'translate(0,'+((ySize-1)*step)+') scale(1,-1)');
}

drawRboTreesAnimate=function(mySVG, k,s, step){
    drawRboTrees(mySVG, k,s, step);
    s=(s+1) % (1<<k);

    setTimeout(function(){ drawRboTreesAnimate(mySVG, k,s, step); }, 500);
    
};

// run:

drawRboTreesAnimate(mySVG, k,s, step);


