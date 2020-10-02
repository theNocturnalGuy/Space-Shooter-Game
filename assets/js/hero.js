let hero = (function() {
	let ship = {};
	const init = function() {
		ship.width = 40;
		ship.height = 35;
		ship.x = GAME_AREA.width / 2;
		ship.y = GAME_AREA.height - 50;
		ship.vx = 20;
		ship.vy = 0;
	}

	const _controls = function() {
		window.addEventListener('keypress', function() {
			if (event.key === 'a' || event.key === 'A') ship.x -=ship.vx;
			else if (event.key === 'd' || event.key === 'D') ship.x += ship.vx;
			if (ship.x >= gameArea.width) ship.x = gameArea.width;
			else if (ship.x <= 0) ship.x = 0;
		});
	}

	const draw = function() {
		ctx.drawImage(HEROSHIP_ICON, ship.x - ship.width / 2, ship.y, ship.width, ship.height);
	}

	_controls();

	let Bullet = function() {
		this.bullets = [];
	}

	Bullet.prototype._init = function(bullet) {
		bullet.x = ship.x;
		bullet.y = ship.y - 10;
		bullet.vx = 0;
		bullet.vy = -12;
		bullet.hit = false;
		bullet.radius = 2.4;
	}

	Bullet.prototype.update = function() {
		this.bullets.forEach(bullet => {
			bullet.y += bullet.vy;
		    if (bullet.y < 0) this._init(bullet);
		});
	}

	Bullet.prototype.draw = function() {
		this.bullets.forEach(bullet => {
			ctx.beginPath();
		    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI, false);
		    ctx.arc(bullet.x, bullet.y - 2, bullet.radius, 0, 2 * Math.PI, false);
		    ctx.arc(bullet.x, bullet.y - 4, bullet.radius, 0, 2 * Math.PI, false);
		    if (bullet.hit === true) ctx.fillStyle = 'transparent';
		    else ctx.fillStyle = 'white';
		    ctx.fill();
		});
	}

	Bullet.prototype.add = function() {
		let bullet;
		if (this.bullets.length < N_HERO_BULLETS_PER_TRIGGER) {
			bullet = {};
			this._init(bullet);
			this.bullets.push(bullet);
		}
	}

	let blt = new Bullet();

	return {
		ship: {
			obj: ship,
			init: init,
			draw: draw
		},
		bullet: {
			bulletQ: blt.bullets,
			emit: function() {
				setInterval(blt.add.bind(blt), 100);
			},
			propagate: function() {
				blt.update();
				blt.draw();
			}
		}
	};
})();

