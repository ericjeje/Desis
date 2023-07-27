    $(function() {
        
        $("#formulario").validate({
            rules: {
                nombre : {
                    required: true,
                    minlength: 3
                },
                rut : {
                required: true
                },
                alias: {
                required: true,
                minlength: 5
                },
                correo: {
                required: true,
                email: true
                },
                'pregunta': {
                }
            }
        });

    });

      /* #####VALIDACION RUT#### */
    var Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut : function (rutCompleto) {
          rutCompleto = rutCompleto.replace("‐","-");
          if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
            return false;
          var tmp   = rutCompleto.split('-');
          var digv  = tmp[1]; 
          var rut   = tmp[0];
          if ( digv == 'K' ) digv = 'k' ;
          
          return (Fn.dv(rut) == digv );
        },
        dv : function(T){
          var M=0,S=1;
          for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
          return S?S-1:'k';
        }
    }



    $('#rut').inputmask({
			mask: '(9(.999){2}-K)|(99(.999){2}-K)',
			casing: 'upper', //Si se escribe una K se antiene siempre en mayuscula
			keepStatic: false, //Le decimos que siempre use el numero mas corto a menos que se agreguen mas números
			clearIncomplete: true, //Si el rut escrito tiene menos de los caracteres necesarios se eliminara el contenido en BLUR
			positionCaretOnClick: 'none', //Para evitar que se haga un focus inecesario/no deseado
			showMaskOnFocus: false, //oculta la mascara en focus
        	showMaskOnHover: false, //oculta la mascara en hover
			"placeholder":"",
			definitions: {//Dejamos estipulado que la K en la "mask" puete ser tambien un numero
				'K': {
					validator: '[0-9|kK]',
					casing: 'upper',
				}
			},
			"oncomplete":function(){
				let rutRAW = $("#rut").inputmask('unmaskedvalue')//obtenemos y gardamos el RUT sin punto ni guion.
				let rutCompleto = rutRAW.substring(0, rutRAW.length-1);//obtenemos el RUT sin digito verificador para realizar calculo correcto
				let rut = rutCompleto.split("").reverse().join(""); // la cadena se da vuelta ejemplo 123 a 321
				let aux = 1; // inicializamos la variable en 1
				let suma = 0; // inicializamos la variable en 0
				for(i=0;i<rut.length;i++){ // recorremos el rut y medidimos su longitud
					aux++; // auxiliar se le suma 1 (2)
					suma += parseInt(rut[i])*aux; // cada numero de la cadena se multiplica por 2.
					if(aux == 7){ 
						aux = 1; 
					}
				}
				digit = 11-suma%11;
				let d;
				if(digit == 11){ // si es el resultado es 11 el digito verificador es 0
					d = "0";
				}
				else if(digit == 10){  // si el resultado es 10 el digito verificador es K
					d = "K";
				}
				else{
				  d = digit;
				}
			
				
			}
		});


 $(document).ready(function() {
    $("#rut").keyup(function(){
    	var rut = $(this).val();
        let rut_format = $(this).val().replace("." , "").replace("." , "");
        $("#rut").blur(function(){
            if (Fn.validaRut(rut_format)){
                $("#msgerror").html("");
              } else {
                $("#msgerror").html("El Rut no es válido. ");
              }
         });
  
    });
    $("#alias").keyup(function(){
        var alias = $(this).val();
        console.log(rut);
        
    if(alias.length > 5){
        
    }
});
});   