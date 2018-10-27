// Initialize Firebase
var config = {
    apiKey: "AIzaSyBnLMJSQ5cn2gcgpa1ic44OHRme9xNsQaI",
    authDomain: "project2-13b30.firebaseapp.com",
    databaseURL: "https://project2-13b30.firebaseio.com",
    projectId: "project2-13b30",
    storageBucket: "project2-13b30.appspot.com",
    messagingSenderId: "595579987825"
  };

firebase.initializeApp(config);

// Creating a variable to reference the database.
var database = firebase.database();

$("#modalTrigger").on("click", function(event){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          document.getElementById('userName').textContent = displayName;
        } else {
          document.getElementById('userName').textContent = "Not logged in";
        }
    });
});