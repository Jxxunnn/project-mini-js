const $inbox = document.querySelector(".inbox");
const $inputs = $inbox.querySelectorAll(".item > input");
let isShiftHolded = false;
let firstCheck = null;
let lastCheck = null;

const detectIsShiftHolded = (e) => {
  if (e.key === "Shift") {
    if (e.type === "keydown") {
      isShiftHolded = true;
    }
    if (e.type === "keyup") {
      isShiftHolded = false;
    }
  }
};
const checkInbetween = (e) => {
  if (isShiftHolded && e.target.checked === true && !lastCheck) {
    firstCheck = e.target.dataset.indexNumber;
    console.log(firstCheck);
  }
  if (isShiftHolded && e.target.checked === true && firstCheck) {
    lastCheck = e.target.dataset.indexNumber;
    const [max, min] = [
      Math.max(firstCheck, lastCheck),
      Math.min(firstCheck, lastCheck),
    ];
    for (const input of $inputs) {
      const idx = input.dataset.indexNumber;
      if (idx > min && idx < max) input.checked = true;
    }
  }
};

window.addEventListener("keydown", detectIsShiftHolded);
$inbox.addEventListener("change", checkInbetween);
window.addEventListener("keyup", detectIsShiftHolded);
