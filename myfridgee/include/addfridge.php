<?php include("include/header.php"); ?>

<section class="container">
        <h1>myFridge</h1>
    <ul id="liicc">
        <li><button>My Fridge</button></li>
        <li><input></input></li>
        <li><button>Add Item</button></li>
        <li><button>Quick Add Item</button></li>
        <li><button>Remove Item</button></li>
        <li><button>Check Score</button></li>
        <li><button>My Fridge</button></li>
      </ul>
      <div id="myFridge">
        <ul id="liicc">
          <li><button>Add Fridge></li>
          <li><input></input></li>
          <li><button>Quick Add</button></li>
          <li><button>Check score</li>
        </ul>
      </div>

      <div id="Quick Add">
        <form>
        </form>
      </div>


<?php
include("firebaseconn.php");
include("include/footer.php"); ?>
