mySVG=document.querySelector("#mySVG");


/* drawing functions */

line= function(x1, y1, x2, y2, color, width) {
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2
	+'" style="stroke:'+color+';stroke-width:'+width+'" />'+"\n";
}


pixel= function(x, y, color, size) {
    return '<rect x="'+(x-size/2)+'" y="'+(y-size/2)+
	'" width="'+size+'" height="'+size+
	'" style="fill:'+color+';stroke-width:0;" />'+"\n";
}

grid= function( xSize, ySize, step, color, width){
    out='';
    var i;
    /* horizontal lines */ 
    for(i=0; i<ySize; i++)
	out+=line(0, i*step, (xSize-1)*step, i*step,  color, width);
    /* vertical lines */ 
    for(i=0; i<xSize; i++)
	out+=line(i*step, 0, i*step, (ySize-1)*step,  color, width);
    return out;
}

setDimmensions= function( mySVG, width, height, xMargin, yMargin){
    mySVG.setAttribute("width", ''+(width+2*xMargin));
    mySVG.setAttribute("height", ''+(height+2*yMargin));
    mySVG.setAttribute("viewBox", ' '+(-xMargin)+', '+(-yMargin)+', '+(width+xMargin)+', '+(height+yMargin));
 
}

graphOfFunction= function( func, xMin, xMax, pixStep, pixColor, pixSize){
    out='';
    var x,y;
    for(x=xMin; x<= xMax; x++) {
	y= func(x);
	out+=pixel(pixStep*x, pixStep*y, pixColor, pixSize);
    }
    return out;
}


/* RBO functions */

revBits= function( k,  x) 
    // reverse of k lowest bits
    {
	var y= (x&1);
	var i;
	for(i=1; i<k; i++)
	    {
		y= y<<1;
		x= x>>1;
		y= (y | (x&1));
	    }
	return y;
    }




/* tests */


var k=4;
var step=10;
var xSize=1<<k;
var ySize=1<<k;

var gridColor="grey"
var gridWidth=1;

var pixelColor="black"
var pixelSize= step-4;

setDimmensions( mySVG,xSize*step , ySize*step, step, step);
mySVG.innerHTML = grid( xSize, ySize, step, gridColor, gridWidth);

mySVG.innerHTML+= graphOfFunction( function(x){ return revBits(k, x); }, 0, (1<<k)-1, step, pixelColor, pixelSize);

