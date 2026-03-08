<div class="locationBox">

<h3>अपनी लोकेशन चुनें</h3>

<input 
type="number" 
id="pincodeInput" 
placeholder="PIN Code डालें" 
onkeyup="loadVillages()" 
maxlength="6"
>

<br><br>

<select id="villageSelect">

<option value="">पहले PIN Code डालें</option>

</select>

</div>


<script>

/* PIN Code से गाँव लोड */

async function loadVillages() {

let pin = document.getElementById("pincodeInput").value;
let villageSelect = document.getElementById("villageSelect");

if(pin.length === 6){

villageSelect.innerHTML = "<option>गाँव लोड हो रहे हैं...</option>";

try{

const response = await fetch("https://api.postalpincode.in/pincode/" + pin);

const data = await response.json();

if(data[0].Status === "Success"){

let villages = data[0].PostOffice;

villageSelect.innerHTML = "<option value=''>अपना गाँव चुनें</option>";

villages.forEach(place => {

let option = document.createElement("option");

option.value = place.Name;

option.text = place.Name + " (" + place.Block + ")";

villageSelect.appendChild(option);

});

}else{

villageSelect.innerHTML = "<option>पिनकोड नहीं मिला</option>";

alert("पिनकोड सही नहीं है");

}

}catch(error){

console.log(error);

}

}

}

</script>
