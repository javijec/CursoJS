ocultarButton();
const laborCostcheckebox = document.getElementById("trabajo");
const materialCosstCheckbox = document.getElementById("material");

laborCostcheckebox.addEventListener("change", ocultarButton);
materialCosstCheckbox.addEventListener("change", ocultarButton);

function ocultarButton() {
    const laborCostcheckebox = document.getElementById("trabajo");
    const materialCosstCheckbox = document.getElementById("material");
  
    const button = document.getElementById("botton");
  
    if (laborCostcheckebox.checked || materialCosstCheckbox.checked) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }