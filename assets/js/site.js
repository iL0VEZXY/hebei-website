document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas && canvas.getContext('2d');

  if (canvas && ctx) {
    const particles = [];
    const particleCount = 90;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const makeParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      alpha: Math.random() * 0.7 + 0.15,
    });

    const resetParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i += 1) {
        particles.push(makeParticle());
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 12);
        grad.addColorStop(0, `rgba(163, 190, 255, ${p.alpha})`);
        grad.addColorStop(1, 'rgba(163, 190, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 12, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    resizeCanvas();
    resetParticles();
    draw();

    window.addEventListener('resize', () => {
      resizeCanvas();
      resetParticles();
    });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const path = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const isCurrent = href === 'index.html' ? path.endsWith('/') || path.endsWith('/index.html') : path.endsWith(href);
    if (isCurrent) {
      link.classList.add('active');
    }
  });

  const tigerButton = document.querySelector('.tiger-float');
  const quickPanel = document.querySelector('.quick-access-panel');
  const closeButton = document.querySelector('.close-panel');

  const setTigerState = (open) => {
    if (!tigerButton || !quickPanel) return;
    tigerButton.setAttribute('aria-expanded', String(open));
    quickPanel.classList.toggle('open', open);
    quickPanel.setAttribute('aria-hidden', String(!open));
  };

  if (tigerButton && quickPanel) {
    tigerButton.addEventListener('click', () => {
      const isOpen = quickPanel.classList.contains('open');
      setTigerState(!isOpen);
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', () => setTigerState(false));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setTigerState(false);
  });

  document.addEventListener('click', (event) => {
    if (!quickPanel || !tigerButton) return;
    const panelClick = quickPanel.contains(event.target);
    const buttonClick = tigerButton.contains(event.target);
    if (!panelClick && !buttonClick && quickPanel.classList.contains('open')) {
      setTigerState(false);
    }
  });
});

























































































