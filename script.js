// ===============================
// REGISTER USER
// ===============================

function registerUser(){

let name = document.getElementById("name").value;
let mobile = document.getElementById("mobile").value;
let type = document.getElementById("type").value;
let work = document.getElementById("work").value;
let city = document.getElementById("city").value;

if(name=="" || mobile=="" || type=="" || city==""){
alert("Please fill all details");
return;
}

let id = Date.now();

firebase.database().ref("users/"+id).set({
name:name,
mobile:mobile,
type:type,
work:work,
city:city
});

alert("Registration Successful");

window.location.href="login.html";

}



// ===============================
// LOGIN USER
// ===============================

function loginUser(){

let mobile = document.getElementById("loginMobile").value;

firebase.database().ref("users").once("value",(snapshot)=>{

let data = snapshot.val();
let found = false;

for(let key in data){

if(data[key].mobile == mobile){

found = true;

localStorage.setItem("mobile",mobile);
localStorage.setItem("user",JSON.stringify(data[key]));

alert("Login Successful");

window.location.href="index.html";

}

}

if(!found){
alert("User Not Found");
}

});

}



// ===============================
// LOAD WORKERS
// ===============================

function loadWorkers(){

let workerBox = document.getElementById("workerList");

if(!workerBox) return;

firebase.database().ref("users").on("value",(snapshot)=>{

let data = snapshot.val();
let html="";

for(let key in data){

let user = data[key];

if(user.type=="worker"){

html += `
<div class="card">

<b>Name:</b> ${user.name}<br>

<b>Work:</b> ${user.work}<br>

<b>City:</b> ${user.city}<br>

<b>Mobile:</b> ${user.mobile}<br>

<button onclick="hireWorker('${user.mobile}','${user.work}','${user.city}')">
Hire Worker
</button>

</div>
`;

}

}

workerBox.innerHTML = html;

});

}



// ===============================
// HIRE WORKER
// ===============================

function hireWorker(workerMobile,work,city){

let customerMobile = localStorage.getItem("mobile");

if(!customerMobile){
alert("Please login first");
return;
}

let id = Date.now();

firebase.database().ref("hire_requests/"+id).set({

workerMobile:workerMobile,
customerMobile:customerMobile,
work:work,
city:city,
status:"pending"

});

alert("Hire Request Sent");

}



// ===============================
// WORKER REQUESTS
// ===============================

function loadWorkerRequests(){

let workerMobile = localStorage.getItem("mobile");

let requestContainer = document.getElementById("requestList");

if(!requestContainer) return;

firebase.database().ref("hire_requests").on("value",(snapshot)=>{

let html="";

snapshot.forEach((data)=>{

let req = data.val();

if(req.workerMobile == workerMobile){

html += `
<div class="card">

<b>Customer:</b> ${req.customerMobile}<br>

<b>Work:</b> ${req.work}<br>

<b>City:</b> ${req.city}<br>

<b>Status:</b> ${req.status}<br>

<button onclick="acceptRequest('${data.key}')">Accept</button>

<button onclick="rejectRequest('${data.key}')">Reject</button>

</div>
`;

}

});

requestContainer.innerHTML = html;

});

}



function acceptRequest(id){

firebase.database().ref("hire_requests/"+id).update({
status:"accepted"
});

alert("Request Accepted");

}



function rejectRequest(id){

firebase.database().ref("hire_requests/"+id).update({
status:"rejected"
});

alert("Request Rejected");

}



// ===============================
// LOAD COMPANIES
// ===============================

function loadCompanies(){

let box = document.getElementById("companyList");

if(!box) return;

firebase.database().ref("users").on("value",(snapshot)=>{

let data = snapshot.val();
let html="";

for(let key in data){

let user=data[key];

if(user.type=="company"){

html += `
<div class="card company">

<b>Company:</b> ${user.name}<br>

<b>City:</b> ${user.city}<br>

<b>Mobile:</b> ${user.mobile}

</div>
`;

}

}

box.innerHTML = html;

});

}



// ===============================
// LOAD CUSTOMERS
// ===============================

function loadCustomers(){

let box = document.getElementById("customerList");

if(!box) return;

firebase.database().ref("users").on("value",(snapshot)=>{

let data = snapshot.val();
let html="";

for(let key in data){

let user=data[key];

if(user.type=="customer"){

html += `
<div class="card">

<b>Name:</b> ${user.name}<br>

<b>City:</b> ${user.city}<br>

<b>Mobile:</b> ${user.mobile}

</div>
`;

}

}

box.innerHTML = html;

});

}



// ===============================
// POST ADVERTISEMENT
// ===============================

function postAd(){

let businessName = document.getElementById("businessName").value;
let title = document.getElementById("title").value;
let description = document.getElementById("description").value;
let city = document.getElementById("city").value;
let mobile = document.getElementById("mobile").value;

if(businessName=="" || title=="" || city=="" || mobile==""){
alert("Please fill all fields");
return;
}

let id = Date.now();

firebase.database().ref("advertisements/"+id).set({

businessName:businessName,
title:title,
description:description,
city:city,
mobile:mobile

});

alert("Advertisement Posted");

window.location.href="index.html";

}



// ===============================
// LOAD ADS
// ===============================

function loadAds(){

let adBox = document.getElementById("adsBox");

if(!adBox) return;

firebase.database().ref("advertisements").on("value",(snapshot)=>{

let data = snapshot.val();
let html="";

for(let key in data){

let ad = data[key];

html += `
<div class="card shop">

<b>Advertisement</b><br>

<b>Business:</b> ${ad.businessName}<br>

<b>Title:</b> ${ad.title}<br>

<b>Description:</b> ${ad.description}<br>

<b>City:</b> ${ad.city}<br>

<b>Mobile:</b> ${ad.mobile}

</div>
`;

}

adBox.innerHTML = html;

});

}



// ===============================
// PAGE LOAD
// ===============================

window.onload=function(){

loadWorkers();
loadCustomers();
loadCompanies();
loadAds();
loadWorkerRequests();

}



// ===============================
// SEARCH SYSTEM
// ===============================

function searchData(){

let search = document.getElementById("searchInput").value.toLowerCase();

firebase.database().ref("users").once("value",(snapshot)=>{

let data = snapshot.val();

let workerHTML="";
let companyHTML="";
let shopHTML="";

for(let key in data){

let user=data[key];

let name=(user.name||"").toLowerCase();
let work=(user.work||"").toLowerCase();
let city=(user.city||"").toLowerCase();

if(name.includes(search) || work.includes(search) || city.includes(search)){

if(user.type=="worker"){

workerHTML += `
<div class="card">

<b>Name:</b> ${user.name}<br>

<b>Work:</b> ${user.work}<br>

<b>City:</b> ${user.city}<br>

<b>Mobile:</b> ${user.mobile}

</div>
`;

}

if(user.type=="company"){

companyHTML += `
<div class="card company">

<b>Company:</b> ${user.name}<br>

<b>City:</b> ${user.city}<br>

<b>Mobile:</b> ${user.mobile}

</div>
`;

}

if(user.type=="shop"){

shopHTML += `
<div class="card shop">

<b>Shop:</b> ${user.name}<br>

<b>Category:</b> ${user.work}<br>

<b>City:</b> ${user.city}<br>

<b>Mobile:</b> ${user.mobile}

</div>
`;

}

}

}

document.getElementById("workerList").innerHTML=workerHTML;
document.getElementById("companyList").innerHTML=companyHTML;
document.getElementById("shopList").innerHTML=shopHTML;

});

}
