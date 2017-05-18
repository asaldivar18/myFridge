var config = {
  apiKey: "AIzaSyAivtwKsYOVkBxknHjMhbTIkjMj0MhSPdM",
  authDomain: "myfridge-ff976.firebaseapp.com",
  databaseURL: "https://myfridge-ff976.firebaseio.com",
  projectId: "myfridge-ff976",
  storageBucket: "myfridge-ff976.appspot.com",
  messagingSenderId: "1076830760594"
};
firebase.initializeApp(config);

const submit = document.getElementById("s1");
const txtemail = document.getElementById("e1");
const txtpwd = document.getElementById("p1");
const resetpwd = document.getElementById("p2");

submit.addEventListener('click', e => {
  const email2 = txtemail.value;
  const pwd = txtpwd.value
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email2, pwd);
});

resetpwd.addEventListener('click', e => {
  const email2 = txtemail.value;
  const pwd = txtpwd.value
  const auth = firebase.auth();
  const promise = auth.sendPasswordResetEmail(email2).then(function() {
    console.log("Password Reset Sent!");
  }, function(error) {
    console.log("Error");
  });

});

firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    console.log(firebaseUser);
    window.location.href = "profile.html";
  }else{
  console.log("not logged in");
  }
});


/**
 * Sign In/Sign Out
 * Function called when clicking the Login With Google/logout button
 */
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