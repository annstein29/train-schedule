 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAYAaEN37zFROyo3OWRVvcguPQW20Ecn6I",
    authDomain: "train-schedule-anna.firebaseapp.com",
    databaseURL: "https://train-schedule-anna.firebaseio.com",
    projectId: "train-schedule-anna",
    storageBucket: "",
    messagingSenderId: "1019766323735"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function() {
    event.preventDefault();
    var name = $("#newName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
})

database.ref().on("child_added", function(snapshot) {
    var firstTime = snapshot.val().firstTrainTime;
    var tFrequency = snapshot.val().frequency;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var minutesAway = tFrequency - tRemainder;
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    $("tbody").append("<tr><th>" + snapshot.val().name + "</th><th>" + 
    snapshot.val().destination + "</th><th>" + snapshot.val().frequency + 
    "</th><th>" + nextArrival + "</th><th>" + minutesAway + "</th></tr>")
})