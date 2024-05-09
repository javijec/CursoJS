let manoDeObra;
let materiales;

/* const nombreInput = document.getElementById("nombre");
 */
const calcularButton = document.getElementById("botoncalc");
const formulario2 = document.getElementById("formulario2");

/* nombreInput.addEventListener("change", cargarNombre);
 */
calcularButton.addEventListener("click", calcular);
formulario2.addEventListener("submit", actualizarValorManodeObra);

/* function cargarNombre() {
  const nombre = nombreInput.value;
  const contieneNumerosOSimbolos =
    /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(nombre);
  nombreInput.classList.toggle("alert", contieneNumerosOSimbolos);
  return nombre;
} */

function mostrarCostosMano() {
  const costomano = document.getElementById("costomano");
  costomano.innerHTML = `El valor de la hora de mano de obra es ${manoDeObra.valor} pesos`;
}

function calcular() {
  const trabajoCheckbox = document.getElementById("trabajo");
  const materialCheckbox = document.getElementById("material");
  const costo = document.getElementById("costo");
  const htrabajo = document.getElementById("htrabajo").value;
  const dtrabajo = document.getElementById("dtrabajo").value;
  const mano = manoDeObra.valor;
  let valormaterial = 0;
  let valormano = 0;
  const opcion =
    Number(materialCheckbox.checked) + Number(trabajoCheckbox.checked)*2;
console.log(opcion)
  const calcularValorMaterial = () => {
    materiales.forEach((material, index) => {
      valormaterial +=
        document.getElementById("material"+ index).value * material.costo;
    });
  };

  switch (opcion) {
    case 1:
      calcularValorMaterial();
      break;
    case 2:
      valormano = htrabajo * dtrabajo * mano;
      break;
    case 3:
      calcularValorMaterial();
      valormano = htrabajo * dtrabajo * mano;
      break;
    default:
      break;
  }

  let HTML = "";
  const precio = valormano + valormaterial;
  HTML = `Los costos son ${precio} pesos`;
  costo.innerHTML = HTML;
}

//Cambiar valores de la mano de Obra
function actualizarValorManodeObra(event) {
  const texto = document.getElementById("texto");
  const costo2 = document.getElementById("costomano2");
  event.preventDefault();
  manoDeObra.valor = costo2.value;
  costomano2.placeholder = costo2.value;
  guardarManodeObraEnLocalStorage();
}

function guardarManodeObraEnLocalStorage() {
  localStorage.setItem("costo", JSON.stringify(manoDeObra));
}

function cargarValorManodeObra() {
  const costo2 = document.getElementById("costomano2");
  if (manoDeObra.valor !== undefined) {
    costomano2.placeholder = manoDeObra.valor;
  }
}

//cargar datos del localstorage
function cargarLocalStorage() {
  // Verificar si hay valores en el localStorage para 'materiales'
  if (localStorage.getItem("materiales")) {
    // Si hay valores, cargarlos en la variable 'materiales'
    materiales = JSON.parse(localStorage.getItem("materiales"));
  } else {
    // Si no hay valores, cargar el array proporcionado y guardarlo en el localStorage
    materiales = [{"nombre":"Peras","costo":10},{"nombre":"Manzanas","costo":1}];
    localStorage.setItem("materiales", JSON.stringify(materiales));
  }
  
  // Verificar si hay valores en el localStorage para 'costo'
  if (localStorage.getItem("costo")) {
    // Si hay valores, cargarlos en la variable 'manoDeObra'
    manoDeObra = JSON.parse(localStorage.getItem("costo"));
  } else {
    // Si no hay valores, establecer un valor predeterminado y guardarlo en el localStorage
    manoDeObra = { valor: 1 };
    localStorage.setItem("costo", JSON.stringify(manoDeObra));
  }
  
}


cargarLocalStorage();
cargarValorManodeObra();

// Clase para manejar los materiales
class MaterialesManager {
  constructor() {
    // Verificar si hay materiales en el localStorage
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
    let listaHTML = `<div>`;
    this.materiales.forEach((material, index) => {
      listaHTML +=
        `<div class="row g-3 align-items-center">` +
        `<div class="col-auto"><input type='number' id='material${index}' name='material${index}' class="form-control" value="0" placeholder="0"/></div>` +
        `<div class="col-auto">${material.nombre} - $${material.costo}</div>` +
        `<div class="col-auto"><button onclick="materialesManager.eliminarMaterial(${index})" class="btn btn-primary col-auto">Eliminar</button></div>` +
        `</div>`;
    });
    listaHTML += `</div>`;
    this.materialesLista2.innerHTML = listaHTML;
  }

  agregarMaterial(event) {
    event.preventDefault();
    const nombreInput = document.getElementById("nombre-material");
    const costoInput = document.getElementById("costo-material");
    const nombre = nombreInput.value;
    const costo = parseInt(costoInput.value);

    if (this.materiales.some((material) => material.nombre === nombre)) {
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
