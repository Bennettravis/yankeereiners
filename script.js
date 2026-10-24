document.addEventListener('DOMContentLoaded', () => {
  const heroCard = document.querySelector('.hero-info-card');
  const body = document.body;

  if (heroCard) {
    const events = [
      {
        title: 'YRHA Spring Slide',
        start: '2027-04-23',
        end: '2027-04-25',
        venue: 'Erie County Fair Showplex',
        address: '2293 Thomas Road, Varysburg, NY 14167',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=2293+Thomas+Road+Varysburg+NY+14167'
      },
      {
        title: 'YRHA Lake Effect',
        start: '2027-06-18',
        end: '2027-06-20',
        venue: 'Erie County Fair Showplex',
        address: '2293 Thomas Road, Varysburg, NY 14167',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=2293+Thomas+Road+Varysburg+NY+14167'
      },
      {
        title: 'YRHA Summer spectacular',
        start: '2027-07-16',
        end: '2027-07-18',
        venue: 'Erie County Fair Showplex',
        address: '2293 Thomas Road, Varysburg, NY 14167',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=2293+Thomas+Road+Varysburg+NY+14167'
      }
    ];

    const parseDate = (value) => {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(Date.UTC(year, month - 1, day));
    };

    const formatRange = (startDate, endDate) => {
      const start = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      const end = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      return `${start}–${end}`;
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextEvent = [...events].find((event) => parseDate(event.end) >= today) || events[0];

    const title = heroCard.querySelector('h2');
    const list = heroCard.querySelector('ul');

    if (title) {
      title.textContent = nextEvent.title;
    }

    if (list) {
      const start = parseDate(nextEvent.start);
      const end = parseDate(nextEvent.end);
      list.innerHTML = `
        <li>${formatRange(start, end)}</li>
        <li>${nextEvent.venue}</li>
        <li><a href="${nextEvent.mapUrl}" target="_blank" rel="noreferrer">${nextEvent.address}</a></li>
      `;
    }
  }

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (navToggle && mobileNav) {
    const setMenuState = (isOpen) => {
      mobileNav.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('nav-open', isOpen && window.innerWidth <= 760);
    };

    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        setMenuState(false);
      }
    });
  }

  const slides = document.querySelectorAll('.event-slide');
  const dots = document.querySelectorAll('.event-slider-dot');
  const prevBtn = document.querySelector('.event-slider-prev');
  const nextBtn = document.querySelector('.event-slider-next');

  if (slides.length && dots.length) {
    let activeIndex = 0;
    let autoplayId = null;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === activeIndex);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
        dot.setAttribute('aria-pressed', String(idx === activeIndex));
      });
    };

    const startAutoplay = () => {
      clearInterval(autoplayId);
      autoplayId = setInterval(() => {
        showSlide(activeIndex + 1);
      }, 4000);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoplay();
      });
    });

    prevBtn?.addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startAutoplay();
    });

    nextBtn?.addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startAutoplay();
    });

    startAutoplay();
  }

  const sponsorSlides = document.querySelectorAll('.sponsor-slide');
  const sponsorDots = document.querySelectorAll('.sponsor-slider-dot');
  const sponsorPrevBtn = document.querySelector('.sponsor-slider-prev');
  const sponsorNextBtn = document.querySelector('.sponsor-slider-next');

  if (sponsorSlides.length && sponsorDots.length) {
    let sponsorActiveIndex = 0;
    let sponsorAutoplayId = null;

    const showSponsor = (index) => {
      sponsorActiveIndex = (index + sponsorSlides.length) % sponsorSlides.length;

      sponsorSlides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === sponsorActiveIndex);
      });

      sponsorDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === sponsorActiveIndex);
        dot.setAttribute('aria-pressed', String(idx === sponsorActiveIndex));
      });
    };

    const startSponsorAutoplay = () => {
      clearInterval(sponsorAutoplayId);
      sponsorAutoplayId = setInterval(() => {
        showSponsor(sponsorActiveIndex + 1);
      }, 4000);
    };

    sponsorDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSponsor(index);
        startSponsorAutoplay();
      });
    });

    sponsorPrevBtn?.addEventListener('click', () => {
      showSponsor(sponsorActiveIndex - 1);
      startSponsorAutoplay();
    });

    sponsorNextBtn?.addEventListener('click', () => {
      showSponsor(sponsorActiveIndex + 1);
      startSponsorAutoplay();
    });

    startSponsorAutoplay();
  }
});
