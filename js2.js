// Simple message alert when contact form is submitted
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you for contacting MechaFix Garage! We'll get back to you soon.");
  this.reset();
});

// Smooth scroll active link highlight
const links = document.querySelectorAll("nav ul li a");
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 100;
  links.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
