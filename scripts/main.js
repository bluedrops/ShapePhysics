/* Set up audio bites */
var bgm_clear = new Howl({
  urls: ['assets/audio/sounds/decide2.wav'],
  autoplay: false,
  loop: false,
  volume: 0.5,
});

var bgm_charge = new Howl({
  urls: ['assets/audio/sounds/puu89.wav'],
  autoplay: false,
  loop: false,
  volume: 0.5,
});

var bgm_bump = new Howl({
  urls: ['assets/audio/sounds/cursor3.wav'],
  autoplay: false,
  loop: false,
  volume: 0.5,
});

var bgm_dead = new Howl({
  urls: ['assets/audio/sounds/buble02.wav'],
  autoplay: false,
  loop: false,
  volume: 0.5,
});

var bgm_level = new Howl({
  urls: ['assets/audio/sounds/power14.wav'],
  autoplay: false,
  loop: false,
  volume: 0.5,
});

var bgm = new Howl({
  urls: ['assets/audio/irisu_03.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.5,
});

var color1_neutral = '#5D9CEC'; //blue
var color2_neutral = '#A0D468'; //green
var color3_neutral = '#ED5565'; //red
var color4_neutral = '#FFCE54'; //yellow
var color5_neutral = '#AC92EC'; //purple
var color6_neutral = '#EC87C0'; //pink
var color7_neutral = '#48CFAD'; //mint
var color8_neutral = '#FC6E51'; //orange
var color9_neutral = '#4FC1E9'; //aqua
var color10_neutral = '#E6E9ED';
var neutralcolors = [color1_neutral, color2_neutral, color3_neutral, color4_neutral, color5_neutral, color6_neutral, color7_neutral, color8_neutral, color9_neutral, color10_neutral];

var color1_negative = '#4076BC';
var color2_negative = '#749E43';
var color3_negative = '#A0333E';
var color4_negative = '#D8A43A';
var color5_negative = '#7D66B7';
var color6_negative = '#AD648D';
var color7_negative = '#379E82';
var color8_negative = '#B53C24';
var color9_negative = '#37A0C6';
var color10_negative = '#B8BABC';
var negativecolors = [color1_negative, color2_negative, color3_negative, color4_negative, color5_negative, color6_negative, color7_negative, color8_negative, color9_negative, color10_negative];

var color1_positive = '#ABC7EA';
var color2_positive = '#BAD39E';
var color3_positive = '#EAA4AC';
var color4_positive = '#FFE8B5';
var color5_positive = '#CFC5EA';
var color6_positive = '#EAB6D8';
var color7_positive = '#7CEFD1';
var color8_positive = '#F9A898';
var color9_positive = '#8FD2E8';
var color10_positive = '#F5F7FA';
var positivecolors = [color1_positive, color2_positive, color3_positive, color4_positive, color5_positive, color6_positive, color7_positive, color8_positive, color9_positive, color10_positive];

/* World creation variables; change these to adjust the width and height of the game.
   Doing it like this is necessary because the canvas & the world are actually separate entities.
   Changing the engine's canvas size property doesn't automatically change the world size property. */
var world_w = 1000;
var world_h = 750;

/* Ground location and size; these will be automatically adjusted along with the world variables. */
var ground_x = (world_w / 2);
var ground_y = (world_h - 100);
var ground_l = (world_w - 300);
var ground_h = 30;

/* Set up aliases for the physics engine properties. Makes functions & properties easier to call */
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;
    Events = Matter.Events;
    MouseConstraint = Matter.MouseConstraint,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    Composite = Matter.Composite

/* Instantiate the engine. Set up rendering variables. */
var engine = Engine.create(document.body, {
  render: {
    options: {
      controller: Matter.RenderPixi,
      width: world_w,
      height: world_h,
      background: '#282C34',
      showAngleIndicator: false,
      wireframes: false,
      showSleeping: true,
      showCollisions: false
    }
  }
});

/* Modifies the engine's world size properties based on the above variables. */
engine.world.bounds.max.x = world_w;
engine.world.bounds.max.y = world_h;

/* Score keeper */
var score = 0;
var level = 1;
var health = 50;
var wallcolor = '#f6f6f6';
/* Ground */
var ground = Bodies.rectangle(ground_x, ground_y, ground_l, ground_h, {isStatic:true});
var wall1 = Bodies.rectangle(150 + 15, world_h/2 - 50, 30, 500, {isStatic:true, render: {fillStyle: wallcolor}});
var wall2 = Bodies.rectangle(world_w - 150 - 15, world_h/2 - 50, 30, 500, {isStatic:true, render: {fillStyle: wallcolor}});

var spawn_left = 150 + 15;
var spawn_right = world_w - 150 - 15;
/* Color properties */
var cubecolor = '#FFFFFF';
var groundcolor = ground.render.fillStyle;


/* Add the ground to the world stage & run */
World.add(engine.world, [ground, wall1, wall2]);
Engine.run(engine);

/* Modify gravity */
engine.world.gravity['y'] = 0.4;

var timeScaleTarget = 1,
    counter = 20;
var multiplier = 1;

Events.on(engine, 'tick', function(event) {
  if (engine.input.mouse.button == 0) {
    var xcoord = engine.input.mouse.position.x;
    var ycoord = engine.input.mouse.position.y;
    var cube = Bodies.rectangle(xcoord, ycoord, 25, 25, { render: { fillStyle: cubecolor } });
    World.add(engine.world, cube);
    Body.applyForce(cube, {x: 400, y: 0}, {x: 0, y: -0.015});
    engine.input.mouse.button = -1;
  }

  if (engine.input.mouse.button == 2) {
    var xcoord = engine.input.mouse.position.x;
    var ycoord = engine.input.mouse.position.y;
    var cube = Bodies.rectangle(xcoord, ycoord, 25, 25, {
      render: {
        fillStyle: cubecolor
      }
    });
    World.add(engine.world, cube);
    Body.applyForce(cube, {x: 400, y: 0}, {x: 0, y: -0.025});
    engine.input.mouse.button = -1;
  }

  // gonna do all my 'while game is running' shit here
  engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;

  counter += 1;
  multiplier += 0.1; //0.05
  // every 2 seconds
  if (counter >= 60 * 2) {
      // do stuff here
      var max = 700, min = 100;
      var xloc = rand(spawn_left, spawn_right);
      var yloc = rand(-100, -200);
      var poly = rand(3, 5);
      var size = rand(15, 60);
      // console.log(xloc + ", " + poly + ", " + size);
      generateShapes(xloc, -150, poly, size);
      // reset counter
      counter = 0;
  }
});

Events.on(engine, "collisionStart",  function(event) {
  var pairs = event.pairs;
  for(var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var bodyA = pair.bodyA; var colorA = pair.bodyA.render.fillStyle;
    var bodyB = pair.bodyB; var colorB = pair.bodyB.render.fillStyle;

    var collisionType = getCollisionType(bodyA, bodyB);

    if(collisionType == "neutral+neutral") {
      freefall(bodyA);
      freefall(bodyB);
      if(pair.bodyA.render.fillStyle != groundcolor && pair.bodyB.render.fillStyle != groundcolor) {
        bgm_bump.play();
      }
    }

    else if(collisionType == "neutral+cube" || collisionType == "cube+neutral") {
      freefall(bodyA);
      freefall(bodyB);
      if(pair.bodyA.render.fillStyle != groundcolor && pair.bodyB.render.fillStyle != groundcolor) {
        bgm_bump.play();
      }
    }

    else if(collisionType == "neutral=neutral") {
      freefall(bodyA);
      freefall(bodyB);
      bgm_charge.play();
      pair.bodyA.render.fillStyle = getPositiveColor(bodyA);
      pair.bodyB.render.fillStyle = getPositiveColor(bodyB);
    }

    else if(collisionType == "positive+neutral") {
      if(bodyA.render.fillStyle == getPositiveColor(bodyB)) {
        pair.bodyB.render.fillStyle = getPositiveColor(bodyB);
        freefall(bodyB);
        bgm_charge.play();
      }
    } else if(collisionType == "neutral+positive") {
      if(bodyB.render.fillStyle == getPositiveColor(bodyA)) {
        pair.bodyA.render.fillStyle = getPositiveColor(bodyA);
        freefall(bodyA);
        bgm_charge.play();
      }
    }

    else if(collisionType == "positive+ground") {
      World.remove(engine.world, bodyA);
      score += Math.round(1 * multiplier);
      updateScore();
      bgm_clear.play();
      increaseHealth();
    } else if(collisionType == "ground+positive") {
      World.remove(engine.world, bodyB);
      score += Math.round(1 * multiplier);
      updateScore();
      bgm_clear.play();
      increaseHealth();
    }

    else if(collisionType == "ground+neutral") {
      // setTimeout(function() {
      //   bodyB.render.fillStyle = getNegativeColor(bodyB);
      //   bgm_dead.play();
      //   decreaseHealth();
      // }, 3000);
      bodyB.render.fillStyle = getNegativeColor(bodyB);
      bgm_dead.play();
      decreaseHealth();

    } else if(collisionType == "neutral+ground") {
      // setTimeout(function() {
      //   bodyA.render.fillStyle = getNegativeColor(bodyA);
      //   bgm_dead.play();
      //   decreaseHealth();
      // }, 3000);
      bodyA.render.fillStyle = getNegativeColor(bodyA);
      bgm_dead.play();
      decreaseHealth();
    }

    else if(collisionType == "positive+negative") {
      if(getNegativeColorFromPositive(bodyA) == bodyB.render.fillStyle) {
        //same color
        World.remove(engine.world, bodyA);
        World.remove(engine.world, bodyB);
        bgm_clear.play();
        score += Math.round(3 * multiplier);
        updateScore();
        increaseHealth();
      } else {
        //different color
        World.remove(engine.world, bodyA);
        bgm_clear.play();
        score += Math.round(1 * multiplier);
        updateScore();
        increaseHealth();
      }

    } else if(collisionType == "negative+positive") {
      if(getNegativeColorFromPositive(bodyB) == bodyA.render.fillStyle) {
        //same color
        World.remove(engine.world, bodyA);
        World.remove(engine.world, bodyB);
        bgm_clear.play();
        score += Math.round(3 * multiplier);
        updateScore();
        increaseHealth();
      } else {
        World.remove(engine.world, bodyB);
        bgm_clear.play();
        score += Math.round(1 * multiplier);
        updateScore();
        increaseHealth();
      }
    }

    else if(collisionType == "neutral+negative") {
      if(getNegativeColor(bodyA) == bodyB.render.fillStyle) {
        World.remove(engine.world, bodyA);
        World.remove(engine.world, bodyB);
        bgm_clear.play();
        score += Math.round(2 * multiplier);
        updateScore();
        increaseHealth();
      } else {
        bodyA.render.fillStyle = getNegativeColor(bodyA);
        freefall(bodyA);
        bgm_dead.play();
        decreaseHealth();
      }

    } else if(collisionType == "negative+neutral") {
      if(getNegativeColor(bodyB) == bodyA.render.fillStyle) {
        World.remove(engine.world, bodyA);
        World.remove(engine.world, bodyB);
        bgm_clear.play();
        score += Math.round(2 * multiplier);
        updateScore();
        increaseHealth();
      } else {
        bodyB.render.fillStyle = getNegativeColor(bodyB);
        freefall(bodyB);
        bgm_dead.play();
        decreaseHealth();
      }
    }
  }
});



function getCollisionType(bodyA, bodyB) {
  var colorA = bodyA.render.fillStyle;
  var colorB = bodyB.render.fillStyle;

  if(bodyA.position.y < -50 && bodyB.position.y < -50) {
    return "no collision";
  }

  if(colorA == cubecolor && colorA == colorB) {
    return "no collision";
  }

  else if(colorA != colorB && (colorA == cubecolor || colorB == cubecolor) && (isNeutralColor(colorA) == true || isNeutralColor(colorB) == true)){
    if(colorA == cubecolor && isNeutralColor(colorB) == true) {
      return "cube+neutral"
    } else if(colorB == cubecolor && isNeutralColor(colorA) == true) {
      return "neutral+cube";
    }
  }

  else if(isNeutralColor(colorA) == true && isNeutralColor(colorB) == true) {
    if(colorA == colorB) {
      return "neutral=neutral";
    } else {
      return "neutral+neutral";
    }
  }

  else if(isPositiveColor(colorA) == true && isNeutralColor(colorB) == true) {
    return "positive+neutral";
  } else if(isNeutralColor(colorA) == true && isPositiveColor(colorB) == true) {
    return "neutral+positive";
  }

  else if(isPositiveColor(colorA) == true && colorB == groundcolor) {
    return "positive+ground";
  } else if(isPositiveColor(colorB) == true && colorA == groundcolor) {
    return "ground+positive";
  }

  else if(isNeutralColor(colorA) == true && colorB == groundcolor) {
    return "neutral+ground";
  } else if(isNeutralColor(colorB) == true && colorA == groundcolor) {
    return "ground+neutral";
  }

  else if(isPositiveColor(colorA) == true && isNegativeColor(colorB) == true) {
    return "positive+negative";
  } else if(isNegativeColor(colorA) == true && isPositiveColor(colorB) == true) {
    return "negative+positive";
  }

  else if(isNegativeColor(colorA) == true && isNeutralColor(colorB) == true) {
    return "negative+neutral";
  } else if(isNegativeColor(colorB) == true && isNeutralColor(colorA) == true) {
    return "neutral+negative";
  }
}

function freefall(body) {
  body.frictionAir = 0.015;
}

function isNeutralColor(color) {
  for(var i = 0; i < neutralcolors.length; i++) {
    if(color == neutralcolors[i]) { return true; }
  }
  return false;
}

function isNegativeColor(color) {
  for(var i = 0; i < negativecolors.length; i++) {
    if(color == negativecolors[i]) { return true; }
  }
  return false;
}

function isPositiveColor(color) {
  for(var i = 0; i < positivecolors.length; i++) {
    if(color == positivecolors[i]) { return true; }
  }
  return false;
}

// function getNeutralColoredBlock(bodyA, bodyB) {
//   for(var i = 0; i < neutralcolors.length; i++) {
//     if(bodyA.render.fillStyle == neutralcolors[i]) return bodyA;
//     if(bodyB.render.fillStyle == neutralcolors[i]) return bodyB;
//   }
// }

function getPositiveColor(body) {
  for(var i = 0; i < neutralcolors.length; i++) {
    if(body.render.fillStyle == neutralcolors[i]) return positivecolors[i];
  }
}

function getNegativeColor(body) {
  for(var i = 0; i < neutralcolors.length; i++) {
    if(body.render.fillStyle == neutralcolors[i]) return negativecolors[i];
  }
}

function getNegativeColorFromPositive(body) {
  for(var i = 0; i < negativecolors.length; i++) {
    if(body.render.fillStyle == positivecolors[i]) return negativecolors[i];
  }
}

/* Handles removal of forcecubes
   Forcecubes must be removed at the end of a collision event because if they're removed at the start of a collision,
   they don't get a chance to apply any force! */
Events.on(engine, "collisionEnd", function(event) {
  var pairs = event.pairs;
  for(var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    // console.log(pair.bodyA.render.fillStyle + " & " + pair.bodyB.render.fillStyle);
    if(pair.bodyA.render.fillStyle != cubecolor && pair.bodyB.render.fillStyle == cubecolor) { World.remove(engine.world, pair.bodyB); }
    else if(pair.bodyA.render.fillStyle == cubecolor && pair.bodyB.render.fillStyle != cubecolor) { World.remove(engine.world, pair.bodyA); }
  }
});

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateScore() {
  document.getElementById("score").innerHTML = "Score: " + score;

  var nextLevel = 1000000 * Math.pow((level - 1)/98, 2.5);
  if(score >= nextLevel) {
    updateLevel();
    bgm_level.play();
    level++;
  }
}

function updateLevel() {
  document.getElementById("level").innerHTML = "Level: " + level;

  if(level >= 100) gameClear(score);
}

function increaseHealth() {
  if(health + 5 <= 100) health += 5;
  updateHealth();
}

function decreaseHealth() {
  health -= 10;
  updateHealth();

  if(health <= 0) gameOver(score);
}

function gameOver(score) {
  World.clear(engine.world, true);
  engine.enabled = false;
  alert('Thanks for playing! Your score: ' + score + "\nRefresh to play again. :)");
}

function gameClear(score) {

  World.clear(engine.world, true);
  engine.enabled = false;
  alert("You've beaten the game! Nice job.");
}

function updateHealth() {
  document.getElementById("health").innerHTML = '<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="' + health + '" aria-valuemin="0" aria-valuemax="100" style="width:'+ health + '%">' + health + '</div>'
}

function generateShapes(xloc, yloc, poly, size) {
  var colorIndex = Math.floor(level/10);
  var randomcolor = rand(0,colorIndex);
  var newbox = Bodies.polygon(xloc, yloc, poly, size, {
    render: { fillStyle: neutralcolors[randomcolor] },
    frictionAir: 0.5,
    angle: rand(0,360),
    restitution: 0.4,
    density: 0.00005
  });
  newbox.render.fillStyle = neutralcolors[randomcolor];
  World.add(engine.world, [newbox]);
}
