// // Initialize Firebase
// const config = {
//   apiKey: "AIzaSyBnLMJSQ5cn2gcgpa1ic44OHRme9xNsQaI",
//   authDomain: "project2-13b30.firebaseapp.com",
//   databaseURL: "https://project2-13b30.firebaseio.com",
//   projectId: "project2-13b30",
//   storageBucket: "project2-13b30.appspot.com",
//   messagingSenderId: "595579987825"
// };

// firebase.initializeApp(config);

// // Creating a variable to reference the database.
// const database = firebase.database();

// $("#modalTrigger").on("click", event => {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       // User is signed in.
//       const displayName = user.displayName;
//       document.getElementById("userName").textContent = displayName;
//     } else {
//       document.getElementById("userName").textContent = "Not logged in";
//     }
//   });
// });
