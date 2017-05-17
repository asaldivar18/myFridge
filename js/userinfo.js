var config = {
  apiKey: "AIzaSyAivtwKsYOVkBxknHjMhbTIkjMj0MhSPdM",
  authDomain: "myfridge-ff976.firebaseapp.com",
  databaseURL: "https://myfridge-ff976.firebaseio.com",
  projectId: "myfridge-ff976",
  storageBucket: "myfridge-ff976.appspot.com",
  messagingSenderId: "1076830760594"
};
firebase.initializeApp(config);

var uname = document.getElementById("username");
var photo = document.getElementById("photo");
var submit = document.getElementById("loginbutton");

var user = firebase.auth().currentUser;


firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    console.log(firebaseUser);
  }else{
  console.log("not logged in");
  }
});


submit.addEventListener('click', e => {
  user.updateProfile({
    displayName : uname,
    photoURL : photo
  });
})
