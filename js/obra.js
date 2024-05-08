let formulario = document.getElementById("formulario");
let costo = document.getElementById("costomano");
let texto = document.getElementById('texto')
let mano = {valor:0}

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

function CargarManodeObra (){
    if (localStorage.getItem("costo")) {
        mano = JSON.parse(localStorage.getItem("costo"));
        console.log('hay valores en local')
      }else{
        mano = {valor:0}
        console.log('no hay valores en local')
      }
    texto.innerHTML = "el valor de la hora de mano de obras es " + mano.valor + " pesos";
}

CargarManodeObra ();

