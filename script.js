var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var collisionsFunctions = 0;
var maxCollisionFunctionsPerFrame = 0;

var SpeedRunTimer = 0;
var victory = false;
var started = false;

var spawnX = 40;
var spawnY=40; 

var x = spawnX;
var y = spawnY;
var width = 15;
var height = 15;


var topHit = false;
var bottomHit = false;
var leftHit = false;
var rightHit = false;





var currentLevelNumber = 0;

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

var jumpTimerDefault = 3;
var jumpTimer = jumpTimerDefault;
var jumpLengthDefault =10;
var jumpLength = jumpLengthDefault;



var objectXValues = [[420,322,302,260,60,40,20,940,920,880,660,600,520,160,902,780,622,360,220,120,900,622,940,620,920,362,760,580,60,840,700,602,280,180,660,600,500,400,40,360,120,460,20,900,720,280,202,182,162,142,120,60,322,302,220,940,840,780,620,440,340,60,700,540,960,400,920,880,680,300,200,800,560,440,242,140,720,640,360,260,242,100,80,60,40,20,500,80,20], 

[260,60,40,20,680,480,380,160,820,760,580,320,220,120,880,780,960,880,862,842,600,220,60,960,740,500,380,340,820,680,160,40,20,20,900,720,702,682,660,460,320,120,20,760,220,940,560,400,920,20,840,680,540,360,220,920,740,120,620,460,300,280],

[40,20,0,640,460,260,160,860,740,380,322,100,760,560,322,940,320,82,60,940,880,760,740,720,700,380,362,342,302,282,260,180,102,800,780,620,560,540,420,340,322,100,20,520,320,60,382,100,60,802,780,762,320,300,280,260,82,560,540,520,500,340,120,80,760,740,660,580,480,420,360,180,160,140,880,820,780,700,460,380,920,580,520,500,160,140,120,100,80,60,180,860,640,540,520,500,480,460,440,420,400,380,360,180,760,540,522,502,482,80,400,280,142,20,960,940,920,900,560,540,520,960,900,860,760,640,440,320,300,280,260,240,220,200,100,960,900,660,520,360,282,262,242],

[960,820,680,540,520,500,480,460,440,420,400,380,360,60,40,20,0,360,360,880,480,462,442,360,140,920,860,480,462,442,422,382,360,100,840,760,480,462,442,360,40,740,720,700,680,660,640,620,600,580,560,540,520,500,480,462,360,662,642,622,480,462,360,740,642,480,360,120,562,500,480,360,80,582,562,542,480,360,20,760,740,720,700,680,660,640,620,600,580,560,540,480,360,780,702,682,662,622,602,582,480,360,800,480,360,100,820,480,360,60,840,480,382,360,0,840,760,740,720,700,680,660,640,620,600,580,560,540,480,382,360,840,742,662,582,480,402,382,360,840,480,402,382,360,340,320,300,280,260,240,220,200,180,160,140,80,840,702,622,500,480,462,422,402,382,360,340,320,300,280,260,240,220,200,180,160,140,40,960,940,920,900,880,860,840,820,800,780,760,740,720,700,680,660,640,620,600,580,482,960,880,482,300,960,880,482,120]];



var objectYValues = [[20,22,22,20,20,20,20,40,40,40,40,40,40,40,62,60,62,60,60,60,80,82,100,100,120,122,140,140,140,160,160,162,160,160,180,180,180,180,180,200,200,220,220,240,260,260,262,262,262,262,260,260,282,282,280,300,300,300,300,300,300,300,320,320,340,340,360,400,400,400,400,420,420,420,422,420,440,440,440,440,442,440,440,440,440,440,460,460,460], 

[20,20,20,20,40,40,40,40,60,60,60,60,60,60,80,100,140,160,162,162,160,160,160,180,180,180,180,180,200,200,200,200,200,220,260,260,262,262,260,260,260,260,260,280,280,300,300,300,360,360,380,380,380,380,380,400,400,400,420,420,420,440],

[20,20,20,40,40,40,40,60,60,60,62,60,80,80,82,100,100,122,120,140,140,140,140,140,140,140,142,142,142,142,140,140,142,160,160,160,160,160,160,160,162,160,160,180,180,180,202,200,200,222,220,222,220,220,220,220,222,240,240,240,240,240,240,240,260,260,260,260,260,260,260,260,260,260,280,280,280,280,280,280,300,300,300,300,300,300,300,300,300,300,320,340,340,340,340,340,340,340,340,340,340,340,340,340,360,360,362,362,362,360,380,380,382,400,420,420,420,420,420,420,420,440,440,440,440,440,440,440,440,440,440,440,440,440,440,460,460,460,460,460,462,462,462],

[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,40,60,80,80,82,82,80,80,100,100,100,102,102,102,102,100,100,120,120,120,122,122,120,120,140,140,140,140,140,140,140,140,140,140,140,140,140,140,142,140,162,162,162,160,162,160,180,182,180,180,180,202,200,200,200,200,222,222,222,220,220,220,240,240,240,240,240,240,240,240,240,240,240,240,240,240,260,262,262,262,262,262,262,260,260,280,280,280,280,300,300,300,300,320,320,322,320,320,340,340,340,340,340,340,340,340,340,340,340,340,340,340,342,340,360,362,362,362,360,362,362,360,380,380,382,382,380,380,380,380,380,380,380,380,380,380,380,380,380,400,402,402,400,400,402,402,402,402,400,400,400,400,400,400,400,400,400,400,400,400,400,420,420,420,420,420,420,420,420,420,420,420,420,420,420,420,420,420,420,420,420,422,440,440,442,440,460,460,462,460]];



