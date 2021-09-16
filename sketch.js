var trex,corredo,chao,imagemChao, subChao


var somPulo, somMorrendo, somCheckpoint;
const jogar = 1
const encerrar = 0;
var estadojogo =jogar;

function preload() {
correndo =loadAnimation("trex1.png","trex2.png","trex3.png")
trexcolidiu = loadAnimation("trex_collided.png");
  
  imagemChao=loadImage("ground2.png") 
imagemnuvem = loadImage("cloud.png")
  
  imagemcacto1 = loadImage("obstacle1.png")
  imagemcacto2 = loadImage("obstacle2.png")
  imagemcacto3 = loadImage("obstacle3.png")
  imagemcacto4 = loadImage("obstacle4.png")
  imagemcacto5 = loadImage("obstacle5.png")          
  imagemcacto6 = loadImage("obstacle6.png")
  
  imagemfim = loadImage("gameOver.png")
  imagemreiniciar = loadImage("restart.png")
  somPulo = loadSound("jump.mp3")
  somMorrendo = loadSound("die.mp3")
  somCheckpoint = loadSound("checkPoint.mp3")
}


function setup(){
  createCanvas(windowWidth, windowHeight);
 pontos = 0;
  
  
  trex = createSprite(50,height-80,20,40)
trex.addAnimation("correndo",correndo)  
  trex.addAnimation("colidiu",trexcolidiu)
 trex.scale =0.5 
  
trex.setCollider("circle",0,0,40)
  trex.debug = false
  
  
  chao = createSprite(width,height-20,500,10)
  chao.addAnimation("chao",imagemChao)
subChao = createSprite(100,height-10,300,10)
subChao.visible = false
  
  fimDejogo = createSprite(width/2,height/2,30,30);
  fimDejogo.addAnimation("fimdejogo",imagemfim)
  fimDejogo.scale = 0.5
  reiniciar = createSprite(width/2,height/2+30,30,30);
  reiniciar.addAnimation("reinicar",imagemreiniciar)
  reiniciar.scale=0.5
  grupodecactos = new Group();
  grupodenuvem = new Group();
  
  
} 




function draw() {
  
  background(180)
  text("pontuacao: "+ pontos,width-100,20)
 
  
  if(estadojogo == jogar){
 pontos=pontos+Math.round(frameCount/60)
 // chao.velocityX = -8
    
    chao.velocityX = -(3 +pontos/100)
 
   if(pontos> 0 &&pontos % 100 == 0 ){ 
    somCheckpoint.play()
   }
    
   fimDejogo.visible = false
    reiniciar.visible = false
    
      if(chao.x<0) {
  chao.x =chao.width/2
}  
    
    
      if( (touches.length>0||  keyDown("space"))&& trex.y >height-45 ){
  trex.velocityY = -10 
        somPulo.play()
           touches = []
      
 }
    
      trex.velocityY = trex.velocityY +0.5 
    
      gerarnuvens()
      gerarcactos()
    
    if(grupodecactos.isTouching(trex)){
      estadojogo = encerrar;
      somMorrendo.play()
    }
    
  }else if(estadojogo == encerrar){  
    grupodenuvem.setVelocityXEach(0);
    grupodecactos.setVelocityXEach(0);
    
    fimDejogo.visible = true
    reiniciar.visible = true
    grupodenuvem.setLifetimeEach(-1);
    grupodecactos.setLifetimeEach(-1);
    chao.velocityX = 0  
    
    trex.changeAnimation("colidiu",trexcolidiu);
    trex.velocityY = 0;
  }
  
  
  
  
  
  
 



  trex.collide(subChao)
  
  
    if( touches.length>0|| mousePressedOver(reiniciar) ){
    touches = []
  restart()
  }
  

  drawSprites();
  
  
}

function restart(){
estadojogo = jogar
 fimDejogo.visible  = false
  reiniciar.visible = false
  
  grupodecactos.destroyEach()
  grupodenuvem.destroyEach()
  
  trex.changeAnimation("correndo",correndo) 
  
  pontos = 0;
  
}



function gerarnuvens(){
  if(frameCount % 60 == 0){
     
 var nuvem = createSprite(600,100,50,10)
 nuvem.addAnimation("nuvem",imagemnuvem)
 
nuvem.velocityX = -2
nuvem.scale =0.5     
nuvem.y=Math.round (random(40,100))
nuvem.depth =trex.depth  
 trex.depth = trex.depth +1
    
    nuvem.lifetime = 300

    grupodenuvem.add(nuvem);
  }
  
}
  

  

function gerarcactos(){ 
  if(frameCount %60 == 0){
     
       
var cacto = createSprite(600,height-35,10,40)
cacto.velocityX = -8
 cacto.velocite =- (3 + pontos/100)     
 var sorteio = Math.round(random(1,6))   
 
 switch (sorteio){
       case 1:cacto.addAnimation("cacto",imagemcacto1)
     break;
     case 2:cacto.addAnimation("cacto",imagemcacto2)
     break;  
       case 3:cacto.addAnimation("cacto",imagemcacto3)
     break;
       case 4:cacto.addAnimation("cacto",imagemcacto4)
     break;
      case 5:cacto.addAnimation("cacto",imagemcacto5) 
     break; 
      case 6:cacto.addAnimation("cacto",imagemcacto6)
     break; 
 }
 cacto.scale = 0.5
cacto.lifetime = 150
    
    
    grupodecactos.add(cacto);
 
 
 
     }
  
  
  
  


}



