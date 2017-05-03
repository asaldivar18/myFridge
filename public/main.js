(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDOe1zANigiJrPhJ56HHZFPBKSlQBs3Ubk",
    authDomain: "myfridge-bb1f4.firebaseapp.com",
    databaseURL: "https://myfridge-bb1f4.firebaseio.com",
    projectId: "myfridge-bb1f4",
    storageBucket: "myfridge-bb1f4.appspot.com",
    messagingSenderId: "384465437100"
  };
  firebase.initializeApp(config);

  //get elements
  const txtEmail = document.getElementById('email');
  const pwd = document.getElementById('pwd');
  const btnlog = document.getElementById('log');
  const btnsign = document.getElementById('sign');
  const btnout = document.getElementById('out');
  const usersname = document.getElementById('name');
  var user = firebase.auth().currentUser;

  // login
  btnlog.addEventListener("click", e => {
    const email = txtEmail.value;
    const pass = pwd.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message))
  });

  //sign up
  btnsign.addEventListener('click', e=>{
    const email = txtEmail.value;
    const pass = pwd.value;
    const name = usersname;
    user.updateProfile({
      displayname : name
    }).then(function() {
  // Update successful.
}, function(error) {
  // An error happened.
});
    const auth = firebase.auth();
    //sign up
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message))

  })

  btnout.addEventListener('click', e=>{
    firebase.auth().signOut();
  })





//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
if(firebaseUser){
  console.log(firebaseUser);
  btnout.classList.remove('hide');
  document.write(firebaseUser.displayname);

}else{
  console.log('not logged in');
  btnout.classList.add('hide');

}
})
}());
