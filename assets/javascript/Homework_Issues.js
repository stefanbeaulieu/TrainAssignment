alert('msg');

// var villian 	= $(this).data('villain');
// var queryURL	= "http://api.giphy.com/v1/gifs/search?q=" + villian + "&api_key=dc6zaTOxFJmzC&limit=10&";



//Initial array of Villains
var topics = [
"Disney Villains",
"Marvel Villains",
"Batman Villains",
"Superman Villains",
"Book Villains",
"Lego Villains",
"Super Villains"
];

/***********************************/

//function to get buttons and click events

function getImageData (){
	$('#giphyView').empty();///clear div for next button click

	var villian 	= $(this).data('name');
	var queryURL	= "https://api.giphy.com/v1/gifs/search?q=" + villian + "&api_key=dc6zaTOxFJmzC&limit=10";


	$.ajax({url: queryURL, method: 'GET'})
	.done(function(response){
		var results = response.data;
		console.log(response);

		for(var i=0; i < results.length; i++){
			if(results[i].rating == "r"  || results [i].rating  == "pg-13"){
			}
			else{
			var giphyDiv 	= $('<div class="giphyDiv">');//making results have a new html div
			var rating		= results[i].rating;///geting giphy rating
			var p 			= $('<p>').text("Rating: " + rating);

			var villainsImage = $('<img class="img">');
			villainsImage.attr({
				"src": results[i].images.fixed_height_still.url,
				"data-still": results[i].images.fixed_height_still.url,
				"data-animate": results[i].images.fixed_height.url,
				"data-state": "still"
			});


			giphyDiv.append(p);
			giphyDiv.append(villainsImage);
			// giphyDiv.add("gifs")
			$('#giphyView').append(giphyDiv);
		}
		$('img').on('click', toggleStill);
		}
	});

// //this is the onclick function for buttons
// function toggleStill(){

// 	var state 	=$(this).attr('data-state');
// 		if(state == 'still'){
// 				$(this).attr('src', $(this).data('animate'));
// 			$(this).attr('data-state', 'animate');
// 		} else {
// 			$(this).attr('src', $(this).data('still'));
// 			$(this).attr('data-state', 'still');
// 		}
// 		console.log($(this).attr("src"));

// 	}
// 	/**********************************************/
// 	/*after clicking for giphy it should be frozen*/

// }


// function setUpButtons(){
// 	$('#renderButtons').empty();

// 	for(var i = 0; i < topics.length; i++){
// 		var a = $('<button class="newTopic">');

// 		a.attr('data-name', topics[i]);
// 		a.text(topics[i]);
// 		$('#renderButtons').append(a);
// 	}
// 	$('.newTopic').on('click', getImageData);
// }


// //adding new string item to the topics array
// $('#addGiphy').on('click', function(){
// 	var newTopic = $("#giphy-input").val().trim();
// 	topics.push(newTopic);
// 	setUpButtons();
// 	return false;
// });


}
// setUpButtons();
