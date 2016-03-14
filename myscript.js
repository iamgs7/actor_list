$(document).ready(function() {
    on_load();
});

function on_load() {
	var item = '',
	remove = '<button id="delete_actor" onclick="remove_actor()" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">'+
            	'<i class="material-icons">delete</i>' +
            '</button>';
	$.ajax({
        url: 'http://localhost:3000/actors',
        type: "GET",
        dataType: 'json',
        success: function (data) {
        	for(var i in data){
          		item = item + '<div class=\"mdl-list__item\">' +
				      '<span class=\"mdl-list__item-primary-content\">' +
				        '<i class=\"material-icons mdl-list__item-avatar\">person</i>' +
				        '<span id=\"'+ data[i].id +'\">' + data[i].name + '</span>' +
				      '</span>';
			    if(data[i].starred === true){
			      	item = item +
			      	'<a class=\"mdl-list__item-secondary-action\" href=\"#\">'+
			      	'<i class=\"material-icons\" onclick=\"star_toggle(true,' + data[i].id +')\">star</i></a>';
			    }
			    else{
			    	item = item +
			      	'<a class=\"mdl-list__item-secondary-action\" href=\"#\">'+
			      	'<i class=\"material-icons" onclick=\"star_toggle(false,' + data[i].id +')\">star_border</i></a>';
			    }
			    item = item + '&nbsp;&nbsp;&nbsp;<button onclick="remove_actor('+ data[i].id +')" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect">'+
            	'<i class="material-icons">delete</i>' +
            	'</button>'+
            	'</div>';
          	}
        $("#actor_list").append(item);
        }
    });

   
}

function add_actor() {
	var actName = $('#actor_name').val(),
	status = false;

    $.ajax({
        url: "http://localhost:3000/actors",
        type: "POST",
        data: JSON.stringify({ "name" : actName.toString(), "starred" : status.toString()}),
        dataType: "json",
        contentType: "application/json",
       	success: function (data) {
        	console.log("Success");
        },
        error: function(thrownError) {
        	console.log("Error in insert");
        }
    });
    $('#actor_list').empty();
    on_load();
}

function remove_actor(act_id) {
    $.ajax({
        url: "http://localhost:3000/actors/" + act_id,
        type: "DELETE",
        success: function (data) {
        	console.log("Deleted");
        },
        error: function(thrownError) {
        	console.log("Error");
        }
    });
    $('#actor_list').empty();
    on_load();
}

function star_toggle(val, act_id){
	var starValue = !val,
	actName = getName(act_id);
    $.ajax({

        url: "http://localhost:3000/actors/" + act_id,
        type: "PUT",
        data: JSON.stringify({ "name" : actName.toString(), "starred" : starValue}),
        dataType: "json",
        contentType: "application/json",
       	success: function (data) {
        	console.log("Success" + starValue);
        },
        error: function(thrownError) {
        	console.log("Error in insert");
        }
    });
    $('#actor_list').empty();
    on_load();
}


function getName(act_id){
	var item = $("#" + act_id).text();
    console.log(item);
    return item;
}