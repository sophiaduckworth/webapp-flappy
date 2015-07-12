var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

var score =-1;
var scoreDisplay;
var player;
var pipes=[];
jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting = "hello";
    var name = jQuery("#fullName").val();
    var greeting_message = greeting +"  "+ name;
    jQuery("#greeting-form").hide();
    jQuery ("#greeting").append("<p>" + greeting_message + "</p>");
    event_details.preventDefault();

});


function preload() {
    game.load.image("playerImg", "../assets/spaceship.png");
    game.load.image("bgImg", "../assets/space.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe", "../assets/pipe_mint.png");
    game.load.image("ball", "../assets/ball.png");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var bg = game.add.image(0, 0, "bgImg");
    bg.width = 800;
    bg.height = 500;
    player = game.add.sprite(50, 110, "playerImg");
    player.scale.x="0.6";
    player.scale.y="0.6";
    game.physics.arcade.enable(player);
    player.body.gravity.y=150;
    scoreDisplay = game.add.text(40, 40, "0",
        {fill: "#FFFFFF"});
    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    randomPipe();
    pipeInterval=3.40;
    game.time.events.
        loop(pipeInterval * Phaser.Timer.SECOND,
        randomPipe);
    randomBall();
    ballInterval=1.5;
    game.time.events.
            loop(ballInterval * Phaser.Timer.SECOND,
            randomBall);
    game.add.text(65,65, "Welcome to space....:)",
        {font:"40px Times New Roman",fill:"#FFFFFF"});

    }

function update() {
    for(var index=0; index<pipes.length; index++) {
        game.physics.arcade
            .overlap(player,
            pipes[index],
            gameOver);
    }
    if(player.y>500 || player.y<0){
        gameOver()
    }

}

function scoreAdd() {
    score=score+1;
    scoreDisplay.setText(score.toString());
    game.sound.play("score")
}

function addPipe(x,y){
    var pipe = game.add.sprite(x,y,"pipe");
    pipes.push(pipe);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200
}

function randomPipe() {
    var gap = game.rnd.integerInRange(1,7);
    for (var count = 0; count < 10; count += 1) {
        if (count != gap && count != gap + 1) {
            addPipe(800, count*50)
        }
    }
    scoreAdd()
}

function addBall(x,y) {
    var ball = game.add.sprite(x,y,"ball");
    game.physics.arcade.enable(ball);
    ball.body.velocity = -200
}

function randomBall() {
    var yLocBall = game.rnd.integerInRange(30,470);
    addBall(800, yLocBall)
}

function playerJump() {
    player.body.velocity.y = -130;
}

function gameOver() {
    score = -1;
    game.state.restart()
}
