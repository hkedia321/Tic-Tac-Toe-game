var arr;//array to store cross or circle
var p1;//string to store p1's name
var p2;//string to store p2's name
var matcheswon1;//int to store no. of matches won by p1
var matcheswon2;
var matchesdrawn;
//1-computer, 2-player
var nochances;//int stores the number of chances occurred
var playerschance;//int stores '1' or '2' indicating which player's chance
var playerchancelegal;//'1' if person is allowed to play
var firstmoveplayer;//stores '1' if computer played the first move
function onload()
{
	arr=[[0,0,0],[0,0,0],[0,0,0]];
	p1="computer";
	p2="player";
	matcheswon1=0;
	matcheswon2=0;
	matchesdrawn=0;
	nochances=0;
	playerchancelegal=1;
	playerschance=oneortwo();
	firstmoveplayer=playerschance;
	updateplayersname();
	resetcell(10);
	resetcell(11);
	updateindex();
	startgame();
}
function startgame()
{
	resetboard();
	updateplayersname();
	if(playerschance==1)
		playcomputer();
}
function checkwin()
{
	if(checkwin(1)==1||checkwin(2)==1)
		return 1;
	if(nochances==8)
	{
		matchesdrawn++;
		updatescore();
		return -1;
	}
	return 0;
}
function canvasclick(xcor,ycor,idno)
{
	updateplayersname();
	if(arr[xcor][ycor]!=0)
		alert("Overwrite not allowed, man!!");
	else
	{
		arr[xcor][ycor]=2;
		if(firstmoveplayer==2)
			drawcross(idno);
		else
			drawcircle(idno);
		nochances++;
		if(checkwin(2)==1)
		{
			resetboard();
			startgame();
		}
		else if(nochances==9)
		{
			alert("Match drawn!\nStarting a new game!");
			matchesdrawn++;
			updatescore();
			resetboard();
			startgame();
		}
		else
		{
			playerschance=1;
			updateplayersname();
			playcomputer();
		}

	}
}

function playcomputer()
{
	var rand=parseInt(Math.random()*10)+1;
	if(arr[getibyid(rand)][getjbyid(rand)]==0)
	{
		computerplayed(rand);
	}
	else
		playcomputer();
}
function copyarr(arrr)
{
	var arrcopy=[[arrr[0][0], arrr[0][1],arrr[0][2]],[arrr[1][0],arrr[1][1],arrr[1][2]],[arrr[2][0],arrr[2][1],arrr[2][2]]];
	return arrcopy;
}
function playcomputer_nonuse()
{
	var arrcopy=copyarr(arr);
	var playedid=playcomputerrecur(arrcopy,1);
}
function playcomputerrecur(arrr,whichplayer)
{
	var oneisempty=0;
	for(var i=0;i<3;i++)
	{
		for(var j=0;j<3;j++)
		{
			if(arrr[i][j]==0)
			{
				oneisempty=1;
				arrr[i][j]=1;
			}
		}
	}
}
function computerplayed(idno)
{
	arr[getibyid(idno)][getjbyid(idno)]=1;
	if(firstmoveplayer==1)
		drawcross(idno);
	else
		drawcircle(idno);
	nochances++;
	if(checkwin(1)==1)
		startgame();
	else if(nochances==9)
	{
		alert("Match drawn!\nStarting a new game!");
		matchesdrawn++;
		updatescore();
		startgame();
	}
	playerschance=2;
	updateplayersname();
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
function getibyid(idno)
{
	if(idno==1||idno==2||idno==3)
		return 0;
	if(idno==4||idno==5||idno==6)
		return 1;
	return 2;
}
function getjbyid(idno)
{
	if(idno==1||idno==4||idno==7)
		return 0;
	if(idno==2||idno==5||idno==8)
		return 1;
	return 2;
}
function getidbyij(ii,jj)
{
	if(ii==0)
	{
		if(jj==0)
			return 1;
		if(jj==1)
			return 2;
		return 3;
	}
	if(ii==1)
	{
		if(jj==0)
			return 4;
		if(jj==1)
			return 5;
		return 6;
	}
	if(jj==0)
		return 7;
	if(jj==1)
		return 8;
	return 9;
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
function updatename2()
{
	var p2_elem=document.getElementById('name2');
	p2=p2_elem.value;
	if(p2==null)
		p2="player";
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
	firstmoveplayer=playerschance;
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