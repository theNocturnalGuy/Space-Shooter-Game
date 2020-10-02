let alien = (function() {
	let ships = [];

	const init = function(ship) {
		let tolX = [0.2, -0.2];
		ship.width = 25;
		ship.height = 30;
		ship.x = 15 + Math.random() * (GAME_AREA.width - 15);
		ship.y = 0;
		ship.vx = tolX[Math.floor(Math.random() * tolX.length)];
		ship.vy = 0.4;
		ship.hit = false;
		ship.radius = 10;
	}

	const update = function() {
		ships.forEach(ship => {
			ship.y += ship.vy;
		    if (ship.y > GAME_AREA.height)
		        init(ship);
		});
	}

	const draw = function() {
		ships.forEach(ship => {
			if (ship.hit === false) {
				ctx.drawImage(ALIENSHIP_ICON, ship.x - ship.width / 2, ship.y, ship.width, ship.height);
			}
		});
	}

	const add = function() {
		let ship;
		if (ships.length < N_ENEMY_PER_BATCH) {
			ship = {};
			init(ship);
			ships.push(ship);
		}
	}

	return {
		ship: {
			shipQ: ships,
			emit: function() {
				setInterval(add, 750);
			},
			move: function() {
				update();
				draw();
			}
		}
	}
})();
