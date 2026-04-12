/* ============================================================
   SKS GHEE — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky header shadow ──────────────────────────────────
  const header = document.getElementById('mainHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Hamburger / Mobile menu ───────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // ── Smooth scroll for all anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header.getBoundingClientRect().height;
        const targetY = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll reveal animation ───────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── Announcement bar pause on hover ──────────────────────
  const track = document.querySelector('.announce-track');
  if (track) {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  // ── Active nav link highlight on scroll ──────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-left a, .nav-right a:not(.whatsapp-btn)');

  const highlightNav = () => {
    let current = '';
    const scrollY = window.scrollY + header.getBoundingClientRect().height + 40;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--brown)';
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── WhatsApp floating button pulse ───────────────────────
  const floatBtn = document.getElementById('float-whatsapp-btn');
  if (floatBtn) {
    // Add tooltip
    const tooltip = document.createElement('span');
    tooltip.textContent = 'Order Now!';
    tooltip.style.cssText = `
      position: absolute;
      right: 68px;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
      color: #333;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 4px 16px rgba(0,0,0,.15);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
      font-family: 'Montserrat', sans-serif;
    `;
    floatBtn.style.position = 'fixed';
    floatBtn.appendChild(tooltip);

    floatBtn.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });
    floatBtn.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  }

  // ── Product card hover sound-like visual ripple ───────────
  document.querySelectorAll('.btn-order, .btn-primary, .btn-whatsapp-large').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${e.clientY - rect.top - size / 2}px;
        left: ${e.clientX - rect.left - size / 2}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.55s ease;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ── Interactive Product Tabs ─────────────────────────────
  const productData = {
    '50ml': { 
      badge: '50 ML — Trial Size', price: '80', unit: '50ml', 
      desc: 'Perfect for first-time buyers or gifting. Experience the purity before committing to a larger jar.', 
      bestFor: 'Best for: Trial / Travel / Gifting', labelSize: '50 ML'
    },
    '50ml': { 
      badge: '50 ML — Trial Size', price: '80', unit: '50ml', 
      desc: 'Perfect for first-time buyers or gifting. Experience the purity before committing to a larger jar.', 
      bestFor: 'Best for: Trial / Travel / Gifting', labelSize: '50 ML',
      img: 'images/ghee_jar.png'
    },
    '100ml': { 
      badge: '100 ML — Small Jar', price: '150', unit: '100ml', 
      desc: 'Ideal for testing our premium quality. A compact jar for your daily toast or coffee.', 
      bestFor: 'Best for: Individual / Gifting / Travel', labelSize: '100 ML',
      img: 'images/ghee_jar.png'
    },
    '200ml': { 
      badge: '200 ML — Daily Use', price: '280', unit: '200ml', 
      desc: 'Great for small kitchens and fresh consumption. Packed with rich nutrients and aroma.', 
      bestFor: 'Best for: Couples / Small Kitchens', labelSize: '200 ML',
      img: 'images/ghee_jar.png'
    },
    '500ml': { 
      badge: '500 ML — Best Seller', price: '520', unit: '500ml', 
      desc: 'The most popular choice. Ideal for everyday Indian cooking, rituals, and festive sweets.', 
      bestFor: 'Best for: Regular Families / Gifting', labelSize: '500 ML',
      img: 'images/ghee_jar.png'
    },
    '1L': { 
      badge: '1 L — Family Pack', price: '980', unit: '1 L', 
      desc: 'Maximum value for daily usage. Our signature A2 Ghee in a convenient family-sized tin.', 
      bestFor: 'Best for: Large Families / Bulk Usage', labelSize: '1 LITER',
      img: 'images/ghee_1l.png'
    },
    '2L': { 
      badge: '2 L — Stock Up', price: '1850', unit: '2 L', 
      desc: 'Ensure your kitchen never runs out of purity. Authentic taste for a month of healthy meals.', 
      bestFor: 'Best for: Monthly Kitchen Stock', labelSize: '2 LITER',
      img: 'images/ghee_1l.png'
    },
    '15L': { 
      badge: '15 L — Bulk Tin', price: '12500', unit: '15 L', 
      desc: 'Bulk sourcing for catering or large families. Pristine quality in a traditional 15L tin format.', 
      bestFor: 'Best for: Catering / Industrial / Gifts', labelSize: '15 L',
      img: 'images/ghee_15l.png'
    }
  };

  const tabBtns = document.querySelectorAll('.tab-btn');
  const badgeEl = document.getElementById('product-badge');
  const descEl = document.getElementById('product-desc');
  const priceEl = document.getElementById('product-price');
  const unitEl = document.getElementById('product-unit');
  const bestForEl = document.getElementById('product-best-for');
  const labelSizeEl = document.getElementById('label-size-display');
  const waLink = document.getElementById('whatsapp-product-btn');
  const mainImgEl = document.getElementById('product-main-img');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Get data
      const size = btn.getAttribute('data-size');
      const data = productData[size];

      // Update content with fade animation
      const elementsToUpdate = [badgeEl, descEl, priceEl, unitEl, bestForEl];
      elementsToUpdate.forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(10px)';
        }
      });

      // Special handling for image
      if (mainImgEl) mainImgEl.classList.add('switching');

      setTimeout(() => {
        if (badgeEl) badgeEl.textContent = data.badge;
        if (descEl) descEl.textContent = data.desc;
        if (priceEl) priceEl.textContent = data.price;
        if (unitEl) unitEl.textContent = data.unit;
        if (bestForEl) bestForEl.textContent = data.bestFor;
        if (mainImgEl && data.img) mainImgEl.src = data.img;
        
        if (waLink) {
          waLink.href = `https://wa.me/919999999999?text=Hi, I want to order SKS GHEE ${size}`;
        }

        elementsToUpdate.forEach(el => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.3s ease';
          }
        });

        if (mainImgEl) mainImgEl.classList.remove('switching');
      }, 300);
    });
  });

  console.log('🪔 SKS GHEE website loaded successfully!');
});
