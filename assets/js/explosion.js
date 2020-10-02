/*	
	=============================================================================
                            	Script: Explosion.js
                            	Author: thenocturnalguy
	=============================================================================

	explosion() @function explosion module, that creates an explosion animation 
	at a given X & Y coordinate.
	
	explosion._init(splinter, x, y) @function Initialises an individual splinter.
	explosion._init(splinter, x, y) @access Private.
	explosion._init(splinter, x, y) @params Splinter object, X-coordinate & 
    Y-coordinate.
	
	explosion._update(x, y) @function Updates an individual splinter.
	explosion._update(x, y) @access Private.
	explosion._update(x, y) @params X-coordinate & Y-coordinate.
	
	explosion._draw() @function Draws an individual splinter.
	explosion._draw() @access Private.
	
	explosion._add(x, y) @function Adds an individual splinter to splinter array.
	explosion._add(x, y) @access Private.
	explosion._add(x, y) @params X-coordinate & Y-coordinate.
	
	explosion.explode(x, y) @function create the animation, persists for a 
    particular interval and then clears teh frame.
	explosion.explode(x, y) @params X-coordinate & Y-coordinate.

	=============================================================================
*/

let explosion = (function() {
    let splinters = [], counter = 0;
    const EXPL_TUNING_PARAMS = {
    	nSplinter: 8, 	// Number of splinters
        gravity: 0.0, 	// Gravity while splinter fall
        duration: 8, 	// Explosion duration	
        colors: [ 		// Colors array
	        'yellow',
            'orange',
            'white',
            'red'
    	]
    };
 
    const _init = function(splinter, x, y) {
        splinter.x = x;								// position of splinter along x-axis
        splinter.y = y;								// position of splinter along y-axis
        splinter.vx = -20 + Math.random() * 40; 	// velocity of splinter along x-axis
        splinter.vy = -15 + Math.random() * 30; 	// velocity of splinter along y-axis
        splinter.radius = Math.random() * 2 + 1; 	// splinter radius
    }
 
    const _update = function(x, y) {
        let splinter, i;
        for (i = 0; i < splinters.length; i++) {
            splinter = splinters[i];
            splinter.vy += EXPL_TUNING_PARAMS.gravity;
            splinter.x += splinter.vx;
            splinter.y += splinter.vy;
            if (splinter.x < 0 || splinter.x > GAME_AREA.width || splinter.y < 0 || splinter.y > GAME_AREA.height) {
                _init(splinter, x, y);
            }
        }
    }
 
    const _draw = function() {        
        splinters.forEach(splinter => {
        	ctx.beginPath();
            ctx.arc(splinter.x, splinter.y, splinter.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = EXPL_TUNING_PARAMS.colors[Math.floor(Math.random() * EXPL_TUNING_PARAMS.colors.length)];
            ctx.fill();
        });
    }
 
    const _add = function(x, y) {
        let splinter;
        if (splinters.length < EXPL_TUNING_PARAMS.nSplinter) {
            splinter = {};
            _init(splinter, x, y);
            splinters.push(splinter);
        }
    }

    const _softReset = function() {
        splinters = [];
        counter = 0;
    }

    const explode = function(x, y) {
        let frame = window.requestAnimationFrame(function() {
        	explode(x, y)
        });
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, GAME_AREA.width, GAME_AREA.height);
        counter++;
        if (counter < EXPL_TUNING_PARAMS.duration) {
            _add(x, y);
            _update(x, y);
            _draw();
        } else {
            window.cancelAnimationFrame(frame);
            _softReset();
        }
    }

    return {
    	explode: function(x, y) {
    		explode(x, y);
    	}
    };
})();
