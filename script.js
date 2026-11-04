const heroCard = document.querySelector(".hero-card");

const cakeCallout = document.querySelector(".cake-callout");
const cakeCalloutName = document.querySelector(".cake-callout-name");
const cakeImage = document.querySelector(".cake-plate img");

if (heroCard && cakeCallout && cakeCalloutName && cakeImage) {
  const flavors = [
    { name: "Blueberry Bliss", tint: "#dce7ed", center: 0 },
    { name: "Chocolate Truffle", tint: "#eadbcf", center: 300 },
    { name: "Red Velvet", tint: "#f4d8d0", center: 240 },
    { name: "Caramel Crunch", tint: "#f8e4c6", center: 180 },
    { name: "Strawberry White Forest", tint: "#f8dfe0", center: 120 },
    { name: "Pistachio Rose", tint: "#e5e9cf", center: 60 },
  ];
  const rotationDuration = 42000;
  const labelContactAngle = 135;
  let flavorIndex = -1;

  const showFlavor = (index) => {
    const flavor = flavors[index];
    cakeCalloutName.textContent = flavor.name;
    heroCard.style.setProperty("--cake-tint", flavor.tint);
    cakeCallout.classList.remove("is-changing");
    window.requestAnimationFrame(() => cakeCallout.classList.add("is-changing"));
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startedAt = performance.now();

  const animateCake = (now) => {
    const elapsed = prefersReducedMotion ? 0 : now - startedAt;
    const rotation = (elapsed % rotationDuration) / rotationDuration * 360;
    const sourceAngle = (labelContactAngle - rotation + 360) % 360;
    const nextFlavorIndex = flavors.reduce((closestIndex, flavor, index) => {
      const distance = Math.abs(
        ((sourceAngle - flavor.center + 540) % 360) - 180
      );
      const closestDistance = Math.abs(
        ((sourceAngle - flavors[closestIndex].center + 540) % 360) - 180
      );
      return distance < closestDistance ? index : closestIndex;
    }, 0);

    cakeImage.style.transform = `rotate(${rotation}deg)`;
    if (nextFlavorIndex !== flavorIndex) {
      flavorIndex = nextFlavorIndex;
      showFlavor(flavorIndex);
    }

    window.requestAnimationFrame(animateCake);
  };

  window.requestAnimationFrame(animateCake);
}