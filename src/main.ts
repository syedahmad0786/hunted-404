import "./style.css";

const hunterEl = document.querySelector<HTMLElement>("#hunter");
const statusEl = document.querySelector("#status");
if (!hunterEl || !statusEl) throw new Error("missing hunter");
const hunter = hunterEl;
const status = statusEl;

let tx = innerWidth / 2;
let ty = innerHeight / 2;
let x = 40;
let y = 40;

window.addEventListener("pointermove", (e) => {
  tx = e.clientX;
  ty = e.clientY;
});

window.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  status.textContent = "you cannot click. it ate the click.";
}, true);

function tick(): void {
  x += (tx - x) * 0.12;
  y += (ty - y) * 0.12;
  hunter.style.transform = `translate(${x - 40}px, ${y - 24}px)`;
  const d = Math.hypot(tx - x, ty - y);
  if (d < 28) status.textContent = "it is on you.";
  requestAnimationFrame(tick);
}
tick();
