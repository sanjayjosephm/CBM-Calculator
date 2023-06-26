let width = document.getElementById("width")
let height = document.getElementById("height")
let len = document.getElementById("length")
let resultItem = document.getElementById("answer")
let ans = document.getElementById("submit")

ans.addEventListener("click", function () {
  let val1 = width.value
  let val2 = height.value
  let val3 = len.value
  console.log(typeof val1);
  console.log(val2);
  console.log(val3);
  // Ensure positive values for dimensions

  let cbm = (val1 * val2 * val3) / 1000000;
  console.log(cbm);
  resultItem.innerHTML = cbm;
});

// try {
//     // Ensure positive values for dimensions
//     if (len <= 0 || width <= 0 || height <= 0) {
//       throw new Error("Dimensions must be positive values.");
//     }
//     const cbm = (val1*val2*val3)/1000000
//     resultItem.innerText = "The CBM is : " + cbm
//     resultItem.classList.remove("error");
// } catch(error){
//     console.error("An error occurred:", error.message);
//     resultItem.innerText = "Error: " + error.message;
//     resultItem.classList.add("error");
// }
// console.log(cbm)