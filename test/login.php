<?php
session_start();
include 'dbh.php';
$uid = $_POST['uid'];
$pwd = $_POST['pwd'];
$pwd = sha1($pwd);
$sql = "SELECT * FROM user WHERE uid = '$uid' AND pwd = '$pwd' ";
$result = mysqli_query($conn, $sql);

if(!$row = mysqli_fetch_assoc($result)){
    echo "What the Fuck Right Now";
}else{
  $_SESSION['name'] = $row['first'];
}

header("Location: index.php");

?>
