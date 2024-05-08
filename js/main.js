let nombre;
let opcion;
let costototal;

let camponombre = document.getElementById("nombre");
let trabajo = document.getElementById("trabajo");
let material = document.getElementById("material");
let botoncalc = document.getElementById('botoncalc')

camponombre.addEventListener("change", CargarNombre);
trabajo.addEventListener("click", ElegirOpcion);
material.addEventListener("click", ElegirOpcion);
botoncalc.addEventListener("click", Calcular)

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
  materialeslista.style.display = 'block'
}

function mostrarCostosmano() {
  let costomanoO = document.getElementById("Costosmanodeobra");
  costomanoO.style.display = 'block'
}

function ocultarMateriales() {
  let materialeslista = document.getElementById("materiales-lista");
  materialeslista.style.display = 'none';
}

function ocultarCostosmano() {
  let costomanoO = document.getElementById("Costosmanodeobra");
  costomanoO.style.display = 'none';
}

function BotonCostos(opcion) {
  let calcular = document.getElementById("calcular");
  if (opcion == 0) {
    calcular.style.display = 'none';
  } else {
    calcular.style.display = 'block';
  }
}

function Calcular(){
  console.log('los costos son')
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
