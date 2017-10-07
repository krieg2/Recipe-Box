
var config = {
	apiKey: "AIzaSyCZV0Z65ENjbB4eYBkBxwa6fg6chRH3iec",
	authDomain: "testproject-df5f0.firebaseapp.com",
	databaseURL: "https://testproject-df5f0.firebaseio.com",
	projectId: "testproject-df5f0",
	storageBucket: "testproject-df5f0.appspot.com",
	messagingSenderId: "815993396775"
};
firebase.initializeApp(config);

var database = firebase.database();

var searchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="
var apiKey = "rnhXAWLOK1mshe92gRq8upcR4GQap1kYjhnjsnG92yzGgZRARJ";
var recipesTitles = [];
var recipeImg=[];
var baseURI;



function ajax(URL, APIkey, CALLBACK){ //ajax function for search recipes 

	$.ajax({
      url: URL,
      method: "GET",
      headers: {	
      	"X-Mashape-Key": APIkey,
		"Accept": "application/json"
		}
    }).done(CALLBACK);
}

function searchRecipesCallback(response){ //this is the callback function for the ajax search recipes 
	console.log(response);
	// put stuff to firebase
	// TODO - we should delete the object from the previous search and put in the new one. 
	database.ref("search").set({
		response
	})

	baseURI = response.baseUri;
	console.log(baseURI);

	// going to get the title from each result and console log it 
	for(i=0; i<response.results.length; i++){
		//console.log(response.results[i].title);
		recipesTitles.push(response.results[i].title);
		recipeImg.push(response.results[i].image);
	}

	appendTitleAndImages();
	
}

function submitSearch(event){ //this is the function for the submit button on the search form
	// hide search form 
	// display results under the recipes panal 
	event.preventDefault();
	var SearchQueryParameter = $("#ingredient-text").val().trim();
	var cuisine = $("#cuisine-text").val().trim();
	var searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + SearchQueryParameter; 

	ajax(searchQueryURL, apiKey, searchRecipesCallback);



}

function appendTitleAndImages(){
	for(var i=0;i<recipesTitles.length;i++){
		var imgContainer = $('<div>');
		var imgDiv = $('<div>');
		var titleDiv = $('<div>');
		var imgTag = $('<img>');
		imgContainer.addClass("image-container");
		imgTag.attr("src", baseURI+recipeImg[i]);
		imgTag.attr("width", 200);
		imgTag.addClass("img-fluid");
		imgDiv.append(imgTag);
		imgDiv.addClass("image-div");
		imgContainer.append(titleDiv);
		titleDiv.addClass("image-title");
		titleDiv.text(recipesTitles[i]);
		imgContainer.append(imgDiv);
		console.log(baseURI+recipeImg[i])
		console.log(imgDiv);
		$("#recipe-images").append(imgContainer);
	}
	
	$("#recipe-panel").removeClass("hidden");
}

$("#submit").on("click", submitSearch);

// Walmart API search. Note: this search does not work well. Try using UPC lookup instead.
/*function productSearch(event){

	event.preventDefault();
	var searchQueryParameter = $("#").val().trim();

	var searchQueryURL = "http://api.walmartlabs.com/v1/search?" +
	                     "apiKey=z5m92qf29tv7u76f4vaztra4" +
	                     "&categoryId=976759" +
	                     "&query=" + searchQueryParameter; 

	$.ajax({
      url: searchQueryURL,
      method: "GET"
    }).done(function(response){
    	//
    });
}*/

// Walmart API lookup by UPC.
function productLookup(event){

	//event.preventDefault();
	var searchUPC = $("#").val().trim();

	var searchQueryURL = "http://api.walmartlabs.com/v1/items?apiKey=" +
	                     "z5m92qf29tv7u76f4vaztra4" +
	                     "&upc=" + searchUPC;

	$.ajax({
      url: searchQueryURL,
      method: "GET"
    }).done(function(response){

    	console.log(response);

    	var price = response.items.salePrice;
    	var name = response.items.name;
    	var imgUrl = response.items.thumbnailImage;

    	var imgTag = $("<img>");
    	var imgDiv = $("<div>");
    	imgDiv.text(name + " : " + price);
    	imgTag.attr("src", imgUrl);
    	imgDiv.append(imgTag);
    	$("#shopping-cart").append(imgContainer);


    	//$("#shopping-panel").removeClass("hidden");

    });
}

// Get products for ingredient.
function ingredientToProduct(event){

    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/map",
      method: "POST",
      headers: {	
      	"X-Mashape-Key": apiKey,
      	"Content-Type": "application/json",
		"Accept": "application/json"
		},
	  data: JSON.stringify({
	  	"ingredients": ["eggs"],
	  	"servings": 2
	  }),
	  processData: false,
	  dataType: "json"
    }).done(function(response) {
    	console.log(response)
    });
}

//Get recipe information.
function recipeIngredients(event){
    var s = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" +
         "583672" + "/information";
	$.ajax({
      url: s,
      method: "GET",
      headers: {	
      	"X-Mashape-Key": apiKey,
		"Accept": "application/json"
		}
    }).done(function(response) {
    	console.log(response)
    });
}

