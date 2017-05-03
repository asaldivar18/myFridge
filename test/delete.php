<?php
session_start();
include 'dbh.php';
$uid = $_POST['uid'];
$pwd = $_POST['pwd'];
echo "suck";
$seql = "DELETE FROM user WHERE uid = '$uid' AND pwd = '$pwd'";

if (mysqli_query($conn, $seql)) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}
header("Location: index.php");
?>
