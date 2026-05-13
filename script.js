// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Copy to Clipboard
function copyText(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Copied!";
    btn.style.background = "#4CAF50";
    btn.style.color = "white";
    
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  });
}

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  observer.observe(card);
});