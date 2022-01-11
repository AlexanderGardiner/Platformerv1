var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var spawnX = 50;
var spawnY=50;

var x = spawnX;
var y = spawnY;
var width = 15;
var height = 15;


var collisionsFunctions = 0;
var maxCollisionFunctionsPerFrame = 0;







var objectXValues = [420,322,302,260,60,40,20,940,920,880,660,600,520,160,902,780,622,360,220,120,900,622,940,620,920,362,760,580,60,840,700,602,280,180,660,600,500,400,40,360,120,460,20,900,720,280,202,182,162,142,120,60,322,302,220,940,840,780,620,440,340,60,700,540,960,400,920,880,680,300,200,800,560,440,242,140,720,640,360,260,242,100,80,60,40,20,500,80,20];

var objectYValues = [20,22,22,20,20,20,20,40,40,40,40,40,40,40,62,60,62,60,60,60,80,82,100,100,120,122,140,140,140,160,160,162,160,160,180,180,180,180,180,200,200,220,220,240,260,260,262,262,262,262,260,260,282,282,280,300,300,300,300,300,300,300,320,320,340,340,360,400,400,400,400,420,420,420,422,420,440,440,440,440,442,440,440,440,440,440,460,460,460];

var objectWidthValues = [20,16,16,20,20,20,20,20,20,20,20,20,20,20,16,20,16,20,20,20,20,16,20,20,20,16,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16,16,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,20,20,16,20,20,20,20,20,20,20,20];

var objectHeightValues = [20,16,16,20,20,20,20,20,20,20,20,20,20,20,16,20,16,20,20,20,20,16,20,20,20,16,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16,16,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,20,20,16,20,20,20,20,20,20,20,20];

var objectTypeValues = [1,2,2,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,2,3,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2,2,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1];








var collisionTop = false;
var collisionBottom = false;
var collisionLeft = false;
var collisionRight = false;


var upArrow = false;
var rightArrow = false;
var leftArrow = false;

var jumping = false;
var grounded = false;

var gravity = 0.4;
var speed = 3;
var defaultJumpSpeed = 4;
var jumpSpeed = defaultJumpSpeed;



var velocityX = 0;
var velocityY = 0;

var collisionTopObject;
var collisionBottomObject;
var collisionLeftObject;
var collisionRightObject;

var jumpTimerDefault = 1;
var jumpTimer = jumpTimerDefault;
var jumpLengthDefault =10;
var jumpLength = jumpLengthDefault;


 
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 39 || event.keyCode == 68) {
        rightArrow = true;
    }
    if(event.keyCode == 37 || event.keyCode == 65) {
        leftArrow = true;
    }
    if(event.keyCode == 38 || event.keyCode == 87) {
        upArrow = true;
      }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 39 || event.keyCode == 68) {
      rightArrow = false;
    }
    if (event.keyCode == 37 || event.keyCode == 65) {
      leftArrow = false;
    }

    if(event.keyCode == 38 || event.keyCode == 87) {
      upArrow = false;
    }
});
function clearStage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

function DrawObject(x,y,sizeX,sizeY) {
  ctx.fillRect(x,canvas.height-sizeY-y,sizeX,sizeY)
}
function Gravity() {

  if (!(objectTypeValues[collisionTopObject] ==1 && collisionTop)) {
    velocityY -= gravity * (deltaTime/perfectFrameTime);
    grounded = false;
  } 
}

function HandleInput() {
  
  if (rightArrow && !(objectTypeValues[collisionLeftObject]==1 && collisionLeft) && velocityX < speed) {
    velocityX += (0.6 *(deltaTime/perfectFrameTime));
    
  }
      
  if (leftArrow && !(objectTypeValues[collisionRightObject]==1 && collisionRight) && velocityX > -speed) {
    velocityX -= (0.6 *(deltaTime/perfectFrameTime));
  } 
  
  if (!leftArrow && !rightArrow) {
    if (velocityX>0) {
      velocityX-=(0.6 *(deltaTime/perfectFrameTime));
    }
    if (velocityX<0) {
      velocityX += (0.6 *(deltaTime/perfectFrameTime));
    }

    if ((velocityX < 1 && velocityX > 0) || (velocityX > -1 && velocityX < 0)) {
      velocityX = 0;
    }
  }


  
  if (grounded) {
    jumpTimer = jumpTimerDefault;
    jumpSpeed = defaultJumpSpeed;
    jumping = false;
    jumpLength = jumpLengthDefault

  } else if (jumpTimer > 0) {
    jumpTimer -= 0.4 * (deltaTime/perfectFrameTime);
  } 
  if (jumping) {
    jumpTimer = 0;
  }

  if (jumpTimer>0 && upArrow) {
    jumping = true;
  } 
}

