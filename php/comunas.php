<?php

try {
   include('connect.php');
   $ordinal = $_REQUEST['ordinal'][0];
   if ($result = $mysqli -> query("SELECT 
   comunas.nombre AS nombre, 
   provincia_nombre AS provincia,
   regiones.nombre AS region,
   regiones.region_ordinal AS ordinal
   FROM comunas
   INNER JOIN provincias ON 
   comunas.fk_id = provincias.provincia_id
   INNER JOIN regiones ON
   provincias.region_id = regiones.id
   WHERE regiones.region_ordinal LIKE '%".$ordinal."%' ")) {
      while ($obj = $result -> fetch_object()) {
        $myArray[] = $obj->nombre;
       }
       echo json_encode($myArray);
      $result -> free_result();
   
   }else{
      throw new Exception("Error al obtener las comunas.", 1);
   }
  
   
} catch (Exception $e) {
   echo 'Excepción capturada: ',  $e->getMessage(), "\n";
}



?>