var objectWidthValues = [[20,16,16,20,20,20,20,20,20,20,20,20,20,20,16,20,16,20,20,20,20,16,20,20,20,16,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16,16,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,20,20,16,20,20,20,20,20,20,20,20], 

[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20], 

[20,20,20,20,20,20,20,20,20,20,16,20,20,20,16,20,20,16,20,20,20,20,20,20,20,20,16,16,16,16,20,20,16,20,20,20,20,20,20,20,16,20,20,20,20,20,16,20,20,16,20,16,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16],

[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,20,20,16,16,16,16,20,20,20,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,16,16,16,20,16,20,20,16,20,20,20,16,20,20,20,20,16,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16,16,16,16,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,16,16,16,20,16,16,20,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,20,20,16,16,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,16,20,20,20,16,20]];



var objectHeightValues= [[20,16,16,20,20,20,20,20,20,20,20,20,20,20,16,20,16,20,20,20,20,16,20,20,20,16,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16,16,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,20,20,16,20,20,20,20,20,20,20,20], 

[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],

[20,20,20,20,20,20,20,20,20,20,16,20,20,20,16,20,20,16,20,20,20,20,20,20,20,20,16,16,16,16,20,20,16,20,20,20,20,20,20,20,16,20,20,20,20,20,16,20,20,16,20,16,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16],

[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,20,20,20,20,20,16,16,16,16,20,20,20,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,16,16,16,20,16,20,20,16,20,20,20,16,20,20,20,20,16,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,16,16,16,16,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,16,16,16,20,16,16,20,20,20,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,16,20,20,16,16,16,16,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,20,20,16,20,20,20,16,20]];


var objectTypeValues = [[1,2,2,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,2,3,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2,2,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1], 

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1], 

[1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1,3,1,1,1,1,1,1,2,2,2,2,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,2,3,1,2,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,3,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,2,2,2],

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,2,2,2,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,2,2,1,2,1,3,2,1,1,1,2,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,2,2,1,2,2,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,3,2,3,1,3,2,1]];






 
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
    if(event.keyCode == 82) {
      spawnX = 40;
      spawnY=40; 
      
      death();
      
      
    }
    if(event.keyCode == 67) {

      death();
        
        
    }
    if(event.keyCode == 49) {

      currentLevelNumber = 0;
        
      spawnX = 40;
      spawnY=40; 
      death();
    }

    if(event.keyCode == 50) {

      currentLevelNumber = 1;
      spawnX = 40;
      spawnY=40; 
      death();
        
    }

    if(event.keyCode == 51) {

      currentLevelNumber = 2;
      spawnX = 40;
      spawnY=40; 
      death();
        
    }

    if(event.keyCode == 52) {

      currentLevelNumber = 3;
      spawnX = 40;
      spawnY=40; 
      death();
        
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

  if (!(objectTypeValues[currentLevelNumber][collisionTopObject] ==1 && collisionTop)) {
    velocityY -= gravity * (deltaTime/perfectFrameTime);
    grounded = false;
  } 
}

