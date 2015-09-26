
var autoDub = {
	started: false,
	version: "00.03r"
}
var userList= [];
var checkUsers = true;

autoDub.test = function()
{
	if (checkUsers == true)
	{
		var newlist = autoDub.getUsers();

		autoDub.testList(newlist, userList, function(user) { if(user) {  $(".chat-main").append("<li class='autodub'>"+user+" joined.</li>");} autoDub.testList(userList, newlist, function(user) { if(user) { $(".chat-main").append("<li>"+user+" left.</li>");} userList = newlist; });});
		//autoDub.testList(userList, newlist, function(user) { console.log(user+'otherdiff'); userList = newlist; });
	}
}

autoDub.testList = function(listLoop, listCompare, callback)
{
	console.log('in testList');
	$.each(listLoop, function(index, item) {
		console.log('testing '+item);
		if ($.inArray(item, listCompare) < 0)
		{
			console.log(item+' is not in list');
			callback(item);
			return true;
		} else {
		
		}
	});
	callback(false);
}

autoDub.userEnterLeave = function() {
console.log('original users');
console.log(userList);
	nowUsers = autoDub.getUsers();
	var entertext = '';	
	if (nowUsers.length > userList.length)
	{
		entertext = "Heya @";		
	} else {
		entertext = "seeya @";
	}
console.log(entertext);
	var userEnter = autoDub.notInList(nowUsers, userList);
	var userLeave = autoDub.notInList(userList, nowUsers);
	
	if (userEnter)
	{
		console.log(entertext + userEnter);
		$("#chat-txt-message").val(entertext + userEnter + "!");
	}
	if (userLeave)
	{
		console.log(entertext+userLeave);
		$("#chat-txt-message").val(entertext + userLeave + "!");
	}

	
	console.log('new userlist');
	console.log(userList);
}
autoDub.notInList = function(listLoop, listCompare, callback)
{
	$.each(listLoop, function(index, item) {
		console.log('testing '+item);
		if ($.inArray(item, listCompare) < 0)
		{
			console.log(item+' is not in list');
			callback(item);
		} else {
		
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
autoDub.userReset = function() {
	console.log("in userReset");
	$(".autodub").remove();
	userList = autoDub.getUsers();
	userCheck = true;
}
autoDub.init = function(){
	$('.currentSong').bind("DOMSubtreeModified", autoDub.newSong);
	
	$(".dubup").click();

		
	$('.room-user-counter').bind("DOMSubtreeModified", autoDub.test);

	userList = autoDub.getUsers();

	$(".room-user-counter").mousedown(function() { console.log('room-user-counter'); userCheck = false; });
	$(".loadRoomAva").click(function() { console.log('loadRoomAva'); autoDub.userReset(); });
	$(".main-room-active-link").mousedown(function() { console.log('main-room-active-link'); autoDub.userReset(); });
	

	console.log("autodub v"+autoDub.version+" is a go!");
	$(".chat-main").append("<li class='autodub'>autodub v"+autoDub.version+"is a go!</li>");
};

if (!autoDub.started) autoDub.init();
