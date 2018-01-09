// Wait for all to load
window.onload = function() {
	
	$(document).ready(function() {

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDEKpOZoE7BIK-zIo4chy4rJmoLn2qDfC4",
	authDomain: "trainschedule-fc255.firebaseapp.com",
	databaseURL: "https://trainschedule-fc255.firebaseio.com",
	projectId: "trainschedule-fc255",
	storageBucket: "trainschedule-fc255.appspot.com",
	messagingSenderId: "40161400689"
};

firebase.initializeApp(config);

var trainName = "";
var trainDestination = "";	
var trainFirstTimeDeparture="00:00";
var trainFrequency = 0;
var nextArrival="00:00";
var	minutesAway=0;	    

// From the input form, get the values and add to Firebase
$("#addTrainButton").on("click",function(event){
	event.preventDefault();
	trainName = $("#inputTrainName").val().trim();
	trainDestination = $("#inputTrainDestination").val().trim();
	trainFirstTimeDeparture = $("#inputTrainFirstTimeDeparture").val().trim();
	trainFrequency = $("#inputTrainFrequency").val().trim();
	firebase.database().ref().push({
		trainName: trainName,
		trainDestination: trainDestination,
		trainFirstTimeDeparture: trainFirstTimeDeparture,
		trainFrequency: trainFrequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// Calculate the nextArrival and MinutesAway using NOW and first time departure
// trainFirstTimeDeparture
// nextArrival
// minutesAway

// Whenever a train is added to the firebase db, append a table row to the html
firebase.database().ref().on("child_added",function(snapshot){
	$("#trainScheduleBody").append("<tr><td>" + snapshot.val().trainName + 
		"</td><td>" +  snapshot.val().trainDestination + 
		"</td><td>" + snapshot.val().trainFrequency + 
		"</td><td>" +  nextArrival + 
		"</td><td>" +  minutesAway + 
		"</td></tr>");
});

});
}