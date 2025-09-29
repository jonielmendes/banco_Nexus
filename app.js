const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();


const counters = document.querySelectorAll('.kpi-number');
const animateCounter = (el) => {
  const target = +el.dataset.target; let current = 0;
  const step = Math.max(1, Math.floor(target/100));
  const tick = () => { current += step; if (current >= target) current = target; el.textContent = current; if (current < target) requestAnimationFrame(tick); };
  tick();
};
const io = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if(e.isIntersecting && !e.target.dataset.done){
      e.target.dataset.done = true;
      animateCounter(e.target);
    }
  });
}, {threshold:0.4});
[...counters].forEach(c=>io.observe(c));


const form = document.querySelector('#faq form');
if (form) form.addEventListener('submit', (ev)=>{
  if(!form.checkValidity()){
    ev.preventDefault();
    form.classList.add('was-validated');
  } else {
    ev.preventDefault();
    // Simulate form submission success
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '✅ Mensagem enviada!';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      form.classList.remove('was-validated');
    }, 3000);
  }
});

// Add floating animation to cards on hover
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
    this.style.transition = 'all 0.3s ease';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});