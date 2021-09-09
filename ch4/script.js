var total, coin, wallet, mycoin=[0,0,0];
var costbit=500000, costether=20000, costdoge=1000;
var delbit,delether,deldoge;
var time=0, idxtime=0;
var x=0;
$('document').ready(setInterval(function(){
  idxtime = idxtime+0.5*(Math.sin(time)+1);
  time += 1;
  var newbit, newehter, newdoge;

  //bitcoin 갱신
  newbit = costbit-500*Math.sin(idxtime/500)+2500*Math.sin(0.02*time+0.05*idxtime)+5000*Math.sin(0.3*time+0.9*idxtime)+5;
  newbit = Math.ceil(newbit*100)/100;
  delbit = (newbit-costbit);
  $('#Item1 .cur').html(costbit);
  $('#Item1 .del').html(Math.ceil(delbit*100)/100+"("+Math.ceil(delbit/costbit*10000)/100+"%)");
  costbit = newbit;
  

  //ethereum 갱신
  newether = costether-10*Math.sin(idxtime/500+2.1)+600*Math.sin(0.02*time+0.05*idxtime+2.1)+100*Math.sin(0.3*time+0.9*idxtime+2.1)+10;
  newether = Math.ceil(newether*100)/100;
  delether = (newether-costether);
  $('#Item2 .cur').html(costether);
  $('#Item2 .del').html(Math.ceil(delether*100)/100+"("+Math.ceil(delether/costether*10000)/100+"%)");
  costether = newether;


  //doge 갱신
  newdoge = costdoge+0.8*Math.sin(idxtime/500+4.2)-65*Math.sin(0.02*time+0.05*idxtime+4.2)+8*Math.sin(0.3*time+0.9*idxtime+4.2)+0.2;
  newdoge = Math.ceil(newdoge*100)/100;
  deldoge = (newdoge-costdoge);
  $('#Item3 .cur').html(costdoge);
  $('#Item3 .del').html(Math.ceil(deldoge*100)/100+"("+Math.ceil(deldoge/costdoge*10000)/100+"%)");
  costdoge = newdoge;
},500));


function selectBnS(check){
  buydiv = document.querySelector('.select>div:first-child');
  selldiv = document.querySelector('.select>div:last-child');
  if(check){
    buydiv.classList.add('selected');
    selldiv.classList.remove('selected');
    $('#buy').css("display","block");
    $('#sell').css("display","none");
  }
  else{
    selldiv.classList.add('selected');
    buydiv.classList.remove('selected');
    $('#buy').css("display","none");
    $('#sell').css("display","block");
  }
}
