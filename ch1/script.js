function Monthchange(month){
  const months = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  months[1] = document.getElementById('jan');
  months[2] = document.getElementById('feb');
  months[3] = document.getElementById('mar');
  months[4] = document.getElementById('apr');
  months[5] = document.getElementById('may');
  months[6] = document.getElementById('jun');
  months[7] = document.getElementById('jul');
  months[8] = document.getElementById('aug');
  months[9] = document.getElementById('sep');
  months[10] = document.getElementById('oct');
  months[11] = document.getElementById('nov');
  months[12] = document.getElementById('dec');
  var current,i;
  for(i=1;i<=12;i++){
    if(!(months[i].classList.contains('notExist'))){
      current = i;
    }
  }
  if(month==13){
    months[current].classList.add('notExist');
    months[(current)%12+1].classList.remove('notExist');
  }
  else if(month==0){
    months[current].classList.add('notExist');
    months[(current+10)%12+1].classList.remove('notExist');
  }
  else{
    months[current].classList.add('notExist');
    months[month].classList.remove('notExist');
  }
}

function ShowCalendar()  {
  const cal = document.getElementById('calendar');
  const but1 = document.getElementById('PrevMonth');
  const but2 = document.getElementById('NextMonth');
  if(cal.classList.contains('invisible')){
    cal.classList.remove('invisible');
    but1.classList.remove('invisible');
    but2.classList.remove('invisible');
  }
  else{
    cal.classList.add('invisible');
    but1.classList.add('invisible');
    but2.classList.add('invisible');
  }
}
