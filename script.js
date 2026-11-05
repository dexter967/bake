const wheel = document.querySelector(".wheel img");
const wheelFlavour = document.querySelector(".wheel-flavour");
const wheelNames = [
  { name: "Blueberry Bliss", center: 0 },
  { name: "Pistachio Rose", center: 60 },
  { name: "Strawberry White Forest", center: 120 },
  { name: "Caramel Crunch", center: 180 },
  { name: "Red Velvet", center: 240 },
  { name: "Chocolate Truffle", center: 300 },
];

if (wheel && wheelFlavour) {
  const startedAt = performance.now();
  const duration = 42000;
  let current = "";

  const updateFlavor = (now) => {
    const rotation = ((now - startedAt) % duration) / duration * 360;
    const sourceAngle = (135 - rotation + 360) % 360;
    const flavor = wheelNames.reduce((closest, candidate) => {
      const distance = Math.abs(((sourceAngle - candidate.center + 540) % 360) - 180);
      const closestDistance = Math.abs(((sourceAngle - closest.center + 540) % 360) - 180);
      return distance < closestDistance ? candidate : closest;
    });

    if (flavor.name !== current) {
      current = flavor.name;
      wheelFlavour.textContent = current;
    }
    window.requestAnimationFrame(updateFlavor);
  };

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.requestAnimationFrame(updateFlavor);
  }
}

const obsessionTrack = document.querySelector(".obsession-track");
const obsessionSlides = document.querySelectorAll(".obsession-slide");
const obsessionDots = document.querySelector(".obsession-dots");

if (obsessionTrack && obsessionSlides.length && obsessionDots) {
  let slideIndex = 0;
  obsessionDots.innerHTML = Array.from(obsessionSlides, (_, index) => `<button type="button" aria-label="Show cake ${index + 1}" class="${index === 0 ? "is-active" : ""}"></button>`).join("");
  const dots = obsessionDots.querySelectorAll("button");
  const showSlide = (index) => {
    slideIndex = (index + obsessionSlides.length) % obsessionSlides.length;
    obsessionTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === slideIndex));
  };
  dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
  window.setInterval(() => showSlide(slideIndex + 1), 5200);
}
