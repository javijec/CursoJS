let costo;
let nombre;
const valorh = 500;
let opcion;

let materiales = [{"material": "cable","costo": 1,},{"material": "enchufe","costo": 2,}]

alert("Bienvenido a la calculadora de costos");

do {
  nombre = Nombre();
  console.log(nombre);
  if (nombre !== null && nombre.trim().length < 1) {
    alert("no ingresaste ningun nombre")
  }
} while (nombre !== null && nombre.trim().length < 1);

opcion = parseFloat(
  prompt(
    "ingrese 1 para calcular costos laborales, 2 para calcular costos de materiales, 3 para calcularlos todos"
  )
);

switch (opcion) {
  case 1:
    costo = CostoHora();
    MensajeCosto();
    break;
  case 2:
    costo = CostoMateriales();
    MensajeCosto();
    break;
  case 3:
    costo = CostoHora() + CostoMateriales();
    MensajeCosto();
    break;
  default:
    alert("No ingreso una opcion valida");
    break;
}

function Nombre() {
  let nombre1 = prompt("¿Cual es tu nombre?");
  return nombre1;
}

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
