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
