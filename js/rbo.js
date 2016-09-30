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



