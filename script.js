const heroStage = document.querySelector(".hero-stage");
const heroCard = document.querySelector(".hero-card");

if (heroStage && heroCard) {
  let ticking = false;

  const updateHeroProgress = () => {
    const stageRect = heroStage.getBoundingClientRect();
    const scrollableDistance = heroStage.offsetHeight - window.innerHeight;
    const progress = Math.min(
      1,
      Math.max(0, -stageRect.top / Math.max(scrollableDistance, 1))
    );

    heroCard.style.width = `${88 + 12 * progress}vw`;
    heroCard.style.height = `${88 + 12 * progress}vh`;
    heroCard.style.borderRadius = `${30 * (1 - progress)}px`;
    ticking = false;
  };

  const requestHeroUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeroProgress);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestHeroUpdate, { passive: true });
  window.addEventListener("resize", requestHeroUpdate);
  updateHeroProgress();
}

const cakeCallout = document.querySelector(".cake-callout");
const cakeCalloutName = document.querySelector(".cake-callout-name");

if (heroCard && cakeCallout && cakeCalloutName) {
  const calloutVideo = document.querySelector(".cake-callout-arrow");
  const flavors = [
    { name: "Caramel Crunch", tint: "#f8e4c6" },
    { name: "Strawberry White Forest", tint: "#f8dfe0" },
    { name: "Pistachio Rose", tint: "#e5e9cf" },
    { name: "Blueberry Bliss", tint: "#dce7ed" },
    { name: "Chocolate Truffle", tint: "#eadbcf" },
    { name: "Red Velvet", tint: "#f4d8d0" },
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
  if (calloutVideo) {
    calloutVideo.addEventListener("error", () => {
      cakeCallout.classList.add("video-failed");
    });
    if (calloutVideo.error) {
      cakeCallout.classList.add("video-failed");
    }
  }
  window.setInterval(() => {
    flavorIndex = (flavorIndex + 1) % flavors.length;
    showFlavor(flavorIndex);
  }, interval);
}