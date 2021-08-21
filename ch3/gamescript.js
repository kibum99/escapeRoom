var MaxX=0, MaxY=0, Cbomb=0, Cflag=0, timer, time, timeView, gameFin;
var bomb = [], check = [];

function init() {
  var playground = document.querySelector(".playground > ul");
  playground.parentNode.removeChild(playground);
  playground = document.querySelector(".playground > div");
  playground.parentNode.removeChild(playground);
  var playgroundUL = document.createElement("ul");
  playground = document.querySelector(".playground");
  playground.prepend(playgroundUL);
  var startbut = document.getElementById("start");
  startbut.style.display = "none";

  MaxX = 25;
  MaxY = 10;
  Cbomb = 10;
  Cflag=0; gameFin=false;
  var temp = [];
  bomb = [], check = [];
  for(i=0;i<MaxX;i++){
    temp.push(0);
  }
  for(i=0;i<MaxY;i++){
    bomb = bomb.concat(temp);
    check = check.concat(temp);
  }
  start();
}


function start() {
  var i=0, j=0;
  var bombx = [1, 1, 1, 2, 2, 2, 4, 4, 4, 5, 5, 5, 7, 7, 8, 10, 10, 11, 11, 11, 13, 13, 13, 13, 14, 14, 14, 16, 16, 17, 17, 19, 19, 19, 20, 20, 20, 22, 23];
  var bomby = [2, 3, 7, 2, 3, 8, 1, 3, 6, 3, 7, 8, 7, 8, 2, 3, 6, 2, 3, 6, 1, 2, 3, 6, 2, 7, 8, 1, 6, 1, 6, 2, 7, 8, 1, 3, 8, 1, 1];
  for(i=0;i<39;i++){
    bomb[(9-bomby[i])*100+(24-bombx[i])]=1;
  }
  const playground = document.querySelector(".playground > ul");
  for(i=0;i<MaxY;i++){
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(j=0;j<MaxX;j++){
      const matrix = document.createElement("li");
      matrix.id = i*100+j;
      matrix.addEventListener('mousedown',function() {
        if ((event.button == 2) || (event.which == 3)) {
          var temp = parseInt(matrix.id);
          actionFlag(temp%100,parseInt(temp/100));
        }
      })
      matrix.addEventListener('click',function() {
        var temp = parseInt(matrix.id);
        actionView(temp%100,parseInt(temp/100));
      })
      ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
  }
  const div = document.createElement("div");
  playground.parentNode.prepend(div);
  playTimer();
}

function playTimer(){
  time = 0;
  timer = setInterval(function(){
    time++;
    var milsec = time%100;
    if(milsec<10){milsec = '0'+milsec;}
    var sec = Math.floor(time/100);
    sec = sec % 60;
    if(sec<10){sec = '0'+sec;}
    var min = Math.floor(time/6000);
    timeView = min+':'+sec+':'+milsec;
    var div = document.querySelector(".playground>div");
    div.innerText = timeView;
  },10)
}

function actionView(x,y){
  if(gameFin){return;}
  if(x<0||y<0||x>=MaxX||y>=MaxY) {return;}
  if(check[100*y+x]==1) {return;}
  if(isBomb(x,y)==1){
    gameOver(x,y);
    return;
  }
  check[100*y+x]=1;
  var temp = 100*y+x; temp+="";
  var target = document.getElementById(temp);
  var nearB=0, dx=[-1,-1,0,1,1,1,0,-1], dy=[0,1,1,1,0,-1,-1,-1];
  for(i=0;i<8;i++){
    nearB+=isBomb(x+dx[i],y+dy[i]);
  }
  if(nearB==0){

    target.style.backgroundColor = 'gray';
    actionView(x+1,y);
    actionView(x,y+1);
    actionView(x-1,y);
    actionView(x,y-1);
    actionView(x+1,y+1);
    actionView(x-1,y+1);
    actionView(x-1,y-1);
    actionView(x+1,y-1);
  } else{
    target.innerText = nearB;
  }
  isClear();
}



function gameOver(x,y){
  
  for(i=0;i<MaxY;i++){
    for(j=0;j<MaxX;j++){
      if(isBomb(j,i)==1){
        var temp = 100*i+j; temp+="";
        var target = document.getElementById(temp);
        target.className = 'bomb';
      }
    }
  }
  /*
  var temp = 100*y+x; temp+="";
  var target = document.getElementById(temp);
  target.className = 'bomb';
  */
  clearInterval(timer);
  var div = document.querySelector(".playground>div");
  div.innerText += '     GameOver!!!';
  gameFin = true;
}

function actionFlag(x,y){
  if(gameFin){return;}
  var temp = 100*y+x; temp+="";
  var target = document.getElementById(temp);
  if(target.classList.contains('flag')){
    target.classList.remove('flag');
    Cflag--;
    check[100*y+x]=0;
  }
  else if(check[100*y+x]==1) {return;}
  else {
    target.classList.add('flag');
    Cflag++;
    check[100*y+x]=1;
  }
  isClear();
}

function isBomb(x,y){
  if(x<0||y<0||x>=MaxX||y>=MaxY) {return 0;}
  else if(bomb[100*y+x]==1) {return 1;}
  else {return 0;}
}

function isClear(){
  var sum=0;
  for(i=0;i<MaxX*MaxY;i++){
    sum+=check[i];
  }
  if(sum==MaxX*MaxY&&Cflag==Cbomb){
    clearInterval(timer);
    var div = document.querySelector(".playground>div");
    div.innerText += '     CLEAR!!!';
    gameFin=true;
  }
}

window.oncontextmenu = function () {
  return false;
};
