var bricks, paddle, ball, edges 
var paddleImg, ballImg

function preload(){

  paddleImg = loadImage("paddle.png")
  ballImg = loadImage("ball.png")

}


function setup() {
  createCanvas(800,400);
  edges = createEdgeSprites()
  
  brickGroup = new Group()

  for(var i = 20 ; i < 800 ; i = i + 50 ){
    for(var j = 10 ; j < 200 ; j = j + 30){
      bricks = createSprite (i , j, 30, 10)
      brickGroup.add(bricks)
    }
    
    
  }

  paddle = createSprite(400, 370, 100,20)
  paddle.addImage(paddleImg)
  paddle.scale = 0.5
  paddle.debug = true
  paddle.setCollider("rectangle",0,0,200,40)
  ball = createSprite(400, 310, 20, 20)
  ball.addImage(ballImg)
  ball.scale = 0.2
  
  ball.velocityX = 3
  ball.velocityY = 2
  
}

function draw() {
  background("black");  

  paddle.x = mouseX

  ball.bounceOff(edges[0])
  ball.bounceOff(edges[1])
  ball.bounceOff(edges[2])
  ball.bounceOff(paddle)

  for (var i = 0 ; i < brickGroup.length ; i = i + 1){
    if (ball.isTouching(brickGroup.get(i))){
      ball.bounceOff(brickGroup.get(i))
      brickGroup.get(i).destroy()
    }
  }

  if (ball.y > 390){
    reset()
  }

  serve()
  
  drawSprites();
}

function reset(){
  ball.x = 400
  ball.y = 310
  ball.velocityX = 0
  ball.velocityY = 0
}

function serve(){
  if (keyDown("space")){
    ball.velocityX = 3
    ball.velocityY = 2
  }
}