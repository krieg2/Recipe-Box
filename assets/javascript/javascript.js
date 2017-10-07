
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
var recipeID=[];
var baseURI;
var ingredientsList=[];





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
	// put stuff to firebase
	// TODO - we should delete the object from the previous search and put in the new one. 
	database.ref("search").set({
		response
	})

	baseURI = response.baseUri;

	// going to get the title from each result and console log it 
	for(i=0; i<response.results.length; i++){
		//console.log(response.results[i].title);
		recipesTitles.push(response.results[i].title);
		recipeImg.push(response.results[i].image);
		recipeID.push(response.results[i].id);	
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
	var selectedCheckbox = whichCheckedBoxChecked();

	//both the cuisine filter and checkboxes are populated
	if(!cuisine == "" && selectedCheckbox>0){
		searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="+ SearchQueryParameter +"&cuisine=" + cuisine +"&type="+ joinedSelectedCheckboxes;;
		console.log(searchQueryURL);
	}
	// if just the cuisine filter is filled out 
	else if(!cuisine == ""){
		searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="+ SearchQueryParameter +"&cuisine=" + cuisine;
		console.log(searchQueryURL);
	}
	// if just the checkbox filter is selected 
	else if(selectedCheckbox.length>0){
		var joinedSelectedCheckboxes = selectedCheckbox.join();
		searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="+ SearchQueryParameter +"&type="+ joinedSelectedCheckboxes;
		console.log(searchQueryURL);

	}

	// if no filters are selected 
	ajax(searchQueryURL, apiKey, searchRecipesCallback);

}

// makes an array of what checkboxes are filled out
function whichCheckedBoxChecked(){
	var selectedCheckbox = [];
	if($("#breakfast").is(":checked")){
		selectedCheckbox.push("breakfast");
	}
	if($("#lunch").is(":checked")){
		selectedCheckbox.push("lunch");
	}
	if($("#dinner").is(":checked")){
		selectedCheckbox.push("dinner");
	}
	if($("#desserts").is(":checked")){
		selectedCheckbox.push("desserts");
	}
	return selectedCheckbox; 
}

function appendTitleAndImages(){
	for(var i=0;i<recipesTitles.length;i++){
		var imgContainer = $('<div>');
		var imgDiv = $('<div>');
		var titleDiv = $('<div>');
		var imgTag = $('<img >');
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
		imgTag.attr("data-recipe-id",recipeID[i]);
		imgDiv.append(imgTag);
		$("#recipe-images").append(imgContainer);
	}
	
	$("#recipe-panel").removeClass("hidden");
}

$("#submit").on("click", submitSearch);

// Walmart API search.
function productSearch(event){

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

$("#recipe-images").on("click","img",function(event){
	event.preventDefault();
	var recipeID = $(this).attr("data-recipe-id");
	console.log("hi");
	$.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids="+recipeID+"&includeNutrition=false",
      method: "GET",
      headers: {	
      	"X-Mashape-Key": apiKey,
      	"Content-Type": "application/json",
		},
    }).done(function(response) {
    	for(var i=0;i<response[0].extendedIngredients.length;i++){
    		ingredientsList.push(response[0].extendedIngredients[i].originalString);

    	}
    	createIngredientList();
    	
    });
})



function createIngredientList(){
	
	for(var i=0;i<ingredientsList.length;i++){
		ingredientDiv = $("<div>");
		ingredientDiv.html(ingredientsList[i]);
		$("#ingredients").append(ingredientDiv);
	}
	$("#recipe-panel").addClass("hidden");
	$("#ingredient-panel").removeClass("hidden");


}
