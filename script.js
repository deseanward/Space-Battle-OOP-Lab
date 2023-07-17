/**
 * ********** Game Class **********
 */
class Game {
	constructor() {
		// Create my spaceship
		this.mySpaceShip = new USSAssembly();

		/* Create alien spaceships */
		this.alienSpaceShips = [];

		for (let x = 0; x < 6; x++) {
			this.alienSpaceShips.push(new AlienSpaceShip());
		}
		/*************************/

		// Set the current player
		this.attacker = this.mySpaceShip;
		this.receiver = this.alienSpaceShips;

		// If the alien space ship gets hit
		let alienSpaceShipHit = false;
	}

	// Start new game
	start() {
		let idx = 0;
		let alienCount = idx;
		let currentAlien = this.alienSpaceShips[idx];
		let message = '';

		this.stats = `
     ***** SPACE BATTLE *****
     ________________________

${this.mySpaceShip.name}     Aliens Destroyed: (${alienCount} of ${this.alienSpaceShips.length})
Hull: ${this.mySpaceShip.hull}         Hull: ${this.alienSpaceShips[idx].hull}


`;
		do {
			// Display the game's stats
			console.log(this.stats);
			console.log(`Attacker: ${this.attacker.name}`);
			this.attacker === this.mySpaceShip
				? this.mySpaceShip.attackOrRetreat(this.alienSpaceShips[idx])
				: this.alienSpaceShips[idx].attack();

			this.alienSpaceShipHit === true ? idx++ : null;

			this.alienSpaceShipHit = false;
		} while (idx < this.alienSpaceShips.length);

		if (idx >= this.alienSpaceShips.length)
			console.log('All alien ships have been destroyed!');

		game.end();
	}

	// End the game
	end() {
		const playAgain = prompt('Play Again?').toLowerCase();
		if (playAgain === 'yes' || playAgain === 'y') {
			console.clear();
			game = new Game();
			game.start();
		}
	}

	// Alternate between mySpaceShip and alienSpaceShip to attack
	switchAttacker(attacker, receiver) {
		this.attacker = receiver;
		this.receiver = attacker;
	}

	// shipDestroyed() {
	// 	console.log(`Destroyed`);
	// }
}

/**
 * ********** Parent Ship Class **********
 */
class SpaceShip {
	constructor() {
		this.destroyShip = this.destroyShip.bind(this);

		this.attack = this.attack.bind(this);
		this.enemyHit = this.enemyHit.bind(this);
	}

	attack(enemy) {
		console.log(`${this.name} is attacking...`);
		this.accuracy >= enemy.accuracy
			? this.enemyHit(enemy)
			: game.switchAttacker(this, enemy);
	}

	// The enemy has been hit
	enemyHit(enemy) {
		console.log(`${enemy.name} has been destroyed!`);
		if (enemy.name === 'Alien Ship') game.alienSpaceShipHit = true;
		else game.end();
	}

	// // Destroy the ship
	destroyShip(name = 'some ship') {
		console.log(`${name} Destroyed!`);
	}
	// this.hull = hull;
	// this.firepower = firepower;
	// this.accuracy = accuracy;
	// Functions
	// Attack
}

/**
 * ********** My SpaceSpaceShip Class **********
 */
class USSAssembly extends SpaceShip {
	constructor() {
		super();
	}
	name = 'USS Assembly';
	hull = 20;
	firepower = 5;
	accuracy = 0.7;

	attackOrRetreat(enemy) {
		const decide = prompt('Enter [1] to Attack or [2] to Retreat');

		if (decide === null || decide === '') return;

		decide === '1'
			? this.attack(enemy)
			: decide === '2'
			? this.retreat()
			: this.attackOrRetreat();
	}

	attack(enemy) {
		super.attack(enemy);
	}

	retreat() {
		console.log('retreating');
	}
}

/**
 * ********** Alien SpaceSpaceShip Class **********
 */
class AlienSpaceShip extends SpaceShip {
	constructor() {
		super();

		/***** Initial properties *****/
		this.hull = Math.floor(Math.random() * 4) + 3;
		this.firepower = Math.floor(Math.random() * 3) + 2;
		this.accuracy = (Math.random() * 0.2 + 0.6).toFixed(1);

		this.destroyShip = this.destroyShip.bind(this);
	}

	name = 'Alien Ship';

	/***** Functions *****/
	// Attack
	attack() {
		super.attack(game.mySpaceShip);
	}

	// // Destroyed
	// destroyShip() {
	// 	super.destroyShip(this.name);
	// }

	// Send Next Ship
	sendNextShip() {}
}

// Create new game
let game = new Game();
// Start the game
game.start();
