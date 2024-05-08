let nombre;
let opcion;
let costototal;

let camponombre = document.getElementById("nombre");
let trabajo = document.getElementById("trabajo");
let material = document.getElementById("material");

camponombre.addEventListener("change", CargarNombre);
trabajo.addEventListener("click", ElegirOpcion);
material.addEventListener("click", ElegirOpcion);

function CargarNombre() {
  let nombre = camponombre.value;
  let contieneNumerosOSimbolos =
    /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(nombre);
  if (contieneNumerosOSimbolos) {
    camponombre.classList.add("alert");
  } else {
    camponombre.classList.remove("alert");
  }
  return nombre;
}

function ElegirOpcion() {
  opcion = Number(material.checked) * 2 + Number(trabajo.checked);
  console.log(opcion);
  switch (opcion) {
    case 1:
      mostrarCostosmano();
      ocultarMateriales();
      BotonCostos(opcion);
      break;
    case 2:
      mostrarMateriales();
      ocultarCostosmano();
      BotonCostos(opcion);
      break;
    case 3:
      mostrarCostosmano();
      mostrarMateriales();
      BotonCostos(opcion);
      break;
    default:
      ocultarMateriales();
      ocultarCostosmano();
      BotonCostos(opcion);
      break;
  }
  return opcion;
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

function mostrarMateriales() {
  let materialeslista = document.getElementById("materiales-lista");
  let HTML = "<fieldset>" + "<legend>Costo de Materiales</legend>";
  if (localStorage.getItem("materiales")) {
    materiales.forEach(function (material, index) {
      HTML +=
        "<input type='number' id='material" +
        index +
        "' name='material" +
        index +
        "'/>" +
        "<label for='material" +
        index +
        "'>" +
        material.nombre +
        "</label><br>";
    });
  } else {
    HTML += "No hay materiales en la base de datos";
  }

  HTML += "</fieldset>";
  materialeslista.innerHTML = HTML;
}

function mostrarCostosmano() {
  let costomanoO = document.getElementById("Costosmanodeobra");
  let HTML =
    "<fieldset>" +
    "<legend>Costos mano de obra</legend>" +
    "<div>" +
    "<input type='number' id='htrabajo' name='HoradeTrabajo'/>" +
    "<label for='htrabajo'>Horas de Trabajo/dia</label>" +
    "</div>" +
    "<div>" +
    "<input type='number' id='dtrabajo' name='DiasdeTrabajo' />" +
    "<label for='dtrabajo'>Costo de materiales</label>" +
    "</div>" +
    "</fieldset>";
  costomanoO.innerHTML = HTML;
}

function ocultarMateriales() {
  let materialeslista = document.getElementById("materiales-lista");
  let HTML = "";
  materialeslista.innerHTML = HTML;
}

function ocultarCostosmano() {
  let costomanoO = document.getElementById("Costosmanodeobra");
  let HTML = "";
  costomanoO.innerHTML = HTML;
}

function BotonCostos(opcion) {
  let calcular = document.getElementById("calcular");
  let HTML;
  if (opcion == 0) {
    HTML = "";
  } else {
    HTML = "<button id='botoncalc'>Calcular</button>";
  }
  console.log(opcion)
  calcular.innerHTML = HTML;
}

CargarMateriales();

/*

function CostoHora() {
  let horas = parseFloat(prompt("¿Cuantas horas trabaja por dia?"));
  let dias = parseFloat(prompt("¿Cuantos dias va a trabajar?"));
  let costohora = horas * dias * valorh;
  return costohora;
}

function CostoMateriales() {
  const cable = parseFloat(prompt("¿Cuantos metros de cable va a usar?"));
  const enchufe  = parseFloat(prompt("¿Cuantos enchufes va a poner?"));
  return materiales1 = buscarCosto("cable") * cable + buscarCosto("enchufe") * enchufe;
}

function MensajeCosto() {
  alert(nombre + " el costo es " + costo + "$");
}

function buscarCosto(materialABuscar) {
    for (var i = 0; i < materiales.length; i++) {
        if (materiales[i].material === materialABuscar) {
            return materiales[i].costo;
        }
    }
}
*/
