function printName()  {
  const name = document.getElementById('name').value;
  if(name!="southkorea"){
    //alert("Password is Wrong!");
  }
  else{
    location.replace('correct.html');
  }
}
