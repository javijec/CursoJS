let manoDeObra;
let materiales;

const nombreInput = document.getElementById("nombre");
const trabajoCheckbox = document.getElementById("trabajo");
const materialCheckbox = document.getElementById("material");
const calcularButton = document.getElementById("botoncalc");

// nombreInput.addEventListener("change", cargarNombre);
trabajoCheckbox.addEventListener("click", elegirOpcion);
materialCheckbox.addEventListener("click", elegirOpcion);
calcularButton.addEventListener("click", calcular);

/* function cargarNombre() {
  const nombre = nombreInput.value;
  const contieneNumerosOSimbolos = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(nombre);
  nombreInput.classList.toggle("alert", contieneNumerosOSimbolos);
  return nombre;
} */

function elegirOpcion() {
  const opcion = Number(materialCheckbox.checked) * 2 + Number(trabajoCheckbox.checked);
  console.log(opcion);
  mostrarCostosMano(opcion);
  mostrarMateriales(opcion);
  botonCostos(opcion);
}

function mostrarMateriales(opcion) {
  const materialesLista = document.getElementById("materiales-lista");
  let HTML = "<fieldset><legend>Costo de Materiales</legend>";
if (materiales.length > 0) {
    materiales.forEach((material, index) => {
      HTML += `<input type='number' id='material${index}' name='material${index}'/>` +
              `<label for='material${index}'> ${material.nombre} - ${material.costo} $</label><br>`;
    });
  } else {
    HTML += "No hay materiales en la base de datos";
  }
  HTML += "</fieldset>";
  materialesLista.innerHTML = HTML;
  materialesLista.style.display = opcion === 2 || opcion === 3 ? "block" : "none";
}

function mostrarCostosMano(opcion) {
  const costomanoO = document.getElementById("Costosmanodeobra");
  const costomano = document.getElementById("costomano");
  if (opcion === 1 || opcion === 3) {
    costomano.innerHTML = `El valor de la hora de mano de obra es ${manoDeObra.valor} pesos`;
    costomanoO.style.display = "block";
  } else {
    costomanoO.style.display = "none";
  }
}

function botonCostos(opcion) {
  const calcular = document.getElementById("calcular");
  calcular.style.display = opcion === 0 ? "none" : "block";
}

function calcular() {
  const costo = document.getElementById("costo");
  const htrabajo = document.getElementById("htrabajo").value;
  const dtrabajo = document.getElementById("dtrabajo").value;
  const mano = manoDeObra.valor;

  let HTML = "";
  if (mano === 0 || htrabajo === 0 || dtrabajo === 0) {
    HTML = "El valor de la hora de mano de obra no ha sido cargado o alguno de los valores es 0";
  } else {
    const precio = htrabajo * dtrabajo * mano;
    HTML = `Los costos son ${precio} pesos`;
  }
  costo.innerHTML = HTML;
}

// Clase para manejar los materiales
class MaterialesManager {
  constructor() {
    this.materiales = this.cargarMateriales();
    this.formulario = document.getElementById("formulario-agregar");
    this.materialesLista2 = document.getElementById("materiales-lista2");
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
    this.materialesLista2.innerHTML = listaHTML;
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

