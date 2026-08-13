import "./style.css";
import { animate } from "motion";
import { reducedMotion } from "./studio";

const hunterEl = document.querySelector<HTMLElement>("#hunter");
const statusEl = document.querySelector("#status");
if (!hunterEl || !statusEl) throw new Error("missing hunter");
const hunter = hunterEl;
const status = statusEl;

let tx = innerWidth / 2;
let ty = innerHeight / 2;
let x = 40;
let y = 40;
const reduce = reducedMotion();

window.addEventListener("pointermove", (e) => {
  tx = e.clientX;
  ty = e.clientY;
});

window.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  status.textContent = "you cannot click. it ate the click.";
}, true);

if (!reduce) {
  animate("h1", { opacity: [0, 1], x: [-24, 0] }, { duration: 0.7 });
}

function tick(): void {
  x += (tx - x) * 0.12;
  y += (ty - y) * 0.12;
  const rot = reduce ? 0 : Math.max(-18, Math.min(18, (tx - x) * 0.08));
  hunter.style.transform = `translate(${x - 40}px, ${y - 24}px) rotateY(${rot}deg)`;
  const d = Math.hypot(tx - x, ty - y);
  if (d < 28) status.textContent = "it is on you.";
  requestAnimationFrame(tick);
}
tick();
