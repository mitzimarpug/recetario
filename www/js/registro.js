var nombre = document.getElementById("nombre");
var ingredientes = document.getElementById("ingredientes");
var procedimiento = document.getElementById("procedimiento");
var input = document.getElementById("imagen");
var urlImagen; 

input.addEventListener('change', function() {
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            
            urlImagen = e.target.result;

            
            imagen.src = urlImagen;

           
            console.log("URL de la imagen almacenada:", urlImagen);
        };

        reader.readAsDataURL(file);
    }
});

var recetas = JSON.parse(localStorage.getItem("recetas")) || [];

function agregar() {
    var receta = {
        nombre: nombre.value,
        imagen: urlImagen,
        ingredientes: ingredientes.value,
        procedimiento: procedimiento.value,
    }

    recetas.push(receta);

    console.log(recetas);

    localStorage.setItem("recetas", JSON.stringify(recetas));

    Swal.fire({
        position: "center",
        icon: "success",
        title: "La receta se ha guardado correctamente",
        showConfirmButton: false,
        timer: 1500
      });

    // alert("La receta se ha agregado correctamente");

    limpiar();
}

function limpiar() {
    nombre.value = "";
    input.value = ""; 
    ingredientes.value = "";
    procedimiento.value = "";
}
