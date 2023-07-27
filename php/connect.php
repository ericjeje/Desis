<?php
  header('Content-Type: application/json; charset=utf-8');
try {
   $user = 'desis';
   $password = 'test';
   $db = 'desis';
   $host = '127.0.0.1';

   $mysqli = new mysqli("localhost","desis","test","desis");

   // Check connection
   if ($mysqli -> connect_errno) {
      throw new Exception("Error al conectar la base de datos.", 1);
   
   exit();
   }



} catch (Exception $e) {
   echo 'Excepción capturada: ',  $e->getMessage(), "\n";
}


?>