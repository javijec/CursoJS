let nombre;
let opcion;
let costototal;
let mano;

let camponombre = document.getElementById("nombre");
let trabajo = document.getElementById("trabajo");
let material = document.getElementById("material");
let botoncalc = document.getElementById("botoncalc");

camponombre.addEventListener("change", CargarNombre);
trabajo.addEventListener("click", ElegirOpcion);
material.addEventListener("click", ElegirOpcion);
botoncalc.addEventListener("click", Calcular);

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
      break;
    case 2:
      mostrarMateriales();
      ocultarCostosmano();
      break;
    case 3:
      mostrarCostosmano();
      mostrarMateriales();
      break;
    default:
      ocultarMateriales();
      ocultarCostosmano();
      break;
  }
  BotonCostos(opcion);
  return opcion;
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
        " - $" + material.valor
        "</label><br>";
    });
  } else {
    HTML += "No hay materiales en la base de datos";
  }

  HTML += "</fieldset>";
  materialeslista.innerHTML = HTML;
  materialeslista.style.display = "block";
}

function mostrarCostosmano() {
  let costomanoO = document.getElementById("Costosmanodeobra");
  let costomano = document.getElementById("costomano");
  let HTML = "";	
  costomano.innerHTML = "el valor de la hora de mano de obras es " + mano.valor + " pesos";
  costomanoO.style.display = "block";
}

function ocultarMateriales() {
  let materialeslista = document.getElementById("materiales-lista");
  materialeslista.style.display = "none";
}

function ocultarCostosmano() {
  let costomanoO = document.getElementById("Costosmanodeobra");
  costomanoO.style.display = "none";
}

function BotonCostos(opcion) {
  let calcular = document.getElementById("calcular");
  if (opcion == 0) {
    calcular.style.display = "none";
  } else {
    calcular.style.display = "block";
  }
}

function Calcular() {
  let costo = document.getElementById("costo");
  let htrabajo = document.getElementById("htrabajo").value;
  let dtrabajo = document.getElementById("dtrabajo").value;
  let mano = JSON.parse(localStorage.getItem("costo")).valor;

  
  
  
  
  let HTML = "";
  if (mano == 0 || htrabajo == 0 || dtrabajo == 0) {
    HTML = "el valor de la hora de mano de obras no ha sido cargado o alguno de los valores es 0";
  } else {
    let precio = htrabajo * dtrabajo * mano;
    HTML = "los costos son" + precio + "$";
  }

  costo.innerHTML = HTML;
}
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

CargarManodeObra();
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
