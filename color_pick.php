<?php
$r=$_GET['r'];
$g=$_GET['g'];
$b=$_GET['b'];

$host="localhost";
$username="root";
$password="2262552a";
$dbname="color";
$con=mysqli_connect($host,$username,$password,$dbname);

if(mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

echo $sql="update color_color set r=$r,g=$g,b=$b where no=0";

mysqli_query($con,$sql);
$sql="INSERT INTO color_history(no,color) VALUES(NULL,'$r,$g,$b')";
mysqli_query($con,$sql);
?>
