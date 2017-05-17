var config = {
  apiKey: "AIzaSyAivtwKsYOVkBxknHjMhbTIkjMj0MhSPdM",
  authDomain: "myfridge-ff976.firebaseapp.com",
  databaseURL: "https://myfridge-ff976.firebaseio.com",
  projectId: "myfridge-ff976",
  storageBucket: "myfridge-ff976.appspot.com",
  messagingSenderId: "1076830760594"
};
firebase.initializeApp(config);

var user = firebase.auth().currentUser;
const signupbtn = document.getElementById("loginbutton");
const txtemail = document.getElementById("email");
const txtpwd = document.getElementById("pwd");

signupbtn.addEventListener('click', e => {
  const emailval = txtemail.value;
  const pass = txtpwd.value;
  const auth = firebase.auth();

  const promise = auth.createUserWithEmailAndPassword(emailval, pass);
  promise.catch(e => console.log(e.message));

});

firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    console.log(firebaseUser);
  }else{
  console.log("not logged in");
  }
});
