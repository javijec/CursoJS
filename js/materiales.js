// Clase para manejar los materiales
class MaterialesManager {
  constructor() {
    this.materiales = this.cargarMateriales();
    this.formulario = document.getElementById("formulario-agregar");
    this.materialesLista = document.getElementById("materiales-lista");
    this.formulario.addEventListener("submit", this.agregarMaterial.bind(this));
    this.mostrarMateriales();
  }

  cargarMateriales() {
    return JSON.parse(localStorage.getItem("materiales")) || [];
  }

  guardarMateriales() {
    localStorage.setItem("materiales", JSON.stringify(this.materiales));
  }

  mostrarMateriales() {
    let listaHTML = "<ul>";
    this.materiales.forEach((material, index) => {
      listaHTML += `<li>${material.nombre} - $${material.costo} <button onclick="materialesManager.eliminarMaterial(${index})">Eliminar</button></li>`;
    });
    listaHTML += "</ul>";
    this.materialesLista.innerHTML = listaHTML;
  }

  agregarMaterial(event) {
    event.preventDefault();
    const nombreInput = document.getElementById("nombre-material");
    const costoInput = document.getElementById("costo-material");
    const nombre = nombreInput.value;
    const costo = parseInt(costoInput.value);

    if (this.materiales.some(material => material.nombre === nombre)) {
      alert(`El material '${nombre}' ya existe en la lista.`);
    } else {
      this.materiales.push({ nombre, costo });
      this.guardarMateriales();
      this.mostrarMateriales();
      alert(`Material '${nombre}' agregado correctamente.`);
    }

    nombreInput.value = "";
    costoInput.value = "";
  }

  eliminarMaterial(index) {
    const nombre = this.materiales[index].nombre;
    this.materiales.splice(index, 1);
    this.guardarMateriales();
    this.mostrarMateriales();
    alert(`Material '${nombre}' eliminado correctamente.`);
  }
}

const materialesManager = new MaterialesManager();


//cargar datos del localstorage
function cargarlocalstorage() {
  materiales = JSON.parse(localStorage.getItem("materiales")) || [];
  console.log(materiales ? "Hay materiales en local" : "No hay materiales en local" );
  manoDeObra = JSON.parse(localStorage.getItem("costo")) || { valor: 0 };
  console.log(manoDeObra ? "Hay valores en local" : "No hay valores en local");
}

cargarlocalstorage();
