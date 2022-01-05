var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var spawnX = 30;
var spawnY=40;

var x = spawnX;
var y = spawnY;
var width = 15;
var height = 15;


var collisionsFunctions = 0;
var maxCollisionFunctionsPerFrame = 0;





var objectXValues = [440,420,402,382,362,342,322,160,40,20,0,700,460,440,340,260,100,860,842,820,802,780,480,460,200,900,480,300,480,400,380,360,940,580,480,382,660,560,480,380,900,480,300,280,940,480,462,442,220,860,800,780,760,740,442,700,680,660,442,180,120,102,80,420,400,380,360,60,620,600,580,560,42,542,220,40,640,542,280,22,140,20,800,780,760,740,720,660,100,80,840,880,940,920,760,600,580,560,540,380,240,700,460,100,80,60,40,20,900,880,860,840,820,200];
var objectYValues = [20,20,22,22,22,22,22,20,20,20,20,40,40,40,40,40,40,60,62,60,62,60,60,60,60,80,80,80,100,100,100,100,120,120,120,122,140,140,140,140,160,160,160,160,180,180,182,182,180,200,200,200,200,200,202,220,220,220,222,220,220,222,220,240,240,240,240,240,260,260,260,260,262,282,280,280,300,302,300,302,320,320,340,340,340,340,340,340,340,340,360,380,400,400,400,400,400,400,400,400,400,420,420,420,420,420,420,420,440,440,440,440,440,440];
var objectWidthValues = [20,20,16,16,16,16,16,20,20,20,20,20,20,20,20,20,20,20,16,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,20,20,20,16,20,20,20,16,20,20,16,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,16,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
var objectHeightValues = [20,20,16,16,16,16,16,20,20,20,20,20,20,20,20,20,20,20,16,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,20,20,20,16,20,20,20,16,20,20,16,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,16,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
var objectTypeValues = [1,1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];



var objectXValues = [220,80,60,40,20,900,882,862,840,760,620,400,262,140,742,680,560,320,262,940,700,660,480,260,240,282,260,920,682,40,860,420,340,20,760,720,660,580,480,360,200,160,80,0,820,800,780,420,920,762,720,440,40,762,540,220,60,940,760,340,122,100,80,620,920,780,180,940,640,860,720,300,80,60,40,20,920,660,440,160,80,20,800,540,520,260,80,20,760,240];

var objectYValues = [20,20,20,20,20,40,42,42,40,40,40,40,42,40,62,60,60,60,62,80,80,80,80,80,80,102,100,140,142,140,160,160,160,160,180,180,180,180,180,180,180,220,220,220,240,240,240,240,260,262,260,260,260,282,280,280,280,300,300,300,302,300,300,320,340,340,340,380,380,400,400,400,400,400,400,400,420,420,420,420,420,420,440,440,440,440,440,440,460,460];

var objectWidthValues = [20,20,20,20,20,20,16,16,20,20,20,20,16,20,16,20,20,20,16,20,20,20,20,20,20,16,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,16,20,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];

var objectHeightValues = [20,20,20,20,20,20,16,16,20,20,20,20,16,20,16,20,20,20,16,20,20,20,20,20,20,16,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,16,20,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];

var objectTypeValues = [1,1,1,1,1,1,2,2,1,1,1,1,2,1,2,1,1,1,2,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];





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

  if (!collisionTop) {
    velocityY -= gravity * (deltaTime/perfectFrameTime);
    grounded = false;
  } 
}

function HandleInput() {
  
  if (rightArrow && !collisionLeft && velocityX < speed) {
    velocityX += (0.6 *(deltaTime/perfectFrameTime));
    
  }
      
  if (leftArrow && !collisionRight && velocityX > -speed) {
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
    } else if (objectTypeValues[collisionTopObject]==2) {
      velocityY = 0;
      x = spawnX;
      y = spawnY;
    } else if (objectTypeValues[collisionTopObject]==3) {
      
      spawnX = x;
      spawnY = y;
    
    }
    
  }

  if(collisionBottom) {
    if (objectTypeValues[collisionBottomObject]==1) {
      jumping = false;
      y = Math.ceil(objectYValues[collisionBottomObject] - height);
      if (velocityY>0) {
        
        velocityY = 0;
        
      }
      

    } else if (objectTypeValues[collisionBottomObject]==2) {
      velocityY = 0;
      x = spawnX;
      y = spawnY;
    } else if (objectTypeValues[collisionTopObject]==3) {
      
      spawnX = x;
      spawnY = y;
    
    }
    
  }

  if (collisionLeft) {
    if (objectTypeValues[collisionLeftObject]==1) {
      x=Math.ceil(objectXValues[collisionLeftObject]-width);
      if (velocityX>0) {
        velocityX = 0;

    
        
      }
      
    } else if (objectTypeValues[collisionLeftObject]==2) {
      velocityY = 0;
      x = spawnX;
      y = spawnY;
    } else if (objectTypeValues[collisionTopObject]==3) {
      
      spawnX = x;
      spawnY = y;
    
    }
    
  }

  if (collisionRight) {
    if (objectTypeValues[collisionRightObject]==1) {
      x=Math.ceil(objectXValues[collisionRightObject]+objectWidthValues[collisionRightObject]);
      if (velocityX<0) {
        velocityX = 0;
        
      }
      
    
    } else if (objectTypeValues[collisionRightObject]==2) {
      velocityY = 0;
      x = spawnX;
      y = spawnY;
    } else if (objectTypeValues[collisionTopObject]==3) {
      
      spawnX = x;
      spawnY = y;
    
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
      
      y += (deltaTime/perfectFrameTime);
      HandleMultipleCollision();
      HandleBasicCollision();
      
    }
  } else if (velocityY<0) {
    for(let i=0; i<(velocityY*-1); i++) {
      

      y -= (deltaTime/perfectFrameTime);
      HandleMultipleCollision();
      HandleBasicCollision();

    }
  }



  if (velocityX>0) {
    for(let i=0; i<velocityX; i++) {
      x += (deltaTime/perfectFrameTime);
      HandleMultipleCollision();
      HandleBasicCollision();

    }
  } else if (velocityX<0) {
    for(let i=0; i<(velocityX*-1); i++) {

      x -= (deltaTime/perfectFrameTime);
      HandleMultipleCollision();
      HandleBasicCollision();

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

  //document.getElementById("Position").innerHTML = "x: "+ x + " y: " + y;
  
  //document.getElementById("Velocity").innerHTML = "Velocity X: "+ velocityX + " Velocity Y: " + velocityY;
  //document.getElementById("FPS").innerHTML = "FPS: " + 1000/deltaTime;
  //document.getElementById("CollisionFunctionsPerFrame").innerHTML = "Collision Functions Per Frame: " + collisionsFunctions;
  //document.getElementById("NaxCollisionFunctionsPerFrame").innerHTML = "Maximum Collision Functions Per Frame: " + maxCollisionFunctionsPerFrame;
  //document.getElementById("CoyoteTime").innerHTML = "CoyoteTime: " + jumpTimer;
  //document.getElementById("CollisionTop").innerHTML = "Collision Top: " + collisionTop;
  //document.getElementById("CollisionBottom").innerHTML = "Collision Bottom: " + collisionBottom;
  //document.getElementById("CollisionLeft").innerHTML = "Collision Left: " + collisionLeft;
  //document.getElementById("CollisionRight").innerHTML = "Collision Right: " + collisionRight;
  
  if (collisionsFunctions>maxCollisionFunctionsPerFrame) {
    maxCollisionFunctionsPerFrame = collisionsFunctions;
  }

  requestAnimationFrame(Main);
};

start();