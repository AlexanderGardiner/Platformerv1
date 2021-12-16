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
var speed = 3;
var jumpSpeed = 5.7;

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
  HandleMultipleCollision();
  HandleBasicCollision();
  if (!collisionTop) {
    velocityY -= gravity;
    grounded = false;
  } 
}

function HandleInput() {
  if (rightArrow && !collisionLeft) {
    velocityX = speed * (deltaTime/perfectFrameTime);
  }
      
  if (leftArrow && !collisionRight) {
    velocityX = -speed * (deltaTime/perfectFrameTime);
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

    y = Math.ceil(groundYValues[collisionBottomObject] - width)

    
  }

  if (collisionLeft) {
    velocityX = 0;


    
    
    
    
  }

  if (collisionRight) {
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

  document.getElementById("demo").innerHTML = "x: "+ x + " y: " + y;


  requestAnimationFrame(Main);
};

start()