
var total=1000000000, coin=0, wallet=1000000000, mycoin=[0,0,0];
var costbit, costether, costdoge;
var delbit,delether,deldoge;
var time=0, idxtime=0;
var x=0;
var timer;

class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
  }


  pop() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[this.head++];
      return result;
    }
  }
  push(item) {
    if(this.tail-this.head === 100){
      this.pop();
      this.pop();
      this.pop();
      this.pop();
      this.pop();
    }
    this.arr[this.tail++] = item;
  }
  back() {
    return this.arr[this.tail-1];
  }
}

costbit = new Deque();
costether = new Deque();
costdoge = new Deque();

costbit.push(500000);
costether.push(20000);
costdoge.push(1000);

function coinUpdate(){
  coin = mycoin[0]*costbit.back()+mycoin[1]*costether.back()+mycoin[2]*costdoge.back();
  total = coin+wallet;
  cash1 = document.getElementById('Cash1');
  cash2 = document.getElementById('Cash2');
  cash3 = document.getElementById('Cash3');
  cash1.innerText = Math.ceil(total*100)/100;
  cash2.innerText = Math.ceil(coin*100)/100;
  cash3.innerText = Math.ceil(wallet*100)/100;

  if(total>=10000000000){
    clearInterval(timer);
    alert("백억을 모두 모았습니다!");
  }
}

function gaussRand(){
  var v1,v2,s;
  do{
    v1 = 2*Math.random()-1;
    v2 = 2*Math.random()-1;
    s = v1 * v1 + v2 * v2;
  } while(s>=1);
  
  s = Math.sqrt((-2*Math.log(s))/s);
  
  return v1*s;
}

$('document').ready(timer = setInterval(function(){
  idxtime = idxtime+20*(Math.sin(time)+0.05);
  time += 1;
  var newbit, newehter, newdoge,temp;


  //bitcoin 갱신
  temp = costbit.back();
  newbit = Math.ceil(temp*(100+(2*Math.sin(idxtime)+gaussRand()+0.347)/2))/100;
  delbit = (newbit-temp);
  $('#Item1 .cur').html(temp);
  $('#Item1 .del').html(Math.ceil(delbit*100)/100+"("+Math.ceil(delbit/temp*10000)/100+"%)");
  costbit.push(newbit);
  

  //ethereum 갱신
  temp = costether.back();
  newether = Math.ceil(temp*(100+(3*Math.sin(idxtime)+2*gaussRand()+0.53)/3))/100;
  delether = (newether-temp);
  $('#Item2 .cur').html(temp);
  $('#Item2 .del').html(Math.ceil(delether*100)/100+"("+Math.ceil(delether/temp*10000)/100+"%)");
  costether.push(newether);


  //doge 갱신
  temp = costdoge.back();
  newdoge = Math.ceil(temp*(100+(2*Math.sin(idxtime)+3*gaussRand()+0.4)))/100;
  deldoge = (newdoge-temp);
  $('#Item3 .cur').html(temp);
  $('#Item3 .del').html(Math.ceil(deldoge*100)/100+"("+Math.ceil(deldoge/temp*10000)/100+"%)");
  costdoge.push(newdoge);
  coinUpdate();
  temp = whatCoin();
  if(temp==0) viewBit();
  else if(temp==1) viewEther();
  else viewDoge();
},400));


function selectBnS(check){
  buydiv = document.querySelector('.select>div:first-child');
  selldiv = document.querySelector('.select>div:last-child');
  if(check){
    buydiv.classList.add('selected');
    selldiv.classList.remove('selected');
    $('#buy').css("display","flex");
    $('#sell').css("display","none");
  }
  else{
    selldiv.classList.add('selected');
    buydiv.classList.remove('selected');
    $('#buy').css("display","none");
    $('#sell').css("display","flex");
  }
}

function coinSelect(idx){
  item1 = document.getElementById('Item1');
  item2 = document.getElementById('Item2');
  item3 = document.getElementById('Item3');
  item1.classList.remove('coinSelect');
  item2.classList.remove('coinSelect');
  item3.classList.remove('coinSelect');
  if(idx==1){item1.classList.add('coinSelect');}
  if(idx==2){item2.classList.add('coinSelect');}
  if(idx==3){item3.classList.add('coinSelect');}
}

