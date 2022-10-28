const $inbox = document.querySelector(".inbox");
const $inputs = $inbox.querySelectorAll(".item > input");
let isShiftHolded = false;

const inspectIsShiftHolded = (e) => {
  if (e.key === "Shift") {
    if (e.type === "keydown") {
      isShiftHolded = true;
    }
    if (e.type === "keyup") {
      isShiftHolded = false;
    }
  }
};

console.log($inputs);

const checkInbetween = () => {};

window.addEventListener("keydown", inspectIsShiftHolded);
$inbox.addEventListener("click", checkInbetween);
window.addEventListener("keyup", inspectIsShiftHolded);
