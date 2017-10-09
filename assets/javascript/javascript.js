
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
var timerId;
var recipeTitle;


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
	recipesTitles = [];
	recipeImg=[];
	recipeID=[];

	// going to get the title from each result and console log it 

	for(i=0; i<response.results.length; i++){
		////console.log(response.results[i].title);
		recipesTitles.push(response.results[i].title);
		recipeImg.push(response.results[i].image);
		recipeID.push(response.results[i].id);	
	}
	appendTitleAndImages();
	
}

function submitSearch(event){ //this is the function for the submit button on the search form
	// hide search form 
	// display results under the recipes panal 
	$("#ingredient-panel").addClass("hidden");
	$("#recipe-images").empty();
	$("#ingredients").empty();

	console.log("emptied");
	event.preventDefault();
	
	var SearchQueryParameter = $("#ingredient-text").val().trim();
	var cuisine = $("#cuisine-text").val().trim();
	var searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + SearchQueryParameter; 
	var selectedRadioButton;

	//both the cuisine filter and checkboxes are populated
	if(!cuisine == "" && $('input[name=type]:checked').length > 0){
		selectedRadioButton = $('input[name=type]:checked').val();
		searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="+ SearchQueryParameter +"&cuisine=" + cuisine +"&type="+ selectedRadioButton;
		//console.log(searchQueryURL);
	}
	// if just the cuisine filter is filled out 
	else if(!cuisine == ""){
		searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="+ SearchQueryParameter +"&cuisine=" + cuisine;
		//console.log(searchQueryURL);
	}
	// if just the checkbox filter is selected 
	else if($('input[name=type]:checked').length > 0){
		selectedRadioButton = $('input[name=type]:checked').val();
		searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="+ SearchQueryParameter +"&type=" + selectedRadioButton;
		//console.log(searchQueryURL);
	}

	// if no filters are selected 
	ajax(searchQueryURL, apiKey, searchRecipesCallback);
	console.log("searched");

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
		imgTag.attr("data-recipe-title",recipesTitles[i]);
		titleDiv.text(recipesTitles[i]);
		imgContainer.append(imgDiv);
		imgTag.attr("data-recipe-id",recipeID[i]);
		imgDiv.append(imgTag);
		$("#recipe-images").append(imgContainer);
	}
	
	$("#recipe-panel").removeClass("hidden");
}

function ingredientBackButton(){
	$("#recipe-panel").removeClass("hidden");
	$("#ingredient-panel").addClass("hidden");
	$("#ingredients").empty();

}

$("#submit").on("click", submitSearch);
$("#ingredient-back-button").on("click", ingredientBackButton);

// Walmart API search. Note: this search does not work well. Try using UPC lookup instead.
function productSearch(ingredient, ingredientNum){

	//event.preventDefault();
	//var searchQueryParameter = $("#").val().trim();

	var searchQueryURL = "https://cors-anywhere.herokuapp.com/" + 
	                     "http://api.walmartlabs.com/v1/search?" +
	                     "apiKey=z5m92qf29tv7u76f4vaztra4" +
	                     "&categoryId=976759" +
	                     "&query=" + ingredient; 

	$.ajax({
      url: searchQueryURL,
      method: "GET",
      headers: {	
       	"X-Requested-With": "XMLHttpRequest"
	  }      
    }).done(function(response){

    	console.log(response);

    	for(var i=0; i<response.items.length; i++){

		   var name = response.items[i].name;
		   var imgUrl = response.items[i].thumbnailImage;
		   var price = response.items[i].salePrice;

		   addItemToCarousel(ingredientNum, name, imgUrl);
		}
    });
}

// Walmart API lookup by UPC.
function productLookup(upc, ingredientNum){
                         
	var searchQueryURL = "https://cors-anywhere.herokuapp.com/" + 
	                     "http://api.walmartlabs.com/v1/items?apiKey=" +
	                     "z5m92qf29tv7u76f4vaztra4" +
	                     "&upc=" + upc;

      /*dataType: "json",
      indexValue: {upc: upc, ingredientNum: ingredientNum},
      jsonpCallback: "productLookupCallback",
      headers: {	
       	"Content-Type": "application/jsonp",
       	"X-Requested-With": "XMLHttpRequest"
	  }*/

	$.ajax({
      url: searchQueryURL,
      method: "GET",
      headers: {	
       	"X-Requested-With": "XMLHttpRequest"
	  }
    }).done(function(response){

        //console.log("UPC response "+upc);
    	//console.log(response);

        if(typeof(response.items) !== 'undefined'){
        	//if(typeof(response.items[0].salePrice) !== 'undefined'){

		    	//var price = response.items[0].salePrice;
		    	var name = response.items[0].name;
		    	var imgUrl = response.items[0].thumbnailImage;

		    	addItemToCarousel(ingredientNum, name, imgUrl);
	    	//}
    	}

    });
}

