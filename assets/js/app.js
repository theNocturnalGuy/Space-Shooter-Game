let Game = function() {

}

Game.prototype.stopGame = function() {
	IS_GAME_ON = false;
}

Game.prototype.isGameOn = function() {
	return IS_GAME_ON === false;
}

Game.prototype.init = function() {
	hero.ship.init();
}

Game.prototype.softReset = function() {
	IS_GAME_ON = true; 	
	PLAYER_SCORE = 0; 	
}

Game.prototype.refresh = function() {
	let frame = window.requestAnimationFrame(this.refresh.bind(this));
	if(this.isGameOn())	window.cancelAnimationFrame(frame);
	else {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
		ctx.fillRect(0, 0, gameArea.width, gameArea.height);
		hero.ship.draw();
		hero.bullet.propagate();
	}
}

Game.prototype.start = function() {
	this.init();
	hero.bullet.emit();
	this.refresh();
}

let game = new Game();

window.addEventListener('load', function() {
	game.start();
})