function whatCoin(){
  item1 = document.getElementById('Item1');
  item2 = document.getElementById('Item2');
  item3 = document.getElementById('Item3');
  if(item1.classList.contains('coinSelect')){return 0;}
  if(item2.classList.contains('coinSelect')){return 1;}
  if(item3.classList.contains('coinSelect')){return 2;}
}

function funcBuy(){
  money = document.getElementById("money").value;
  coinUpdate();
  if(wallet<money){
    alert('거래 가능 금액보다 많은 거래는 불가능합니다.');
    return;
  }
  wcoin = whatCoin();
  if(wcoin == 0){
    mycoin[wcoin] = mycoin[wcoin]+(money/costbit.back());
  }
  if(wcoin == 1){
    mycoin[wcoin] = mycoin[wcoin]+(money/costether.back());
  }
  if(wcoin == 2){
    mycoin[wcoin] = mycoin[wcoin]+(money/costdoge.back());
  }
  wallet = wallet-money;
}


function viewBit(){
  var chart = document.getElementById("chart");
  var chartTop = chart.offsetTop;
  var chartLeft = chart.offsetLeft;
  var chartWidth = chart.offsetWidth;
  var chartHeight = chart.offsetHeight;

  var boxWidth = 0.9*(chartWidth/25);


  var i,j,fmax=0,fmin=9999999,temp;
  for(i=0;i<costbit.tail-costbit.head;i++){
    if(fmax<costbit.arr[costbit.head+i]) fmax = costbit.arr[costbit.head+i];
    if(fmin>costbit.arr[costbit.head+i]) fmin = costbit.arr[costbit.head+i];
  }
  temp = fmax-fmin;
  fmax = fmax+temp/20;
  fmin = fmin-temp/20;
  var boxStart, boxEnd, boxMax, boxMin
  while(chart.hasChildNodes()){chart.removeChild(chart.firstChild);}
  for(i=0;5*i<costbit.tail-costbit.head;i++){
    boxStart = costbit.arr[costbit.head+5*i];
    boxMax = 0; boxMin = 99999999;
    for(j=0;j<=5 && 5*i+j<costbit.tail-costbit.head;j++){
      if(boxMin>costbit.arr[costbit.head+5*i+j]) boxMin = costbit.arr[costbit.head+5*i+j];
      if(boxMax<costbit.arr[costbit.head+5*i+j]) boxMax = costbit.arr[costbit.head+5*i+j];
      boxEnd = costbit.arr[costbit.head+5*i+j];
    }
    const divtemp1 = document.createElement("div");
    const divtemp2 = document.createElement("div");
    divtemp1.style.position = 'absolute';
    divtemp2.style.position = 'absolute';

    divtemp1.style.left = (0.9*chartWidth/20*(i+1))+chartLeft+'px';
    divtemp2.style.left = (0.9*chartWidth/20*(i+1))+chartLeft+boxWidth/2+'px';

    divtemp1.style.backgroundColor = 'blue';
    divtemp2.style.backgroundColor = 'blue';
    if(boxStart<=boxEnd){
      temp = boxStart;
      boxStart = boxEnd;
      boxEnd = temp;
      divtemp1.style.backgroundColor = 'red';
      divtemp2.style.backgroundColor = 'red';
    }

    divtemp1.style.top = chartTop+0.85*chartHeight-(boxStart-fmin)/(fmax-fmin)*0.75*chartHeight+'px';
    divtemp2.style.top = chartTop+0.85*chartHeight-(boxMax-fmin)/(fmax-fmin)*0.75*chartHeight+'px';

    divtemp1.style.width = boxWidth+'px';
    divtemp2.style.width = '2px';

    divtemp1.style.height = (boxStart-boxEnd)/(fmax-fmin)*0.75*chartHeight+'px';
    divtemp2.style.height = (boxMax-boxMin)/(fmax-fmin)*0.75*chartHeight+'px';
    
    chart.prepend(divtemp1);
    chart.prepend(divtemp2);
  }
  //최고 선 그리기
  divtemp1 = document.createElement("div");
  divtemp2 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp2.style.position = 'absolute';

  divtemp1.style.top = chartTop+0.1*chartHeight+'px';
  divtemp2.style.top = chartTop+0.1*chartHeight-20+'px';

  divtemp1.style.left = chartLeft+0.05*chartWidth+'px';
  divtemp2.style.left = chartLeft+0.05*chartWidth+'px';

  divtemp1.style.backgroundColor = 'gray';
  divtemp1.style.height = '2px';
  divtemp1.style.width = chartWidth*0.9+'px';

  divtemp2.innerText = Math.ceil(fmax*100)/100;

  chart.prepend(divtemp1);
  chart.prepend(divtemp2);
  //최저 선 그리기
  divtemp1 = document.createElement("div");
  divtemp2 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp2.style.position = 'absolute';

  divtemp1.style.top = chartTop+0.85*chartHeight+'px';
  divtemp2.style.top = chartTop+0.85*chartHeight+'px';

  divtemp1.style.left = chartLeft+0.05*chartWidth+'px';
  divtemp2.style.left = chartLeft+0.05*chartWidth+'px';

  divtemp1.style.backgroundColor = 'gray';
  divtemp1.style.height = '2px';
  divtemp1.style.width = chartWidth*0.9+'px';

  divtemp2.innerText = Math.ceil(fmin*100)/100;  

  chart.prepend(divtemp1);
  chart.prepend(divtemp2);

  //내가 가진 코인(원)
  divtemp1 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp1.style.top = chartTop+chartHeight-45+'px';
  divtemp1.style.left = chartLeft+0.3*chartWidth+'px';
  divtemp1.style.width = chartWidth*0.65+'px';
  divtemp1.style.fontWeight = 'bold';
  divtemp1.style.textAlign = 'right';
  divtemp1.innerText = '보유 중인 비트코인 : '+Math.ceil(mycoin[0]*costbit.back()*100)/100+'(원)';
  chart.prepend(divtemp1);
}


