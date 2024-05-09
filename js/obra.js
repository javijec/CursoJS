let formulario = document.getElementById("formulario");
let costo = document.getElementById("costomano");
let texto = document.getElementById('texto')
let mano;

formulario.addEventListener("submit", GuardarManodeObra);

function GuardarManodeObra(event){
    event.preventDefault();
    mano.valor = costo.value;
    texto.innerHTML = 'el valor de la hora de mano de obras es '+mano.valor+' pesos';
    cargarenlocalstorage();
}

function cargarenlocalstorage(){
    const costoJson = JSON.stringify(mano);
    localStorage.setItem("costo", costoJson);
}

function CargarValor(){
    texto.innerHTML = "el valor de la hora de mano de obras es " + mano.valor + " pesos";
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
CargarValor();