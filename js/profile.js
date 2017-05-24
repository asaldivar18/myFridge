var config = {
  apiKey: "AIzaSyAivtwKsYOVkBxknHjMhbTIkjMj0MhSPdM",
  authDomain: "myfridge-ff976.firebaseapp.com",
  databaseURL: "https://myfridge-ff976.firebaseio.com",
  projectId: "myfridge-ff976",
  storageBucket: "myfridge-ff976.appspot.com",
  messagingSenderId: "1076830760594"
};
firebase.initializeApp(config);

const submitbtn = document.getElementById("submitnew");
const editbtn = document.getElementById("editbtn");

var username = document.getElementById("username");
var password = document.getElementById("p1");
var imgSrc = document.getElementById("img");


firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    if(firebaseUser.photoURL){
      imgSrc.src = firebaseUser.photoURL;
    }
    console.log(firebaseUser);
    username.innerHTML = firebaseUser.displayName;

    editbtn.addEventListener('click', e => {
      var newuser = document.getElementById("newuser");
      var newuserVal = newuser.value;
      newuser.value = firebaseUser.displayName;
    })

    submitbtn.addEventListener('click', e => {
      var newuser = document.getElementById("newuser");
      var newuserVal = newuser.value;
      var photo = document.getElementById("camera") ;
      if(newuserVal){
      firebaseUser.updateProfile({
        displayName: newuserVal,
        photoURL: photo.value
      });
    } if(photo.value){
      firebaseUser.updateProfile({
        photoURL:photo.value
      });
    }
      username.innerHTML = firebaseUser.displayName;
    });

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
