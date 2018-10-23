require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");




// firebase login // 
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAAITPs9NXg-jjOvY1PF27QrXNcKjYxXTc",
    authDomain: "bidet-finder-1539742659070.firebaseapp.com",
    databaseURL: "https://bidet-finder-1539742659070.firebaseio.com",
    projectId: "bidet-finder-1539742659070",
    storageBucket: "bidet-finder-1539742659070.appspot.com",
    messagingSenderId: "674326298876"
};

firebase.initializeApp(config);

// Creating a variable to reference the database.
var database = firebase.database();

// Authentication Code
// const txtEmail = document.getElementById('txtEmail');
// const txtPassword = document.getElementById('txtPassword');
// const btnLogin = document.getElementById('btnLogin');
// const btnSignup = document.getElementById('btnSignup');
// const btnLogout = document.getElementById('btnLogout');

//   // Add login event
//   btnLogin.addEventListener('click', e => {
//       // Get email and pass
//       const email = txtEmail.value;
//       const pass = txtPassword.value;
//       const auth = firebase.auth();
//       // Sign in
//       const promise = auth.signInWithEmailAndPassword(email, pass);
//       promise.catch(e => console.log(e.message));
//   });

//   // Add signup event
//   btnSignup.addEventListener('click', e => {
//       // Get email and pass
//       // verify email input
//       const email = txtEmail.value;
//       const pass = txtPassword.value;
//       const auth = firebase.auth();
//       // Sign in
//       const promise = auth.createUserWithEmailAndPassword(email, pass);
//       promise.catch(e => console.log(e.message));
//   });        

//   btnLogout.addEventListener('click', e=> {
//       firebase.auth().signOut();
//   });

//   // Add a realtime listener
//   firebase.auth().onAuthStateChanged(firebaseUser => {
//     if(firebaseUser) {
//         console.log(firebaseUser);
//         btnLogout.classList.remove('hide');
//     } else {
//         console.log('not logged in');
//         btnLogout.classList.add('hide');
//     }
//   });

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

$("#formSubmitButton").on("click", function () {
  
  // Grabbing user info
  var userName = $("#userName").val().trim();
  var userCommentsText = $("#userCommentsText").val().trim();

  var newUser = {
      UserName: userName,
      UserComments: userCommentsText
  };

  console.log(newUser);
  database.ref("/userProfile").push(newUser);

  // fileInput.addEventListener('change', function() {
      let file = fileInput.files[0];
  
      // Create a new File Reader
      let fileReader = new FileReader();  
      
      // Set the 'onload' callback.
      fileReader.onload = function (event) {
         let processedFile = event.target.result;
  
          // Put into firebase storage.
          database.ref("/userPictures").push({
              UserPicture: processedFile,
              dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
         
      };
      // Read the file, which triggers the callback after the file is compete.
      fileReader.readAsDataURL(file); 
      
      document.getElementById("userInfo").reset();
});

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log( // eslint-disable-line
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
