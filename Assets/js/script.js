$(function() {
    /** ##### Cargar Select #### */
    
    $.ajax({
        type: "POST",
        url: "php/regiones.php",
        success: function (data) {
            $.each(data, function(i,) {
                let nombre = data[i][0]['region'];
                let ordinal = data[i][0]['ordinal'];
                $("#region").append(`<option value="${ordinal}">
                ${nombre}
           </option>`);
            });
        }
        })
    
        
        $( "#region" ).on( "change", function() {
            let ordinal = {
                ordinal: $("#region").val()
            };
            $.ajax({
                type: "POST",
                url: "php/comunas.php",
                data:  ordinal,
                success: function (data) {
                    $.each(data, function(i, item) {
                        let nombre = item;
                        $("#comuna").append(`<option value="${nombre}">
                        ${nombre}</option>`);
                   
                    });
                }
                });
        } );

        let checks = $( "input[name='pregunta[]']").on( "click", function() {
        var checkboxes = $("input[name='pregunta[]']:checkbox:checked").length;
            
            if(checkboxes > 2){
                console.log($(this).prop('checked',false));
                alert("Solo puedes elegir 2 opciones");
            }
        } );
       
            /** ##### Valida alias ##### */
    function validaNumeros(str) {
        return /\d/.test(str);
      }

      let alias_val = false;
      let alias_val2 = false;
    $( "#alias" ).on( "blur", function() {
       let x = validaNumeros($(this).val());
       console.log(x);
       if(x){
       alias_val = true;
       $("#msgerror_alias").html("");

       }else{
        $("#msgerror_alias").html("El alias debe contener al menos un numero.");
       }
       const y = $(this).val();
       y.replace(/[0-9]+/g, "");
       if(y.length > 3){
        alias_val2 = true;
       }
        
    } );
    
    /** ##### Envio de formulario ##### */
    $( "#formulario" ).on( "submit", function(e) {
        
        if(alias_val == true && alias_val2 == true){


            var dataString = $(this).serializeArray();

            console.log(dataString);

            $.post("php/form_data.php", dataString , function(data, status){
                console.log(data.error);
                if(data.error != ""){
                    alert (data.error);
                }else{
                    alert("Guardando datos");
                }
                
              });


            /*$.ajax({
            type: "POST",
            url: "php/form_data.php",
            data: dataString,
            done: function (data) {
                alert("Guardando datos");
            }
            });*/
        }else{
            alert("Completa los campos correctamente.");
        }
        e.preventDefault();


    });

    
});
