'use strict';
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('arrow', 'assets/arrow.png');
    game.load.image('poke1', 'assets/poke1.jpg');
}

//Here be globals
var hero;
var cursor;
var keyboardCommands = {};
var battle = false;
var capturedPokemon = {};
var pokemon;
var biome = 1;
var names = ['Sally', 'Tub', 'Potato'];

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0072bc';

    hero = game.add.sprite(400, 300, 'arrow');
    hero.anchor.setTo(0.5, 0.5);

    //  Enable Arcade Physics for the sprite
    game.physics.enable(hero, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    hero.body.allowRotation = false;


    //Here be keyboard stuff
    cursor = game.input.keyboard.createCursorKeys();
    keyboardCommands.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyboardCommands.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyboardCommands.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyboardCommands.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

}

function startEncounter() {
    battle = true;    
    makeMon();
}
function makeMon() {
    var tmpName = names[getRandomInt(0, 2)];
//    pokemon = game.add.sprite(biome, tmpName,
    var xLocate = hero.x;
    var yLocate = hero.y - 100;
    pokemon = game.add.sprite(xLocate, yLocate, "poke1");
    pokemon.name = tmpName;
    pokemon.health = 5;
    pokemon.anchor.setTo(0.4, 0.5);
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
    if (keyboardCommands.up.isDown && !battle) {
        hero.body.y = hero.body.y - 5;
        if(randomEncounters()){
            startEncounter();
            console.log("Battle triggered");
        }
    }
    if (keyboardCommands.down.isDown && !battle) {
        hero.body.y = hero.body.y + 5;
        if(randomEncounters()){
            startEncounter();
            console.log("Battle triggered");
        }
    }
    if (keyboardCommands.right.isDown && !battle) {
        hero.body.x = hero.body.x + 5;
        if(randomEncounters()){
            startEncounter();
            console.log("Battle triggered");
        }
    }
    if (keyboardCommands.left.isDown && !battle) {
        hero.body.x = hero.body.x - 5;
        if(randomEncounters()){
            startEncounter();
            console.log("Battle triggered");
        }
    }

//    hero.rotation = game.physics.arcade.moveToPointer(hero, 60, game.input.activePointer, 500);

}

function render() {

    game.debug.spriteInfo(hero, 32, 32);

}

function randomEncounters(){

    if(Math.random() > 0.98){
        confirm("Battle initiated. Yes or No?");
        return true;
    }

}
