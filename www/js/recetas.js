var recetas = JSON.parse(localStorage.getItem("recetas")) || [];
var datos = document.getElementById("datos");
var indiceEdicion = -1;
var urlImagen; 
var input = document.getElementById("imagen");
input.addEventListener('change', function() {
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
          
            urlImagen = e.target.result;

            console.log("URL de la imagen almacenada:", urlImagen);
        };

        reader.readAsDataURL(file);
    }
});

function renderizarRecetas(element, index) {

    datos.innerHTML += `
    <section class="form-otro">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="receta-container">
                        <h3 class="receta-titulo">${element.nombre}</h3>
                        <img class="receta-img" src="${element.imagen}" alt="">
                        <h5 class="receta-texto">Ingredientes:</h5>
                        <textarea class="cajasTexto" readonly="readonly" cols="40" rows="10">${element.ingredientes}</textarea>
                        <h5 class="receta-texto">Preparación:</h5>
                        <textarea class="cajasTexto" readonly="readonly" cols="40" rows="10">${element.procedimiento}</textarea>
                        <div class="receta-botones">
                        <button class="editar" id="editar" onclick="editar(${index})">Editar</button>
                        <button class="eliminar" onclick="eliminar(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

function guardarEnLocalStorage() {
    localStorage.setItem("recetas", JSON.stringify(recetas));
}

function eliminar(index) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la receta permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            recetas.splice(index, 1);
            guardarEnLocalStorage();
            actualizarVista();
            Swal.fire("¡Eliminado!", "La receta ha sido eliminada", "success");
        }
    });
}

function editar(index) {
    var receta = recetas[index];
    document.getElementById("nombre").value = receta.nombre;
    document.getElementById("ingredientes").value = receta.ingredientes;
    document.getElementById("procedimiento").value = receta.procedimiento;
    
    indiceEdicion = index;

    modal.style.display = 'block';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  function guardarEdicion() {
    Swal.fire({
        title: "¿Estás seguro de guardar los cambios?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Guardado", "", "success");
          if (indiceEdicion !== -1) {
            var nombreReceta = document.getElementById("nombre").value;
            var ingredientesReceta = document.getElementById("ingredientes").value;
            var procedimientoReceta = document.getElementById("procedimiento").value;
    
            var recetaEditada = {
                nombre: nombreReceta,
                imagen: urlImagen || recetas[indiceEdicion].imagen, 
                ingredientes: ingredientesReceta,
                procedimiento: procedimientoReceta,
            };
    
            recetas[indiceEdicion] = recetaEditada;
    
            urlImagen = undefined;
            limpiarCampos();
    
            document.getElementById("nombre").value = "";
            document.getElementById("ingredientes").value = "";
            document.getElementById("procedimiento").value = "";
    
            indiceEdicion = -1;
    
            guardarEnLocalStorage();
            actualizarVista();
            closeModal();
        }

        } else if (result.isDenied) {
          Swal.fire("Los cambios no fueron guardados", "", "información");
        }
      });

    
}



function actualizarVista() {
    document.getElementById("datos").innerHTML = "";
    recetas.forEach(renderizarRecetas);
}

recetas.forEach(renderizarRecetas);

    var modal = document.getElementById('myModal');
    var openModalBtn = document.getElementById('editar');
    var closeModalBtn = document.getElementById('closeModalBtn');

    openModalBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
          closeModal();
        }
    });

    function limpiarCampos() {
        nombre.value = "";
        input.value = ""; // Restablecer el valor del campo de entrada de archivo
        ingredientes.value = "";
        procedimiento.value = "";
        input.src = ""; // Limpia la vista previa de la imagen
    }
    