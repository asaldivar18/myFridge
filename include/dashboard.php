<section class="container">
        <h1>myFridge</h1>
        <div id="mainmenu">
    <ul class="nav nav-tabs"id="liicc">
      <li class="active"><a data-toggle="tab" href="#myFridge">My Fridge</a></li>
        <li><a data-toggle="tab" href="#">Add Item</a></li>
        <li><a data-toggle="tab" href="#QuickAdd">Quick Add Item</a></li>
        <li><a data-toggle="tab" href="#">Remove Item</a></li>
        <li><a data-toggle="tab" href="#">Check Score</a></li>
        <li><a data-toggle="tab" href="#">My Fridge</a></li>
      </ul>
      <div class="tab-content">
      <div id="myFridge" class="tab-pane fade in active">
      <table class="table">
        <h3>Fridge Name</h3>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity of items</th>
            <th>Health</th>
            <th>Time remaining</th>
          </tr>
        </thead>
        <tbody>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td><button>remove</button></td>
          <tr>
          </tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td><button>remove</button></td>
          <tr>
          </tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td><button>remove</button></td>
          <tr>
        </tbody>
      </table>
    </div>
      <div id="QuickAdd" class="tab-pane fade in">
        <div class="form-group">
        <form>
            <label for"name">Name of item</label>
            <input type="name" class="form-control" id="name">
          </div>
          <label for"quantity">Quantity</label>
          <input class="form-control" type="number" name="quantity" min="1" max="1024"
          <label for"type">Type</label>
          <select id="type" class="form-control">
            <option value="Meat">Meat</option>
            <option value="Fresh">Fresh</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Dry">Dry</option>
            <option value="Frozen">Frozen</option>
            <option value="Dry">Other</option>
          </select>
          <label for"date">Storing Date</label>
          <input type="date" class="form-control"></input>
          <label for"date">Expiry Date</label>
          <input type="date" class="form-control"></input>
        </br>
          <button>Submit</>
        </div>
      </form>
    </div>
  </div>

    <div id="myFridgemenu" >
      <h2>Fridge List</h2>
      <ul class="nav nav-tabs"  id="liicc">
        <li class="active"><a data-toggle="tab" href="#fridges">My Fridge</a></li>
        <li><a data-toggle="tab" href="#addFridgeForm">Add Fridge</a></li>
        <li><a data-toggle="tab" href="#addFridgeForm">Check score</a></li>
        <li><a data-toggle="tab" href="#ddd">Quick Add</a></li>
      </ul>


      <div class="tab-content">

      <div id="fridges" class="tab-pane fade in active">
          <label for"name">Fridge Name </label>
          <input type="name" id="fridgeNameInput"></input>
          <button onclick="insertRow()">add Fridge </button>
      <table id="fridgeTable" class="table">
        <thead>
          <tr>
            <th>Fridge Name</th>
            <th>Quantity of items</th>
            <th>Health</th>
          </tr>
        </thead>
        <tbody id="fridgeListBody">
        </tbody>
      </table>
    </div>
  <script type="text/javascript">

  function writeUserData(name, quantity, health, fridgeID) {

      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('Fridge/'+ user.uid).set({
          name: name,
          quantity:quantity,
          health:health,
        });
      } else {
        // No user is signed in.
      }
    });

  }
    function insertRow() {

      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var x;
        x = document.getElementById("fridgeNameInput").value;
        writeUserData(x,0,1.0);
        var btn = document.createElement("tr");
        var td = document.createElement("td");
        var quantity = document.createElement("td");
        var health = document.createElement("td");
        td.appendChild(document.createTextNode(x));
        quantity.appendChild(document.createTextNode(x));
        btn.appendChild(td);
        document.getElementById("fridgeListBody").appendChild(btn);

      } else {
        // No user is signed in.
      }
    });

    }

    </script>

      <div class="tab-pane fade in" id="addFridgeForm">
        <form>
          <div class="form-group">
            <label for"name">Fridge Name</label>
            <input type="name" class="form-control" id="fridgeNameinput">
          </div>
          <label for"quantity">Number Of Items</label>
          <input class="form-control" type="number" name="quantity" min="1" max="1024"
          <label for"type">Type</label>
          <select id="type" class="form-control">
            <option value="Fridge">Fridge</option>
            <option value="Fresh">Fresh Ingredients</option>
            <option value="Dry">Dry Storage</option>
            <option value="Freezer">Freezer</option>
            <option value="Other">Other</option>
          </select>
          <label for"checkbox">Shared?</label>
          <input type="checkbox"></input>

        </br>
          <button>Submit</button>
        </div>
      </div>
    </section>
