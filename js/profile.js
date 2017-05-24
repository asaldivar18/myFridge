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
var password = document.getElementById("p1");
var imgSrc = document.getElementById("img");

var submitbtn = document.getElementById("submitnew");
var editbtn = document.getElementById("editbtn");
var profilepic = document.getElementById("profilepic");

firebase.auth().onAuthStateChanged(firebaseUser => {



  if (firebaseUser) {

    if (firebaseUser.photoURL) {
      profilepic.src = firebaseUser.photoURL;
      console.log(firebaseUser.photoURL);
      console.log(profilepic.src);
    }
    ref2 = firebase.database().ref('Fridge/score/' + firebaseUser.uid)
    ref2.once('value', function(childSnapshot) {
      var scoreuser = childSnapshot.val().score

      $("#pbar").css("width", scoreuser+"%")

      if(scoreuser >0 && scoreuser <=10){
        $("#rank").text("Food Youngling")
      } else if(scoreuser > 10 && scoreuser <= 25) {
        $("#rank").text("Food Padawan")
      } else if(scoreuser >25 && scoreuser <= 45){
        $("#rank").text("Food Knight")
      } else if(scoreuser >45 && scoreuser <=70){
        $("#rank").text("Food Master")
      } else if(scoreuser >70){
        $("#rank").text("Food Grand Master (GM)")
      }
      $("#score").text("Food Score: " + scoreuser)

    })

	
	
    var ref = firebase.database().ref('Fridge/' + firebaseUser.uid).orderByChild("health");
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        var list = document.getElementById("feedList")
        var list2 = document.getElementById("historyList")
        if(!childData.removed){
          var li = document.createElement('li');
          li.innerHTML = childData.name + "\t+1 point!"
          list.appendChild(li)
        } else {
          var li = document.createElement('li');
          li.innerHTML = childData.name + "\t+2 points!"
          list2.appendChild(li)
        }
      })
    })





    username.innerHTML = firebaseUser.displayName;

    editbtn.addEventListener('click', e => {
      var newuser = document.getElementById("newuser");
      var newuserVal = newuser.value;
      newuser.value = firebaseUser.displayName;
    })

    submitbtn.addEventListener('click', e => {
      var newuser = document.getElementById("newuser");
      var newuserVal = newuser.value;

      var storageRef = firebase.storage().ref(firebaseUser.uid + '/profilepic/'+photo.name)

      if (newuserVal) {
        firebaseUser.updateProfile({
          displayName: newuserVal
        });
      }
      if (photo.value) {
        firebaseUser.updateProfile({
          photoURL: photo.value
        });
      }
      username.innerHTML = firebaseUser.displayName;

    });

  } else {
    console.log("not logged in");
    window.location.href="login.html"
  }
});


function readURL(input) {
  var url = input.value;
  var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#img').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  } else {
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
