let index;
let materiales;
let formulario = document.getElementById("formulario-agregar");


function mostrarMateriales() {
  let materialeslista = document.getElementById("materiales-lista");
  let listaHTML = "<ul>";
  materiales.forEach(function (material, index) {
    listaHTML +=
      "<li>" +
      material.nombre +
      " - $" +
      material.costo +
      " <button onclick='eliminarMaterial(" +
      index +
      ")'>Eliminar</button></li>";
  });
  listaHTML += "</ul>";
  materialeslista.innerHTML = listaHTML;
}

function agregarMaterial(event) {
  event.preventDefault();
  let nombre = document.getElementById("nombre-material");
  let costomaterial = document.getElementById("costo-material");
  let costo = parseInt(costomaterial.value);

  let materialExistente = materiales.find(function (item) {
    return item.nombre === nombre.value;
  });

  if (materialExistente) {
    alert("El material '" + nombre.value + "' ya existe en la lista.");
  } else {
    materiales.push({ nombre: nombre.value, costo: costo });
    mostrarMateriales();
    alert("Material '" + nombre.value + "' agregado correctamente.");
  }

  // Limpiar los campos del formulario
  nombre.value = "";
  costomaterial.value = "";

  //guardar lista de materiales en el localstorage
  cargarenlocalstorage()
}

function eliminarMaterial(index) {
  let nombre = materiales[index].nombre;
  materiales.splice(index, 1);
  cargarenlocalstorage()
  mostrarMateriales();
  alert("Material '" + nombre + "' eliminado correctamente.");
}

function cargarenlocalstorage(){
    const materialesJson = JSON.stringify(materiales);
    localStorage.setItem("materiales", materialesJson);
}

formulario.addEventListener("submit", agregarMaterial);
        
function CargarManodeObra() {
  if (localStorage.getItem("costo")) {
    mano = JSON.parse(localStorage.getItem("costo"));
    console.log("hay valores en local");
  } else {
    mano = { valor: 0 };
    const costoJson = JSON.stringify(mano);
    localStorage.setItem("costo", costoJson);
    console.log("no hay valores en local");
  }
}

function CargarMateriales() {
  if (localStorage.getItem("materiales")) {
    // Si existe, cargarlo en el array "materiales"
    materiales = JSON.parse(localStorage.getItem("materiales"));
  } else {
    // Si no existe, crear un array vacío
    materiales = [];
  }
  return materiales;
}


// Mostrar la lista de materiales al cargar la página
mostrarMateriales();