function HandleInput() {
  
  if (rightArrow && !(objectTypeValues[currentLevelNumber][collisionLeftObject]==1 && collisionLeft) && velocityX < speed) {
    velocityX += (0.6 *(deltaTime/perfectFrameTime));
    
  }
      
  if (leftArrow && !(objectTypeValues[currentLevelNumber][collisionRightObject]==1 && collisionRight) && velocityX > -speed) {
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
  for (let i = 0; i < objectXValues[currentLevelNumber].length; i++) {
    collisionsFunctions += 1;
    //if touching top
    if (y<=objectYValues[currentLevelNumber][i]+objectHeightValues[currentLevelNumber][i] && y>objectYValues[currentLevelNumber][i] && x+width>objectXValues[currentLevelNumber][i]+2 && x<objectXValues[currentLevelNumber][i]+objectWidthValues[currentLevelNumber][i]-2 && objectTypeValues[currentLevelNumber][i] !=0) {
      
      collisionTop = true;
      collisionTopObject = i;
      topCollisions +=1;
    } 
  
    //if touching bottom
    if (y+height>=objectYValues[currentLevelNumber][i] && y+height<objectYValues[currentLevelNumber][i]+objectHeightValues[currentLevelNumber][i]&& x+width>objectXValues[currentLevelNumber][i]+2 && x<objectXValues[currentLevelNumber][i]+objectWidthValues[currentLevelNumber][i]-2&& objectTypeValues[currentLevelNumber][i] !=0) {
      
      collisionBottom = true;
      collisionBottomObject = i;
      bottomCollisions +=1;
    } 
  
    //if touching right
    if (x<=objectXValues[currentLevelNumber][i]+objectWidthValues[currentLevelNumber][i] && x>objectXValues[currentLevelNumber][i] && y+height > objectYValues[currentLevelNumber][i]+2 && y<objectYValues[currentLevelNumber][i]+objectHeightValues[currentLevelNumber][i]-2&& objectTypeValues[currentLevelNumber][i] !=0) {
      
      collisionRight = true;
      collisionRightObject = i;
      rightCollisions +=1;
    } 
    //if touching left
    if(x+width>=objectXValues[currentLevelNumber][i] && x<objectXValues[currentLevelNumber][i]+objectWidthValues[currentLevelNumber][i]-2 && y+height>objectYValues[currentLevelNumber][i]+2 && y<objectYValues[currentLevelNumber][i]+objectHeightValues[currentLevelNumber][i]-2&& objectTypeValues[currentLevelNumber][i] !=0) {
      
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
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==1) {
      bottomHit = true;
      if (velocityY<0) {
        //y = Math.ceil(objectYValues[currentLevelNumber][collisionTopObject] + objectHeightValues[currentLevelNumber][collisionTopObject]);
        velocityY = 0;

      }
      
      grounded = true;
    } 
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==2) {
      death();
    }  
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==3) {
      
      spawnX = objectXValues[currentLevelNumber][collisionTopObject];
      spawnY = objectYValues[currentLevelNumber][collisionTopObject];
    
    }
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==4) {
      victory=true;
    }
  }

  if(collisionBottom) {
    if (objectTypeValues[currentLevelNumber][collisionBottomObject]==1) {
      jumping = false;
      topHit=true;
      
      if (velocityY>0) {

        //y = Math.ceil(objectYValues[currentLevelNumber][collisionBottomObject] - height);
        velocityY = 0;
        
      }
      

    } 
    if (objectTypeValues[currentLevelNumber][collisionBottomObject]==2) {
      death();
    }  
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==3) {
      
      spawnX = objectXValues[currentLevelNumber][collisionTopObject];
      spawnY = objectYValues[currentLevelNumber][collisionTopObject];
    
    }

    if (objectTypeValues[currentLevelNumber][collisionTopObject]==4) {
      victory=true;
    }
    
  }

  if (collisionLeft) {
    if (objectTypeValues[currentLevelNumber][collisionLeftObject]==1) {
      leftHit=true;
      if (velocityX>0) {
        //x=Math.ceil(objectXValues[currentLevelNumber][collisionLeftObject]-width);
        velocityX = 0;

    
        
      }
      
    }  
    if (objectTypeValues[currentLevelNumber][collisionLeftObject]==2) {
      death();

    }  
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==3) {
      
      spawnX = objectXValues[currentLevelNumber][collisionTopObject];
      spawnY = objectYValues[currentLevelNumber][collisionTopObject];
    
    }
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==4) {
      victory=true;
    }
  }

  if (collisionRight) {
    
    if (objectTypeValues[currentLevelNumber][collisionRightObject]==1) {
      rightHit=true;
      if (velocityX<0) {
        //x=Math.ceil(objectXValues[currentLevelNumber][collisionRightObject]+objectWidthValues[currentLevelNumber][collisionRightObject]);
        velocityX = 0;
        
      }
      
    
    }  
    if (objectTypeValues[currentLevelNumber][collisionRightObject]==2) {
      death();
    }  
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==3) {
      
      spawnX = objectXValues[currentLevelNumber][collisionTopObject];
      spawnY = objectYValues[currentLevelNumber][collisionTopObject];
    
    }
    
    if (objectTypeValues[currentLevelNumber][collisionTopObject]==4) {
      victory=true;
    }
  } 


}

