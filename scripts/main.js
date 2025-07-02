// Navbar toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('hidden'));

// Canvas background particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles;
function resizeCanvas(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
function createParticles(){
  particles = Array.from({length:60},()=>({
    x:Math.random()*width,
    y:Math.random()*height,
    vx:(Math.random()-0.5)*0.7,
    vy:(Math.random()-0.5)*0.7,
    size:2+Math.random()*2
  }));
}
function animate(){
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0,0,width,height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>width) p.vx*=-1;
    if(p.y<0||p.y>height) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle = '#0ff';
    ctx.shadowColor = '#0ff';
    ctx.shadowBlur = 10;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
resizeCanvas();
createParticles();
animate();
window.addEventListener('resize', ()=>{ resizeCanvas(); createParticles(); });

// Active link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = window.scrollY;
        if (top >= sec.offsetTop - 60) current = sec.getAttribute('id');
    });
    navItems.forEach(li => {
        li.classList.remove('text-teal-400');
        if (li.getAttribute('href') === `#${current}`) li.classList.add('text-teal-400');
    });
    const progress = document.getElementById('progress');
    const total = document.body.scrollHeight - window.innerHeight;
    progress.style.width = `${(window.scrollY / total) * 100}%`;
});

// AOS init
AOS.init();

// Dark/light mode
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
function setTheme(mode){
    if(mode==='light'){html.classList.remove('dark');themeToggle.textContent='Dark Mode';}
    else{html.classList.add('dark');themeToggle.textContent='Light Mode';}
    localStorage.setItem('theme',mode);
}
themeToggle.addEventListener('click',()=>{
    const mode=html.classList.contains('dark')?'light':'dark';
    setTheme(mode);
});
setTheme(localStorage.getItem('theme')||'dark');

// Custom cursor
const cursor=document.createElement('div');
cursor.className='custom-cursor';
document.body.appendChild(cursor);
window.addEventListener('mousemove',e=>{
    cursor.style.left=e.clientX+'px';
    cursor.style.top=e.clientY+'px';
});
document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));
    el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'));
});

// Language toggle
const langToggle=document.getElementById('lang-toggle');
let currentLang='en';
const translations={
    'hero-title':{'en':'Tech & Business Communicator | Junior Full-Stack Developer | AI & Data Analytics','pt':'Comunicador de Tecnologia e Negócios | Desenvolvedor Full-Stack Júnior | IA & Análise de Dados'},
    'about-title':{'en':'About Me','pt':'Sobre Mim'},
    'about-location':{'en':'Location: S\u00E3o Paulo, Brazil','pt':'Localiza\u00E7\u00E3o: S\u00E3o Paulo, Brasil'},
    'about-email':{'en':'Email: caiomontilha.cm@gmail.com','pt':'Email: caiomontilha.cm@gmail.com'},
    'projects-title':{'en':'Projects','pt':'Projetos'},
    'project1-title':{'en':'Project One','pt':'Projeto Um'},
    'project1-desc':{'en':'Description for project one.','pt':'Descri\u00E7\u00E3o do projeto um.'},
    'project2-title':{'en':'Project Two','pt':'Projeto Dois'},
    'project2-desc':{'en':'Description for project two.','pt':'Descri\u00E7\u00E3o do projeto dois.'},
    'project3-title':{'en':'Project Three','pt':'Projeto Tr\u00EAs'},
    'project3-desc':{'en':'Description for project three.','pt':'Descri\u00E7\u00E3o do projeto tr\u00EAs.'},
    'resume-title':{'en':'Resume','pt':'Curr\u00EDculo'},
    'software-skills':{'en':'Software Skills','pt':'Habilidades de Software'},
    'languages':{'en':'Languages','pt':'Idiomas'},
    'personal-skills':{'en':'Personal Skills','pt':'Habilidades Pessoais'},
    'experience':{'en':'Experience & Education','pt':'Experi\u00EAncia & Educa\u00E7\u00E3o'},
    'exp1':{'en':'2022 - Present: Developer at Company','pt':'2022 - Presente: Desenvolvedor na Empresa'},
    'edu1':{'en':'2018 - 2022: BSc in Computer Science','pt':'2018 - 2022: Bacharelado em Ci\u00EAncia da Computa\u00E7\u00E3o'},
    'courses-title':{'en':'Courses & Certificates','pt':'Cursos & Certificados'},
    'course1-title':{'en':'Course One','pt':'Curso Um'},
    'course1-desc':{'en':'Description for course one.','pt':'Descri\u00E7\u00E3o do curso um.'},
    'course2-title':{'en':'Course Two','pt':'Curso Dois'},
    'course2-desc':{'en':'Description for course two.','pt':'Descri\u00E7\u00E3o do curso dois.'},
    'course3-title':{'en':'Course Three','pt':'Curso Tr\u00EAs'},
    'course3-desc':{'en':'Description for course three.','pt':'Descri\u00E7\u00E3o do curso tr\u00EAs.'},
    'contact-title':{'en':'Contact Me','pt':'Contate-Me'}
};
function translate(){
    document.querySelectorAll('[data-lang]').forEach(el=>{
        const key=el.getAttribute('data-lang');
        if(translations[key]) el.textContent=translations[key][currentLang];
    });
    langToggle.textContent=currentLang==='en'?'Traduzir para o ingl\u00EAs':'Translate to Portuguese';
}
langToggle.addEventListener('click',()=>{
    currentLang=currentLang==='en'?'pt':'en';
    translate();
});
translate();

// Expandable project and course descriptions
function toggleDescription(card){
    const p=card.querySelector('p');
    p.classList.toggle('hidden');
}
document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click',()=>toggleDescription(card));
});

// Contact form submit
const contactForm = document.getElementById('contact-form');
if(contactForm){
  const msg = document.getElementById('form-msg');
  contactForm.addEventListener('submit',e=>{
    e.preventDefault();
    fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{'Accept':'application/json'}})
      .then(()=>{msg.textContent='Message sent!';msg.classList.remove('hidden');contactForm.reset();})
      .catch(()=>{msg.textContent='Error sending message';msg.classList.remove('hidden');});
  });
}