function HandleJumping() {
  if (jumping && jumpLength>0) {
    if (upArrow) {
      velocityY = jumpSpeed;
      jumpSpeed -= 0.00001 * (deltaTime/perfectFrameTime);
    } else {
      jumping = false;
    }
    
    jumpLength-=1*(deltaTime/perfectFrameTime);
  } 

}

function HandleMultipleCollision() {
  
  let topCollisions = 0;
  let bottomCollisions = 0;
  let rightCollisions = 0;
  let leftCollisions = 0;
  for (let i = 0; i < objectXValues.length; i++) {
    collisionsFunctions += 1;
    //if touching top
    if (y<=objectYValues[i]+objectHeightValues[i] && y>objectYValues[i]+2 && x+width>objectXValues[i]+2 && x<objectXValues[i]+objectWidthValues[i]-2 && objectTypeValues[i] !=0) {
      
      collisionTop = true;
      collisionTopObject = i;
      topCollisions +=1;
    } 
  
    //if touching bottom
    if (y+height>=objectYValues[i] && y+height<objectYValues[i]+objectHeightValues[i]-5&& x+width>objectXValues[i]+5 && x<objectXValues[i]+objectWidthValues[i]-5&& objectTypeValues[i] !=0) {
      
      collisionBottom = true;
      collisionBottomObject = i;
      bottomCollisions +=1;
    } 
  
    //if touching right
    if (x<=objectXValues[i]+objectWidthValues[i] && x>objectXValues[i]+2 && y+height > objectYValues[i]+2 && y<objectYValues[i]+objectHeightValues[i]-2&& objectTypeValues[i] !=0) {
      
      collisionRight = true;
      collisionRightObject = i;
      rightCollisions +=1;
    } 
    //if touching left
    if(x+width>=objectXValues[i] && x<objectXValues[i]+objectWidthValues[i]-2 && y+height>objectYValues[i]+2 && y<objectYValues[i]+objectHeightValues[i]-2&& objectTypeValues[i] !=0) {
      
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
    if (objectTypeValues[collisionTopObject]==1) {
      y = Math.ceil(objectYValues[collisionTopObject] + objectHeightValues[collisionTopObject]);
      if (velocityY<0) {
        velocityY = 0;
        y = Math.ceil(objectYValues[collisionTopObject] + objectHeightValues[collisionTopObject]);
      }
      
      grounded = true;
    } 
    if (objectTypeValues[collisionTopObject]==2) {
      velocityY = 0;
      x = spawnX;
      y = spawnY;
    }  
    if (objectTypeValues[collisionTopObject]==3) {
      
      spawnX = objectXValues[collisionTopObject];
      spawnY = objectYValues[collisionTopObject];
    
    }
    
  }

  if(collisionBottom) {
    if (objectTypeValues[collisionBottomObject]==1) {
      jumping = false;
      y = Math.ceil(objectYValues[collisionBottomObject] - height);
      if (velocityY>0) {
        
        velocityY = 0;
        
      }
      

    } 
    if (objectTypeValues[collisionBottomObject]==2) {
      velocityY = 0;
      x = spawnX;
      y = spawnY;
    }  
    if (objectTypeValues[collisionTopObject]==3) {
      
      spawnX = objectXValues[collisionTopObject];
      spawnY = objectYValues[collisionTopObject];
    
    }
    
  }

  if (collisionLeft) {
    if (objectTypeValues[collisionLeftObject]==1) {
      x=Math.ceil(objectXValues[collisionLeftObject]-width);
      if (velocityX>0) {
        velocityX = 0;

    
        
      }
      
    }  
    if (objectTypeValues[collisionLeftObject]==2) {
      velocityY = 0;
      x = spawnX;
      y = spawnY;
    }  
    if (objectTypeValues[collisionTopObject]==3) {
      
      spawnX = objectXValues[collisionTopObject];
      spawnY = objectYValues[collisionTopObject];
    
    }
    
  }

  if (collisionRight) {
    if (objectTypeValues[collisionRightObject]==1) {
      x=Math.ceil(objectXValues[collisionRightObject]+objectWidthValues[collisionRightObject]);
      if (velocityX<0) {
        velocityX = 0;
        
      }
      
    
    }  
    if (objectTypeValues[collisionRightObject]==2) {
      velocityY = 0;
      x = spawnX;
      y = spawnY;
    }  
    if (objectTypeValues[collisionTopObject]==3) {
      
      spawnX = objectXValues[collisionTopObject];
      spawnY = objectYValues[collisionTopObject];
    
    }
    
   
  } 


}

function drawObjects() {
  for (let i = 0; i < objectXValues.length; i++) {
    if (objectTypeValues[i] == 1) {
      DrawObject(objectXValues[i],objectYValues[i],objectWidthValues[i],objectHeightValues[i]);
    } else if (objectTypeValues[i]==2) {
      ctx.fillStyle = "#FF0000";
      DrawObject(objectXValues[i],objectYValues[i],objectWidthValues[i],objectHeightValues[i]);
      ctx.fillStyle = "#000000";
    } else if (objectTypeValues[i]==3) {
      ctx.fillStyle = "#0000FF";
      DrawObject(objectXValues[i],objectYValues[i],objectWidthValues[i],objectHeightValues[i]);
      ctx.fillStyle = "#000000";
    }
    
  }

  
}

function respawnDetection() {
  if (y < 3){
    velocityY = 0;
    x = spawnX;
      y = spawnY;
    
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
  } else if (velocityY<0) {
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
  } else if (velocityX<0) {
    for(let i=0; i<(velocityX*-1); i++) {
      HandleMultipleCollision();
      HandleBasicCollision();
      x -= (deltaTime/perfectFrameTime);
  

    }
  }
}
function Main(timestamp) {
  
  collisionsFunctions = 0;
  deltaTime = timestamp-lastTimestamp;
  lastTimestamp = timestamp;

  clearStage();
  
  

  
  HandleInput();
  
  HandleJumping();
  Gravity();
  
  
  

  

  
    
  
  move();
  respawnDetection();

  drawObjects();
  
  ctx.fillStyle = "#0000FF";
  DrawObject(x,y,width,height)
  ctx.fillStyle = "#000000";

  document.getElementById("Position").innerHTML = "x: "+ x + " y: " + y;

  document.getElementById("Velocity").innerHTML = "Velocity X: "+ velocityX + " Velocity Y: " + velocityY;
document.getElementById("FPS").innerHTML = "FPS: " + 1000/deltaTime;
  document.getElementById("CollisionFunctionsPerFrame").innerHTML = "Collision Functions Per Frame: " + collisionsFunctions;
  document.getElementById("NaxCollisionFunctionsPerFrame").innerHTML = "Maximum Collision Functions Per Frame: " + maxCollisionFunctionsPerFrame;
  document.getElementById("CoyoteTime").innerHTML = "CoyoteTime: " + jumpTimer;
  document.getElementById("CollisionTop").innerHTML = "Collision Top: " + collisionTop;
 document.getElementById("CollisionBottom").innerHTML = "Collision Bottom: " + collisionBottom;
  document.getElementById("CollisionLeft").innerHTML = "Collision Left: " + collisionLeft;
  document.getElementById("CollisionRight").innerHTML = "Collision Right: " + collisionRight;
  
  if (collisionsFunctions>maxCollisionFunctionsPerFrame) {
    maxCollisionFunctionsPerFrame = collisionsFunctions;
  }

  requestAnimationFrame(Main);
};

start();