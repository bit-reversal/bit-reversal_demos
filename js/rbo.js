/** RBO functions **/

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



// decompositions

l= function(k, s, i)
{

    var l1=0;
    var s1=1;
    while((s&s1)==0 && l1<k){
	s1=s1<<1;
	l1++;
    }
    if(i==0) return l1;
    // else recursion
    return l(k, s+s1, i-1);

}

last= function( k,  s)
{
    i=0;
    l1=l(k,s,i);
    while(l1<k)
    {
	i++;
	l1=l(k,s,i);
    }
    return i;
}

minY= function(k, s, i)
{
    if(i==0) return s;
    // else
    s=s+(1<<l(k,s,0));
    return minY(k, s, i-1);
} 


lChildY= function( k,  l,  y)
// 2^k - length of broadcast cycle, l - level of y in its tree
{
    var x=revBits(k,y);
    return (y&(~((1<<k)-1)))+revBits(k, x-(1<<(k-l-1)));
    // return  floor(y/2^k)*2^k+rev(k, x-2^(k-l-1))
}

rChildY= function( k, l, y)
// 2^k - length of broadcast cycle, l - level of y in its tree
{
    var x=revBits(k,y);
    return (y&(~((1<<k)-1)))+revBits(k, x+(1<<(k-l-1)));
    // return  floor(y/2^k)*2^k+rev(k, x+2^(k-l-1))
}


edgesOfTreeY= function( k, s)
// levels of Y_0 tree, when starting in s
{
    var l0=l(k,s,0);
    var nrOfEdges=(1<<l0)-1; // 2^l0-1
    var edges=[]; // new int[nrOfEdges][];
    if(nrOfEdges==0) return edges; // one node - no edges
    edges[0]= [];
    edges[0][0]=s;
    edges[0][1]=rChildY(k,0,s); // edge between root and its only child
    // edges[0][1]=s+1; // edge between root and its only child

    var maxParent=minY(k,s,1)-(1<<(l0-1))-1; // y-index of the last parent is max Y_0-2^l_0-1
    var lv=0; // index of the current level
    var i;
    for( i=s+1; i<=maxParent; i++)
    {
	var j=i-s;
	if(j >= (1<<lv) ) lv++; // y-coordinates on level lv are s+2^(lv-1) ... s+2^lv-1
	edges[2*j-1]=[];
	edges[2*j]=[];
	edges[2*j-1][0]=edges[2*j][0]=i; // parent
	edges[2*j-1][1]=lChildY(k,lv,i);
	edges[2*j][1]=rChildY(k,lv,i);
    } 
    return edges;
}


treeDecopmositions=function ( k, s)
{
    var lst=last(k,s);
    var trees=[];
    var i;
    for( i=0; i<=lst; i++)
    {
	var s1=minY(k,s,i);
	edges=edgesOfTreeY(k,s1);
	trees.push(edges);
    }
    return trees;
}

