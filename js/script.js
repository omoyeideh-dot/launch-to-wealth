// ============================================================
// LAUNCH TO WEALTH — shared interactions
// ============================================================

/* ---------- curtain intro: rocket launch (runs once per browser session) ---------- */
(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = false;
  try { seen = sessionStorage.getItem('ltw-intro-seen') === '1'; } catch (e) {}

  if (reduced || seen) return;

  window.addEventListener('DOMContentLoaded', function () {
    var curtain = document.createElement('div');
    curtain.className = 'curtain';
    curtain.innerHTML =
      '<div class="curtain-bg"></div>' +
      '<div class="rocket-wrap">' +
        '<svg class="rocket-svg" viewBox="0 0 120 170" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M60 8 C82 34 92 66 92 96 C92 118 84 138 78 150 L42 150 C36 138 28 118 28 96 C28 66 38 34 60 8 Z" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>' +
          '<path d="M28 96 C18 100 10 112 8 130 L28 118" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>' +
          '<path d="M92 96 C102 100 110 112 112 130 L92 118" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>' +
          '<circle cx="60" cy="70" r="20" stroke="currentColor" stroke-width="5"/>' +
          '<text x="60" y="78" font-family="Inter, sans-serif" font-weight="700" font-size="22" text-anchor="middle" fill="currentColor">$</text>' +
          '<path d="M42 150 L38 168 L60 156 L82 168 L78 150" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>' +
        '</svg>' +
        '<div class="rocket-flame"></div>' +
        '<div class="rocket-trail"><span></span><span></span><span></span></div>' +
      '</div>' +
      '<div class="curtain-word">Launch to Wealth</div>';
    document.body.prepend(curtain);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(function () {
      curtain.classList.add('is-animating');
    });

    setTimeout(function () {
      curtain.classList.add('is-done');
      document.body.style.overflow = '';
      try { sessionStorage.setItem('ltw-intro-seen', '1'); } catch (e) {}
      setTimeout(function () { curtain.remove(); }, 300);
    }, 3000);
  });
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.querySelector('.mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      panel.classList.toggle('is-open');
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('is-open');
      panel.classList.remove('is-open');
    }));
  }

  /* ---------- image placeholder detection ----------
     Marks <img> as loaded so the elegant fallback label
     (next sibling .placeholder-label) hides automatically
     once a real image file is dropped in /images. */
  document.querySelectorAll('.img-frame img').forEach(img => {
    const markLoaded = () => img.setAttribute('data-loaded', 'true');
    const markFailed = () => img.setAttribute('data-loaded', 'false');
    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', () => {
        if (img.naturalWidth > 0) markLoaded(); else markFailed();
      });
      img.addEventListener('error', markFailed);
    }
  });

  /* ---------- video placeholder detection (looping watch clip) ---------- */
  document.querySelectorAll('.watch-clip').forEach(video => {
    video.addEventListener('loadeddata', () => video.setAttribute('data-loaded', 'true'));
    video.addEventListener('error', () => video.setAttribute('data-loaded', 'false'));
    const src = video.querySelector('source');
    if (src) {
      src.addEventListener('error', () => video.setAttribute('data-loaded', 'false'));
    }
  });

  /* ---------- inject the olive underline (signature accent) ---------- */
  document.querySelectorAll('.squiggle').forEach(el => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 20');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.innerHTML = '<line x1="2" y1="10" x2="198" y2="10" stroke="#BDB16D" stroke-width="4" stroke-linecap="round"/>';
    el.appendChild(svg);
  });

  /* ---------- marquee: duplicate content for seamless loop ---------- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- FAQ accordion (if present on a page) ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- scroll-reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger], .press-row');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- word-by-word headline reveal (typewriter-style, self-contained) ---------- */
  document.querySelectorAll('.section-head h2, .page-hero h1').forEach(h => {
    const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);
    let wordIndex = 0;
    textNodes.forEach(tn => {
      const words = tn.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach(w => {
        if (w.trim() === '') { frag.appendChild(document.createTextNode(w)); return; }
        const span = document.createElement('span');
        span.className = 'word-reveal';
        const inner = document.createElement('span');
        inner.className = 'w';
        inner.textContent = w;
        inner.style.transitionDelay = (wordIndex * 0.06) + 's';
        wordIndex++;
        span.appendChild(inner);
        frag.appendChild(span);
      });
      tn.parentNode.replaceChild(frag, tn);
    });
    // Each headline gets its own observer, decoupled from any ancestor's
    // fade state, and triggers a little after it enters view (not at the
    // very first pixel) so the type-in is actually seen, not skipped past.
    if ('IntersectionObserver' in window) {
      const hio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); hio.unobserve(entry.target); }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
      hio.observe(h);
    } else {
      h.classList.add('is-visible');
    }
  });

  /* ---------- header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 12 ? '0 8px 30px -20px rgba(38,32,25,0.4)' : 'none';
    });
  }

  /* ---------- scroll progress bar ---------- */
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = max > 0 ? (scrolled / max * 100) + '%' : '0%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-count-to]');
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.getAttribute('data-count-to'));
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = val + suffix;
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          el.classList.add('is-done');
        }
      }
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => cio.observe(el));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---------- magnetic primary buttons (subtle, desktop only) ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.btn-primary, .btn-light, .btn-sage').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.32}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ---------- lazy-load YouTube embeds on click (perf: no iframe until requested) ----------
     Also adds a permanent "Watch on YouTube" fallback link under every embed —
     YouTube iframes can be blocked by the browser when a site is opened as a
     local file:// page (no real server), so this guarantees the video is
     always reachable even if the in-page embed doesn't play. */
  document.querySelectorAll('.video-embed-frame[data-yt]').forEach(frame => {
    const id = frame.getAttribute('data-yt');
    const thumb = document.createElement('img');
    thumb.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    thumb.addEventListener('error', () => { thumb.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }, { once: true });
    thumb.alt = 'Video preview';
    thumb.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;cursor:pointer;';
    const playBtn = document.createElement('button');
    playBtn.setAttribute('aria-label', 'Play video');
    playBtn.style.cssText = 'position:absolute;inset:0;margin:auto;width:74px;height:74px;border-radius:50%;background:rgba(255,255,255,0.92);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;';
    playBtn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="#8C3F4D"><path d="M8 5v14l11-7z"/></svg>';
    frame.appendChild(thumb);
    frame.appendChild(playBtn);
    const load = () => {
      frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    };
    thumb.addEventListener('click', load);
    playBtn.addEventListener('click', load);

    const fallback = document.createElement('a');
    fallback.href = `https://youtu.be/${id}`;
    fallback.target = '_blank';
    fallback.rel = 'noopener';
    fallback.className = 'video-fallback-link';
    fallback.textContent = 'Prefer YouTube? Watch there instead ↗';
    frame.insertAdjacentElement('afterend', fallback);
  });

  /* ---------- email capture form (front-end only — no backend wired yet) ---------- */
  document.querySelectorAll('.email-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'You\u2019re on the list \u2713';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = original; btn.disabled = false; form.reset(); }, 3000);
    });
  });

  /* ---------- 3D tilt on card grids (desktop only) ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltSelectors = '.stat-card, .academy-card, .testimonial-card, .face-card, .explore-card, .store-card, .included-card, .pt-problem-card, .video-card';
    document.querySelectorAll(tiltSelectors).forEach(card => {
      card.classList.add('tilt-card');
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- hero cursor spotlight (desktop only) ---------- */
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const spot = document.createElement('div');
    spot.className = 'hero-spotlight';
    hero.prepend(spot);
    hero.addEventListener('mouseenter', () => hero.classList.add('spotlight-active'));
    hero.addEventListener('mouseleave', () => hero.classList.remove('spotlight-active'));
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--sy', (e.clientY - r.top) + 'px');
    });
  }

  /* ---------- sticky floating CTA (appears after scrolling past the hero) ---------- */
  const isHome = /(^|\/)(index\.html)?$/.test(location.pathname);
  const onSchool = location.pathname.includes('wealth-creator-school');
  const ctaHref = onSchool ? '#tracks' : (isHome ? '#learn' : (location.pathname.includes('paidtuber') ? '#enroll' : 'wealth-creator-school.html'));
  const ctaLabel = location.pathname.includes('paidtuber') ? 'Sign Me Up!' : (onSchool ? 'Choose a Track' : 'Show Me How');
  const fab = document.createElement('a');
  fab.href = ctaHref;
  fab.className = 'btn btn-primary floating-cta';
  fab.innerHTML = `<span class="long">${ctaLabel}</span><span class="short">→</span>`;
  document.body.appendChild(fab);
  const heroEl = document.querySelector('.hero, .page-hero');
  if (heroEl && 'IntersectionObserver' in window) {
    const fabIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        fab.classList.toggle('is-shown', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    fabIo.observe(heroEl);
  } else {
    window.addEventListener('scroll', () => {
      fab.classList.toggle('is-shown', window.scrollY > 500);
    });
  }


  /* ---------- ambient money rain — confined to each section's own
     background so it never sits over a photo, card, or block of text.
     Works on both desktop and mobile. ---------- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const isMobile = window.innerWidth < 760;
    const perSection = isMobile ? 3 : 11;
    const emojiSet = ['\uD83D\uDCB5', '\uD83D\uDCB0', '\uD83D\uDCB2']; // 💵 💰 💲
    // Any section-like block that has its own background (skips the
    // marquee ticker and footer, which are busy/dark enough already).
    const rainHosts = document.querySelectorAll('.hero, .section, .press-strip');
    rainHosts.forEach((host) => {
      const layer = document.createElement('div');
      layer.className = 'section-rain';
      layer.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < perSection; i++) {
        const p = document.createElement('span');
        const symbol = emojiSet[Math.floor(Math.random() * emojiSet.length)];
        p.className = 'money-particle';
        p.textContent = symbol;
        const left = 6 + Math.random() * 88;
        const size = 16 + Math.random() * 14;
        const duration = 14 + Math.random() * 14;
        const delay = Math.random() * -duration;
        const drift = Math.round(Math.random() * 70 - 35) + 'px';
        const rot = Math.round(Math.random() * 50 - 25) + 'deg';
        p.style.left = left + '%';
        p.style.fontSize = size + 'px';
        p.style.animationDuration = duration + 's';
        p.style.animationDelay = delay + 's';
        p.style.setProperty('--drift', drift);
        p.style.setProperty('--rot', rot);
        layer.appendChild(p);
      }
      host.insertBefore(layer, host.firstChild);
    });
  }

  /* ---------- Wealth Creator Blueprint pop-up (front-end only — not wired to an email service yet) ---------- */
  const bpButtons = document.querySelectorAll('[data-blueprint]');
  if (bpButtons.length) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="bp-title">' +
        '<button type="button" class="modal-close" aria-label="Close">&times;</button>' +
        '<div class="modal-head">' +
          '<h2 id="bp-title">Get the Wealth Creator Blueprint straight to your inbox</h2>' +
          '<p class="modal-sub">Tell us where to send it.</p>' +
        '</div>' +
        '<form>' +
          '<input type="hidden" name="interest" value="">' +
          '<div class="form-row"><label for="bp-first">First name</label><input type="text" id="bp-first" name="first_name" required autocomplete="given-name"></div>' +
          '<div class="form-row"><label for="bp-last">Last name</label><input type="text" id="bp-last" name="last_name" required autocomplete="family-name"></div>' +
          '<div class="form-row"><label for="bp-email">Email address</label><input type="email" id="bp-email" name="email" required autocomplete="email"></div>' +
          '<button type="submit" class="btn btn-primary">Send me the Blueprint</button>' +
          '<span class="form-note">Unsubscribe anytime. No spam, ever.</span>' +
        '</form>' +
        '<div class="modal-success"><h2>You\u2019re in \u2713</h2><p>Check your inbox for the Wealth Creator Blueprint.</p></div>' +
      '</div>';
    document.body.appendChild(overlay);
    const modalEl = overlay.querySelector('.modal');
    const form = overlay.querySelector('form');
    let lastFocus = null;
    const close = () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    bpButtons.forEach(btn => btn.addEventListener('click', () => {
      lastFocus = btn;
      form.reset();
      modalEl.classList.remove('is-done');
      form.querySelector('[name="interest"]').value = btn.getAttribute('data-blueprint') || '';
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => form.querySelector('#bp-first').focus(), 50);
    }));
    overlay.querySelector('.modal-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('is-open')) close(); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      modalEl.classList.add('is-done');
      setTimeout(close, 2600);
    });
  }
});