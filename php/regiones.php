<?php

try {
   include('connect.php');
   if ($result = $mysqli -> query("SELECT nombre AS region, region_ordinal AS ordinal FROM regiones ")) {
        while ($obj = $result -> fetch_object()) {
        $myArray[] = [ $obj];
       }
       echo json_encode($myArray);
      $result -> free_result();
   
   }else{
      throw new Exception("Error al obtener las regiones.", 1);
   }
  
   
} catch (Exception $e) {
   echo 'Excepción capturada: ',  $e->getMessage(), "\n";
}



?>