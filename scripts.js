/////////////// REFERENCES /////////////////////

var output = document.getElementById("output");
var season = document.getElementById("season");
var deptRequest = new XMLHttpRequest();
var prodRequest = new XMLHttpRequest();


////////////// DEPT DATA TO DOM //////////////////////

function categoriesDom(xhrData) { //xhrData comes from makeDom(data) in the executeCategories function
    var categoryString = "";
    var categories = "";

    for (var i = 0; i < xhrData.categories.length; i++) {
        categories = xhrData.categories[i];
        categoryString += `<div class="departments">`;
        categoryString += `<h4>${categories.name}</h4>`;
        categoryString += `<div id="${categories.name}"></div>`;
        categoryString += `<div id="${categories.season_discount}"></div>`;
        // categoryString += `<p>${categories.discount}</p>`;
        categoryString += `</div>`;
    }
		output.innerHTML = categoryString;
}

////////////// PRODUCT DATA TO DOM /////////////////

function productDomSwitch(data) {
	var apparel = document.getElementById("Apparel");
	var furniture = document.getElementById("Furniture");
	var household = document.getElementById("Household");

	var appString = "";
	var furnString = "";
	var houseString = "";

	for (var i = 0; i < data.products.length; i++){
			var prodInfo = data.products[i];	
			// console.log(prodInfo);

		switch (prodInfo.category_id){
		        case 1:
		            appString += `<div>${prodInfo.name}</div>`;
		            appString += `<p>$ ${prodInfo.price}</p>`;
		            apparel.innerHTML = appString;
		        break;
		        case 2:
		            furnString += `<div>${prodInfo.name}</div>`;
		            furnString += `<p>$ ${prodInfo.price}</p>`;
		            furniture.innerHTML = furnString;
		        break;
		        case 3: 
		            houseString += `<div>${prodInfo.name}</div>`;
		            houseString += `<p id=${prodInfo.season_discount}>$ ${prodInfo.price}</p>`;
		            household.innerHTML = houseString;
		        break;
	        }
	    }
	};


////////////// APPLYING SEASONAL DISCOUNTS ///////////

season.addEventListener("change", function (e) {
	switch (e.target.value){
		        case "Winter":
					console.log("selected winter");
		            // appString += `<div>${prodInfo.name}</div>`;
		            // appString += `<p>$ ${prodInfo.price}</p>`;
		            // apparel.innerHTML = appString;
		        break;
		        case "Autumn":
		        	console.log("selected autumn");
		            // furnString += `<div>${prodInfo.name}</div>`;
		            // furnString += `<p>$ ${prodInfo.price}</p>`;
		            // furniture.innerHTML = furnString;
		        break;
		        case "Spring": 
		       		console.log("selected spring");
		            // houseString += `<div>${prodInfo.name}</div>`;
		            // houseString += `<p>$ ${prodInfo.price}</p>`;
		            // household.innerHTML = houseString;
		        break;
	        }

})



////////////// EXECUTIONS //////////////////////////

function executeCategories() {
    var data = JSON.parse(this.responseText);
    categoriesDom(data);
}

function executeProducts() {
    var data = JSON.parse(this.responseText);
    productDomSwitch(data);
}

function executeFailure() {
    output.innerHTML = "Looks like the store site is down. Please check back later.";
}

///////////// REQUESTS /////////////////////////

deptRequest.addEventListener("load", executeCategories);
deptRequest.addEventListener("error", executeFailure);
deptRequest.open("GET", "categories.json");
deptRequest.send();

prodRequest.addEventListener("load", executeProducts);
prodRequest.addEventListener("error", executeFailure);
prodRequest.open("GET", "products.json");
prodRequest.send();

