<?php
$host="localhost";
$username="root";
$password="2262552a";
$dbname="color";
$con=mysqli_connect($host,$username,$password,$dbname);

if(mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$sql="select * from color_color";
$a['r']=0;
$a['g']=0;
$a['b']=0;
if($result=mysqli_query($con,$sql)){
  while($row=mysqli_fetch_row($result)){
    $a['r']=$row[1];
    $a['g']=$row[2];
    $a['b']=$row[3];
    echo json_encode($a);
    break;
  }
}
?>
