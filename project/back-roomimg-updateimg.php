<?php
    
    $fileName1 = isset($_FILES["image1"]["name"]) == false ? null :$_FILES["image1"]["name"];
    $fileName2 = isset($_FILES["image2"]["name"]) == false ? null :$_FILES["image2"]["name"];
    $fileName3 = isset($_FILES["image3"]["name"]) == false ? null :$_FILES["image3"]["name"];



    if( $fileName1!=null){
        $from1 =$_FILES["image1"]["tmp_name"];
        $to1 = "images/room/".mb_convert_encoding($fileName1,"Big5","UTF8");
        move_uploaded_file($from1,$to1);
    }
    if($fileName2!=null){
        
        $from2 =$_FILES["image2"]["tmp_name"];
        $to2 = "images/room/".mb_convert_encoding($fileName2,"Big5","UTF8");
        move_uploaded_file($from2,$to2);
    }

    if($fileName3!=null){
          $from3 =$_FILES["image3"]["tmp_name"];
          $to3 = "images/room/".mb_convert_encoding($fileName3,"Big5","UTF8");
          move_uploaded_file($from3,$to3);
    }

?>