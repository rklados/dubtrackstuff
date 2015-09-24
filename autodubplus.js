var autoDub = {
	started: false,
	version: "00.02"
}
var userList= [];

autoDub.userEnterLeave = function() {

	nowUsers = autoDub.getUsers();
	
	if (nowUsers.length > userList.length)
	{
		entertext = "Heya @";		
	} else {
		entertext = "seeya @";
	}

	if (autodub.notInList(nowUsers, userList) || autodub.notInList(userList, nowUsers))
	{
			console.log(user + entertext);
			$("#chat-txt-message").val(entertext + user + "!");
	}

	userList = nowUsers;
}
autoDub.notInList = function(listLoop, listCompare)
{
	$.each(listLoop, function(index, item) {
		if ($.inArray(item, listCompare) == -1)
		{
			return item;
		}
	});
	return false;
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

	console.log("autodub v"+autoDub.version+" is a go!");
};

if (!autoDub.started) autoDub.init();
