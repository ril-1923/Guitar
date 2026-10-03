/* ============================================
   STRINGS — Interactive Guitar Experience
   script.js
   ============================================ */

(function () {
  'use strict';

  /* ===== LOADING ANIMATION ===== */
  window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 1200);
    }
  });

  /* ===== THEME SYSTEM ===== */
  const themeButtons = document.querySelectorAll('.theme-option');
  const htmlEl = document.documentElement;

  function setTheme(themeName) {
    htmlEl.setAttribute('data-theme', themeName);
    localStorage.setItem('strings-theme', themeName);
    themeButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
  }

  const savedTheme = localStorage.getItem('strings-theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('midnight');
  }

  themeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(btn.dataset.theme);
    });
  });

  /* ===== STICKY NAVBAR ===== */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== ACTIVE NAV LINK DETECTION ===== */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  function detectActiveSection() {
    const scrollPos = window.scrollY + 120;
    let current = '';
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        current = sec.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', detectActiveSection, { passive: true });

  /* ===== SMOOTH SCROLLING ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  /* ===== HERO PARTICLES ===== */
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      const size = 2 + Math.random() * 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      particlesContainer.appendChild(p);
    }
  }

  /* ===== FLOATING MUSICAL NOTES ===== */
  const notesContainer = document.getElementById('floatingNotes');
  if (notesContainer) {
    const noteIcons = ['\u266A', '\u266B', '\u266C', '\u2669'];
    for (let i = 0; i < 12; i++) {
      const note = document.createElement('span');
      note.className = 'music-note';
      note.textContent = noteIcons[Math.floor(Math.random() * noteIcons.length)];
      note.style.left = Math.random() * 100 + '%';
      note.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
      note.style.animationDuration = (10 + Math.random() * 10) + 's';
      note.style.animationDelay = Math.random() * 10 + 's';
      notesContainer.appendChild(note);
    }
  }

  /* ===== SCROLL REVEAL ANIMATIONS ===== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(function () {
          entry.target.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ===== GUITAR FILTERING ===== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const guitarCards = document.querySelectorAll('.guitar-card-wrapper');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      guitarCards.forEach(function (card) {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;
        if (show) {
          card.classList.remove('hidden-filter');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          requestAnimationFrame(function () {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.classList.add('hidden-filter');
        }
      });
    });
  });

  /* ===== GUITAR MODAL ===== */
  const guitarModal = document.getElementById('guitarModal');
  const guitarModalBody = document.getElementById('guitarModalBody');
  const guitarModalLabel = document.getElementById('guitarModalLabel');
  const guitarData = {
    'Aurora Classic': {
      img: 'https://images.pexels.com/photos/6145550/pexels-photo-6145550.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'Classical Nylon',
      price: '$899',
      desc: 'Warm, mellow tones with traditional nylon strings for intimate performances. Handcrafted with a cedar top and mahogany back and sides.'
    },
    'Midnight Acoustic': {
      img: 'https://images.pexels.com/photos/13016431/pexels-photo-13016431.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'Dreadnought Acoustic',
      price: '$1,299',
      desc: 'Deep, resonant sound with a rich mahogany body built for the stage. Features a solid spruce top and scalloped X-bracing.'
    },
    'Crimson Electric': {
      img: 'https://images.pexels.com/photos/229033/pexels-photo-229033.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'Solid Body Electric',
      price: '$1,899',
      desc: 'Bold, cutting tone with premium humbuckers and a stunning crimson finish. Roasted maple neck with a rosewood fingerboard.'
    },
    'Golden Tone': {
      img: 'https://images.pexels.com/photos/459797/pexels-photo-459797.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'Vintage Acoustic',
      price: '$1,499',
      desc: 'Golden-aged spruce top producing warm, vintage tones with incredible depth. Aged mahogany neck with vintage-style tuners.'
    },
    'Ocean Blue': {
      img: 'https://images.pexels.com/photos/1539787/pexels-photo-1539787.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'Electric with Gold Hardware',
      price: '$2,199',
      desc: 'Deep blue finish with gold control knobs for a look as rich as its sound. Three custom-wound pickups and a Floyd Rose bridge.'
    },
    'Vintage Sunburst': {
      img: 'https://images.pexels.com/photos/35610/guitar-bass-instrument-black.jpg?auto=compress&cs=tinysrgb&w=800',
      type: 'Electric Bass',
      price: '$1,649',
      desc: 'Classic sunburst finish on a precision bass body with thunderous low end. Maple neck with a rosewood fingerboard.'
    }
  };

  if (guitarModal) {
    guitarModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const guitarName = button.dataset.guitar;
      const data = guitarData[guitarName];
      if (data) {
        guitarModalLabel.textContent = guitarName;
        guitarModalBody.innerHTML =
          '<img src="' + data.img + '" alt="' + guitarName + '">' +
          '<h4>' + guitarName + '</h4>' +
          '<p><strong>Type:</strong> ' + data.type + '</p>' +
          '<p>' + data.desc + '</p>' +
          '<p class="modal-price">' + data.price + '</p>';
      }
    });
  }

  /* ===== MOVING GUITAR EXPERIENCE ===== */
  const expGuitar = document.getElementById('expGuitar');
  const expSection = document.getElementById('experience');
  const expBg = document.getElementById('experienceBg');

  function updateExperienceGuitar() {
    if (!expGuitar || !expSection) return;
    const rect = expSection.getBoundingClientRect();
    const winH = window.innerHeight;
    const sectionH = rect.height;
    const progress = Math.max(0, Math.min(1, (winH - rect.top) / (winH + sectionH)));
    const translateX = (progress - 0.5) * 120;
    const rotate = (progress - 0.5) * 10;
    const scale = 0.8 + progress * 0.4;
    expGuitar.style.transform = 'translateX(' + translateX + 'px) rotate(' + rotate + 'deg) scale(' + scale + ')';

    if (expBg) {
      const hue = Math.floor(progress * 60);
      expBg.style.background = 'radial-gradient(ellipse at center, rgba(var(--accent-rgb), ' + (0.05 + progress * 0.12) + '), transparent 70%)';
    }
  }

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateExperienceGuitar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ===== GUITAR COLOR CUSTOMIZER ===== */
  const colorBtns = document.querySelectorAll('.color-swatch-btn');
  const customGuitarImg = document.getElementById('customGuitarImg');
  const customLabel = document.getElementById('customLabel');
  const customGlow = document.getElementById('customGlow');

  colorBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      colorBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const newImg = btn.dataset.img;
      const newLabel = btn.dataset.label;
      const glowColor = btn.dataset.glow;

      if (customGuitarImg) {
        customGuitarImg.style.opacity = '0';
        customGuitarImg.style.transform = 'scale(0.9)';
        setTimeout(function () {
          customGuitarImg.src = newImg;
          customGuitarImg.style.opacity = '1';
          customGuitarImg.style.transform = 'scale(1)';
        }, 300);
      }
      if (customLabel) {
        customLabel.textContent = newLabel;
      }
      if (customGlow) {
        customGlow.style.background = 'radial-gradient(ellipse, ' + glowColor + '40, transparent 70%)';
      }
    });
  });

  /* ===== INTERACTIVE STRINGS (Web Audio API) ===== */
  const stringRows = document.querySelectorAll('.string-row');
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }
    return audioCtx;
  }

  function playTone(freq) {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.value = freq;

    filter.type = 'lowpass';
    filter.frequency.value = freq * 4;
    filter.Q.value = 1;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.5);
  }

  stringRows.forEach(function (row) {
    row.addEventListener('click', function () {
      const freq = parseFloat(row.dataset.freq);
      const noteLabel = row.dataset.note;
      const stringLine = row.querySelector('.string-line');
      const noteDisplay = row.querySelector('.string-note-label');

      stringLine.classList.remove('vibrating');
      void stringLine.offsetWidth;
      stringLine.classList.add('vibrating');

      if (noteDisplay) {
        noteDisplay.textContent = noteLabel;
        noteDisplay.classList.add('show');
        setTimeout(function () {
          noteDisplay.classList.remove('show');
        }, 1500);
      }

      playTone(freq);

      setTimeout(function () {
        stringLine.classList.remove('vibrating');
      }, 500);
    });

    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        row.click();
      }
    });
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    row.setAttribute('aria-label', 'Play string ' + row.dataset.note);
  });

  /* ===== ANIMATED COUNTERS ===== */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.floor(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target + suffix;
          }
        }

        requestAnimationFrame(updateCount);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function (el) {
    statObserver.observe(el);
  });

  /* ===== GALLERY MODAL ===== */
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImg = document.getElementById('galleryModalImg');
  const galleryModalLabel = document.getElementById('galleryModalLabel');
  const galleryModalCat = document.getElementById('galleryModalCat');

  if (galleryModal) {
    galleryModal.addEventListener('show.bs.modal', function (event) {
      const trigger = event.relatedTarget;
      if (trigger) {
        const imgSrc = trigger.dataset.img;
        const title = trigger.dataset.title;
        const cat = trigger.dataset.cat;
        if (galleryModalImg) {
          galleryModalImg.src = imgSrc;
          galleryModalImg.alt = title;
        }
        if (galleryModalLabel) galleryModalLabel.textContent = title;
        if (galleryModalCat) galleryModalCat.textContent = cat;
      }
    });
  }

  /* ===== NEWSLETTER FORM ===== */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('input').value;
      if (email && email.includes('@')) {
        newsletterFeedback.textContent = 'Thanks for subscribing! We will be in touch soon.';
        newsletterFeedback.style.color = 'var(--accent-light)';
        this.querySelector('input').value = '';
        setTimeout(function () {
          newsletterFeedback.textContent = '';
        }, 4000);
      } else {
        newsletterFeedback.textContent = 'Please enter a valid email address.';
        newsletterFeedback.style.color = '#e53935';
      }
    });
  }

  /* ===== INIT ===== */
  handleScroll();
  detectActiveSection();
  updateExperienceGuitar();

})();
