var config = {
  apiKey: "AIzaSyAivtwKsYOVkBxknHjMhbTIkjMj0MhSPdM",
  authDomain: "myfridge-ff976.firebaseapp.com",
  databaseURL: "https://myfridge-ff976.firebaseio.com",
  projectId: "myfridge-ff976",
  storageBucket: "myfridge-ff976.appspot.com",
  messagingSenderId: "1076830760594"
};
firebase.initializeApp(config);

var username = document.getElementById("username");
var usernameVal = username.innerHTML;
var submitbtn = document.getElementById("submitnew");

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    username.innerHTML = firebaseUser.displayName;
    submitbtn.addEventListener('click', e => {
      var newuser = document.getElementById("newuser");
      var newuserVal = newuser.value;
      firebaseUser.updateProfile({
        displayName: newuserVal
      });
      username.innerHTML = firebaseUser.displayName;
    })
  } else {
    console.log("not logged in");
  }
});

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider);
  } else {
    firebase.auth().signOut();
    window.location.href = "login.html";
  }
}
