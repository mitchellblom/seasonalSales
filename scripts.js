/////////////// REFERENCES /////////////////////

var output = document.getElementById("output");
var myRequest = new XMLHttpRequest();



////////////// EXECUTIONS //////////////////////

function categoriesDom(xhrData) { //xhrData comes from makeDom(data) in the executeCategories function
    var catString = "";
    var categories = "";

    for (var i = 0; i < xhrData.categories.length; i++) {
        console.log("dept loop works");
        categories = xhrData.categories[i];
    }
        catString += `<div>${categories.name}</div>`;
		output.innerHTML = catString;
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