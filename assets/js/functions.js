
//-------------- Developer : Rahul ------------------

var developerMethod=() => {
	console.log('----------------------------------------------');
	console.log('|                                            |');
	console.log('|           Developer : Rahul Gupta.         |');
	console.log('|           If you are a true Coder,         |');
	console.log('|           Never copy someone\'s code.      |');
	console.log('|                                            |');
	console.log('----------------------------------------------');
}

//------------- Variable Declaration ---------------

const gameArea=document.getElementById('gameArea');
const ctx=gameArea.getContext('2d');
var shipIcon=new Image();
shipIcon.src='assets/ship.jpg';
var alienIcon=new Image();
alienIcon.src='assets/alien.jpg';
var ship={
	x:undefined,
	y:undefined,
	vx:undefined,
	vy:undefined,
}
var shipBullets=[],nShipBullets;
var enemies=[],nEnemies;
var enemyBullets=[],nEnemyBullets;
var stopGame;
var score;

//--------------- Initialization -----------------
var initVar=() => {
	gameArea.width=window.innerWidth*0.5;
	gameArea.height=window.innerHeight*0.8;
	this.nShipBullets=6;
	this.nEnemies=75;
	this.nEnemyBullets=3;
	this.stopGame=false;
	this.score=0;
}

//--------------- Ship Movements ------------------

var initShip=(ship) => {
	ship.width=40;
	ship.height=35;
	ship.x=gameArea.width/2;
	ship.y=gameArea.height-50;
	ship.vx=20;
	ship.vy=0;
}
var drawShip=(ship) => {
	ctx.drawImage(shipIcon,ship.x-ship.width/2,ship.y,ship.width,ship.height);
}
window.addEventListener('keypress',(event) => {
	if(event.key==='a' || event.key==='A')
		this.ship.x-=this.ship.vx;
	else if(event.key==='d' || event.key==='D')
		this.ship.x+=this.ship.vx;
	if(this.ship.x>=gameArea.width)
		this.ship.x=gameArea.width;
	else if(this.ship.x<=0)
		this.ship.x=0;
});

//----------------Ship Bullet Movements----------------

var initShipBullets=(shipBullet) => {
	shipBullet.x=this.ship.x;
	shipBullet.y=this.ship.y-10;
	shipBullet.vx=0;
	shipBullet.vy=-12;
	shipBullet.hit=false;
	shipBullet.radius=2.4;
}
var updateShipBullets=() => {
	var shipBullet,i;
	for(i=0;i<this.shipBullets.length;i++)
	{
		shipBullet=this.shipBullets[i];
		shipBullet.y+=shipBullet.vy;
		if(shipBullet.y<0)
			initShipBullets(shipBullet);
	}
}
var drawShipBullets=() => {
	var shipBullet,i;
	for(i=0;i<this.shipBullets.length;i++)
	{
		shipBullet=this.shipBullets[i];
		ctx.beginPath();
		ctx.arc(shipBullet.x,shipBullet.y,shipBullet.radius,0,2*Math.PI,false);
		ctx.arc(shipBullet.x,shipBullet.y-2,shipBullet.radius,0,2*Math.PI,false);
		ctx.arc(shipBullet.x,shipBullet.y-4,shipBullet.radius,0,2*Math.PI,false);
		if(shipBullet.hit==true)
			ctx.fillStyle='transparent';
		else
			ctx.fillStyle='white';
		ctx.fill();
	}
}
var addShipBullets=() => {
	var shipBullet;
	if(this.shipBullets.length<this.nShipBullets)
	{
		shipBullet={};
		initShipBullets(shipBullet);
		this.shipBullets.push(shipBullet);
	}
}

//--------------- Enemy Movements ----------------

var initEnemies=(enemy) => {
	var tolX=[0.2,-0.2];
	enemy.width=25;
	enemy.height=30;
	enemy.x=15+Math.random()*(gameArea.width-15);
	enemy.y=0;
	enemy.vx=tolX[Math.floor(Math.random()*tolX.length)];
	enemy.vy=0.4;
	enemy.hit=false;
	enemy.radius=10;
}
var updateEnemies=() => {
	var enemy,i;
	for(i=0;i<this.enemies.length;i++)
	{
		enemy=this.enemies[i];
		enemy.y+=enemy.vy;
		if(enemy.y>gameArea.height)
			initEnemies(enemy);
	}
}
var drawEnemies=() => {
	var i,enemy;
	for(i=0;i<this.enemies.length;i++)
	{
		enemy=this.enemies[i];
		if(enemy.hit==false)
			ctx.drawImage(alienIcon,enemy.x-enemy.width/2,enemy.y,enemy.width,enemy.height);
	}
}
var addEnemies=() => {
	var bullet;
	if(this.enemies.length<this.nEnemies)
	{
		enemy={};
		initEnemies(enemy);
		this.enemies.push(enemy);
	}
}

