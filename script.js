function showMessage(msg){
alert(msg);
}

function registerUser(){
let name = document.getElementById("name").value;
let mobile = document.getElementById("mobile").value;
let role = document.getElementById("role").value;

if(name=="" || mobile==""){
alert("Please fill all fields");
return;
}

localStorage.setItem("user_name",name);
localStorage.setItem("user_mobile",mobile);
localStorage.setItem("user_role",role);

alert("Registration Successful");

window.location.href="index.html";
}

function logout(){
localStorage.clear();
window.location.href="login.html";
}

function checkLogin(){
let name = localStorage.getItem("user_name");

if(!name){
window.location.href="login.html";
}
}
