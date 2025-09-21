// Example: Toggle sections open/close
document.querySelectorAll("h3").forEach((heading) => {
  heading.addEventListener("click", () => {
    const next = heading.nextElementSibling;
    if (next.style.display === "none") {
      next.style.display = "block";
    } else {
      next.style.display = "none";
    }
  });
});
