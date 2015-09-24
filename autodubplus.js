var autoDub = {
	started: false,
	version: "00.02"
}
var userList= [];

autoDub.userEnterLeave = function() {

	nowUsers = autoDub.getUsers();

	$.each(nowUsers, function(index, user) {
		if (nowUsers.length > userList.length)
		{
			entertext = " Entered!";		
		} else {
			entertext = " Left!";
		}

		if ($.inArray(user, userList) == -1)
		{
			console.log(user + entertext);
			$("#robmsgs").html(user + entertext);
		}
	});
}

autoDub.getUsers = function()
{
	users = [];
	$("#avatar-list li p").each(function(one, thing) { 

	if (thing.className == 'username')
	{
		users.push($(thing).html());
	}
	
	});

	return users;
}

autoDub.newSong = function(){
	var songName = $(".currentSong").text();
	if (songName == "loading...") return;
	$(".dubup").click();
	console.log("voted for "+songName);
};

autoDub.init = function(){
	$('.currentSong').bind("DOMSubtreeModified", autoDub.newSong);
	
	$(".dubup").click();

		
	$('.currentSong').bind("DOMSubtreeModified", autoDub.userEnterLeave);

	userList = autoDub.getUsers();
	$("#pusher-chat-widget-input").append(
			"<p><div id='robmsgs' style='color:red;'></div></p>"
	);

	console.log("autodub v"+autoDub.version+" is a go!");
};

if (!autoDub.started) autoDub.init();
