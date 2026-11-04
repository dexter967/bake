const heroCard = document.querySelector(".hero-card");

const cakeCallout = document.querySelector(".cake-callout");
const cakeCalloutName = document.querySelector(".cake-callout-name");

if (heroCard && cakeCallout && cakeCalloutName) {
  const flavors = [
    { name: "Blueberry Bliss", tint: "#dce7ed" },
    { name: "Chocolate Truffle", tint: "#eadbcf" },
    { name: "Red Velvet", tint: "#f4d8d0" },
    { name: "Caramel Crunch", tint: "#f8e4c6" },
    { name: "Strawberry White Forest", tint: "#f8dfe0" },
    { name: "Pistachio Rose", tint: "#e5e9cf" },
  ];
  const interval = 42000 / flavors.length;
  let flavorIndex = 0;

  const showFlavor = (index) => {
    const flavor = flavors[index];
    cakeCalloutName.textContent = flavor.name;
    heroCard.style.setProperty("--cake-tint", flavor.tint);
    cakeCallout.classList.remove("is-changing");
    window.requestAnimationFrame(() => cakeCallout.classList.add("is-changing"));
  };

  showFlavor(flavorIndex);
  window.setInterval(() => {
    flavorIndex = (flavorIndex + 1) % flavors.length;
    showFlavor(flavorIndex);
  }, interval);
}