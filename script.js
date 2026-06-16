// ========= HERO: Parallax Background ==============
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg-parallax');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }
});

// ========= MENU HIGHLIGHTS: Animated reveal & filtering ==========
function revealMenuOnScroll() {
  const cards = document.querySelectorAll('.menu-card');
  const trigger = window.innerHeight * 0.9;

  cards.forEach(card => {
    const box = card.getBoundingClientRect();
    if (box.top < trigger) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealMenuOnScroll);
window.addEventListener('DOMContentLoaded', revealMenuOnScroll);

// Filter Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    document.querySelectorAll('.menu-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    revealMenuOnScroll();
  });
});

// ========= SPECIAL OFFERS: Countdown Timer ===========

function updateOfferTimer() {
  const now = new Date();
  let end = new Date();
  end.setHours(18,0,0,0); // 6 PM today
  let diff = end - now;
  if (now.getHours() >= 18) {
    // Tomorrow's happy hour
    end.setDate(end.getDate()+1);
    end.setHours(16,0,0,0);
    diff = end - now;
  } else if (now.getHours() < 16) {
    // Today's happy hour is upcoming
    end.setHours(16,0,0,0);
    diff = end - now;
  }
  let hours = Math.floor(diff / (1000*60*60));
  let minutes = Math.floor((diff % (1000*60*60))/(1000*60));
  let seconds = Math.floor((diff % (1000*60))/1000);

  let str;
  if (now.getHours() >= 16 && now.getHours() < 18) {
    // Within happy hours
    str = `Ends in ${hours}h ${minutes}m ${seconds}s`;
  } else {
    // Countdown to happy hour
    str = `Starts in ${hours}h ${minutes}m ${seconds}s`;
  }
  document.getElementById('offer-timer').textContent = str;
}
setInterval(updateOfferTimer, 1000);
updateOfferTimer();

// ========= GALLERY: Mobile Carousel ==============
const galleryImgs = [...document.querySelectorAll('.gallery-img')];
let galleryCurrent = 0;
function galleryShowCurrent() {
  galleryImgs.forEach((img, idx) => {
    img.style.display = (window.innerWidth < 700)
      ? (idx === galleryCurrent ? '' : 'none')
      : '';
  });
  document.getElementById('gallery-indicator').textContent =
    window.innerWidth < 700 ? `${galleryCurrent + 1} / ${galleryImgs.length}` : '';
}
galleryShowCurrent();
window.addEventListener('resize', galleryShowCurrent);

document.getElementById('gallery-prev').addEventListener('click', ()=>{
  galleryCurrent = (galleryCurrent - 1 + galleryImgs.length) % galleryImgs.length;
  galleryShowCurrent();
});
document.getElementById('gallery-next').addEventListener('click', ()=>{
  galleryCurrent = (galleryCurrent + 1) % galleryImgs.length;
  galleryShowCurrent();
});

// ========= TESTIMONIALS: Carousel ==========
const testimonialItems = [...document.querySelectorAll('.testimonial-item')];
let testimonialCurrent = 0;
function testimonialShowCurrent() {
  testimonialItems.forEach((el, idx) =>
    el.classList.toggle('active', idx === testimonialCurrent));
}
testimonialShowCurrent();
document.getElementById('testimonial-prev').addEventListener('click', ()=>{
  testimonialCurrent = (testimonialCurrent-1+testimonialItems.length)%testimonialItems.length;
  testimonialShowCurrent();
});
document.getElementById('testimonial-next').addEventListener('click', ()=>{
  testimonialCurrent = (testimonialCurrent+1)%testimonialItems.length;
  testimonialShowCurrent();
});

// ========= CONTACT FORM: No actual submission ==========
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thank you! Your message has been sent.');
  this.reset();
});
