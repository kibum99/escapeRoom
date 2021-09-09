var total, coin, wallet, mycoin=[0,0,0];
var costbit=10000, costether=10000, costdoge=10000;
var delbit,delether,deldoge;
var time=0, idxtime=0;
var x=0;
$('document').ready(setInterval(function(){
  idxtime = idxtime+0.5*(Math.sin(time)+1);
  time += 1;
  var newbit, newehter, newdoge;

  //bitcoin 갱신
  newbit = costbit-10*Math.sin(idxtime/500)+500*Math.sin(0.02*time+0.05*idxtime)+100*Math.sin(0.3*time+0.9*idxtime)+5;
  newbit = Math.ceil(newbit*100)/100;
  delbit = (newbit-costbit);
  $('#Item1 .cur').html(costbit);
  $('#Item1 .del').html(Math.ceil(delbit*100)/100+"("+Math.ceil(delbit/costbit*10000)/100+"%)");
  costbit = newbit;
  

  //ethereum 갱신
  newether = costether-5*Math.sin(idxtime/500+2.1)+300*Math.sin(0.02*time+0.05*idxtime+2.1)+50*Math.sin(0.3*time+0.9*idxtime+2.1)+5;
  newether = Math.ceil(newether*100)/100;
  delether = (newether-costether);
  $('#Item2 .cur').html(costether);
  $('#Item2 .del').html(Math.ceil(delether*100)/100+"("+Math.ceil(delether/costether*10000)/100+"%)");
  costether = newether;


  //doge 갱신
  newbit = costbit-10*Math.sin(idxtime/500)+500*Math.sin(0.02*time+0.05*idxtime)+100*Math.sin(0.3*time+0.9*idxtime)+5;
  newbit = Math.ceil(newbit*100)/100;
  delbit = (newbit-costbit);
  $('#Item1 .cur').html(costbit);
  $('#Item1 .del').html(Math.ceil(delbit*100)/100+"("+Math.ceil(delbit/costbit*10000)/100+"%)");
  costbit = newbit;
},1));


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
