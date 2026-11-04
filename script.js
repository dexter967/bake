const heroCard = document.querySelector(".hero-card");

const cakeCallout = document.querySelector(".cake-callout");
const cakeCalloutName = document.querySelector(".cake-callout-name");
const cakeImage = document.querySelector(".cake-plate img");

if (heroCard && cakeCallout && cakeCalloutName && cakeImage) {
  const flavors = [
    { name: "Blueberry Bliss", tint: "#dce7ed" },
    { name: "Chocolate Truffle", tint: "#eadbcf" },
    { name: "Red Velvet", tint: "#f4d8d0" },
    { name: "Caramel Crunch", tint: "#f8e4c6" },
    { name: "Strawberry White Forest", tint: "#f8dfe0" },
    { name: "Pistachio Rose", tint: "#e5e9cf" },
  ];
  const rotationDuration = 42000;
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
    const nextFlavorIndex = Math.floor(rotation / (360 / flavors.length)) % flavors.length;

    cakeImage.style.transform = `rotate(${rotation}deg)`;
    if (nextFlavorIndex !== flavorIndex) {
      flavorIndex = nextFlavorIndex;
      showFlavor(flavorIndex);
    }

    window.requestAnimationFrame(animateCake);
  };

  window.requestAnimationFrame(animateCake);
}