const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const resultDiv = document.getElementById("result");
const quantityValue = document.getElementById("quantity");
const weightPerPackage = document.getElementById("weight");
const measuringUnitSelect = document.getElementById("measuring-unit");
const measuringUnitSelect_2 = document.getElementById("measuring-unit-2");

let form = document.getElementById("cbmForm");

let selectedUnit = measuringUnitSelect.value;

let selectedUnit_2 = measuringUnitSelect_2.value;
console.log(selectedUnit);
console.log(selectedUnit_2);

measuringUnitSelect.addEventListener("change", function () {

  resultDiv.innerHTML = "";
  lengthInput.value = "";
  widthInput.value = "";
  heightInput.value = "";
  quantityValue.value = ""
  weightPerPackage.value = ""
  selectedUnit = measuringUnitSelect.value;
  if (selectedUnit === "inch") {
    selectedUnit_2 = "Lbs";
    console.log(selectedUnit_2);
    updateMeasuringUnitOptions_2();
  }
  if(selectedUnit === "cm"){
    selectedUnit_2 = "Kg";
    console.log(selectedUnit_2);
    updateMeasuringUnitOptions_2();
  }
  console.log(selectedUnit);
});

measuringUnitSelect_2.addEventListener("change", function () {

  resultDiv.innerHTML = "";
  lengthInput.value = "";
  widthInput.value = "";
  heightInput.value = "";
  quantityValue.value = ""
  weightPerPackage.value = ""

  selectedUnit_2 = measuringUnitSelect_2.value;
    if (selectedUnit_2 === "Lbs") {
    selectedUnit = "inch";
    console.log(selectedUnit);
    updateMeasuringUnitOptions_1();
  }
  if(selectedUnit_2 === "Kg"){
    selectedUnit = "cm";
    console.log(selectedUnit_2);
    updateMeasuringUnitOptions_1();
  }
  console.log(selectedUnit_2);
});


function updateMeasuringUnitOptions_1(){
  const measuringUnitSelect1Options = measuringUnitSelect.querySelectorAll("option");
  if (selectedUnit_2 === "Lbs") {
    measuringUnitSelect1Options[0].textContent = "IN";
    measuringUnitSelect1Options[1].textContent = "CM";
    measuringUnitSelect1Options[0].value = "inch";
    measuringUnitSelect1Options[1].value = "cm";
  } else if(selectedUnit_2 === "Kg") {
    measuringUnitSelect1Options[0].textContent = "CM";
    measuringUnitSelect1Options[1].textContent = "IN";
    measuringUnitSelect1Options[0].value = "cm";
    measuringUnitSelect1Options[1].value = "inch";
  }
}


function updateMeasuringUnitOptions_2() {
  const measuringUnitSelect2Options = measuringUnitSelect_2.querySelectorAll("option");
  
  if (selectedUnit === "inch") {
    measuringUnitSelect2Options[0].textContent = "LBS";
    measuringUnitSelect2Options[1].textContent = "KG";
    measuringUnitSelect2Options[0].value = "Lbs";
    measuringUnitSelect2Options[1].value = "Kg";
  } else if(selectedUnit === "cm") {
    measuringUnitSelect2Options[0].textContent = "KG";
    measuringUnitSelect2Options[1].textContent = "LBS";
    measuringUnitSelect2Options[0].value = "Kg";
    measuringUnitSelect2Options[1].value = "Lbs";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const length = Math.floor(parseFloat(lengthInput.value));
  const width = Math.floor(parseFloat(widthInput.value));
  const height = Math.floor(parseFloat(heightInput.value));
  const quantity = Math.floor(parseFloat(quantityValue.value));
  const weight = Math.floor(parseFloat(weightPerPackage.value));

  try {
    if (length <= 0 || width <= 0 || height <= 0) {
      throw new Error("Dimensions must be positive values.");
    }

    if(selectedUnit==="cm"){
      cbmDisplay(length, width, height, quantity, weight);
    }
    if(selectedUnit==="inch"){
      cftDisplay(length, width, height, quantity, weight);
    }
    // console.log(length, width, height, quantity, weight)

  } catch (error) {
    console.error("An error occurred:", error.message);

    // Display error message
    resultDiv.innerText = "Error: " + error.message;
    resultDiv.classList.add("error");
  }

  // Clear input fields
  // lengthInput.value = "";
  // widthInput.value = "";
  // heightInput.value = "";
});

function cbmDisplay(l, w, h, qty, wt) {

  let unitLabel = "cm";
  if (selectedUnit === "inch") {
    // Convert dimensions to inches
    l /= 2.54;
    w /= 2.54;
    h /= 2.54;
    unitLabel = "inch";
  }
  const cbm = (l * w * h * qty) / 1000000;
  const grossWeight = qty * wt;
  const airVolumetricWeight = ((w * l * h) / 6000) * qty;
  const seaVolumetricWeight = ((w * l * h) / 1000) * qty;

  resultDiv.innerHTML = `
    <p>CBM : ${cbm.toFixed(3)} m<sup>3</sup></p>
    <p>Gross Weight : ${grossWeight} kgs</p>
    <p>Volumetric Weight (Air freight) : ${airVolumetricWeight.toFixed(3)} kgs</p>
    <p>Volumetric Weight (Sea freight) : ${seaVolumetricWeight.toFixed(3)} kgs</p>
  `;

  resultDiv.classList.remove("error");
}


function cftDisplay(l, w, h, qty, wt) {
  let unitLabel = "inch";
  if(selectedUnit_2==="Kg"){
    selectedUnit_2="lbs"
  }
  // if (selectedUnit === "inch") {
  //   // Convert dimensions to inches
  //   l /= 2.54;
  //   w /= 2.54;
  //   h /= 2.54;
  //   unitLabel = "inch";
  // }
  const cft = (l * w * h * qty) / 1728;
  const grossWeight = qty * wt; 
  const airVolumetricWeight = (((w * l * h) / 366)*2.20462) * qty;
  const seaVolumetricWeight = ((((l * w * h) / 1728) * 28.3168)*2.20462) * qty;

  resultDiv.innerHTML = `
    <p>CFT : ${cft.toFixed(3)} ft<sup>3</sup></p>
    <p>Gross Weight : ${grossWeight} Lbs</p>
    <p>Gross Weight(kg) : ${(grossWeight/2.205).toFixed(3)} kgs</p>
    <p>Volumetric Weight (Air freight) : ${airVolumetricWeight.toFixed(3)} Lbs</p>
    <p>Volumetric Weight (Sea freight) : ${seaVolumetricWeight.toFixed(3)} Lbs</p>
  `;
  resultDiv.classList.remove("error");
}



