/**
 * myFridge JS
 *
 */

var list = []
    /**
     * getItem
     * method when add item form button pressed.
     */

function getItem() {
    var name = document.getElementById("name").value
    var quantity = document.getElementById("quantity").value;
    var dateTo = new Date();
    var unit = document.getElementById("unit").value;

    dateTo = document.getElementById("dateto").value;
    if (validateForm(name, quantity) == false) {
        return 0
    } else {
        var newref = writeUserData(name, quantity, unit, dateTo.toString());
        $("#itemform").hide(1000);
        $("#myFridge").show(1000);
        $("#showfridge").show(1000)
    }
}

function validateForm(name, quantity) {
    if (name == "" || quantity == "") {
        return false
    } else {
        return true
    }
}

function deleteItem(num) {
    var deletebutton = document.getElementById('delete' + num);
    var editpencil = document.getElementById('editpencil' + num);
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('Fridge/' + user.uid)

    deletebutton.addEventListener('click', function(event) {
        var itemName = document.getElementById("itemName" + num)
        var ref = firebase.database().ref('Fridge/' + user.uid + '/' + list[num - 1])

        var r = confirm("Are you sure you want to remove " + itemName.innerHTML + "?");

        if (r == true) {
            ref.update({
                removed: true
            })
        } else {
            return 0
        }

        ref2 = firebase.database().ref('Fridge/score/' + user.uid)
        ref2.once('value', function(childSnapshot) {
            try {
                var scoreuser = childSnapshot.val().score
                ref2.update({
                    score: scoreuser + 1
                })
            } catch (abc) {
                ref2.update({
                    score: 1
                })
            }
        })
        readUserData();
    })


    editpencil.addEventListener('click', function(event) {
        itemName = document.getElementById('itemName' + num).innerHTML;
        quantity = document.getElementById(num).innerHTML;
        expiryDate = document.getElementById("itemDate" + num).children[0].innerHTML

        var name_DOM = document.getElementById('itemName' + num)
        var quantity_DOM = document.getElementById(num)
        var expiry_DOM = document.getElementById('itemDate' + num)
        var buttons_DOM = document.getElementById("buttons" + num)
        var row_DOM = document.getElementById('itemNo' + num)

        removeChild(name_DOM)
        removeChild(quantity_DOM)
        removeChild(expiry_DOM)
        removeChild(buttons_DOM)

        name_DOM.innerHTML = "<input class=\"editfield\"type=\"text\" name=\"itemName\"value=\"" + itemName + "\"  placeholder=\"" + itemName + "\" required id=\"newName\"></input>";
        quantity_DOM.innerHTML = "<input class=\"editfield\" type=\"number\" name=\"itemName\" value=\"" + parseInt(quantity) + "\"placeholder=\"" + quantity + "\" required id=\"newQuantity\"></input>";
        expiry_DOM.innerHTML = "<input  placeholder=\"" + expiryDate + "\" value=\"" + expiryDate + "\" name=\"expiryDate\" type=\"date\">"
        buttons_DOM.innerHTML = "<input class=\"btn btn-default\" id=\"edit" + num + "\" type=\"button\"  value=\"Confirm\"></input>"

        document.getElementById("edit" + num).addEventListener('click', function(event) {
            var user = firebase.auth().currentUser;
            var ref = firebase.database().ref('Fridge/' + user.uid + '/' + list[num - 1])
            var itemName = name_DOM.children[0].value
            var quantity = quantity_DOM.children[0].value;
            var dateTo = new Date();
            dateTo = expiry_DOM.children[0].value;
            ref.update({
                name: itemName,
                quantity: quantity,
                health: dateTo,
            })
            readUserData()
        })

    })
}

function updateItem(num) {
    var itemName = document.getElementById("newName").value
    var quantity = document.getElementById("newQuantity").value;
    var dateTo = new Date();
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('Fridge/' + user.uid + "/" + list[num - 1])
    dateTo = document.getElementById("newDateto").value;
    ref.update({
        name: itemName,
        quantity: quantity,
        health: dateTo
    })
    readUserData()

}

function removeChild(dom_element) {
    while (dom_element.firstChild) {
        dom_element.removeChild(dom_element.firstChild)
    }
}


/**
 * Creates new dom element of all items of Fridge.
 */
function readUserData() {
    list.length = 0
    var node = document.getElementById("itembody");
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }
    var user = firebase.auth().currentUser;
    var itemNo = 1;
    var cmp = document.getElementById("orderby").value
    var ref = firebase.database().ref('Fridge/' + user.uid).orderByChild(cmp);
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            if (!childData.removed) {
                var tr = document.createElement('tr');
                tr.id = "itemNo" + itemNo;
                var html = "<td id=\"itemName" + itemNo + "\">" + childData.name + "</td><td id=\"" + itemNo + "\">" + childData.quantity + " " + childData.type
                html += "</td><td><div id=\"itemDate" + itemNo + "\" class=\"progress\"><div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:100%\">" + childData.health
                html += "</div>/div></td><td id=\"buttons" + itemNo + "\"align=\"right\"><a><i class=\"fa fa-pencil fa-2x\" id=\"editpencil" + itemNo
                html += "\" aria-hidden=\"true\"> |</i><i id=\"delete" + itemNo + "\"class=\"fa fa-times  fa-2x\" aria-hidden=\"true\"></i></a></td></div>"
                tr.innerHTML = html;
                document.getElementById("itembody").appendChild(tr);
                deleteItem(itemNo)
                itemNo++;
                list.push(key)
            }

        })
    })
}



/**
 * writeUserData
 * pushes JSON object into firebase database.
 */
function writeUserData(name, quantity, unit, health) {
    var user = firebase.auth().currentUser;
    ref = firebase.database().ref('Fridge/' + user.uid)
    if (user) {
        var justPushed = ref.push({
            name: name,
            quantity: quantity,
            type: unit,
            removed: false,
            health: health,
        });

        ref2 = firebase.database().ref('Fridge/score/' + user.uid)
        ref2.once('value', function(childSnapshot) {
            try {
                var scoreuser = childSnapshot.val().score
                ref2.update({
                    score: scoreuser + 1
                })
            } catch (vafa) {
                ref2.update({
                    score: 1
                })
            }
        })
        readUserData();
        return justPushed;
    }
}

/***************************
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

/**
 * Firebase Connect
 * Initializes Firebase Application
 */
function fbConn() {
    var config = {
        apiKey: "AIzaSyAivtwKsYOVkBxknHjMhbTIkjMj0MhSPdM",
        authDomain: "myfridge-ff976.firebaseapp.com",
        databaseURL: "https://myfridge-ff976.firebaseio.com",
        projectId: "myfridge-ff976",
        storageBucket: "myfridge-ff976.appspot.com",
        messagingSenderId: "1076830760594"
    };
    firebase.initializeApp(config);
}


// Listening for auth state changes.
function getAuthState() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            $("#myFridge").show(1000);
            $("#showfridge").prop('disabled', true);
            document.getElementById("fridgeName").innerHTML = "Fridge Contents";
            readUserData();
        } else {
            window.location.href = "login.html";
        }
    });
}

/**
 * initApp
 * FireBase setup
 */
function initApp() {
    fbConn();
    getAuthState();
}


window.onload = function() {
    initApp();
};

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
