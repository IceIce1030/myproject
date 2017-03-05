<?php
  $dsn="mysql:host=localhost;dbname=furkid;charset=utf8;";
  $user="root";
  $password="sqek811030";
  // $dsn="mysql:host=localhost;dbname=ad104g3;charset=utf8;";
  // $user="ad104g3";
  // $password="ad104g3";
  $options=array( PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION); 
  $pdo = new PDO($dsn, $user, $password, $options);
?>
