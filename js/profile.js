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
var editbtn = document.getElementById("editbtn");
var profilepic = document.getElementById("profilepic");

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    if(firebaseUser.photoURL){
      profilepic.src = firebaseUser.photoURL;
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
      var photo = document.getElementById('camera');
      var newuserVal = newuser.value;
      if(newuserVal){
      firebaseUser.updateProfile({
        displayName: newuserVal
      });
    }
    if(photo.value){
      firebaseUser.updateProfile({
        photoURL:photo.value
      });
    }else{
      alert('no picture here');
    }
      username.innerHTML = firebaseUser.displayName;
    });
  } else {
    console.log("not logged in");
  }
});

function readURL(input) {
var url = input.value;
var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#img').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
}
else{
     $('#img').attr('src', '/assets/no_preview.png');
  }
}

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
