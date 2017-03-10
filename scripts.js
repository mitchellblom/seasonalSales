/////////////// REFERENCES /////////////////////

var output = document.getElementById("output");
var deptRequest = new XMLHttpRequest();
var prodRequest = new XMLHttpRequest();


////////////// DEPT DATA TO DOM //////////////////////

function categoriesDom(xhrData) { //xhrData comes from makeDom(data) in the executeCategories function
    var categoryString = "";
    var categories = "";

    for (var i = 0; i < xhrData.categories.length; i++) {
        categories = xhrData.categories[i];
        categoryString += `<div class="departments">`;
        categoryString += `<div>${categories.name}</div>`;
        categoryString += `<div id="${categories.name}"></div>`;
        categoryString += `<div id="${categories.season_discount}"></div>`;
        categoryString += `<div>${categories.discount}</div>`;
        categoryString += `</div>`;
    }
		output.innerHTML = categoryString;
}

////////////// PRODUCT DATA TO DOM /////////////////

function productDomSwitch(data) {
	var apparel = document.getElementById("Apparel");
	var furniture = document.getElementById("Furniture");
	var apparel = document.getElementById("Household");

	var appString = "";
	var furnString = "";
	var houseString = "";

	for (var i = 0; i < data.products.length; i++){
			var prodInfo = data.products[i];	
			// console.log(prodInfo);

		switch (prodInfo.category_id){
	        // Apparel
		        case 1:
		            // console.log("Apparel: ", prodInfo.name);
		        break;
	        // Furniture
		        case 2: 
		            // console.log("Furniture: ", prodInfo.name);
		        break;
		    // Household
		        case 3: 
		            // console.log("Household: ", prodInfo.name);
		        break;
	        }
	    }
	};


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

