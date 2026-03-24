// hiệu ứng navbar khi scroll

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
  }
});
