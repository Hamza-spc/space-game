let xp = 0;
let health = 100;
let credits = 50;
let currentShip = 0;
let fighting;
let monsterHealth;
let inventory = ["laser gun"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const ships = [
    { name: 'small ship', power: 5 },
    { name: 'speedster', power: 20 },
    { name: 'battle cruiser', power: 50 },
    { name: 'spaceship', power: 100 }
];
const aliens = [
    {
        name: "space slug",
        level: 2,
        health: 15
    },
    {
        name: "robot invader",
        level: 8,
        health: 60
    },
    {
        name: "space dragon",
        level: 20,
        health: 300
    }
]
const locations = [
    {
        name: "space station",
        "button text": ["Go to store", "Visit planet", "Fight alien"],
        "button functions": [goStore, goPlanet, fightAlien],
        text: "You are at the space station. Where would you like to go?"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 credits)", "Upgrade ship (30 credits)", "Go to space station"],
        "button functions": [buyHealth, upgradeShip, goSpaceStation],
        text: "You enter the space station store."
    },
    {
        name: "planet",
        "button text": ["Fight space slug", "Fight robot invader", "Go to space station"],
        "button functions": [fightSlug, fightRobot, goSpaceStation],
        text: "You arrive on a new planet and encounter strange creatures."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goSpaceStation],
        text: "You are in a fight. What will you do?"
    },
    {
        name: "alien defeated",
        "button text": ["Go to space station", "Go to space station", "Go to space station"],
        "button functions": [goSpaceStation, goSpaceStation, easterEgg],
        text: "You defeated the alien! You gain XP and credits."
    },
    {
        name: "lose",
        "button text": ["RETRY", "RETRY", "RETRY"],
        "button functions": [restart, restart, restart],
        text: "You have been defeated by the alien."
    },
    {
        name: "win",
        "button text": ["RETRY", "RETRY", "RETRY"],
        "button functions": [restart, restart, restart],
        text: "Congratulations! You defeated the Space Dragon!"
    },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goPlanet;
button3.onclick = fightAlien;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
}

function goSpaceStation() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goPlanet() {
    update(locations[2]);
}

function buyHealth() {
    if (credits >= 10) {
        credits -= 10;
        health += 10;
        goldText.innerText = credits;
        healthText.innerText = health;
    } else {
        text.innerText = "Not enough credits!";
    }
}

function upgradeShip() {
    if (currentShip < ships.length - 1) {
        if (credits >= 30) {
            credits -= 30;
            currentShip++;
            goldText.innerText = credits;
            let newShip = ships[currentShip].name;
            text.innerText = "You upgraded to a " + newShip + ".";
        } else {
            text.innerText = "Not enough credits to upgrade ship!";
        }
    } else {
        text.innerText = "You already have the most powerful ship!";
    }
}

function fightSlug() {
    fighting = 0;
    goFight();
}

function fightRobot() {
    fighting = 1;
    goFight();
}

function fightAlien() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = aliens[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = aliens[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "You attack the " + aliens[fighting].name + " with your " + ships[currentShip].name;
    health -= Math.floor(Math.random() * 10);
    monsterHealth -= ships[currentShip].power + Math.floor(Math.random() * xp);
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        defeatAlien();
    }
}

function dodge() {
    text.innerText = "You dodge the alien's attack!";
}

function defeatAlien() {
    credits += Math.floor(aliens[fighting].level * 10);
    xp += aliens[fighting].level * 10;
    text.innerText = "You defeated the alien!";
    goldText.innerText = credits;
    xpText.innerText = xp;

    // Create and animate the defeated message
    let message = document.createElement('div');
    message.classList.add('defeated-message');
    message.innerText = "You defeated the alien!";
    document.body.appendChild(message);

    // Remove message after animation
    setTimeout(() => {
        message.remove();
    }, 2500); // Duration matches the animation time

    update(locations[4]);
}


function lose() {
    update(locations[5]);
}

function restart() {
    health = 100;
    credits = 50;
    xp = 0;
    currentShip = 0;
    update(locations[0]);
}

function easterEgg() {
    update(locations[6]);
}

