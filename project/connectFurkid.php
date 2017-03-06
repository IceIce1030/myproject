<?php 
$dsn="mysql:host:localhost;port=3306;dbname=furkid;charset=utf8";
$user="root";
$password="sqek811030";
$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
$pdo = new PDO($dsn, $user, $password, $options);
 ?>