function drawObjects() {
  for (let i = 0; i < objectXValues[currentLevelNumber].length; i++) {
    if (objectTypeValues[currentLevelNumber][i] == 1) {
      DrawObject(objectXValues[currentLevelNumber][i],objectYValues[currentLevelNumber][i],objectWidthValues[currentLevelNumber][i],objectHeightValues[currentLevelNumber][i]);
    } else if (objectTypeValues[currentLevelNumber][i]==2) {
      ctx.fillStyle = "#FF0000";
      DrawObject(objectXValues[currentLevelNumber][i],objectYValues[currentLevelNumber][i],objectWidthValues[currentLevelNumber][i],objectHeightValues[currentLevelNumber][i]);
      ctx.fillStyle = "#000000";
    } else if (objectTypeValues[currentLevelNumber][i]==3) {
      ctx.fillStyle = "#0000FF";
      DrawObject(objectXValues[currentLevelNumber][i],objectYValues[currentLevelNumber][i],objectWidthValues[currentLevelNumber][i],objectHeightValues[currentLevelNumber][i]);
      ctx.fillStyle = "#000000";
    } else if (objectTypeValues[currentLevelNumber][i]==4) {
      ctx.fillStyle = "#00F0F0";
      DrawObject(objectXValues[currentLevelNumber][i],objectYValues[currentLevelNumber][i],objectWidthValues[currentLevelNumber][i],objectHeightValues[currentLevelNumber][i]);
      ctx.fillStyle = "#000000";
    }
    
  }

  
}
function death() {
  velocityY = 0;
  velocityX = 0;
  x = spawnX;
  y = spawnY;
  started=false;
  victory=false;
  collisionTop = false;
  jumping = false;
  jumpTimer = 0;

  grounded = false;
  if (spawnX==40 &&spawnY==40) {
    SpeedRunTimer = 0;
  }
}
function checkIfGround() {
  if (y < 3){
    death();
    
  }
}
var deltaTime = 0;
let lastTimestamp = 0;
const perfectFrameTime = 1000/60;
function start() {
  requestAnimationFrame(Main);
}


function move() {
  topHit = false;
  bottomHit = false;
  leftHit=false;
  rightHit=false;
  if (velocityY>0) {
    HandleMultipleCollision();
    HandleBasicCollision();
    for(let i=0; i<velocityY; i++) {
      if (!topHit) {
        y += (deltaTime/perfectFrameTime);
        HandleMultipleCollision();
        HandleBasicCollision();
      
      }
    }
  } else if (velocityY<0) {
    HandleMultipleCollision();
    HandleBasicCollision();
    for(let i=0; i<(velocityY*-1); i++) {
      if (!bottomHit) {
        y -= (deltaTime/perfectFrameTime);

        HandleMultipleCollision();
        HandleBasicCollision();
      
      }
    }
  }



  if (velocityX>0) {
    HandleMultipleCollision();
    HandleBasicCollision();
    for(let i=0; i<velocityX; i++) {
      if (!leftHit != 0) {
        x += (deltaTime/perfectFrameTime);

        HandleMultipleCollision();
        HandleBasicCollision();
      }
    }
  } else if (velocityX<0) {
    HandleMultipleCollision();
    HandleBasicCollision();
    for(let i=0; i<(velocityX*-1); i++) {
      if (!rightHit) {
        x -= (deltaTime/perfectFrameTime);
        HandleMultipleCollision();
        HandleBasicCollision();
      }
      
  

    }
  }
}



function startedDetection() {
  if (velocityX!=0 || velocityY!=0) {
    started = true;
  }
}
function Main(timestamp) {


  startedDetection();

  if (started && !victory) {
    SpeedRunTimer += 1 * deltaTime;
  }
  collisionsFunctions = 0;
  deltaTime = timestamp-lastTimestamp;
  lastTimestamp = timestamp;

  clearStage();
  
  

  
  HandleInput();
  
  HandleJumping();
  Gravity();
  
  
  

  

  
    
  
  move();
  checkIfGround();

  drawObjects();
  
  ctx.fillStyle = "#0000FF";
  DrawObject(x,y,width,height);

  
  ctx.fillStyle = "#000000";

  //document.getElementById("Position").innerHTML = "x: "+ x + " y: " + y;

  //document.getElementById("Velocity").innerHTML = "Velocity X: "+ velocityX + " Velocity Y: " + velocityY;
  document.getElementById("FPS").innerHTML = "FPS: " +1/deltaTime*1000;
  document.getElementById("SpeedrunTimer").innerHTML = "Timer: " + SpeedRunTimer/1000;
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