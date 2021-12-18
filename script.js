var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var x = 590;
var y = 220;
var width = 10;
var height = 10;


var collisions = 0;

var groundXValues = [ 100,80,60,40,20,0,460,440,420,400,380,220,200,180,160,140,340,320,300,280,220,200,480,460,440,420,400,340,320,300,280,280,260,240,220,180,160,140,120,100,340,320,300,280,260,240,620,600,580,560,480,460,440,420,400,700,680,660,780,760,740,680,660,640,620,580,560,540,520,480,460,420,400,360,340,300,280,440,420,400,380,360,340,580,560,540,520,500]
var groundYValues = [ 20,20,20,20,20,20,40,40,40,40,40,40,40,40,40,40,60,60,60,60,60,60,80,80,80,80,80,100,100,100,100,120,140,140,140,160,160,160,160,160,180,180,180,180,180,180,200,200,200,200,200,200,200,200,200,220,220,220,240,240,240,260,260,260,260,280,280,280,280,300,300,320,320,340,340,340,340,380,380,380,380,380,380,400,400,400,400,400 ]
var groundWidthValues = [ 20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20 ]
var groundHeightValues = [ 20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20 ]






var collisionTop = false;
var collisionBottom = false;
var collisionLeft = false;
var collisionRight = false;


var upArrow = false;
var rightArrow = false;
var leftArrow = false;

var jumping = false;
var grounded = false;

var gravity = 0.5;
var speed = 4;
var jumpSpeed = 5.7;

var velocityX = 0;
var velocityY = 0;

var collisionTopObject;
var collisionBottomObject;
var collisionLeftObject;
var collisionRightObject;

var jumpTimerDefault = 4;
var jumpTimer = jumpTimerDefault;

 
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
  HandleMultipleCollision();
  HandleBasicCollision();
  if (!collisionTop) {
    velocityY -= gravity * (deltaTime/perfectFrameTime);
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


  
  if (grounded) {
    jumpTimer = jumpTimerDefault;

  } else if (jumpTimer > 0) {
    jumpTimer -= 1 * (deltaTime/perfectFrameTime);
  }

  if (upArrow) {
    jumping = true;
  } else {
    jumping = false;
  }
}

function HandleJumping() {
  if (jumpTimer > 0 && jumping) {

    velocityY = jumpSpeed;
    jumping = false;
    jumpTimer = 0;
  }

}

function HandleMultipleCollision() {
  collisions += 1;
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
    if (y+height>=groundYValues[i] && y+height<groundYValues[i]+groundHeightValues[i]-5&& x+width>groundXValues[i]+5 && x<groundXValues[i]+groundWidthValues[i]-5) {
      
      collisionBottom = true;
      collisionBottomObject = i;
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
      
    }
    y = Math.ceil(groundYValues[collisionTopObject] + groundHeightValues[collisionTopObject]);
    
    grounded = true;
  }

  if(collisionBottom) {
    jumping = false;
    if (velocityY>0) {
      velocityY = 0;

    }

    y = Math.ceil(groundYValues[collisionBottomObject] - height)

    
  }

  if (collisionLeft) {
    velocityX = 0;

    x = Math.ceil(groundXValues[collisionLeftObject]-width)
    
    
    
    
  }

  if (collisionRight) {
    velocityX = 0;
    x = Math.ceil(groundXValues[collisionRightObject] + groundWidthValues[collisionRightObject])

    

    
   
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
    for(let i=0; i<velocityY; i++) {
      HandleMultipleCollision();
      HandleBasicCollision();
      y += (deltaTime/perfectFrameTime);
      
    }
  }

  if (velocityY<0) {
    for(let i=0; i<(velocityY*-1); i++) {
      HandleMultipleCollision();
      HandleBasicCollision();
      y -= (deltaTime/perfectFrameTime);

    }
  }



  if (velocityX>0) {
    for(let i=0; i<velocityX; i++) {
      HandleMultipleCollision();
      HandleBasicCollision();
      x += (deltaTime/perfectFrameTime);

    }
  }

  if (velocityX<0) {
    for(let i=0; i<(velocityX*-1); i++) {
      HandleMultipleCollision();
      HandleBasicCollision();
      x -= (deltaTime/perfectFrameTime);

    }
  }
}
function Main(timestamp) {
  collisions = 0;
  deltaTime = timestamp-lastTimestamp;
  lastTimestamp = timestamp;

  clear()
  respawnDetection();
  

  

  Gravity();
  
  
  

  HandleInput();
  
  HandleJumping();

  
    
    
  move();


  drawPlatforms();
  
  ctx.fillStyle = "#FF0000";
  DrawObject(x,y,width,height)
  ctx.fillStyle = "#000000";

  document.getElementById("Position").innerHTML = "x: "+ x + " y: " + y;
  
  document.getElementById("Velocity").innerHTML = "Velocity X: "+ velocityX + " Velocity Y: " + velocityY;
  document.getElementById("FPS").innerHTML = "FPS: " + 1000/deltaTime;
  document.getElementById("CollisionFunctionsPerFrame").innerHTML = "Collision Functions Per Frame: " + collisions;
  document.getElementById("CoyoteTime").innerHTML = "CoyoteTime: " + jumpTimer;
  document.getElementById("CollisionTop").innerHTML = "Collision Top: " + collisionTop;
  document.getElementById("CollisionBottom").innerHTML = "Collision Bottom: " + collisionBottom;
  document.getElementById("CollisionLeft").innerHTML = "Collision Left: " + collisionLeft;
  document.getElementById("CollisionRight").innerHTML = "Collision Right: " + collisionRight;


  requestAnimationFrame(Main);
};

start()