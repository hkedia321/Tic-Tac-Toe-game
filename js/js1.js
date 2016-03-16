var board;
var computerwins;
var playerwins;
var nodraws;
var playername;//stores name of player entered
var curplayername;//stores the name of player whose chance it is
var curplayerno;//stores '1' or '2' for computer or human's chance
var firstplayerno;//stores the no. of player who played first
var winids;//stores the position of wins
function onload()
{
	computerwins=0;
	playerwins=0;
	nodraws=0;
	playername="player";
	resetboard();
	startgame();
}
function resetboard()
{
	updatescoreboard();
	winids=[0,0,0];
	board=[[0,0,0],[0,0,0],[0,0,0]];
	for(var j=1;j<10;j++)
		resetcell(j);
	resetcell(10);
	resetcell(11);
	curplayerno=oneortwo();
	firstplayerno=curplayerno;
	if(curplayerno==1)
		curplayername="computer";
	else
		curplayername=playername;
	updatecurplayername();
}
function resetcell(cellidno)
{
	var canvas=document.getElementById("canvas"+cellidno);
	var context = canvas.getContext("2d");	
	context.clearRect(0, 0, canvas.width, canvas.height);
}
function updatecurplayername()
{
	var plname=document.getElementById('playersturn');
	if(curplayerno==1)
		plname.innerHTML="computer";
	else
		plname.innerHTML=playername;
}
function updatescoreboard()
{
	var p1_elem=document.getElementById('points1');
	var p2_elem=document.getElementById('points2');
	p1_elem.innerHTML=computerwins;
	p2_elem.innerHTML=playerwins;
	var mat_drw=document.getElementById('matchesdrawn');
	mat_drw.innerHTML=nodraws;
}
function startgame()
{
	if(firstplayerno==1)
	{
		drawcrossind(10);
		drawcircleind(11);
	}
	else
	{
		drawcircleind(10);
		drawcrossind(11);

	}
	if(curplayerno==1)
		playcomputer();
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
	var cxt=canvas.getContext("2d");	
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
function canvasclick(i,j,idno)
{
	if(board[i][j]!=0)
		alert("Overwrite not Allowed!");
	else
	{
		board[i][j]=2;
		if(firstplayerno==2)
			drawcross(idno);
		else
			drawcircle(idno);
		if(checkwin(board,2)==1)
		{
			animate(winids);
			alert(playername+" Has won!\nStarting a new game.");
			animatestop(winids);
			playerwins++;
			updatescoreboard();
			resetboard();
			startgame();
		}
		else if(checkdraw(board)==1)
		{
			alert("Match drawn!\nStarting a new game.");
			nodraws++;
			updatescoreboard();
			resetboard();
			startgame();
		}
		else
			playcomputer();
	}
}
function checkwin(arr,symno)
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
				winid=[2,5,8];
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
	winids=winid;
	if(win==1)
		return 1;
	return 0;
}
function checkdraw(arr)
{
	for(var i=0;i<3;i++)
	{
		for(var j=0;j<3;j++)
		{
			if(arr[i][j]==0)
				return 0;
		}
	}
	return 1;
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
	var p2=p2_elem.value;
	if(p2==null)
		p2="player";
	playername=p2;
	updatecurplayername();
}
function playcomputer()
{
	var scores=[0,0,0,0,0,0,0,0,0];
	var inde=0;
	var moveids=[0,0,0,0,0,0,0,0,0];
	for(var i=0;i<3;i++)
	{
		for(var j=0;j<3;j++)
		{
			if(board[i][j]==0)
			{
				board[i][j]=1;
				var board2=copyarr(board);
				scores[inde]=parseInt(getscore(board2,2,1));
				moveids[inde++]=getidbyij(i,j);
				board[i][j]=0;
			}
		}
	}
	console.clear();
	console.log("-----------------\n");
	for(var ijk=0;ijk<inde;ijk++)
	 console.log("moveid="+moveids[ijk]+"\nScores ="+scores[ijk]+"\n");
	console.log("-----------------\n");
	
	computerplayed(moveids[maxIndex(scores,inde)]);
}
function getscore(arr,whochance,depth)
{
	var scores=[0,0,0,0,0,0,0,0,0];
	var inde=0;
	var done=0;
	if(checkwin(arr,1)==1)
	{
		done=1;
		var d2=parseInt(10-depth);
		//console.log("if1 d2="+d2);
		return parseInt(d2);
	}
	if(checkwin(arr,2)==1)
	{
		done=1;
		var d2=parseInt(0-10-depth);
		//console.log("if2 d2="+d2);
		return parseInt(d2);
	}
	if(checkdraw(arr)==1)
	{
		done=1;
		var d2=(0-depth);
		//alert("depth="+depth+"\nd2="+d2);
		//console.log("if3 depth="+depth);
		//console.log("if3 d2="+d2);
		return d2;
	}
	if(done==0)
	{
		for(var i=0;i<3;i++)
		{
			for(var j=0;j<3;j++)
			{
				if(arr[i][j]==0)
				{
					var arr2=copyarr(arr);
					arr2[i][j]=whochance;
					var d2=(depth+1);
					if(whochance==2)
						scores[inde++]=parseInt(getscore(arr2,1,d2));
					else
						scores[inde++]=parseInt(getscore(arr2,2,d2));
				}
			}
		}
		if(whochance==2)
			return minIn(scores,inde);
		else
			return maxIn(scores,inde);
	}
}
function computerplayed(idno)
{
	if(firstplayerno==1)
		drawcross(idno);
	else
		drawcircle(idno);
	board[getibyid(idno)][getjbyid(idno)]=1;
	if(checkwin(board,1)==1)
	{
		animate(winids);
		alert("Computer has won!\nStarting a new game");
		animatestop(winids);
		computerwins++;
		updatescoreboard();
		resetboard();
		startgame();
	}
	else if(checkdraw(board)==1)
	{
		alert("Match drawn!\nStarting a new game");
		nodraws++;
		updatescoreboard;
		resetboard();
		startgame();
	}
	else
	{
		curplayerno=2;
		updatecurplayername();
	}
}
function copyarr(arrr)
{
	var arrcopy=[[arrr[0][0], arrr[0][1],arrr[0][2]],[arrr[1][0],arrr[1][1],arrr[1][2]],[arrr[2][0],arrr[2][1],arrr[2][2]]];
	return arrcopy;
}
function playcomputerrand()
{
	var rand=parseInt(Math.random()*10)+1;
	if(board[getibyid(rand)][getjbyid(rand)]==0)
	{
		computerplayed(rand);
	}
	else
		playcomputerrand();
}
function minIn(arrr,tillInde)
{
	var minval=arrr[0];
	for(var i=0;i<tillInde;i++)
	{
		if(arrr[i]<minval)
			minval=arrr[i];
	}
	return minval;
}
function maxIn(arrr,tillInde)
{
	var maxval=0;
	for(var i=0;i<tillInde;i++)
	{
		if(arrr[i]>maxval)
			maxval=arrr[i];
	}
	return maxval;
}
function maxIndex(arrr,tillInde)
{
	var maxval=arrr[0];

	var maxInde=0;
	for(var i=0;i<tillInde;i++)
	{
		if(arrr[i]>maxval)
		{
			maxval=arrr[i];
			maxInde=i;
		}
	}
	return maxInde;
}