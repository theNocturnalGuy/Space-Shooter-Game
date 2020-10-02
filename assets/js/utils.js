const GAME_AREA = document.getElementById('gameArea'); // Game element
GAME_AREA.width = window.innerWidth * 0.5;
GAME_AREA.height = window.innerHeight * 0.8;

const ctx = GAME_AREA.getContext('2d');	// Set canvas object

const SCORE_ELE = document.querySelector('#scoreBoard'); // Score HTML element

const N_HERO_BULLETS_PER_TRIGGER = 6; 	// Number of bullets/trigger from hero
const N_ENEMY_PER_BATCH = 75;			// Number of enemy/batch
const N_ENEMY_BULLETS_PER_TRIGGER = 3;  // Number of bullets/trigger from enemy

let HEROSHIP_ICON = new Image(); 	// Heroship icon
HEROSHIP_ICON.src = 'assets/img/hero.jpg';

let ALIENSHIP_ICON = new Image(); 	// Alienship icon
ALIENSHIP_ICON.src = 'assets/img/alien.jpg';
