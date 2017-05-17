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


submit.addEventListener('click', e => {
  const email2 = txtemail.value;
  const pwd = txtpwd.value
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(email2, pwd);
});

firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    console.log(firebaseUser);
  }else{
  console.log("not logged in");
  }
});
