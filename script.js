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
  const hamburger = document.querySelector('.hamburger-modern');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.querySelector('.menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburger && mobileMenu) {
    const toggleMenu = (show) => {
      mobileMenu.classList.toggle('open', show);
      document.body.style.overflow = show ? 'hidden' : ''; // Prevent scroll when menu open
      hamburger.setAttribute('aria-expanded', show);
    };

    hamburger.addEventListener('click', () => toggleMenu(true));
    if (menuClose) menuClose.addEventListener('click', () => toggleMenu(false));

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // ── Announcement bar close button ─────────────────────────
  const closeBar = document.querySelector('.close-bar');
  const announcementStrip = document.querySelector('.announcement-strip');
  if (closeBar && announcementStrip) {
    closeBar.addEventListener('click', () => {
      announcementStrip.style.display = 'none';
    });
  }

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
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-bottom');

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
      badge: '50 ML — TRIAL SIZE',
      price: '80',
      unit: '/ 50 ml',
      desc: 'Perfect for first-time buyers or gifting. Experience the purity before committing to a larger jar.',
      bestFor: 'Best for: Trial / Travel / Gifting',
      features: ['Hand-churned using Bilona method', 'Zero preservatives or additives', 'Rich in A2 protein & vitamins'],
      jarLabel: '50ml'
    },
    '100ml': {
      badge: '100 ML — SMALL JAR',
      price: '150',
      unit: '/ 100 ml',
      desc: 'Ideal for testing our premium quality. A compact jar for your daily toast, coffee, or dal.',
      bestFor: 'Best for: Individual / Gifting / Travel',
      features: ['Bilona hand-churned tradition', 'Glass jar with gold lid', 'No artificial colours or flavours'],
      jarLabel: '100ml'
    },
    '200ml': {
      badge: '200 ML — DAILY USE',
      price: '280',
      unit: '/ 200 ml',
      desc: 'Great for small kitchens and fresh consumption. Packed with rich nutrients and authentic aroma.',
      bestFor: 'Best for: Couples / Small Kitchens',
      features: ['Fresh batch, slow-cooked', 'Rich danedar texture', 'Perfect for festive sweets'],
      jarLabel: '200ml'
    },
    '500ml': {
      badge: '500 ML — BEST SELLER',
      price: '650',
      unit: '/ 500 ml',
      desc: 'The most popular choice. Ideal for everyday Indian cooking, rituals, and festive sweets.',
      bestFor: 'Best for: Regular Families / Gifting',
      features: ['Most popular size', 'Traditional Bilona process', 'Sealed for freshness'],
      jarLabel: '500ml'
    },
    '1L': {
      badge: '1 L TIN — FAMILY PACK',
      price: '1,200',
      unit: '/ 1 Litre Tin',
      desc: 'Maximum value for daily usage. Our signature A2 Ghee in a convenient family-sized tin.',
      bestFor: 'Best for: Large Families / Bulk Usage',
      features: ['Premium tin packaging', 'Long shelf life', 'Best value per ml'],
      jarLabel: '1L'
    },
    '2L': {
      badge: '2 L — STOCK UP',
      price: '2,200',
      unit: '/ 2 Litres',
      desc: 'Ensure your kitchen never runs out of purity. Authentic taste for a full month of healthy meals.',
      bestFor: 'Best for: Monthly Kitchen Stock',
      features: ['Bulk saving on premium ghee', 'Airtight tin sealing', 'Same pure Bilona quality'],
      jarLabel: '2L'
    },
    '15L': {
      badge: '15 L — BULK TIN',
      price: '15,000',
      unit: '/ 15 Litres',
      desc: 'Bulk sourcing for catering, religious purposes, or large families. Pristine quality in traditional 15L tin.',
      bestFor: 'Best for: Catering / Industrial / Rituals',
      features: ['Direct from dairy — lowest price', 'Traditional large tin format', 'Custom orders available'],
      jarLabel: '15L'
    }
  };

  const tabBtns = document.querySelectorAll('.tab-btn');
  const badgeEl = document.getElementById('product-badge');
  const descEl = document.getElementById('product-desc');
  const priceEl = document.getElementById('product-price');
  const unitEl = document.getElementById('product-unit');
  const bestForEl = document.getElementById('product-best-for');
  const featuresEl = document.getElementById('product-features');
  const waLink = document.getElementById('whatsapp-product-btn');
  const jarSizeLabel = document.getElementById('jar-size-label');

  function updateProduct(size) {
    const data = productData[size];
    if (!data) return;

    // Fade out
    const els = [badgeEl, descEl, priceEl, unitEl, bestForEl, featuresEl];
    els.forEach(el => { if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; } });

    setTimeout(() => {
      if (badgeEl) badgeEl.textContent = data.badge;
      if (descEl) descEl.textContent = data.desc;
      if (priceEl) priceEl.textContent = data.price;
      if (unitEl) unitEl.textContent = data.unit;
      if (bestForEl) bestForEl.textContent = data.bestFor;
      if (jarSizeLabel) jarSizeLabel.textContent = data.jarLabel;

      // Update feature bullets
      if (featuresEl) {
        featuresEl.innerHTML = data.features
          .map(f => `<li>${f}</li>`)
          .join('');
      }

      // Pre-filled WhatsApp message
      if (waLink) {
        const msg = encodeURIComponent(`Hi, I'd like to order SKS Desi Cow A2 Ghee — ${size} (₹${data.price})`);
        waLink.href = `https://wa.me/919999999999?text=${msg}`;
      }

      // Fade in
      els.forEach(el => {
        if (el) {
          el.style.transition = 'all 0.35s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 250);
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateProduct(btn.getAttribute('data-size'));
    });
  });

  console.log('🪔 SKS GHEE website loaded successfully!');
});
