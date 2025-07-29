document.getElementById('recetarandom').onchange = function() {
    var opcionSeleccionada = this.value; // Obtener el valor de la opción seleccionada
  
    switch (opcionSeleccionada) {
      case 'opcion1':
        window.location.href = "mexicana.html#receta3";
        break;
      case 'opcion2':
        window.location.href = "cuaresma.html#receta3";
        break;
      case 'opcion3':
        window.location.href = "sanvalentin.html#receta3";
        break;
      case 'opcion4':
        window.location.href = "navidad.html#receta3";
        default:
        alert('Opción no válida');
      }
    };