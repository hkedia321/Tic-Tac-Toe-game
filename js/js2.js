var arr;//array to store cross or circle
var p1;//string to store p1's name
var p2;//string to store p2's name
var matcheswon1;//int to store no. of matches won by p1
var matcheswon2;
var matchesdrawn;
//1-cross, 2-circle
var nochances;//int stores the number of chances occurred
var playerschance;//int stores '1' or '2' indicating which player's chance
function onload()
{
	arr=[[0,0,0],[0,0,0],[0,0,0]];
	p1="player1";
	p2="player2";
	matcheswon1=0;
	matcheswon2=0;
	matchesdrawn=0;
	nochances=0;
	playerschance=oneortwo();
	updateplayersname();
	resetcell(10);
	resetcell(11);
	updateindex();
}
function updateindex()
{
	if(playerschance==1)
	{
		drawcrossind(10);
		drawcircleind(11);
	}
	else
	{
		drawcircleind(10);
		drawcrossind(11);

	}
}
function oneortwo()
{
	var ran=parseInt((Math.random()*10));
	if(ran%2==0)
		return 2;
	else
		return 1;
}
function canvasclick(xcor,ycor,idno)
{
	if(arr[xcor][ycor]!=0)
		alert("Overwrite not allowed, man!!");
	else
	{
		var win=0;
		arr[xcor][ycor]=playerschance;
		if(nochances%2==0)
			drawcross(idno);
		else
			drawcircle(idno);
		win=checkwin(playerschance);
		playerschance=playerschance==1?2:1;
		nochances++;
		if(nochances==9&&win==0)
		{
			matchesdrawn++;
			updatescore();
			alert('Match Drawn!!\nStarting a new game!!');
			resetboard();
		}
		if(win==1)
			resetboard();
		updateplayersname();
	}
}
function drawcross(idno)
{
	var canvas=document.getElementById("canvas"+idno);
	var cxt = canvas.getContext("2d");
	cxt.beginPath();
	cxt.moveTo(15,15);
	cxt.lineTo(50,50);
	cxt.moveTo(15,50);
	cxt.lineTo(50,15);
	cxt.stroke();
	cxt.closePath();
}
function drawcrossind(idno)
{
	var canvas=document.getElementById("canvas"+idno);
	var cxt = canvas.getContext("2d");
	cxt.beginPath();
	cxt.moveTo(5,5);
	cxt.lineTo(30,30);
	cxt.moveTo(5,30);
	cxt.lineTo(30,5);
	cxt.stroke();
	cxt.closePath();
}
function drawcircle(idno)
{
	var canvas=document.getElementById("canvas"+idno);
	var cxt = canvas.getContext("2d");	
	cxt.beginPath();
	cxt.arc(31,31,21,0,Math.PI*2,true);
	cxt.stroke();
	cxt.closePath();
}
function drawcircleind(idno)
{
	var canvas=document.getElementById("canvas"+idno);
	var cxt = canvas.getContext("2d");	
	cxt.beginPath();
	cxt.arc(20,20,13,0,Math.PI*2,true);
	cxt.stroke();
	cxt.closePath();
}
function checkwin(symno)
{
	var i,j;
	var win=0;
	var winid=[0,0,0];
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			if(arr[i][j]!=symno)
				break;
		}
		if(j==3)
		{
			win=1;
			if(i==0)
				winid=[1,2,3];
			else if(i==1)
				winid=[4,5,6];
			else
				winid=[7,8,9];
			break;
		}
	}
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			if(arr[j][i]!=symno)
				break;
		}
		if(j==3)
		{
			win=1;
			if(i==0)
				winid=[1,4,7];
			else if(i==1)
				windid=[2,5,8];
			else
				winid=[3,6,9];
			break;
		}
	}
	for(i=0;i<3;i++)
	{
		if(arr[i][i]!=symno)
			break;
	}
	if(i==3)
	{
		win=1;
		winid=[1,5,9];
	}
	for(i=0;i<3;i++)
	{
		if(arr[i][2-i]!=symno)
			break;
	}
	if(i==3)
	{
		win=1;
		winid=[3,5,7];
	}
	if(win==1)
	{
		animate(winid);
		if(symno==1)
		{
			matcheswon1++;
			updatescore();
			alert(p1+" WON!!\nStarting a new Game!");
			animatestop(winid);
		}
		else
		{
			matcheswon2++;
			updatescore();
			alert(p2+" WON!!\nStarting a new Game!");
			animatestop(winid);
		}
		return 1;
	}
	return 0;
}
function animate(winid)
{
	var elem1=document.getElementById("canvas"+winid[0]);
	var elem2=document.getElementById("canvas"+winid[1]);
	var elem3=document.getElementById("canvas"+winid[2]);
	elem1.className="canvas blink";
	elem2.className="canvas blink";
	elem3.className="canvas blink";
}
function animatestop(winid)
{
	var elem1=document.getElementById("canvas"+winid[0]);
	var elem2=document.getElementById("canvas"+winid[1]);
	var elem3=document.getElementById("canvas"+winid[2]);
	elem1.className="canvas";
	elem2.className="canvas";
	elem3.className="canvas";
}
function updatename1()
{
	var p1_elem=document.getElementById('name1');
	p1=p1_elem.value;
	if(p1==null)
		p1="player1";
	updateplayersname();
}
function updatename2()
{
	var p2_elem=document.getElementById('name2');
	p2=p2_elem.value;
	if(p2==null)
		p2="player2";
	updateplayersname();
}

function updatescore()
{
	var p1_elem=document.getElementById('points1');
	var p2_elem=document.getElementById('points2');
	p1_elem.innerHTML=matcheswon1;
	p2_elem.innerHTML=matcheswon2;
	var mat_drw=document.getElementById('matchesdrawn');
	mat_drw.innerHTML=matchesdrawn;
}
function resetboard()
{
	for(var i=1;i<10;i++)
		resetcell(i);
	arr=[[0,0,0],[0,0,0],[0,0,0]];
	nochances=0;
	playerschance=oneortwo();
	updateplayersname();
	resetcell(10);
	resetcell(11);
	updateindex();

}
function resetcell(cellidno)
{
	var canvas=document.getElementById("canvas"+cellidno);
	var context = canvas.getContext("2d");	
	context.clearRect(0, 0, canvas.width, canvas.height);
}
function updateplayersname()
{
	var plname=document.getElementById('playersturn');
	if(playerschance==1)
		plname.innerHTML=p1;
	else
		plname.innerHTML=p2;
}