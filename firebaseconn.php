<script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAivtwKsYOVkBxknHjMhbTIkjMj0MhSPdM",
    authDomain: "myfridge-ff976.firebaseapp.com",
    databaseURL: "https://myfridge-ff976.firebaseio.com",
    projectId: "myfridge-ff976",
    storageBucket: "myfridge-ff976.appspot.com",
    messagingSenderId: "1076830760594"
  };
  firebase.initializeApp(config);

function getUser(){
}

  function createRow(){
    function writeTableData(fridgeName) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
      });

    }
    function fridge(fridgeName){
      this.name = fridgeName;
      this.quantity= 0;
      this.health= 1.0;
    }


    var firebaseRef = firebase.database().ref;
    function writeUserData(name, quantity, health) {
      firebase.database().ref('fridge/').set({
        name: name,
        quantity:quantity,
        health:health,
      });
    }


  }
  function shit(){
    var x;
    x = document.getElementById("vafa").value;
    document.getElementById("stupid").innerHTML = document.getElementById("vafa").value;
  };

  function fuck() {
  document.getElementById("myForm").reset();
  };
  <? $_hello = 0; ?>

  function newFridge(fridgeName) {
    var firebaseRef = firebase.database().ref;

  }

</script>
