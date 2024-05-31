async function loadLocalStorage() {
  const materialPromise = new Promise((resolve, reject) => {
    materials = JSON.parse(localStorage.getItem("materiales")) || [];

    if (materials.length === 0) {
      fetch("json/materiales.json")
        .then((response) => response.json())
        .then((data) => {
          materials = data;
          localStorage.setItem("materiales", JSON.stringify(materials));
          resolve();
        })
        .catch((error) => reject(error));
    } else {
      resolve();
    }
  });

  const laborCostPromise = new Promise((resolve, reject) => {
    laborCost = JSON.parse(localStorage.getItem("costo")) || {};

    if (Object.keys(laborCost).length === 0) {
      fetch("json/costo.json")
        .then((response) => response.json())
        .then((data) => {
          laborCost = data;
          localStorage.setItem("costo", JSON.stringify(laborCost));
          resolve();
        })
        .catch((error) => reject(error));
    } else {
      resolve();
    }
  });

  try {
    await Promise.all([materialPromise, laborCostPromise]);
    console.log("Datos cargados correctamente");
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

// Esperar a que los datos se carguen antes de crear la instancia de MaterialsManager
loadLocalStorage()
  .then(() => {
  // Tasa de cambio
  let exchangeRate = 1;

  // Escuchadores de eventos
  const calculateButton = document.getElementById("botoncalc");
  const form = document.getElementById("formulario2");
  const currencySelector = document.getElementById("currency-selector");
  const laborCostInput = document.getElementById("costomano");
  laborCostInput.placeholder = laborCost.valor;

  calculateButton.addEventListener("click", calculateCosts);
  form.addEventListener("submit", updateLaborCost);
  currencySelector.addEventListener("change", updateExchangeRate);
  laborCostInput.addEventListener("input", () => {
    laborCost.valor = laborCostInput.value;
  });

  // Actualizar la tasa de cambio
  async function updateExchangeRate() {
    if (currencySelector.value === "dolar") {
      const response = await fetch("https://api.bluelytics.com.ar/v2/latest");
      const data = await response.json();
      exchangeRate = data.blue.value_sell;
    } else {
      exchangeRate = 1;
    }
  }

  // Calcular costos
  function calculateCosts() {
    const laborCheckbox = document.getElementById("trabajo");
    const materialsCheckbox = document.getElementById("material");
    const hoursWorked = document.getElementById("htrabajo").value;
    const dailyRate = document.getElementById("dtrabajo").value;
    let totalMaterialCost = 0;
    let totalLaborCost = 0;
    const selectedOption =
      Number(materialsCheckbox.checked) + Number(laborCheckbox.checked) * 2;

    // Calculate total material cost if the checkbox is selected
    const calculateTotalMaterialCost = () => {
      if (materialsCheckbox.checked) {
        totalMaterialCost = materials.reduce((acc, material, index) => {
          return (
            acc +
            document.getElementById("material" + index).value * material.costo
          );
        }, 0);
      }
    };

    // Calculate total labor cost if the checkbox is selected
    const calculateTotalLaborCost = () => {
      if (laborCheckbox.checked) {
        if (laborCostInput.value !== undefined && laborCostInput.value !== "") {
          laborCostValue = laborCostInput.value;
          saveLaborCost();
        } else {
          laborCostValue = JSON.parse(localStorage.getItem("costo")).valor;
        }
        totalLaborCost = hoursWorked * dailyRate * laborCostValue;
      }
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

    // Calculate total cost in selected currency
    const totalCost = (totalLaborCost + totalMaterialCost) / exchangeRate;
    const currencySymbol = currencySelector.value === "dolar" ? "$" : "AR$";
    displayAlert(
      `Los costos son ${currencySymbol}${totalCost.toFixed(2)}`,
      selectedOption
    );

    // Save labor cost to local storage
    if (laborCostInput.valor !== undefined) {
      saveLaborCost();
    }
  }

  // Actualizar el costo de mano de obra
  function updateLaborCost(event) {
    event.preventDefault();
    const laborCostInput = document.getElementById("costomano");
    if (laborCostInput.value !== undefined && laborCostInput.value !== "") {
      laborCostValue = laborCostInput.value;
      saveLaborCost();
    }
  }

  // Guardar el costo de mano de obra en el almacenamiento local
  function saveLaborCost() {
    localStorage.setItem("costo", JSON.stringify(laborCost));
    laborCostInput.placeholder = laborCostInput.value;
  }

  // Clase para gestionar materiales
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
      let materialsListHTML = "";
      this.materials.forEach((material, index) => {
        materialsListHTML += `
          <div class="flex items-center py-2">
            <button class="quantity-button bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l hover:bg-gray-300 cursor-pointer">-</button>
            <input type="number" id="material${index}" name="material${index}" class="quantity-input w-16 text-center border-t border-b border-gray-300 py-2 px-4" value="0" min="0" readonly>
            <button class="quantity-button bg-gray-200 text-gray-700 font-bold py-2 px-4  hover:bg-gray-300 cursor-pointer rounded-r">+</button>
            <div class="px-2 w-[200px]">${material.nombre} - ARS$ ${material.costo}</div>
            <div class="px-2">
              <button onclick="materialsManager.removeMaterial(${index})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
            </div>
          </div>
        `;
      });
      this.materialsList.innerHTML = materialsListHTML;

      // Add event listeners to quantity buttons
      document.querySelectorAll(".quantity-button").forEach((button) => {
        button.addEventListener("click", (event) => {
          const input =
            event.target.parentElement.querySelector(".quantity-input");
          const action = event.target.textContent;
          let value = parseInt(input.value);
          if (action === "+") {
            value++;
          } else if (action === "-" && value > 0) {
            value--;
          }
          input.value = value;
        });
      });
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
        // Update the materials variable
        materials = this.materials;
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
      // Update the materials variable
      materials = this.materials;
    }
  }

  const materialsManager = new MaterialsManager();

  // Mostrar alerta
  function displayAlert(text, option) {
    if (option === 0) {
      swal("Oops", "no eligio ninguna de las opciones de costos", "error");
    } else {
      swal(text, "", "success");
    }
  }
});
