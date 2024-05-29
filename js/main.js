// Load data from local storage
let laborCost;
let materials;
loadLocalStorage();

// Event listeners
const calculateButton = document.getElementById("botoncalc");
const form = document.getElementById("formulario2");
calculateButton.addEventListener("click", calculateCosts);
form.addEventListener("submit", updateLaborCost);

// Update labor cost placeholder
updateLaborCostPlaceholder();

// Calculate costs
function calculateCosts() {
  const laborCheckbox = document.getElementById("trabajo");
  const materialsCheckbox = document.getElementById("material");
  const hoursWorked = document.getElementById("htrabajo").value;
  const dailyRate = document.getElementById("dtrabajo").value;
  let totalMaterialCost = 0;
  let totalLaborCost = 0;
  const selectedOption =
    Number(materialsCheckbox.checked) + Number(laborCheckbox.checked) * 2;

  // Calculate total material cost
  const calculateTotalMaterialCost = () => {
    materials.forEach((material, index) => {
      totalMaterialCost +=
        document.getElementById("material" + index).value * material.costo;
    });
  };

  // Calculate total labor cost
  const calculateTotalLaborCost = () => {
    totalLaborCost = hoursWorked * dailyRate * laborCost.valor;
  };

  // Calculate costs based on selected option
  switch (selectedOption) {
    case 1:
      calculateTotalMaterialCost();
      break;
    case 2:
      calculateTotalLaborCost();
      break;
    case 3:
      calculateTotalMaterialCost();
      calculateTotalLaborCost();
      break;
    default:
      break;
  }

  // Calculate total cost
  const totalCost = totalLaborCost + totalMaterialCost;
  displayAlert(`Los costos son ${totalCost} pesos`, selectedOption);
}

// Update labor cost
function updateLaborCost(event) {
  event.preventDefault();
  const laborCostInput = document.getElementById("costomano");
  laborCost.valor = laborCostInput.value;
  laborCostInput.placeholder = laborCostInput.value;
  saveLaborCost();
}

// Save labor cost to local storage
function saveLaborCost() {
  localStorage.setItem("costo", JSON.stringify(laborCost));
}

// Update labor cost placeholder
function updateLaborCostPlaceholder() {
  const laborCostInput = document.getElementById("costomano");
  if (laborCost.valor !== undefined) {
    laborCostInput.placeholder = laborCost.valor;
  }
}

// Load data from local storage
function loadLocalStorage() {
  materials = JSON.parse(localStorage.getItem("materiales")) || [];
  laborCost = JSON.parse(localStorage.getItem("costo")) || {};

  // If no materials data, fetch from JSON file and save to local storage
  if (materials.length === 0) {
    fetch("json/materiales.json")
      .then((response) => response.json())
      .then((data) => {
        materials = data;
        localStorage.setItem("materiales", JSON.stringify(materials));
      })
      .catch((error) => console.error("Error:", error));
  }

  // If no labor cost data, fetch from JSON file and save to local storage
  if (Object.keys(laborCost).length === 0) {
    fetch("json/costo.json")
      .then((response) => response.json())
      .then((data) => {
        laborCost = data;
        localStorage.setItem("costo", JSON.stringify(laborCost));
      })
      .catch((error) => console.error("Error:", error));
  }
}

// Class for managing materials
class MaterialsManager {
  constructor() {
    this.materials = this.loadMaterials();
    this.form = document.getElementById("formulario-agregar");
    this.materialsList = document.getElementById("materiales-lista2");
    this.form.addEventListener("submit", this.addMaterial.bind(this));
    this.displayMaterials();
  }

  // Load materials from local storage
  loadMaterials() {
    return JSON.parse(localStorage.getItem("materiales")) || [];
  }

  // Save materials to local storage
  saveMaterials() {
    localStorage.setItem("materiales", JSON.stringify(this.materials));
  }

  // Display materials in HTML
  displayMaterials() {
    let materialsListHTML = `<div class="m-2">`;
    this.materials.forEach((material, index) => {
      materialsListHTML += `<div class="flex pw-3 items-center">
        <div class="px-2 max-w-[100px]"><input type='number' id='material${index}' name='material${index}' class=" w-full border border-gray-300 rounded-md shadow-sm p-2" value="0" placeholder="0"/></div>
        <div class="px-2 w-[200px]">${material.nombre} - $${material.costo}</div>
        <div class="px-2"><button onclick="materialsManager.removeMaterial(${index})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Eliminar</button></div>
        </div>`;
    });
    materialsListHTML += `</div>`;
    this.materialsList.innerHTML = materialsListHTML;
  }

  // Add material
  addMaterial(event) {
    event.preventDefault();
    const nameInput = document.getElementById("nombre-material");
    const costInput = document.getElementById("costo-material");
    const name = nameInput.value;
    const cost = parseInt(costInput.value);

    if (this.materials.some((material) => material.nombre === name)) {
      displayAlert(`El material '${name}' ya existe en la lista.`);
    } else {
      this.materials.push({ nombre: name, costo: cost });
      this.saveMaterials();
      this.displayMaterials();
      displayAlert(`Material '${name}' agregado correctamente.`);
    }

    nameInput.value = "";
    costInput.value = "";
  }

  // Remove material
  removeMaterial(index) {
    const name = this.materials[index].nombre;
    this.materials.splice(index, 1);
    this.saveMaterials();
    this.displayMaterials();
    displayAlert(`Material '${name}' eliminado correctamente`);
  }
}

const materialsManager = new MaterialsManager();

// Display alert
function displayAlert(text, option) {
  if (option === 0) {
    swal("Oops", "no eligio ninguna de las opciones de costos", "error");
  } else {
    swal(text, "", "success");
  }
}
