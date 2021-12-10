var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var Running = true;

var x = 60;
var y = 200;
var width = 10;
var height = 10;

var groundX = 50;
var groundY = 40;
var groundWidth = 100;
var groundHeight = 100;

var groundX

var collisionTop = false;
var collisionBottom = false;
var collisionLeft = false;
var collisionRight = false;


var upArrow = false;
var rightArrow = false;
var leftArrow = false;

var jumping = false;
var grounded = false;
var lengthOfJump = 100;


var velocityX = 0;
var velocityY = 0;


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 39) {
        rightArrow = true;
    }
    if(event.keyCode == 37) {
        leftArrow = true;
    }
    if(event.keyCode == 38) {
        upArrow = true;
      }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 39) {
      rightArrow = false;
    }
    if (event.keyCode == 37) {
      leftArrow = false;
    }

    if(event.keyCode == 38) {
      upArrow = false;
    }
});
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

function DrawObject(x,y,sizeX,sizeY) {
  ctx.fillRect(x,canvas.height-sizeY-y,sizeX,sizeY)
}
function Gravity() {
  if (!collisionTop) {
    velocityY -= 0.01;
    grounded = false;
  } 
}

function HandleInput() {
  if (rightArrow && !collisionLeft) {
    velocityX = 1;
  }
  
  if (leftArrow && !collisionRight) {
    velocityX =-1;
  } 
  
  if (!leftArrow && !rightArrow) {
    velocityX = 0;
  }


  
  if (upArrow) {
    jumping = true;
  } else {
    jumping = false;
  }
}

function HandleJumping() {
  if (jumping && grounded) {

    velocityY += 1;
    lengthOfJump -= 1;
  }


  if (lengthOfJump == 0) {
    jumping = false;
    lengthOfJump = 100;
  }
}

function HandleCollision() {

  //if touching top
  if (y<=groundY+groundHeight && y>groundY+5 && x+width>groundX && x<groundX+groundWidth) {
    collisionTop = true;
  } else {
    collisionTop = false;
  }

  //if touching bottom
  if (y+height>=groundY && y+height<groundY+groundHeight-5 && x+width>groundX && x<groundX+groundWidth) {
    collisionBottom = true;
  } else {
    collisionBottom = false;
  }

  //if touching right
  if (x<=groundX+groundWidth && x>groundX+5 && y+height > groundY+5 && y<groundY+groundHeight-5) {
    collisionRight = true;
  } else {
    collisionRight = false;
  }
  //if touching left
  if(x+width>=groundX && x+width<groundX+groundWidth-5 && y+height>groundY+5 && y<groundY+groundHeight-5) {
    collisionLeft = true;
  } else {
    collisionLeft = false;
  }


}

function HandleBasicCollision() {
  if(collisionTop) {
    velocityY = 0;
    grounded = true;
  }

  if(collisionBottom) {
    //velocityY = 0;
  }

  if (collisionLeft) {
    velocityX = 0;
    
  }

  if (collisionRight) {
    velocityX = 0
  }
  
  
}
function Main() {

  clear()
  //Draw Player
  DrawObject(x,y,width,height)

  //Draw ground
  DrawObject(groundX,groundY,groundWidth,groundHeight)
  
  
  HandleCollision();
  HandleBasicCollision();
  
  Gravity();

  HandleInput();
  
  HandleJumping();

  
  

  
  y+= velocityY
  x += velocityX
};
setInterval(Main, 1);



