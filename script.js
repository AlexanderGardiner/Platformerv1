var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var Running = true;

var x = 70;
var y = 50;
var width = 10;
var height = 10;


var groundXValues = [50, 160,270,380,50];
var groundYValues = [40, 50,50,100,100];
var groundWidthValues = [100, 100,100,100,100];
var groundHeightValues=[10, 10,20,10,10];


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
var gravity = 0.1;

var velocityX = 0;
var velocityY = 0;

var collisionObject;



 
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
    velocityY -= gravity;
    grounded = false;
  } 
}

function HandleInput() {
  if (rightArrow && !collisionLeft) {
    velocityX = 2;
  }
      
  if (leftArrow && !collisionRight) {
    velocityX =-2;
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

    velocityY += 3;
    lengthOfJump -= 1;
  }


  if (lengthOfJump == 0) {
    jumping = false;
    lengthOfJump = 100;
  }
}

function HandleMultipleCollision() {
  let topCollisions = 0;
  let bottomCollisions = 0;
  let rightCollisions = 0;
  let leftCollisions = 0;
  for (let i = 0; i < groundXValues.length; i++) {
    //if touching top
    if (y<=groundYValues[i]+groundHeightValues[i] && y>groundYValues[i]+2 && x+width>groundXValues[i]+5 && x<groundXValues[i]+groundWidthValues[i]-5) {
      collisionTop = true;
      collisionObject = i;
      topCollisions +=1;
    } 
  
    //if touching bottom
    if (y+height>=groundYValues[i] && y+height<groundYValues[i]+groundHeightValues[i]-2&& x+width>groundXValues[i] && x<groundXValues[i]+groundWidthValues[i]) {
      collisionBottom = true;
      bottomCollisions +=1;
    } 
  
    //if touching right
    if (x<=groundXValues[i]+groundWidthValues[i] && x>groundXValues[i]+2 && y+height > groundYValues[i]+2 && y<groundYValues[i]+groundHeightValues[i]-2) {
      collisionRight = true;
      rightCollisions +=1;
    } 
    //if touching left
    if(x+width>=groundXValues[i] && x+width<groundXValues[i]+groundWidthValues[i]-2 && y+height>groundYValues[i]+2 && y<groundYValues[i]+groundHeightValues[i]-2) {
      collisionLeft = true;
      leftCollisions +=1;
    } 

  }

  if (topCollisions==0) {
    collisionTop = false;
  }

  if (bottomCollisions==0) {
    collisionBottom = false;
  } 

  if (leftCollisions==0) {
    collisionLeft = false;
  } 

  if (rightCollisions==0) {
    collisionRight = false;
  } 
  
}



function HandleBasicCollision() {
  if(collisionTop) {
    if (velocityY<0) {
      velocityY = 0;
      y = groundYValues[collisionObject] + groundHeightValues[collisionObject];
    }
    
    grounded = true;
  }

  if(collisionBottom) {
    jumping = false;
    if (velocityY>0) {
      velocityY = 0;
      y-=1;

    }

    
  }

  if (collisionLeft && velocityX>0) {
    velocityX = 0;
    

    
    
  }

  if (collisionRight && velocityX<0) {
    velocityX = 0;
    

    
   
  } 


}

function drawPlatforms() {
  for (let i = 0; i < groundXValues.length; i++) {
    DrawObject(groundXValues[i],groundYValues[i],groundWidthValues[i],groundHeightValues[i])
  }

  
}

function respawnDetection() {
  if (y <= 3){
    x = 50;
    y = 100;
    velocityY = 0;
  }
}
function Main() {
  
  clear()
  //Draw Player
  respawnDetection();
  DrawObject(x,y,width,height)

  //Draw ground
  drawPlatforms();
  //DrawObject(groundX,groundY,groundWidth,groundHeight)
  
  HandleMultipleCollision();
  HandleBasicCollision();
  //HandleCollision();
  Gravity();
  
  
  

  HandleInput();
  
  HandleJumping();



  y += velocityY;
  
  x += velocityX;

  
  window.requestAnimationFrame(Main);
};

window.requestAnimationFrame(Main);