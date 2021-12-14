var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var x = 200;
var y = 200;
var width = 10;
var height = 10;


var groundXValues = [50, 170,270,380,50];
var groundYValues = [40, 40,30,30,90];
var groundWidthValues = [100, 100,100,100,100];
var groundHeightValues=[10, 20,20,80,20];

var groundXValues = [ 600, 550, 500, 450, 150, 100, 50, 650, 350, 300, 250, 850, 800, 350 ];
var groundYValues = [ 50, 50, 50, 50, 50, 50, 50, 100, 100, 100, 100, 150, 150, 150 ];
var groundWidthValues = [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ];
var groundHeightValues= [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ];





var collisionTop = false;
var collisionBottom = false;
var collisionLeft = false;
var collisionRight = false;


var upArrow = false;
var rightArrow = false;
var leftArrow = false;

var jumping = false;
var grounded = false;

var gravity = 0.35;
var speed = 3.1;
var jumpSpeed = 5;

var velocityX = 0;
var velocityY = 0;

var collisionTopObject;
var collisionBottomObject;
var collisionLeftObject;
var collisionRightObject;



 
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
    velocityX = speed;
  }
      
  if (leftArrow && !collisionRight) {
    velocityX = -speed;
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

    velocityY = jumpSpeed;
    jumping = false;
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
      collisionTopObject = i;
      topCollisions +=1;
    } 
  
    //if touching bottom
    if (y+height>=groundYValues[i] && y+height<groundYValues[i]+groundHeightValues[i]-2&& x+width>groundXValues[i]+5 && x<groundXValues[i]+groundWidthValues[i]+5) {
      collisionBottom = true;
      collisionBottomObject
      bottomCollisions +=1;
    } 
  
    //if touching right
    if (x<=groundXValues[i]+groundWidthValues[i] && x>groundXValues[i]+2 && y+height > groundYValues[i]+2 && y<groundYValues[i]+groundHeightValues[i]-2) {
      collisionRight = true;
      collisionRightObject = i;
      rightCollisions +=1;
    } 
    //if touching left
    if(x+width>=groundXValues[i] && x+width<groundXValues[i]+groundWidthValues[i]-2 && y+height>groundYValues[i]+2 && y<groundYValues[i]+groundHeightValues[i]-2) {
      collisionLeft = true;
      collisionLeftObject = i;
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
      y = groundYValues[collisionTopObject] + groundHeightValues[collisionTopObject];
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
    if (!grounded){
      x-=1;
    }

    

    
    
  }

  if (collisionRight && velocityX<0) {
    velocityX = 0;
    if (!grounded){
      x+=1
    }

    

    
   
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
    y = 110;
    velocityY = 0;
  }
}
var deltaTime = 0;
let lastTimestamp = 0;
const perfectFrameTime = 1000/60;
function start() {
  requestAnimationFrame(Main);
}


function move() {
  if (velocityY>0) {
    for(let i=0; i<velocityY/3; i++) {
      y += (3 * (deltaTime/perfectFrameTime));
      HandleMultipleCollision();
      HandleBasicCollision();
    }
  }

  if (velocityY<0) {
    for(let i=0; i<(velocityY*-1)/3; i++) {
      y -= (3 * (deltaTime/perfectFrameTime));
      HandleMultipleCollision();
      HandleBasicCollision();
    }
  }



  if (velocityX>0) {
    for(let i=0; i<velocityX/3; i++) {
      x += (3 * (deltaTime/perfectFrameTime));
      HandleMultipleCollision();
      HandleBasicCollision();
    }
  }

  if (velocityX<0) {
    for(let i=0; i<(velocityX*-1)/3; i++) {
      x -= (3 * (deltaTime/perfectFrameTime));
      HandleMultipleCollision();
      HandleBasicCollision();
    }
  }
}
function Main(timestamp) {
  requestAnimationFrame(Main);
  deltaTime = timestamp-lastTimestamp;
  lastTimestamp = timestamp;
  //console.log(deltaTime);
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

  
    
    
  move();





  
};

start()