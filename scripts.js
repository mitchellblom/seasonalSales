/////////////// REFERENCES /////////////////////

var output = document.getElementById("output");
var season = document.getElementById("season");
var deptRequest = new XMLHttpRequest();
var prodRequest = new XMLHttpRequest();
var prodXHRdata = {};

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
        categoryString += `</div>`;
    }
    output.innerHTML = categoryString;
};

////////////// PRODUCT DATA TO DOM /////////////////

function productDomSwitch() {
    var apparel = document.getElementById("Apparel");
    var furniture = document.getElementById("Furniture");
    var household = document.getElementById("Household");

    var appString = "";
    var furnString = "";
    var houseString = "";

    for (var i = 0; i < prodXHRdata.products.length; i++) {
        var prodInfo = prodXHRdata.products[i];
        switch (prodInfo.category_id) {
            case 1:
                appString += `<div>${prodInfo.name}</div>`;
                appString += `<p>$</p>`;
                appString += `<p class="${prodInfo.category_id}">${prodInfo.price}</p>`;
                apparel.innerHTML = appString;
                break;
            case 2:
                furnString += `<div>${prodInfo.name}</div>`;
                furnString += `<p>$</p>`;
                furnString += `<p class="${prodInfo.category_id}">${prodInfo.price}</p>`;
                furniture.innerHTML = furnString;
                break;
            case 3:
                houseString += `<div>${prodInfo.name}</div>`;
                houseString += `<p>$</p>`;
                houseString += `<p class="${prodInfo.category_id}">${prodInfo.price}</p>`;
                household.innerHTML = houseString;
                break;
        }
    }
};


////////////// APPLYING SEASONAL DISCOUNTS ///////////

season.addEventListener("change", function(e) {
    var winterDiscountMe = document.getElementsByClassName(1);

    var autumnDiscountMe = document.getElementsByClassName(2);
    var springDiscountMe = document.getElementsByClassName(3);
    switch (e.target.value) {
        case "Winter":
            productDomSwitch()
            for (var i = 0; i < winterDiscountMe.length; i++) {
                winterPriceToDiscount = winterDiscountMe[i].innerHTML;
                var winterDiscountedPrice = (winterPriceToDiscount * .9);
                winterDiscountMe[i].innerHTML = winterDiscountedPrice.toFixed(2);
            }
            break;
        case "Autumn":
            productDomSwitch()
            for (var i = 0; i < autumnDiscountMe.length; i++) {
                autumnPriceToDiscount = autumnDiscountMe[i].innerHTML;
                var autumnDiscountedPrice = (autumnPriceToDiscount * .9);
                autumnDiscountMe[i].innerHTML = autumnDiscountedPrice.toFixed(2);
            }
            break;
        case "Spring":
            productDomSwitch()
            for (var i = 0; i < springDiscountMe.length; i++) {
                springPriceToDiscount = springDiscountMe[i].innerHTML;
                var springDiscountedPrice = (springPriceToDiscount * .9);
                springDiscountMe[i].innerHTML = springDiscountedPrice.toFixed(2);
            }
            break;
		case "Summer":
            productDomSwitch()
            alert("No Summer discounts are currently available.")
            break;
        case "Select Season":
            productDomSwitch()
            alert("Please select a season to view discounts.")
            break;
    }
});

////////////// EXECUTIONS //////////////////////////

function executeCategories() {
    var data = JSON.parse(this.responseText);
    categoriesDom(data);
};

function executeProducts() {
    var data = JSON.parse(this.responseText);
    prodXHRdata = data;
    productDomSwitch();
};

function executeFailure() {
    output.innerHTML = "Looks like the store site is down. Please check back later.";
};

///////////// REQUESTS /////////////////////////

deptRequest.addEventListener("load", executeCategories);
deptRequest.addEventListener("error", executeFailure);
deptRequest.open("GET", "categories.json");
deptRequest.send();

prodRequest.addEventListener("load", executeProducts);
prodRequest.addEventListener("error", executeFailure);
prodRequest.open("GET", "products.json");
prodRequest.send();