// Get products and UPC codes for each ingredient.
function ingredientsToProduct(ingredientNames){

    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/map",
      method: "POST",
      headers: {	
      	"X-Mashape-Key": apiKey,
      	"Content-Type": "application/json",
		"Accept": "application/json"
		},
	  data: JSON.stringify({
	  	"ingredients": ingredientNames,
	  	"servings": 1
	  }),
	  processData: false,
	  dataType: "json"
    }).done(function(response) {

        //console.log("ingredients to product results");
    	//console.log(response);
    	var limit = 5;
    	var delay = 0;
    	for(var i=0; i<response.length; i++){
    		var n = response[i].products.length;

    		for(var j=0; j<n && j<limit; j++){
    			if(typeof(response[i].products[j]) !== 'undefined'){

	    			var upc = response[i].products[j].upc;

	    			delay += 500;

	    			timerId = setTimeout(productLookup, delay, upc, i);
    			}
    		}
    		$("#ingredient_"+i).append(createCarousel(i));
    	}

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
    	//console.log(response)
    });
}

$("#recipe-images").on("click","img",function(event){

	event.preventDefault();
	var recipeID = $(this).attr("data-recipe-id");
	recipeTitle = $(this).attr("data-recipe-title");


	$.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids="+recipeID+"&includeNutrition=false",
      method: "GET",
      headers: {	
      	"X-Mashape-Key": apiKey,
      	"Content-Type": "application/json",
		}
    }).done(function(response) {

    	//console.log(response); 	
    	
    	//Store the ingredients in array.
    	var ingredientsList=[];
    	var ingredientNames=[];
    	for(var i=0; i < response[0].extendedIngredients.length; i++){

    		ingredientsList.push(response[0].extendedIngredients[i].originalString);
    		ingredientNames.push(response[0].extendedIngredients[i].name);
    	}

    	//Add the ingredients to the page.
    	createIngredientList(ingredientsList);

    	//Lookup the UPCs for each ingredient.
    	//ingredientsToProduct(ingredientNames);
    	var limit = 5;
    	var delay = 0;
    	for(var i=0; i<ingredientNames.length; i++){
 
			var name = ingredientNames[i];

			delay += 500;

			timerId = setTimeout(productSearch, delay, name, i);
    		$("#ingredient_"+i).append(createCarousel(i));
    	}

    	//Add the recipe to the page.
		var recipe = response[0].instructions;
    	recipeDiv = $("<div>");
		recipeDiv.html("<br><h3><strong>Recipe: </h3></strong><br><p>"+recipe+"</p>");
		$("#ingredients").append(recipeDiv);   
		
    });
})

function createIngredientList(ingredientsList){
	
	$("#ingredients").html(recipeTitle);
	for(var i=0; i < ingredientsList.length; i++){

		ingredientDiv = $("<div>");
		ingredientDiv.html(ingredientsList[i]);
		ingredientDiv.attr("id", "ingredient_"+i);

		ingredientDiv.css("min-height", "160px");
		$("#ingredients").append(ingredientDiv);
	}
	$("#recipe-panel").addClass("hidden");
	$("#ingredient-panel").removeClass("hidden");

}


function createCarousel(i){

    var id = "carousel_" + i;
	var outerDiv = $("<div class='carousel slide' data-ride='carousel'>")
    outerDiv.attr("id", id);

    var oList = $("<ol class='carousel-indicators'>");
    outerDiv.append(oList);

    var innerDiv = $("<div class='carousel-inner'>");
    outerDiv.append(innerDiv);

    outerDiv.append("<a class='left carousel-control' href='#carousel_" + i + 
    	"' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left'>");
	outerDiv.append("<a class='right carousel-control' href='#carousel_" + i + 
	    	"' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right'>");

	return outerDiv;
 }

function addItemToCarousel(cNum, caption, url){

	//console.log("Adding " + caption + "to carousel #" + cNum);

	var id = "#carousel_" + cNum;
	var listIndex = $(id).children(".carousel-indicators").children().length;
	var active = "";
	if(listIndex === 0){
		active = "active";
	}
	$(id).children(".carousel-indicators").append("<li data-target='" + id +
	            "' data-slide-to='"+listIndex+"' class='"+active+"'></li>");


	var item = $("<div class='item "+active+"'></div>");
    item.append("<img class='carousel-image' src='"+url+"' alt=''>");
    var divCap = $("<div class='c-caption'></div>");
    divCap.append("<h2><strong>"+caption+"</strong></h2>");
    item.append(divCap);

    $(id).children(".carousel-inner").append(item);
}
