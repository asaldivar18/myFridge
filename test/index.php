<?php session_start(); ?>
<html>
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
  <link rel="stylesheet" href="style/style.css" />
  <title>Facebook 3.0</title>
</head>
<body>
  <div class="form-group">
<form action="login.php" method="post">
  <input type="text" name="uid" placeholder="Username" /><br />
  <input type="password" name="pwd" placeholder="Password" /><br />
  <button type="submit">Login</button>
</form>
</div>
<br />
<br />
<?php
if(isset($_SESSION['name'])){
  echo "Hello " .$_SESSION['name'];
}else{
  echo "Welcome Guest";
}
?>
<br />
<br />
  <form action="2nd.php" method="post">
    <input type="text" name="first" placeholder="First Name" /><br />
    <input type="text" name="last" placeholder="Last Name" /><br />
    <input type="text" name="uid" placeholder="Username" /><br />
    <input type="password" name="pwd" placeholder="Password" /><br />
    <input type="file" name="image" />
    <button type="submit">Sign Up</button>
  </form>
  <br />
  <br />

  <form action="delete.php" method="post">
    <input type="text" name="uid" placeholder="Username" /><br />
    <input type="password" name="pwd" placeholder="Password" /><br />
    <button type="submit">Delete me</button>
  </form>
  <br />
  <br />


  <form action="logout.php">
    <button>Log Out</button>
  </form>
  </div>
</body>
</html>
