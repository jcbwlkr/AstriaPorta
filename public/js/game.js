'use strict';
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('arrow', 'assets/sprites/arrow.png');
}

//Here be globals
var sprite;
var cursor;
var keyboardCommands = {};
var battle = false;
var capturedPokemon = {};
var pokemon;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0072bc';

    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.setTo(0.5, 0.5);

    //  Enable Arcade Physics for the sprite
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    sprite.body.allowRotation = false;


    //Here be keyboard stuff
    cursor = game.input.keyboard.createCursorKeys();
    keyboardCommands.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyboardCommands.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyboardCommands.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyboardCommands.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

}

function startEcounter() {
    battle = true;    
}

function update() {
    if (keyboardCommands.up.isDown && !battle) {
        sprite.body.y = sprite.body.y - 5;
    }
    if (keyboardCommands.down.isDown && !battle) {
        sprite.body.y = sprite.body.y + 5;
    }
    if (keyboardCommands.right.isDown && !battle) {
        sprite.body.x = sprite.body.x + 5;
    }
    if (keyboardCommands.left.isDown && !battle) {
        sprite.body.x = sprite.body.x - 5;
    }

//    sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);

}

function render() {

    game.debug.spriteInfo(sprite, 32, 32);

}
