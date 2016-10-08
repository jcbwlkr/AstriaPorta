'use strict';
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.spritesheet('arrow', 'assets/hero.png', 22, 22);
    game.load.image('poke1', 'assets/poke1.jpg');
    game.load.image('Sally', 'assets/sally.png');
    game.load.image('Tub', 'assets/tub.png');
    game.load.image('Potato', 'assets/portal-potato.png');
    game.load.image('gate', 'assets/gate.png');
}

//Here be globals
var hero;
var cursor;
var keyboardCommands = {};
var battle = false;
var capturedPokemon = {};
var pokemon;
var biome = 0;
var desertGate;
var grassGate;
var winterGate;
var names = [{
        name: 'Sally'
    },
    {
        name: 'Tub'
    },
    {
        name: 'Potato'
    }];
var battleText;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    hero = game.add.sprite(400, 300, 'arrow');
    hero.anchor.setTo(0.5, 0.5);

    //  Enable Arcade Physics for the sprite
    game.physics.enable(hero, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    hero.body.allowRotation = false;
    hero.animations.add('default', [0, 1], 2, true);
    hero.animations.play('default');

    hero.health = 5;


    //Here be gates
    desertGate = game.add.sprite(200, 200, "gate");
    desertGate.scale.setTo(0.1, 0.1);
    game.physics.enable(desertGate, Phaser.Physics.ARCADE);
//    desertGate.body.collides(hero, function () {biome = 1; console.log('hey');});
    winterGate = game.add.sprite(400, 200, "gate");
    winterGate.scale.setTo(0.1, 0.1);
    game.physics.enable(winterGate, Phaser.Physics.ARCADE);
//    winterGate.body.collides(hero, function () {biome = 2; console.log('hey');});
    grassGate = game.add.sprite(300, 100, "gate");
    grassGate.scale.setTo(0.1, 0.1);
    game.physics.enable(grassGate, Phaser.Physics.ARCADE);
//    grassGate.body.collides(hero, function () {biome = 3; console.log('hey');});
    


    //Here be keyboard stuff
    cursor = game.input.keyboard.createCursorKeys();
    keyboardCommands.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyboardCommands.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyboardCommands.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyboardCommands.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

}

/**
function startEncounter() {
    battle = true;    
    makeMon();
}
 **/

function makeMon() {
    var tmpName = names[getRandomInt(0, 3)].name;
//    pokemon = game.add.sprite(biome, tmpName,
    var xLocate = hero.x;
    var yLocate = hero.y - 100;
    var text = tmpName + ' has appeared!';

    pokemon = game.add.sprite(xLocate, yLocate, tmpName);
    pokemon.name = tmpName;
    pokemon.health = 5;
    pokemon.anchor.setTo(0.4, 0.5);
    pokemon.scale.setTo(0.1, 0.1);

    var style = { font: "18px Arial", fill: "#ff0044", align: "center" };
    var t = game.add.text(xLocate, yLocate + 150, text, style);
}
// Returns a random integer between min (included) and max (excluded)
//
// Using Math.round() will give you a non-uniform distribution!

function getRandomInt(min, max) {

    min = Math.ceil(min);

    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;

}

function update() {
    game.physics.arcade.collide(hero, desertGate,
            function () {biome = 1; game.stage.backgroundColor = '#feedb9'; desertGate.kill(); winterGate.kill(); grassGate.kill();}
            );
    game.physics.arcade.collide(hero, winterGate, function () {
        biome = 2; game.stage.backgroundColor = '#ffffff'; desertGate.kill(); winterGate.kill(); grassGate.kill();}
        );
    game.physics.arcade.collide(hero, grassGate,
            function () {biome = 3; game.stage.backgroundColor = '#22aa22'; desertGate.kill(); winterGate.kill(); grassGate.kill();}
            );

    if (keyboardCommands.up.isDown && !battle) {
        hero.body.y = hero.body.y - 5;
        if(randomEncounters()){
            console.log("Battle triggered");
        }
    }
    if (keyboardCommands.down.isDown && !battle) {
        hero.body.y = hero.body.y + 5;
        if(randomEncounters()){
            console.log("Battle triggered");
        }
    }
    if (keyboardCommands.right.isDown && !battle) {
        hero.body.x = hero.body.x + 5;
        if(randomEncounters()){
            console.log("Battle triggered");
        }
    }
    if (keyboardCommands.left.isDown && !battle) {
        hero.body.x = hero.body.x - 5;
        if(randomEncounters()){
            console.log("Battle triggered");
        }
    }

//    hero.rotation = game.physics.arcade.moveToPointer(hero, 60, game.input.activePointer, 500);

}

function render() {

    game.debug.spriteInfo(hero, 32, 32);

}

function randomEncounters(){

    if(Math.random() > 0.995){
        alert("Battle initiated.");
        battle = true;
        makeMon();
        battleProcess();
    }

}

function battleProcess(){

    console.log("Battle process started.");

    var dead = false;


    while(!dead){

        if(battleText) {
            battleText.destroy();
        }

        var monAttack = getRandomInt(0, 4);
        var heroAttack = getRandomInt(0, 4);

        pokemon.health = pokemon.health - heroAttack;
        hero.health = hero.health - monAttack;

        console.log("BATTLE PROCESS: monAttack: " + monAttack + " heroAttack: " + heroAttack + " pokemon.health: " + pokemon.health + " Hero health: " + hero.health);


        var content = " Hero attacks with " + heroAttack + " damage. \n Monster's health is now " + pokemon.health + ". \n The Monster attacks with " + monAttack + " damage.\n The hero's health is now " + hero.health;

        battleText = game.add.text(50, 450, content, { font: "24px Arial", fill: "#e527ac" });


        if (pokemon.health > 0 || hero.health > 0) {
            dead = false;
        } else {
            dead = true;
        }

    }
}
