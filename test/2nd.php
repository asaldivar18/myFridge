<?php
session_start();
include 'dbh.php';
$first = $_POST['first'];
$last = $_POST['last'];
$uid = $_POST['uid'];
$imagetmp=addslashes (file_get_contents($_FILES['image']['tmp_name']));
$pwd = $_POST['pwd'];
$pwd = sha1($pwd);
$sql = "INSERT INTO user(first, last, uid, pwd, image)
VALUES('$first', '$last', '$uid', '$pwd', '$imagetmp')";

$result = mysqli_query($conn, $sql);
header("Location: index.php");
?>
