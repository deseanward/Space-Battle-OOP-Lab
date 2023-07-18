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
			this.alienSpaceShips.push(new AlienSpaceShip(x));
		}
		/*************************/

		// Set the current player
		this.attacker = this.mySpaceShip;
		this.receiver = this.alienSpaceShips;

		this.idx = 0;
		this.alienCount = this.alienSpaceShips.length;
		this.currentAlien = this.alienSpaceShips[this.idx];
		this.message = '';
		this.missionOver = false;

		// If the alien space ship gets hit
		this.alienSpaceShipHit = false;
	}

	// Start new game
	start() {
		alert(
			`Welcome to *** Space Battle OOP *** \n\nOur universe has been invaded by a horde of alien aircraft. \nIt is your mission, the USS Assembly, to protect us. \n\nPREPARE FOR BATTLE!!! 🚀`
		);
		do {
			// Display the game's stats
			this.alienCount = this.alienSpaceShips.length - this.idx;
			this.message = '';
			this.message = `***** SPACE BATTLE OOP *****
			__________________________________________________________________________
			
			🚀 ${this.mySpaceShip.name}     👾 Aliens Remaining: ${this.alienCount}
			       Hull: ${this.mySpaceShip.hull}                	   Hull: ${
				this.alienSpaceShips[this.idx].hull
			}
			
			`;
			this.message += `	${this.attacker.name}: Ready To Attack!`;

			// Prompts the user to attack or retreat
			this.attacker === this.mySpaceShip
				? this.mySpaceShip.attackOrRetreat(
						this.alienSpaceShips[this.idx]
				  )
				: this.alienSpaceShips[this.idx].attack();

			this.alienSpaceShipHit === true ? this.idx++ : null;
			this.alienCount = this.alienSpaceShips.length - this.idx;

			this.alienSpaceShipHit = false;
		} while (this.idx < this.alienSpaceShips.length);

		game.end();
	}

	// End the game
	end() {
		const playAgain = prompt(
			"Play Again? ('Yes/Y' or 'No/N') ...or Enter Any Key to Resume"
		).toLowerCase();

		if (
			playAgain === 'yes' ||
			playAgain === 'y' ||
			game.missionOver === true
		) {
			console.clear();
			game = new Game();
			game.start();
		} else if (playAgain === 'no' || playAgain === 'n') {
			console.clear();
			window.close(alert('Thanks for playing!'));
			return;
		}
	}

	// Alternate between mySpaceShip and alienSpaceShip to attack
	switchAttacker(attacker, receiver) {
		this.attacker = receiver;
		this.receiver = attacker;
	}
}

/**
 * ********** Parent Ship Class **********
 */
class SpaceShip {
	constructor() {
		this.attack = this.attack.bind(this);
		this.enemyHit = this.enemyHit.bind(this);
	}

	attack(enemy) {
		// Customized message for who's currently attacking
		const nowAttacking =
			enemy.name === 'Alien Ship'
				? 'IS NOW ATTACKING!'
				: ', ATTACK NOW! 💣💣💣';

		// Determine if the attack will hit according to accuracy
		if (Math.random() < this.accuracy) {
			this.enemyHit(enemy);
		} else {
			alert(
				`❗*** ALERT ***❗ \n${this.name}'s attack has failed! \n\n${enemy.name} ${nowAttacking}`
			);

			// Switch attackers on failed attack
			game.switchAttacker(this, enemy);
		}
	}

	// The enemy has been hit
	enemyHit(enemy) {
		console.log(enemy);
		enemy.hull -= this.firepower;

		// Customized message for who's attacking
		const nowAttacking =
			enemy.name === 'Alien Ship'
				? ", HIT 'EM AGAIN"
				: 'is still attacking';

		// If either enemy's hull is still intact (USS Assembly or Alien Space Ship)
		if (enemy.hull > 0) {
			alert(
				`⚠*** WARNING ***⚠ \n${enemy.name} has been hit 🔥🔥🔥, but is still operable! \n\nDamage to Hull: -${this.firepower} \nRemaining Hull: ${enemy.hull} \n\n ${this.name} ${nowAttacking}!`
			);
		} else {
			enemy.name === 'Alien Ship'
				? enemy.id === game.alienSpaceShips.length - 1
					? alert(
							'🚀🚀🚀*** MISSION ACCOMPLISHED ***🚀🚀🚀 \n\nAll alien ships have been destroyed! It is now safe to moonwalk!!!',
							(game.missionOver = true)
					  )
					: alert(
							`👍*** SUCCESS ***👍 \n${enemy.name} ${
								enemy.id + 1
							} of ${
								game.alienSpaceShips.length
							} has been destroyed! \n\nBut, the mission's not over... continue attacking!`
					  )
				: alert(
						`👾👾👾*** MISSION FALIED ***👾👾👾 \n\nThe ${enemy.name} has been destroyed! \nThe universe is now under alien control!`,
						(game.missionOver = true)
				  );
			
			// Keeps track of when the USS Assembly or Alien Space Ship gets hit
			if (enemy.name === 'Alien Ship') game.alienSpaceShipHit = true;
			else game.end();
		}
	}
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

	// Prompts the user to attack or retreat
	attackOrRetreat(enemy) {
		const decide = prompt(
			`${game.message} \n\nEnter [1] to Attack or [2] to Retreat\n\n`
		);

		if (decide === null || decide === '') return;

		decide === '1'
			? this.attack(enemy)
			: decide === '2'
			? this.retreat()
			: this.attackOrRetreat(); // Re-instatiates the prompt if 'decide' is neither 1 or 2
	}

	attack(enemy) {
		super.attack(enemy);
	}

	retreat() {
		game.end();
	}
}

/**
 * ********** Alien SpaceSpaceShip Class **********
 */
class AlienSpaceShip extends SpaceShip {
	constructor(id) {
		super();

		/***** Initial properties *****/
		this.hull = Math.floor(Math.random() * 4) + 3;
		this.firepower = Math.floor(Math.random() * 3) + 2;
		this.accuracy = (Math.random() * 0.2 + 0.6).toFixed(1);
		this.id = id;
	}

	name = 'Alien Ship';

	/***** Functions *****/
	// Attack
	attack() {
		super.attack(game.mySpaceShip);
	}
}

// Create new game
let game = new Game();

// Start the game
game.start();
