<?php

try {
   include('connect.php');
   if(!empty($_REQUEST)){
      /* obtenemos el id de la region */
      $rut =         $_REQUEST['rut'];
      $nombre        = $_REQUEST['nombre']; 
      $correo        =  $_REQUEST['correo']; 
      $alias         = $_REQUEST['alias']; 
      $region        = $_REQUEST['region']; 
      $nombre_coumna = $_REQUEST['comuna']; 
      $candidato     = $_REQUEST['candidato'];
      $preguntas     = $_REQUEST['pregunta'];
   

      if(count($preguntas) == 1){
      $preguntas_new = $_REQUEST['pregunta'][0];
      }else{
         foreach ($preguntas as $key => $value) {
       
            if($key < 1){
   
            $pregunta_new = $value.",";
            }else{
            $preguntas_new = $pregunta_new.$value;
            }
         }
      }

      if ($result = $mysqli -> query("SELECT id
         FROM regiones
         WHERE region_ordinal LIKE '%".$region."%' ")) {
         $obj = $result -> fetch_object();
         $region_id = $obj->id;
            
      }else{
         throw new Exception("Error al obtener id region.", 1);
      }
      /**  obtenemos el id de la comuna   */
      if ($result = $mysqli -> query("SELECT `id` FROM `comunas` WHERE nombre LIKE  '%".$nombre_coumna."%' ")) {
         $obj = $result -> fetch_object();
         $comuna_id = $obj->id;
            
      }else{
         throw new Exception("Error al obtener id comuna.", 1);
      }

      /**  validar rut no este registrado  */
      if ($result = $mysqli -> query("SELECT rut FROM `votaciones` WHERE rut =  '".$rut."' ")) {
         $obj = $result -> fetch_object();
         $rut_registrado = $obj->rut;
            
      }else{
         throw new Exception("Error al obtener id comuna.", 1);
      }

      /** #### query insert #### */
      if(empty($rut_registrado) ){
         if ($result = $mysqli -> query("INSERT INTO 
         `votaciones`(`rut`, `nombre`,`alias` ,  `correo` ,`region`, `comuna`, `candidato`, `pregunta`)
         VALUES ('".$rut."' , '".$nombre."' , '".$alias."' , '".$correo."' , ".$region_id." , ".$comuna_id." , '".$candidato."', '".$preguntas_new."' )")) {

         echo $success[] = "Voto registrado.";
         }else{
            throw new Exception("Error al insertar datos.", 1);
         }
      }else{
          $error['error'] =  "El rut ya ha votado.";
        echo json_encode($error);
      }
     
   
      }else{
         throw new Exception("Error con post.", 1);
      }
  
      
   } catch (Exception $e) {
      echo 'Excepción capturada: ',  $e->getMessage(), "\n";
   }



?>