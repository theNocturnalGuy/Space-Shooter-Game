(function() {
	let Game = function() {
		this.IS_GAME_ON = true; 	// Whether game is on/off
		this.PLAYER_SCORE = 0; 	// Player score
	}

	Game.prototype.stopGame = function() {
		this.IS_GAME_ON = false;
	}

	Game.prototype.init = function() {
		hero.ship.init();
	}

	Game.prototype.softReset = function() {
		this.IS_GAME_ON = true; 	
		this.PLAYER_SCORE = 0; 	
	}

	Game.prototype.alienHit = function() {
		let i = 0,
		    j = 0;
		let tolX = 20,
		    tolY = 12;

		for (i = 0; i < hero.bullet.bulletQ.length && hero.bullet.bulletQ[i].y > 0; i++) {
		    for (j = 0; j < alien.ship.shipQ.length && alien.ship.shipQ[j].y < GAME_AREA.height; j++) {
		        if (
			        	hero.bullet.bulletQ[i].x >= alien.ship.shipQ[j].x - tolX && 
			        	hero.bullet.bulletQ[i].x <= alien.ship.shipQ[j].x + tolX && 
		        		hero.bullet.bulletQ[i].y >= alien.ship.shipQ[j].y - tolY && 
		        		hero.bullet.bulletQ[i].y <= alien.ship.shipQ[j].y + tolY && 
		        		hero.bullet.bulletQ[i].hit === false && 
		        		alien.ship.shipQ[j].hit === false
        			) {

		            explosion.explode(hero.bullet.bulletQ[i].x, hero.bullet.bulletQ[i].y);
		            hero.bullet.bulletQ[i].hit = true;
		            alien.ship.shipQ[j].hit = true;
		            this.PLAYER_SCORE += 2;
		            SCORE_ELE.innerHTML = 'Score : ' + this.PLAYER_SCORE;
		        }
		    }
		}
	}

	Game.prototype.refresh = function() {
		let frame = window.requestAnimationFrame(this.refresh.bind(this));
		if(!this.IS_GAME_ON)	window.cancelAnimationFrame(frame);
		else {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
			ctx.fillRect(0, 0, GAME_AREA.width, GAME_AREA.height);
			hero.ship.draw();
			hero.bullet.propagate();
			alien.ship.move();
			this.alienHit();
		}
	}

	Game.prototype.start = function() {
		this.init();
		hero.bullet.emit();
		alien.ship.emit();
		this.refresh();
	}

	let game = new Game();

	window.addEventListener('load', function() {
		game.start();
	});
})();
