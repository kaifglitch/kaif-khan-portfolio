(function(){
  window.addEventListener('load', function(){ setTimeout(function(){ document.getElementById('loader').classList.add('hide'); }, 500); });
  setTimeout(function(){ document.getElementById('loader').classList.add('hide'); }, 2500);

  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- typewriter intro line ----------
  var typeEl = document.getElementById('typewriter-text');
  var typePhrases = [
    'I build modern, responsive, and interactive web applications.',
    'I turn ideas into fast, reliable full-stack products.',
    'I solve problems with clean code and discipline.'
  ];
  var typePhraseIndex = 0, typeCharIndex = 0, typeDeleting = false;
  function typeLoop(){
    if (!typeEl) return;
    var current = typePhrases[typePhraseIndex];
    if (!typeDeleting){
      typeCharIndex++;
      typeEl.textContent = current.slice(0, typeCharIndex);
      if (typeCharIndex === current.length){
        typeDeleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
      setTimeout(typeLoop, 38);
    } else {
      typeCharIndex--;
      typeEl.textContent = current.slice(0, typeCharIndex);
      if (typeCharIndex === 0){
        typeDeleting = false;
        typePhraseIndex = (typePhraseIndex + 1) % typePhrases.length;
        setTimeout(typeLoop, 350);
        return;
      }
      setTimeout(typeLoop, 20);
    }
  }
  typeLoop();

  var field = document.getElementById('particle-field');
  var count = window.innerWidth < 768 ? 14 : 28;
  for (var i = 0; i < count; i++){
    var p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = (-10 - Math.random() * 20) + 'px';
    p.style.animationDuration = (10 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 14) + 's';
    p.style.opacity = (0.2 + Math.random() * 0.4).toFixed(2);
    field.appendChild(p);
  }

  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', function(){ mobileMenu.classList.toggle('open'); });
  mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ mobileMenu.classList.remove('open'); }); });

  var navHeight = document.getElementById('nav').offsetHeight;
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.pageYOffset - (navHeight - 1);
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  var revealEls = document.querySelectorAll('.reveal, .skill-card');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){ entry.target.classList.add('in-view'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function(el){ io.observe(el); });

  // Form submissions are delivered to your inbox via Formspree.
  // Replace YOUR_FORM_ID below with the endpoint ID from your own Formspree form
  // (sign up free at https://formspree.io, create a form pointed at your email,
  // and copy the ID from the endpoint it gives you: https://formspree.io/f/xxxxxxx).
  var CONTACT_FORM_ENDPOINT = 'https://formspree.io/f/moeqyzak';

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('cf-name');
    var email = document.getElementById('cf-email');
    var subject = document.getElementById('cf-subject');
    var message = document.getElementById('cf-message');
    var valid = true;
    function setError(input, condition){
      var group = input.closest('.field-group');
      if (condition){ group.classList.add('error'); valid = false; } else { group.classList.remove('error'); }
    }
    setError(name, name.value.trim().length === 0);
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    setError(email, !emailOk);
    setError(subject, subject.value.trim().length === 0);
    setError(message, message.value.trim().length < 5);
    if (!valid){
      status.className = 'show';
      status.style.background = 'rgba(255,122,106,0.1)';
      status.style.border = '1px solid rgba(255,122,106,0.35)';
      status.style.color = '#ffb3a8';
      status.textContent = 'Please fix the highlighted fields before sending.';
      return;
    }
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    var formData = new FormData();
    formData.append('name', name.value.trim());
    formData.append('email', email.value.trim());
    formData.append('subject', subject.value.trim());
    formData.append('message', message.value.trim());

    fetch(CONTACT_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    }).then(function(response){
      if (response.ok){
        status.className = 'show success';
        status.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        form.reset();
      } else {
        status.className = 'show';
        status.style.background = 'rgba(255,122,106,0.1)';
        status.style.border = '1px solid rgba(255,122,106,0.35)';
        status.style.color = '#ffb3a8';
        status.textContent = "Something went wrong sending your message. Please try again or email me directly.";
      }
    }).catch(function(){
      status.className = 'show';
      status.style.background = 'rgba(255,122,106,0.1)';
      status.style.border = '1px solid rgba(255,122,106,0.35)';
      status.style.color = '#ffb3a8';
      status.textContent = "Something went wrong sending your message. Please try again or email me directly.";
    }).finally(function(){
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
})();
