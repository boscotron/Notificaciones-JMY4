jQuery(function($){
	/*$("#save").on('click',function(event) {
		 event.preventDefault();
			// var dto = $('#visualizarI').attr("src");
			console.log("clickear");
			console.log(upload_file);
			
			// console.log(dto);
			// var datos = new FormData();
			// $.each(upload_file, function(index, val) {
			// 	 datos.append("dato",val);
			// });
		
			$.ajax({
				url: window.location+'/guardar',
				method:'post',
				dataType: 'json',
				data: { datos : arrayDatos},
				success:function(res){
					console.log(res);
				}
			});
		
			// $.ajax({
			// 	url: window.location+"/subirArchivo",
			// 	method: "post",
			// 	contentType: "multipart/form-data",
			// 	processData: false,
			// 	data: datos,
			// 	success:function(response){
			// 		console.log(response);
			// 	},
			// 	error:function(er){
			// 		console.log(er);
			// 	}
			// });			
			console.log("datos mostrar",datos);
	});	

	function doAjax(){
		var img = $("#img").file();
		console.log();
		console.log(dto);
		var datos = new FormData();
		datos.append('dato',datos);
		$.ajax({
			url:window.location+'/subirArchivo',
			method: "POST",
       	 	enctype: 'multipart/form-data',
       	 	data:{'datos',datos},
       	 	success:(respuesta)=>{
       	 		
       	 	}
		})
	}*/

	const nameUser = $("#nameuse").val();
	var stats = 0;

	function mostrarDatos(){
		$.ajax({
			url: window.location+'/mostrar',
			success:function(respuesta){
				var da = respuesta.d;
				console.log("res",respuesta.d);
				$.each(da,function(index, val) {
					var fecha = new Date(val.datos.fecha * 1000);
					$(".timeline-body").append(`
						<p>`+val.datos.dato+`</p>
                            <h6>
                                <i class="ti-time"></i>
                                `+fecha+`
                            </h6>
                            <hr>
                    `);
				});
			}
		});
	}

	mostrarDatos();
	function subirArchivos(upfile,comodin){
		var archivo = upfile;
		console.log(archivo);
		var info_file = new FileReader;

		$(info_file).on('load',function(e){
			rutaArchivo = e.target.result;
			switch(comodin){
				case "imagen":
					if (archivo["type"] === "image/png" || archivo["type"] === "image/jpeg") {
						console.log("subiste una imagen");
						$('#visualizarI').attr('src',rutaArchivo);
								// $('#publicacion').val(rutaArchivo);
					}else{
						console.error("coloca unna imagen con el formato adecuado");
					}
				break;
				case "video":
					if (archivo["type"] === "video/mp4") {
						console.log("subiste un video");
						$('#visualizarV').attr('src',rutaArchivo);
					}else{
						console.error("coloca unna imagen con el formato adecuado");
						$('#visualizarV').attr("hidden",true);
					}
				break;
				case "archivo":
					if(archivo["type"] == "text/plain"){
						
					}else{
						console.error("coloca unna imagen con el formato adecuado");
					}
				break;
				default:
					console.error("No pongas tonterias... XD");
				break;
				}

			})
			info_file.readAsDataURL(archivo);
	}

	function doHeader(ti,tp,us,et){
		var arrayHeader = {
			ti:ti,
			tp:tp,
			us:us,
			et:et
			};
		return arrayHeader;
	}

	function saveData(d,h){
		var f = new Date();	
		var funix = f.getTime();
		var arrayDatos = {'dato':d,'fecha':funix,'header':h}
		return arrayDatos;
	}

	$("#save").on('click',function() {
		var tipo = "";
		if (status == 1) {
			tipo = "Imagen";
		}else if(status == 2){
			tipo = "Video";
		}else {
			tipo = "Nota";
		}
		var cabezera = doHeader(Tipo,tipo,nameUser,"Personas");
		var dato = $("#texto").val();
		var datosInfo = saveData(dato,cabezera); 
	
		$.ajax({
			url: window.location+'/guardar',
			method:'post',
			dataType: 'json',
			data: { datos : datosInfo},
			success:function(res){
				console.log(res);
			}
		});

		$("#texto").val(' ');
		$(".timeline-body").html('');
		$('#visualizarI').attr("src","");
		$('#visualizarV').attr("src","");
		$('#visualizarV').attr("hidden",true);
		mostrarDatos();
	});

	$("#img").on('change',function(e){
		status = 1;
		upload_file = this.files[0];
		subirArchivos(upload_file,"imagen");	
		$('#visualizarV').attr("src","");
		$('#visualizarV').attr("hidden",true);
	});

	$("#vdo").on('change',function(){
		status = 2;
		upload_file = this.files[0];
		subirArchivos(upload_file,"video");
		$('#visualizarV').removeAttr('hidden');
		$('#visualizarI').attr("src","");
		
	});

});