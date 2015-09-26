
var autoDub = {
	started: false,
	version: "00.02"
}
var userList= [];
var checkUsers = true;

autoDub.test = function()
{
	if (checkUsers == true)
	{
		var newlist = autoDub.getUsers();

		autoDub.testList(newlist, userList, function(user) { if(user) {  $(".chat-main").append("<li>"+user+" joined.</li>");} autoDub.testList(userList, newlist, function(user) { if(user) { $(".chat-main").append("<li>"+user+" left.</li>");} userList = newlist; });});
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
	userList = autoDub.getUsers();
	userCheck = true;
}
autoDub.init = function(){
	$('.currentSong').bind("DOMSubtreeModified", autoDub.newSong);
	
	$(".dubup").click();

		
	$('.room-user-counter').bind("DOMSubtreeModified", autoDub.test);

	userList = autoDub.getUsers();

	$(".room-user-counter").mousedown(function() { userCheck = false; });
	$("loadRoomAva").mousedown(function() { userCheck = true; });
	$(".main-room-active-link").mousedown(function() { autoDub.userReset()});
	

	console.log("autodub v"+autoDub.version+" is a go!");
};

if (!autoDub.started) autoDub.init();
