const assembly = document.querySelector(".cake-assembly");

if (assembly) {
  const parts = [
    ".cake-bottom", ".filling-one", ".cake-middle", ".filling-two",
    ".cake-top", ".cake-ganache", ".cake-drip", ".cake-decoration"
  ];

  parts.forEach((selector, index) => {
    assembly.querySelectorAll(selector).forEach((part) => {
      part.style.setProperty("--assembly-delay", `${index * 0.22}s`);
    });
  });
}

const legacyPlate = document.querySelector(".legacy-plate img");
const legacyCallout = document.querySelector(".legacy-callout");

if (legacyPlate && legacyCallout) {
  const flavors = [
    { name: "Blueberry Bliss", center: 0 },
    { name: "Pistachio Rose", center: 60 },
    { name: "Strawberry White Forest", center: 120 },
    { name: "Caramel Crunch", center: 180 },
    { name: "Red Velvet", center: 240 },
    { name: "Chocolate Truffle", center: 300 },
  ];
  const startedAt = performance.now();
  const duration = 42000;
  let current = "";

  const updateFlavor = (now) => {
    const rotation = ((now - startedAt) % duration) / duration * 360;
    const sourceAngle = (135 - rotation + 360) % 360;
    const flavor = flavors.reduce((closest, candidate) => {
      const distance = Math.abs(((sourceAngle - candidate.center + 540) % 360) - 180);
      const closestDistance = Math.abs(((sourceAngle - closest.center + 540) % 360) - 180);
      return distance < closestDistance ? candidate : closest;
    });

    if (flavor.name !== current) {
      current = flavor.name;
      legacyCallout.textContent = current;
    }
    window.requestAnimationFrame(updateFlavor);
  };

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.requestAnimationFrame(updateFlavor);
  }
}
