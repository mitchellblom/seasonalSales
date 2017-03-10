/////////////// REFERENCES /////////////////////

var output = document.getElementById("output");
var myRequest = new XMLHttpRequest();



////////////// EXECUTIONS //////////////////////

function categoriesDom(xhrData) { //xhrData comes from makeDom(data) in the executeCategories function
    var categoryString = "";
    var categories = "";

    for (var i = 0; i < xhrData.categories.length; i++) {
        categories = xhrData.categories[i];
        categoryString += `<div class="departments">`;
        categoryString += `<div>${categories.name}</div>`;
        categoryString += `<div>${categories.season_discount}</div>`;
        categoryString += `<div>${categories.discount}</div>`;
        categoryString += `</div>`;
    }
		output.innerHTML = categoryString;
}

function executeCategories() {
    var data = JSON.parse(this.responseText);
    categoriesDom(data);
}

function executeFailure() {
    output.innerHTML = "Looks like the store site is down. Please check back later.";
}

///////////// REQUESTS /////////////////////////

myRequest.addEventListener("load", executeCategories);
myRequest.addEventListener("error", executeFailure);
myRequest.open("GET", "categories.json");
myRequest.send();