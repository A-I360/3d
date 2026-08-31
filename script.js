/* AFRIESSENCE - ONE CONTINUOUS BLENDED CINEMATIC FILM - NO SECTIONS */
(() => {
  'use strict';

  const loader = document.getElementById('loader');
  const loaderBar = document.querySelector('.loader-bar');
  const film = document.getElementById('film');
  const stage = document.getElementById('stage');
  const bgLayers = Array.from(document.querySelectorAll('.bg-layer'));
  const layers = Array.from(document.querySelectorAll('.layer'));
  const progressBar = document.getElementById('progressBar');
  const navProgress = document.getElementById('navProgress');
  const timeEl = document.getElementById('time');
  const particlesCanvas = document.getElementById('particles');
  const collectionWrap = document.getElementById('collectionWrap');
  const shopBtn = document.getElementById('shopBtn');
  const replayBtn = document.getElementById('replayBtn');
  const navCta = document.getElementById('navCta');

  let scrollProgress = 0;
  let smoothProgress = 0;
  let targetMouseX = 0, targetMouseY = 0, mouseX = 0, mouseY = 0;
  let activeLayer = 0;
  let activeBg = 0;
  let ticking = false;
  let isMobile = window.innerWidth <= 640;
  let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let particleCtx = null;
  let particles = [];

  const TIMELINE = [
    { id: 0, start: 0, end: 0.14, bg: 0, layer: 0, time: '00:00', name: 'Atmosphere' },
    { id: 1, start: 0.14, end: 0.30, bg: 1, layer: 1, time: '05:00', name: 'Herbal Glow Wash' },
    { id: 2, start: 0.30, end: 0.46, bg: 2, layer: 2, time: '10:00', name: 'Baovera Therapy' },
    { id: 3, start: 0.46, end: 0.60, bg: 3, layer: 3, time: '15:00', name: 'Clear Aura' },
    { id: 4, start: 0.60, end: 0.74, bg: 4, layer: 4, time: '20:00', name: 'Lush Wood' },
    { id: 5, start: 0.74, end: 0.88, bg: 5, layer: 5, time: '24:00', name: 'Collection' },
    { id: 6, start: 0.88, end: 1.00, bg: 6, layer: 6, time: '28:00', name: 'Radiance' },
  ];

  const clamp = (v, min=0, max=1) => Math.min(max, Math.max(min, v));
  const lerp = (a,b,t) => a + (b-a)*t;
  const smoothstep = (e0,e1,v) => { const x = clamp((v-e0)/(e1-e0)); return x*x*(3-2*x); };

  // Loader - polished
  function initLoader() {
    const assets = [
      'assets/film/bathroom-env.webp',
      'assets/film/botanical-env.webp',
      'assets/film/dark-luxury-env.webp',
      'assets/film/golden-env.webp',
      'assets/film/collection-env.webp',
      'assets/film/herbal-glow-wash.webp',
      'assets/film/lush-wood.webp',
      'assets/film/baovera-hair-oil.webp',
      'assets/film/clear-aura.webp',
      'assets/film/curls-mist.webp',
    ];
    let loaded = 0;
    const total = assets.length;
    assets.forEach(src => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.onload = img.onerror = () => {
        loaded++;
        const pct = Math.round((loaded/total)*100);
        if (loaderBar) loaderBar.style.width = pct+'%';
        if (loaded >= total) {
          setTimeout(()=>{ if(loader) loader.classList.add('is-hidden'); document.body.style.overflow=''; }, 500);
        }
      };
      img.src = src;
    });
    // Fallback
    setTimeout(()=>{ if(loader && !loader.classList.contains('is-hidden')) { loader.classList.add('is-hidden'); document.body.style.overflow=''; } }, 3200);
  }

  // Particles - optimized golden dust, blended
  function initParticles() {
    if (!particlesCanvas || isMobile || reduceMotion) {
      if (particlesCanvas) particlesCanvas.style.display = 'none';
      return;
    }
    const canvas = particlesCanvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.4);
    let w = window.innerWidth, h = window.innerHeight;
    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w+'px'; canvas.style.height = h+'px';
      if (particleCtx) particleCtx.setTransform(dpr,0,0,dpr,0,0);
    }
    particleCtx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    resize();
    let resizeTO;
    window.addEventListener('resize', ()=>{ clearTimeout(resizeTO); resizeTO = setTimeout(resize, 200); }, { passive: true });

    const count = Math.min(64, Math.floor(w/24));
    particles = Array.from({ length: count }, () => ({
      x: Math.random()*w, y: Math.random()*h,
      r: Math.random()*1.6 + 0.2,
      vx: (Math.random()-0.5)*0.18,
      vy: (Math.random()-0.5)*0.26 - 0.08,
      alpha: Math.random()*0.42 + 0.08,
      twinkle: Math.random()*Math.PI*2,
      depth: Math.random()*0.7 + 0.3,
    }));

    let lastDraw = 0;
    function draw(now) {
      if (!particleCtx) return;
      if (now - lastDraw < 36) { requestAnimationFrame(draw); return; }
      lastDraw = now;
      particleCtx.clearRect(0,0,w,h);
      for (const p of particles) {
        p.x += p.vx + mouseX * p.depth * 0.32;
        p.y += p.vy + mouseY * p.depth * 0.22;
        p.twinkle += 0.01;
        if (p.x < -12) p.x = w+12;
        if (p.x > w+12) p.x = -12;
        if (p.y < -12) p.y = h+12;
        if (p.y > h+12) p.y = -12;
        const a = p.alpha * (0.6 + 0.4*Math.sin(p.twinkle));
        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        particleCtx.fillStyle = `rgba(253,241,225,${a})`;
        particleCtx.fill();
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  function getScrollProgress() {
    if (!film) return 0;
    const rect = film.getBoundingClientRect();
    const top = -rect.top;
    const max = film.offsetHeight - window.innerHeight;
    return clamp(top / max);
  }

  function setActiveLayer(id) {
    if (activeLayer === id) return;
    activeLayer = id;
    layers.forEach((layer, idx) => {
      layer.classList.toggle('is-active', idx === id);
      layer.classList.toggle('is-prev', idx < id);
    });
  }

  function setActiveBg(id) {
    if (activeBg === id) return;
    activeBg = id;
    bgLayers.forEach((bg, idx) => {
      bg.classList.toggle('is-active', idx === id);
    });
  }

  function update() {
    const target = getScrollProgress();
    smoothProgress = lerp(smoothProgress, target, reduceMotion ? 1 : 0.10);
    scrollProgress = smoothProgress;

    mouseX = lerp(mouseX, targetMouseX, 0.07);
    mouseY = lerp(mouseY, targetMouseY, 0.07);

    // Progress UI
    const pct = scrollProgress * 100;
    if (progressBar) progressBar.style.width = pct + '%';
    if (navProgress) navProgress.style.width = pct + '%';
    if (timeEl) {
      const sec = scrollProgress * 30;
      const mm = String(Math.floor(sec/60)).padStart(2,'0');
      const ss = String(Math.floor(sec%60)).padStart(2,'0');
      timeEl.textContent = `${mm}:${ss} / 00:30`;
    }

    // Find current timeline entry - blended crossfade logic
    let current = TIMELINE[0];
    for (const t of TIMELINE) {
      if (scrollProgress >= t.start && scrollProgress < t.end) { current = t; break; }
      if (scrollProgress >= t.end) current = t;
    }
    if (scrollProgress >= 0.99) current = TIMELINE[TIMELINE.length-1];

    // Blended transition: crossfade bg and layer based on proximity, not hard switch
    // Find two closest timeline entries for blending
    let prevEntry = TIMELINE[0];
    let nextEntry = TIMELINE[0];
    for (let i=0;i<TIMELINE.length;i++) {
      if (scrollProgress >= TIMELINE[i].start) prevEntry = TIMELINE[i];
      if (scrollProgress < TIMELINE[i].end) { nextEntry = TIMELINE[i]; break; }
    }

    // For ultra-blended feel, we still use active layer but with soft enter/exit
    const localProgress = clamp((scrollProgress - current.start) / (current.end - current.start));
    const enter = smoothstep(0, 0.4, localProgress);
    const exit = smoothstep(0.6, 1, localProgress);

    // Set active bg/layer with blended timing
    setActiveBg(current.bg);
    setActiveLayer(current.layer);

    // Parallax and 3D for active layer
    const activeEl = layers[current.layer];
    if (activeEl) {
      const productWrap = activeEl.querySelector('.product-wrap');
      const product = activeEl.querySelector('.product');
      const textWrap = activeEl.querySelector('.text-wrap');
      if (productWrap) {
        const tiltX = mouseY * -7 + Math.sin(scrollProgress*5) * 1.2;
        const tiltY = mouseX * 11 + Math.cos(scrollProgress*4) * 1;
        productWrap.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${enter*12}px)`;
      }
      if (product) {
        const floatY = Math.sin(Date.now()*0.001 + current.id) * 5;
        product.style.transform = `translate3d(0, ${floatY}px, ${enter*18}px) rotateY(${mouseX*5}deg)`;
      }
      if (textWrap) {
        textWrap.style.transform = `translate3d(0, ${(1-enter)*18}px, 0)`;
        textWrap.style.opacity = enter * (1 - exit*0.5);
      }
      // Hero title parallax
      const heroTitle = activeEl.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.style.transform = `translate3d(${mouseX*12}px, ${mouseY*8}px, 0) scale(${1 + enter*0.04})`;
      }
    }

    // Collection depth - blended
    if (collectionWrap) {
      const items = collectionWrap.querySelectorAll('.col-item');
      items.forEach((item,i)=>{
        const depth = parseFloat(item.dataset.depth || 0.3);
        const y = Math.sin(scrollProgress*2.5 + i)*6*depth;
        const z = depth * 80 * localProgress;
        const rotY = mouseX * 6 * depth;
        item.style.transform = `translate3d(0, ${y}px, ${z}px) rotateY(${rotY}deg)`;
        item.style.opacity = enter;
      });
    }

    // Continue RAF if needed
    if (Math.abs(smoothProgress - target) > 0.0006 || Math.abs(mouseX - targetMouseX) > 0.001 || Math.abs(mouseY - targetMouseY) > 0.001) {
      requestAnimationFrame(update);
    } else {
      ticking = false;
    }
  }

  function requestTick() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  function init() {
    initLoader();
    initParticles();

    // Initial state
    setActiveBg(0);
    setActiveLayer(0);
    requestTick();

    // Scroll
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', ()=>{
      isMobile = window.innerWidth <= 640;
      requestTick();
    }, { passive: true });

    // Mouse
    window.addEventListener('pointermove', (e)=>{
      targetMouseX = (e.clientX/window.innerWidth -0.5)*2;
      targetMouseY = (e.clientY/window.innerHeight -0.5)*2;
      requestTick();
    }, { passive: true });

    // Buttons
    if (shopBtn) shopBtn.addEventListener('click', ()=>{
      const col = document.querySelector('[data-layer="5"]');
      if (col) {
        const rect = film.getBoundingClientRect();
        const max = film.offsetHeight - window.innerHeight;
        const targetScroll = 0.78 * max - rect.top;
        window.scrollTo({ top: window.scrollY + targetScroll, behavior: 'smooth' });
      }
    });
    if (replayBtn) replayBtn.addEventListener('click', ()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    if (navCta) navCta.addEventListener('click', ()=>{
      const col = document.querySelector('[data-layer="5"]');
      if (col) {
        const rect = film.getBoundingClientRect();
        const max = film.offsetHeight - window.innerHeight;
        window.scrollTo({ top: window.scrollY + 0.76*max - rect.top, behavior: 'smooth' });
      }
    });

    // Keyboard
    window.addEventListener('keydown', (e)=>{
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const next = Math.min(activeLayer+1, TIMELINE.length-1);
        const target = TIMELINE[next];
        const max = film.offsetHeight - window.innerHeight;
        const rect = film.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + target.start*max - rect.top + 20, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(activeLayer-1, 0);
        const target = TIMELINE[prev];
        const max = film.offsetHeight - window.innerHeight;
        const rect = film.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + target.start*max - rect.top, behavior: 'smooth' });
      }
    });

    // Touch: swipe up/down to navigate
    let touchStartY = 0;
    window.addEventListener('touchstart', (e)=>{ touchStartY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchend', (e)=>{
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dy) < 60) return;
      if (dy < 0) {
        const next = Math.min(activeLayer+1, TIMELINE.length-1);
        const target = TIMELINE[next];
        const max = film.offsetHeight - window.innerHeight;
        const rect = film.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + target.start*max - rect.top + 20, behavior: 'smooth' });
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
