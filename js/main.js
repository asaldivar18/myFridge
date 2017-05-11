/**
 * myFridge JS
 *
 */
 var gButton = document.getElementById("myButton");

/**
 * Function called when clicking the Login With Google/logout button
 */
function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    // [START createprovider]
    var provider = new firebase.auth.GoogleAuthProvider();
    // [END createprovider]
    // [START addscopes]
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    // [END addscopes]
    // [START signin]
    firebase.auth().signInWithRedirect(provider);
    // [END signin]
  } else {
    // [START signout]
    firebase.auth().signOut();
    window.location.href = "index.html";
    // [END signout]
  }
  // [START_EXCLUDE]
  // [END_EXCLUDE]
}
// [END buttoncallback]


// Firebase Connect
//Initializes Firebase Application
function fbConn() {
  var config = {
    apiKey: "AIzaSyAivtwKsYOVkBxknHjMhbTIkjMj0MhSPdM",
    authDomain: "myfridge-ff976.firebaseapp.com",
    databaseURL: "https://myfridge-ff976.firebaseio.com",
    projectId: "myfridge-ff976",
    storageBucket: "myfridge-ff976.appspot.com",
    messagingSenderId: "1076830760594"
  };
  firebase.initializeApp(config);
}

// Result from Redirect auth flow.
function getToken() {
  // [START getidptoken]
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // google token @see Google API
      window.location.href = "index.html";
      var token = result.credential.accessToken;
    } else {
      // [END_EXCLUDE]
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // [START_EXCLUDE]
    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have already signed up with a different auth provider for that email.');
      // If you are using multiple auth providers on your app you should handle linking
      // the user's accounts here.
    } else {
      console.error(error);
    }
    // [END_EXCLUDE]
  });
}

// Listening for auth state changes.
function getAuthState() {
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(email);

      document.getElementById("myButton").innerText = "Continue";


    } else {
      // User is signed out.
      // [START_EXCLUDE]
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE]
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
}

/**
 * initApp handles FireBase connections:
 *
 */
function initApp() {

  fbConn();
  getToken();
  getAuthState();
}

window.onload = function() {
  initApp();
};
