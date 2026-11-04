const heroCard = document.querySelector(".hero-card");

const cakeCallout = document.querySelector(".cake-callout");
const cakeCalloutName = document.querySelector(".cake-callout-name");

if (heroCard && cakeCallout && cakeCalloutName) {
  const flavors = [
    { name: "Chocolate Truffle", tint: "#eadbcf", top: "9%", left: "62%" },
    { name: "Caramel Crunch", tint: "#f8e4c6", top: "39%", left: "-25%" },
    { name: "Strawberry White Forest", tint: "#f8dfe0", top: "76%", left: "16%" },
    { name: "Blueberry Bliss", tint: "#dce7ed", top: "35%", left: "77%" },
    { name: "Red Velvet", tint: "#f4d8d0", top: "8%", left: "8%" },
    { name: "Pistachio Rose", tint: "#e5e9cf", top: "68%", left: "67%" },
  ];
  const interval = 42000 / flavors.length;
  let flavorIndex = 0;

  const showFlavor = (index) => {
    const flavor = flavors[index];
    cakeCalloutName.textContent = flavor.name;
    heroCard.style.setProperty("--cake-tint", flavor.tint);
    cakeCallout.style.setProperty("--callout-top", flavor.top);
    cakeCallout.style.setProperty("--callout-left", flavor.left);
    cakeCallout.classList.remove("is-changing");
    window.requestAnimationFrame(() => cakeCallout.classList.add("is-changing"));
  };

  showFlavor(flavorIndex);
  window.setInterval(() => {
    flavorIndex = (flavorIndex + 1) % flavors.length;
    showFlavor(flavorIndex);
  }, interval);
}