function viewEther(){
  var chart = document.getElementById("chart");
  var chartTop = chart.offsetTop;
  var chartLeft = chart.offsetLeft;
  var chartWidth = chart.offsetWidth;
  var chartHeight = chart.offsetHeight;

  var boxWidth = 0.9*(chartWidth/25);


  var i,j,fmax=0,fmin=9999999,temp;
  for(i=0;i<costether.tail-costether.head;i++){
    if(fmax<costether.arr[costether.head+i]) fmax = costether.arr[costether.head+i];
    if(fmin>costether.arr[costether.head+i]) fmin = costether.arr[costether.head+i];
  }
  temp = fmax-fmin;
  fmax = fmax+temp/20;
  fmin = fmin-temp/20;
  var boxStart, boxEnd, boxMax, boxMin
  while(chart.hasChildNodes()){chart.removeChild(chart.firstChild);}
  for(i=0;5*i<costether.tail-costether.head;i++){
    boxStart = costether.arr[costether.head+5*i];
    boxMax = 0; boxMin = 99999999;
    for(j=0;j<=5 && 5*i+j<costether.tail-costether.head;j++){
      if(boxMin>costether.arr[costether.head+5*i+j]) boxMin = costether.arr[costether.head+5*i+j];
      if(boxMax<costether.arr[costether.head+5*i+j]) boxMax = costether.arr[costether.head+5*i+j];
      boxEnd = costether.arr[costether.head+5*i+j];
    }
    const divtemp1 = document.createElement("div");
    const divtemp2 = document.createElement("div");
    divtemp1.style.position = 'absolute';
    divtemp2.style.position = 'absolute';

    divtemp1.style.left = (0.9*chartWidth/20*(i+1))+chartLeft+'px';
    divtemp2.style.left = (0.9*chartWidth/20*(i+1))+chartLeft+boxWidth/2+'px';

    divtemp1.style.backgroundColor = 'blue';
    divtemp2.style.backgroundColor = 'blue';
    if(boxStart<=boxEnd){
      temp = boxStart;
      boxStart = boxEnd;
      boxEnd = temp;
      divtemp1.style.backgroundColor = 'red';
      divtemp2.style.backgroundColor = 'red';
    }

    divtemp1.style.top = chartTop+0.85*chartHeight-(boxStart-fmin)/(fmax-fmin)*0.75*chartHeight+'px';
    divtemp2.style.top = chartTop+0.85*chartHeight-(boxMax-fmin)/(fmax-fmin)*0.75*chartHeight+'px';

    divtemp1.style.width = boxWidth+'px';
    divtemp2.style.width = '2px';

    divtemp1.style.height = (boxStart-boxEnd)/(fmax-fmin)*0.75*chartHeight+'px';
    divtemp2.style.height = (boxMax-boxMin)/(fmax-fmin)*0.75*chartHeight+'px';
    
    chart.prepend(divtemp1);
    chart.prepend(divtemp2);
  }
  //최고 선 그리기
  divtemp1 = document.createElement("div");
  divtemp2 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp2.style.position = 'absolute';

  divtemp1.style.top = chartTop+0.1*chartHeight+'px';
  divtemp2.style.top = chartTop+0.1*chartHeight-20+'px';

  divtemp1.style.left = chartLeft+0.05*chartWidth+'px';
  divtemp2.style.left = chartLeft+0.05*chartWidth+'px';

  divtemp1.style.backgroundColor = 'gray';
  divtemp1.style.height = '2px';
  divtemp1.style.width = chartWidth*0.9+'px';

  divtemp2.innerText = Math.ceil(fmax*100)/100;

  chart.prepend(divtemp1);
  chart.prepend(divtemp2);
  //최저 선 그리기
  divtemp1 = document.createElement("div");
  divtemp2 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp2.style.position = 'absolute';

  divtemp1.style.top = chartTop+0.85*chartHeight+'px';
  divtemp2.style.top = chartTop+0.85*chartHeight+'px';

  divtemp1.style.left = chartLeft+0.05*chartWidth+'px';
  divtemp2.style.left = chartLeft+0.05*chartWidth+'px';

  divtemp1.style.backgroundColor = 'gray';
  divtemp1.style.height = '2px';
  divtemp1.style.width = chartWidth*0.9+'px';

  divtemp2.innerText = Math.ceil(fmin*100)/100;  

  chart.prepend(divtemp1);
  chart.prepend(divtemp2);

  //내가 가진 코인(원)
  divtemp1 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp1.style.top = chartTop+chartHeight-45+'px';
  divtemp1.style.left = chartLeft+0.3*chartWidth+'px';
  divtemp1.style.width = chartWidth*0.65+'px';
  divtemp1.style.fontWeight = 'bold';
  divtemp1.style.textAlign = 'right';
  divtemp1.innerText = '보유 중인 이더리움 : '+Math.ceil(mycoin[1]*costether.back()*100)/100+'(원)';
  chart.prepend(divtemp1);
}


