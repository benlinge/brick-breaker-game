function get_scores() {//Function to get list of scores from the storage
	var scores = localStorage.getItem('scores');//returns value that has been stored
	if(scores == null) {
		scores = [];//Empty array if nothing is entered.
	} else {
		scores = JSON.parse(scores);//names parsed using Json
	}
	return scores;//returns scores from the storage API
}

function new_record(ev) {//new score function
	ev.preventDefault();//prevents the default action
	
	var form = $(this);//selects the form
	var new_name = form.find('input[name=player_name]');//gets name from the input field within the form
	var new_score = $("#score").find('input[name=score]');//gets score from the input field within the form
	var new_bleft= $("#score").find('input[name=ballsleft]');//gets balls left from the input field within the form
	var new_time = $("#score").find('input[name=seconds]');//gets time from the input field within the form
	var new_destroyed = $("#score").find('input[name=destroyed]');//gets bricks destroyed from the input field within the form
	var new_id = 0;//each name has an id so they can be listed
	
	var scores = get_scores();//uses the get_scores function to load names from storage
	for(var idx = 0; idx < scores.length; idx++) {//for loop to iterate over the existing scores and set the new id of the new scores
		new_id = Math.max(new_id, scores[idx].id + 1);//Gets the new latest score using its highest id
	}
	scores.push({id: new_id, name1: new_name.val(), score1: new_score.val(), bleft1: new_bleft.val(), time1: new_time.val(), destroyed1: new_destroyed.val()});//.push to add score to the array
	localStorage.setItem('scores', JSON.stringify(scores));//setItem() function to store score in 'scores' local storage and JSON.stringify to turn objects into a string.
	
	$('#score_list').append('<li>' + new_name.val() + ': ' + new_score.val() + '| ' +  new_bleft.val() + '| ' + new_time.val()+ '| ' +  new_destroyed.val() + '</li>');
	new_name.val('');//adds values to the area on the page as new list item
}

function load_initial() {//Function to add vlaues when page loads
	var scores = get_scores();//uses the get_scores function to load names from storage
	for(var idx = 0; idx < scores.length; idx++) {//for loop to populate the list of scores
			$('#score_list').append('<li>' + scores[idx].name1 + ': ' + scores[idx].score1 + '| ' +  scores[idx].bleft1 + '| ' +  scores[idx].time1 + '| ' +  scores[idx].destroyed1 + '</li>'
);//adds values to the area on the page as new list item
	}	
}
	
$(document).ready(function() {//Ready function
	if(Modernizr.localstorage) {
		$('#new').on('submit', new_record);//Click event listener with event handler "new_name" function
		load_initial();
	}
});
