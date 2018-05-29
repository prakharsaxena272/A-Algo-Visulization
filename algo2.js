function removeFromArray(arr,elt){
	for(var i = arr.length - 1 ; i >= 0 ; i--)
	{
		if(arr[i] == elt){
			arr.splice(i,1);
		}
	}
}

function heuristic(a,b){
	var d = dist(a.i , a.j ,b.i , b.j );
	return d;
}

var place = prompt("enter place to start (g1, g2,g3 , sarojini , a2z)");
var eplace = prompt("enter place to start (g1, g2,g3 , sarojini , a2z)");
var x;
var y;
var cols = 20;
var rows = 20;
var grid = new Array(cols);
var sum=0;

var openSet = [];
var closedSet = [];
var start;
var end;
var w , h ; // with and height
var path = []; 
function Spot(i,j)
{
	this.i =i;
	this.j =j;
	this.f =0;
	this.g =0;
	this.h =0;
	this.neighbours = [];
	this.previous= undefined;
	this.wall = false;

	//abb3
	if((i==1 || i==2) && (j<15 && j>0) )  {
		this.wall = true;
	}
//oat
	if((i>3 && i<7) && (j<11 && j>0) )  {
		this.wall = true;
	}

// playg
if((i>3 && i<7) && (j<15 && j>11) )  {
		this.wall = true;
	}

	//abb1

	if((i>7 && i<11) && (j<15 && j>0) )  {
		this.wall = true;
	}
	//expo
if((i>11 ) && (j<11 && j>=0) )  {
		this.wall = true;
	}
// h3


if((i>11  && i<15 ) && (j<15 && j>=12) )  {
		this.wall = true;
	}

//h4
if((i>15  && i<19 ) && (j<15 && j>=12) )  {
		this.wall = true;
	}	

// jbs
	if((i>0 && i<6) && (j>15 && j<19) )  {
		this.wall = true;
	}
//sarojini
	if((i>6 && i<12) && (j>15 && j<19) )  {
		this.wall = true;
	}
//a2z
	if((i>12 && i<16) && (j>15 && j<19) )  {
		this.wall = true;
	}
// h5

  
if((i>16 && i<19) && (j>15 && j<19) )  {
		this.wall = true;
	}


	this.show = function(col){
		fill(col);
		if(this.wall)
			fill(0); 
		noStroke();
		//console.log('show');
		rect(this.i * w,this.j * h, w-1,h-1);
	}

	this.addneighbours = function(grid){
		var i = this.i;
		var j = this.j;

		
		if(i > 0)
		{
		this.neighbours.push(grid[i-1][j]);
		}
		if(i<cols-1)
		{
		this.neighbours.push(grid[i+1][j]);
		}

		if(j < rows-1)
		{
		this.neighbours.push(grid[i][j+1]);
		}
		if(j > 0)
		{
		this.neighbours.push(grid[i][j -1]);
	}

// 	if(i>0 && j>0)
// 			this.neighbours.push(grid[i-1][j-1]);

// 		if(i<cols-1 && j>0)
// 			this.neighbours.push(grid[i+1][j-1]);

// 		if(i>0 && j>rows-1)
// 			this.neighbours.push(grid[i-1][j+1]);

// 		if(i<cols-1 && j<rows-1)
// 			this.neighbours.push(grid[i+1][j+1]);

// }

	}
}




function setup()
{
	var myCanvas = createCanvas(400,400);

    myCanvas.parent("wwww");
	console.log('A*');

	w= width/cols;
	h = height/ rows;
console.log(w);
console.log(h);
for(var i=0; i<cols ;i++)
{
	grid[i] = new Array(rows);
} 

for(var i=0 ;i<cols ;i++)
{
	for(var j=0;j<rows ;j++)
	{
		grid[i][j] = new Spot(i,j); 
		//grid[i][j].addneighbours(grid);
	}

}


for(var i=0 ;i<cols ;i++)
{
	for(var j=0;j<rows ;j++)
	{ 
		grid[i][j].addneighbours(grid);
	}

}
if(place === "g1")
{
x=0 ; y =0 ;
start = grid[0][0];
}
if(place === "g2")
{
x=11; y=0;
start = grid[11][0];
}

if(place === "sarojini")
{
x=9; y=14;
start = grid[9][14];
}

if(eplace === "sarojini")
{
x=9; y=14;
end = grid[9][14];
}
if(eplace === "g1")
{
x=0 ; y =0 ;
end = grid[x][y];
}
if(eplace === "g2")
{
x=11; y=0;
end = grid[11][0];
}

if(eplace === "g3")
{
x=9; y=14;
end = grid[cols-1][rows-1];
}


start.wall = false;
end.wall=false;
openSet.push(start);
console.log(grid);
}




function draw()
{
	if(openSet.length>0)
	{
		// traverse through all paths consecutively comparing 
		// their f values and finding the minimun 
			var win = 0 ;
			for(var i=0 ; i<openSet.length ; i++)
			{
			if(openSet[i].f < openSet[win].f)
			{
				win = i;
			}
			} 

				var current = openSet[win];
// if min is the end point 
		if(current === end)
		{

			path = [] ;
			var temp= current;
			path.push(temp);
			while(temp.previous)
			{
				sum =sum + temp.f;
				path.push(temp.previous);
				temp=temp.previous;
			}
			noLoop();
			console.log("DONE!");
			alert("Done  Cost of path!!" + sum );
		}

		// since there is no pre defined function to remove from
		// an array so a self function

		removeFromArray(openSet,current);
		closedSet.push(current);

		var neighbours = current.neighbours;
		for (var i = 0 ; i < neighbours.length ;i++) {
		 var neighbour = neighbours[i];
  
		 if(!closedSet.includes(neighbour) && !neighbour.wall)
		 { 
		 var tempg = current.g  + 1  ;
		 var newpath = false;	
		 if(openSet.includes(neighbour))
		 {
		 	if (tempg < neighbour.g) {
		 		neighbour.g = tempg;
		 		newpath= true;
		 	}
		 }
		else{
			neighbour.g = tempg;
			newpath=true;
			openSet.push(neighbour);	 
		} 

		if(newpath){
		neighbour.h = heuristic(neighbour,end);
		neighbour.f = neighbour.g + neighbour.h;
		neighbour.previous= current;
		 }}
		 } 
		}
		 
	else
	{
		console.log('no solution');
		alert("No solution");
		noLoop();
		return;
		// no solution
	}

// 	for(var i=0 ;i<cols ;i++)
// {
// 	for(var j=0;j<rows ;j++)
// 	{
// 		grid[i][j] = new Spot(); 
// 	}

// }
	background(0);

	for(var i=0 ;i<cols ;i++)
	{
	for(var j=0;j<rows ;j++)
	{
		grid[i][j].show(color(255)); 
	}

	}

	for(var i=0 ; i<closedSet.length ; i++)
	{
		 
    closedSet[i].show(color(255,0,0));

		
	}
	for(var i=0 ; i<openSet.length ; i++)
	{ 
   openSet[i].show(color(0,255,0));	

	
	}

			path = [] ;
			var temp= current;
			path.push(temp);
			while(temp.previous)
			{
				path.push(temp.previous);
				temp=temp.previous;
			}
	for(var i=0 ; i<path.length ; i++)
	{
		
		path[i].show(color(100,25,100));		
	}

}