//---------------Enemy Bullet Movements------------

var initEnemyBullets=(enemyBullet,x,y) => {
	enemyBullet.x=x;
	enemyBullet.y=y;
	enemyBullet.vx=0;
	enemyBullet.vy=12;
	enemyBullet.radius=2.4;
}
var updateEnemyBullets=() => {
	var i,enemyBullet;
	for(i=0;i<this.enemyBullets.length;i++)
	{
		enemyBullet=this.enemyBullets[i];
		enemyBullet.y+=enemyBullet.vy;
		if(enemyBullet.y<0)
			initEnemyBullets(enemyBullet);
	}
}
var drawEnemyBullet=() => {

}

//--------------- Hits and Explosion --------------

var hitCheck=() => {
	var i=0,j=0;
	var tolX=20,tolY=12;
	var scoreBoard=document.getElementById('scoreBoard');
	for(i=0;i<this.shipBullets.length && this.shipBullets[i].y>0;i++)
	{
		for(j=0;j<this.enemies.length && this.enemies[j].y<gameArea.height;j++)
		{
			if((this.shipBullets[i].x>=this.enemies[j].x-tolX && this.shipBullets[i].x<=this.enemies[j].x+tolX) && (this.shipBullets[i].y>=this.enemies[j].y-tolY && this.shipBullets[i].y<=this.enemies[j].y+tolY) && this.shipBullets[i].hit==false && this.enemies[j].hit==false)
			{
				explosionMethod(this.shipBullets[i].x,this.shipBullets[i].y);
				this.shipBullets[i].hit=true;
				this.enemies[j].hit=true;	
				this.score+=2;
				scoreBoard.innerHTML='Score : '+this.score;
			}
		}
	}
}
var explosionMethod=(x,y) => {
	var splinters=[],nSplinter=8,gravity=0.0,duration=8,counter=0;
	var colorArray=[
		'lightblue',
		'blue'
	];
	var initExplosion=(splinter,x,y) => {
		splinter.x=x;
		splinter.y=y;
		splinter.vx=-20+Math.random()*40;
		splinter.vy=-15+Math.random()*30;
		splinter.radius=Math.random()*2+1;
	}
	var updateExplosion=(x,y) => {
		var splinter,i;
		for(i=0;i<splinters.length;i++)
		{
			splinter=splinters[i];
			splinter.vy+=gravity;
			splinter.x+=splinter.vx;
			splinter.y+=splinter.vy;
			if(splinter.x<0 || splinter.x>gameArea.width || splinter.y<0 || splinter.y>gameArea.height)
				initExplosion(splinter,x,y);
		}
	}
	var drawExplosion=() => {
		var splinter,i;
		for(i=0;i<splinters.length;i++)
		{
			splinter=splinters[i];
			ctx.beginPath();
			ctx.arc(splinter.x,splinter.y,splinter.radius,0,2*Math.PI,false);
			ctx.fillStyle=colorArray[Math.floor(Math.random()*colorArray.length)];
			ctx.fill();
		}
	}
	var addExplosion=(x,y) => {
		var splinter;
		if(splinters.length<nSplinter)
		{
			splinter={};
			initExplosion(splinter,x,y);
			splinters.push(splinter);
		}
	}
	var explode=() => {
		var explosionFrame=window.requestAnimationFrame(explode);
		ctx.fillStyle='transparent';
		ctx.fillRect(0,0,gameArea.width,gameArea.height);
		counter++;
		if(counter<duration)
		{
			addExplosion(x,y);
			updateExplosion(x,y);
			drawExplosion();
		}
		else
			window.cancelAnimationFrame(explosionFrame);
	}
	explode();
}

//------------------ Stop Game -------------------

var gameStop=() => {
	this.stopGame=true;
	console.log('stopped');
}

//----------------- Update Frame -----------------

var updateMethod=() => {
	var mainFrame=window.requestAnimationFrame(updateMethod);
	if(this.stopGame==true)
		window.cancelAnimationFrame(mainFrame);
	else
	{
		ctx.fillStyle='rgba(0,0,0,0.45)';
		ctx.fillRect(0,0,gameArea.width,gameArea.height);
		drawShip(this.ship);
		updateShipBullets();
		drawShipBullets();
		updateEnemies();
		drawEnemies();
		hitCheck();
	}
}
var main_gameMethod=() => {
	initVar();
	initShip(this.ship);
	setInterval(addShipBullets,100);
	setInterval(addEnemies,750);
	updateMethod();
}