function viewDoge(){
  var chart = document.getElementById("chart");
  var chartTop = chart.offsetTop;
  var chartLeft = chart.offsetLeft;
  var chartWidth = chart.offsetWidth;
  var chartHeight = chart.offsetHeight;

  var boxWidth = 0.9*(chartWidth/25);


  var i,j,fmax=0,fmin=9999999,temp;
  for(i=0;i<costdoge.tail-costdoge.head;i++){
    if(fmax<costdoge.arr[costdoge.head+i]) fmax = costdoge.arr[costdoge.head+i];
    if(fmin>costdoge.arr[costdoge.head+i]) fmin = costdoge.arr[costdoge.head+i];
  }
  temp = fmax-fmin;
  fmax = fmax+temp/20;
  fmin = fmin-temp/20;
  var boxStart, boxEnd, boxMax, boxMin
  while(chart.hasChildNodes()){chart.removeChild(chart.firstChild);}
  for(i=0;5*i<costdoge.tail-costdoge.head;i++){
    boxStart = costdoge.arr[costdoge.head+5*i];
    boxMax = 0; boxMin = 99999999;
    for(j=0;j<=5 && 5*i+j<costdoge.tail-costdoge.head;j++){
      if(boxMin>costdoge.arr[costdoge.head+5*i+j]) boxMin = costdoge.arr[costdoge.head+5*i+j];
      if(boxMax<costdoge.arr[costdoge.head+5*i+j]) boxMax = costdoge.arr[costdoge.head+5*i+j];
      boxEnd = costdoge.arr[costdoge.head+5*i+j];
    }
    const divtemp1 = document.createElement("div");
    const divtemp2 = document.createElement("div");
    divtemp1.style.position = 'absolute';
    divtemp2.style.position = 'absolute';

    divtemp1.style.left = (0.9*chartWidth/20*(i+1))+chartLeft+'px';
    divtemp2.style.left = (0.9*chartWidth/20*(i+1))+chartLeft+boxWidth/2+'px';

    divtemp1.style.backgroundColor = 'blue';
    divtemp2.style.backgroundColor = 'blue';
    if(boxStart<=boxEnd){
      temp = boxStart;
      boxStart = boxEnd;
      boxEnd = temp;
      divtemp1.style.backgroundColor = 'red';
      divtemp2.style.backgroundColor = 'red';
    }

    divtemp1.style.top = chartTop+0.85*chartHeight-(boxStart-fmin)/(fmax-fmin)*0.75*chartHeight+'px';
    divtemp2.style.top = chartTop+0.85*chartHeight-(boxMax-fmin)/(fmax-fmin)*0.75*chartHeight+'px';

    divtemp1.style.width = boxWidth+'px';
    divtemp2.style.width = '2px';

    divtemp1.style.height = (boxStart-boxEnd)/(fmax-fmin)*0.75*chartHeight+'px';
    divtemp2.style.height = (boxMax-boxMin)/(fmax-fmin)*0.75*chartHeight+'px';
    
    chart.prepend(divtemp1);
    chart.prepend(divtemp2);
  }
  //최고 선 그리기
  divtemp1 = document.createElement("div");
  divtemp2 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp2.style.position = 'absolute';

  divtemp1.style.top = chartTop+0.1*chartHeight+'px';
  divtemp2.style.top = chartTop+0.1*chartHeight-20+'px';

  divtemp1.style.left = chartLeft+0.05*chartWidth+'px';
  divtemp2.style.left = chartLeft+0.05*chartWidth+'px';

  divtemp1.style.backgroundColor = 'gray';
  divtemp1.style.height = '2px';
  divtemp1.style.width = chartWidth*0.9+'px';

  divtemp2.innerText = Math.ceil(fmax*100)/100;

  chart.prepend(divtemp1);
  chart.prepend(divtemp2);
  //최저 선 그리기
  divtemp1 = document.createElement("div");
  divtemp2 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp2.style.position = 'absolute';

  divtemp1.style.top = chartTop+0.85*chartHeight+'px';
  divtemp2.style.top = chartTop+0.85*chartHeight+'px';

  divtemp1.style.left = chartLeft+0.05*chartWidth+'px';
  divtemp2.style.left = chartLeft+0.05*chartWidth+'px';

  divtemp1.style.backgroundColor = 'gray';
  divtemp1.style.height = '2px';
  divtemp1.style.width = chartWidth*0.9+'px';

  divtemp2.innerText = Math.ceil(fmin*100)/100;  

  chart.prepend(divtemp1);
  chart.prepend(divtemp2);

  //내가 가진 코인(원)
  divtemp1 = document.createElement("div");
  divtemp1.style.position = 'absolute';
  divtemp1.style.top = chartTop+chartHeight-45+'px';
  divtemp1.style.left = chartLeft+0.3*chartWidth+'px';
  divtemp1.style.width = chartWidth*0.65+'px';
  divtemp1.style.fontWeight = 'bold';
  divtemp1.style.textAlign = 'right';
  divtemp1.innerText = '보유 중인 도지코인 : '+Math.ceil(mycoin[2]*costdoge.back()*100)/100+'(원)';
  chart.prepend(divtemp1);
}
