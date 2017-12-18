<html>
  <head>
    <meta charset="utf-8">
    <title>Swiper demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

    <link rel="stylesheet" href="./Swiper-4.0.7/dist/css/swiper.min.css">
  </head>
  <style>
    .html,body{
      margin:0px;
      color:white;
    }
    table{
      width:100%;
    }
    .swiper-container {
      width: 100%;
      height: 75%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      /* Center slide text vertically */
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    .cr{
      height:50px;
      line-height:50px;
    }
    .menu{
      width:100px;
      height:40px;
      border-radius:5px;
      background-color:#ffffff;
      color:black;
      position:relative;
      left:10px;
      top:10px;
      line-height:40px;
      text-align:center;
    }
    .sidemenu{
      display:block;
      position:absolute;
      left:-100px;
      width:100px;
      height:100%;
      z-index:10;
      background-color:white;
    }
    .back{
      width:80px;
      height:40px;
      background-color:black;
      border-radius:10px;
      position:relative;
      top:20px;
      left:10px;
      text-align:center;
      line-height:40px;
    }
    .color_history{
      width:60%;
      height:40px;
      margin:10px;
      margin-top:20px;
    }
  </style>

  <?php
  $host="localhost";
  $username="root";
  $password="2262552a";
  $dbname="color";
  $con=mysqli_connect($host,$username,$password,$dbname);

  if(mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  $sql="select * from color_history";
  $result_array=array();
  if($result=mysqli_query($con,$sql)){
    while($row=mysqli_fetch_row($result)){
      array_push($result_array,$row);

    }
  }

    echo "<div id=sidemenu class=sidemenu><div class=back onclick='side_toggle()'>BACK</div>";
    foreach($result_array as $v){
      echo "<div class=color_history style='background-color:rgb(".$v[1].")'>".$v[1]."</div>";
    }
    echo "</div>";
    echo "<input type=hidden id=r value=>";
    echo "<input type=hidden id=g value=>";
    echo "<input type=hidden id=b value=>";
    echo "<div id=back style='width:100%;height:100%'>";
    echo "<div class=menu onclick='side_toggle()'>HISTORY</div>";
    echo "<h3 id=rgb style='text-align: center;'></h3><h2 style='text-align: center;' id=code></h2>";
    echo "<div id='content'></div>";
    echo "</div>";
  ?>
  <script src="color.js"></script>
  <script src="./Swiper-4.0.7/dist/js/swiper.min.js"></script>
  <script>
  var side_toggle_var=0;
  function side_toggle(){
    if(side_toggle_var==0){
      $('#sidemenu').animate({left:0});
      side_toggle_var=1;
    }else{
      $('#sidemenu').animate({left:-100});
      side_toggle_var=0;
    }
  }
    var swiper;
    // $.post("get_color.php",{}).done((r)=>{
    //   var ob=JSON.parse(r);
    //   var rgb_to_html=RGB2Hex(ob.r,ob.g,ob.b);
    //   document.getElementById('code').innerHTML="#"+rgb_to_html;
    //   document.getElementById('rgb').innerHTML=ob.r+" "+ob.g+" "+ob.b;
    //   document.getElementById('back').style.backgroundColor="#"+rgb_to_html;
    //   $.post("update_color.php",{
    //     color:rgb_to_html,
    //     type:0
    //   }).done((r)=>{
    //     document.getElementById('content').innerHTML=r;
    //     swiper= new Swiper('.swiper-container', {
    //       pagination: {
    //         el: '.swiper-pagination',
    //       },
    //     });
    //   })
    // });
    var color;
    setInterval(()=>{

      $.post("get_color.php",{}).done((r)=>{
        var ob=JSON.parse(r);
        var rgb_to_html=RGB2Hex(ob.r,ob.g,ob.b);
        if(rgb_to_html==color){

        }else{
          document.getElementById('code').innerHTML="#"+rgb_to_html;
          color=rgb_to_html;
          document.getElementById('rgb').innerHTML=ob.r+" "+ob.g+" "+ob.b;
          document.getElementById('back').style.backgroundColor="#"+rgb_to_html;
          $.post("update_color.php",{
            color:rgb_to_html,
            type:0
          }).done((r)=>{
            document.getElementById('content').innerHTML=r;
            swiper= new Swiper('.swiper-container', {
              pagination: {
                el: '.swiper-pagination',
              },
            });
          });
        }

      });
    },5000);


  </script>
</html>
