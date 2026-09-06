/**
 * Nebula Setup Guide - Apple-Inspired Interactive Script & Snow Particle Physics
 */

(function () {
  'use strict';

  /* ==========================================================================
     Snow Particle System (Subtle, High-Performance Canvas Snow)
     ========================================================================== */
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Density based on screen size (approx. 1 dot per 18,000px² for subtlety)
  const particleCount = Math.min(Math.floor((width * height) / 16000), 90);
  const particles = [];

  class SnowDot {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -10;
      this.radius = Math.random() * 1.6 + 0.8; // Elegant small dots: 0.8px to 2.4px
      this.speedY = Math.random() * 0.75 + 0.35; // Gentle downward speed
      this.speedX = Math.random() * 0.4 - 0.2; // Slight drift
      this.opacity = Math.random() * 0.5 + 0.25; // Soft opacity
      this.swing = Math.random() * 2 * Math.PI; // Phase offset for sine oscillation
      this.swingSpeed = Math.random() * 0.015 + 0.005;
    }

    update() {
      this.swing += this.swingSpeed;
      this.x += this.speedX + Math.sin(this.swing) * 0.4;
      this.y += this.speedY;

      // Wrap around edges
      if (this.y > height + 10) {
        this.reset(false);
      }
      if (this.x > width + 10) {
        this.x = -10;
      } else if (this.x < -10) {
        this.x = width + 10;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 240, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new SnowDot());
  }

  // Animation Loop with Visibility Optimization
  let animationFrameId;
  let isRunning = true;

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Resize handler with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  });

  // Pause rendering when tab is inactive to preserve resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      render();
    }
  });

  /* ==========================================================================
     Smooth Apple-Style Micro-Interactions & Helpers
     ========================================================================== */
  document.querySelectorAll('.guide-btn').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  // Global Copy to Clipboard Helper
  window.copyText = function (elementId, btnElement) {
    const target = document.getElementById(elementId);
    if (!target) return;
    const textToCopy = target.innerText.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
      const btn = btnElement || event.currentTarget || event.target;
      const originalText = btn.innerText;
      btn.innerText = 'Copied!';
      btn.classList.add('copied');

      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove('copied');
      }, 1800);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  // Smooth Scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
