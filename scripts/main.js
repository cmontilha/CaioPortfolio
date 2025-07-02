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
    'course1-title':{'en':'IBM AI Developer Professional Certificate','pt':'IBM AI Developer Professional Certificate'},
    'course1-desc':{'en':'Description for course one.','pt':'Descri\u00E7\u00E3o do curso um.'},
    'course2-title':{'en':'Agile Software Development Certificate','pt':'Agile Software Development Certificate'},
    'course2-desc':{'en':'Description for course two.','pt':'Descri\u00E7\u00E3o do curso dois.'},
    'course3-title':{'en':'Career Essentials in GitHub Professional Certificate','pt':'Career Essentials in GitHub Professional Certificate'},
    'course3-desc':{'en':'Description for course three.','pt':'Descri\u00E7\u00E3o do curso tr\u00EAs.'},
    'course4-title':{'en':'[In-person Course, Atlanta] Artificial Intelligence Certificate - Marketing Professionals','pt':'[In-person Course, Atlanta] Artificial Intelligence Certificate - Marketing Professionals'},
    'course4-desc':{'en':'Description for course one.','pt':'Descri\u00E7\u00E3o do curso um.'},
    'course5-title':{'en':'Google Foundations of Cybersecurity','pt':'Google Foundations of Cybersecurity'},
    'course5-desc':{'en':'Description for course two.','pt':'Descri\u00E7\u00E3o do curso dois.'},
    'course6-title':{'en':'Power BI | Projects','pt':'Power BI | Projects'},
    'course6-desc':{'en':'Description for course three.','pt':'Descri\u00E7\u00E3o do curso tr\u00EAs.'},
    'contact-title':{'en':'Contact Me','pt':'Contate-Me'},
    'nav-home':{'en':'Home','pt':'In\u00EDcio'},
    'nav-about':{'en':'About','pt':'Sobre'},
    'nav-projects':{'en':'Projects','pt':'Projetos'},
    'nav-resume':{'en':'Resume','pt':'Curr\u00EDculo'},
    'nav-courses':{'en':'Courses & Certificates','pt':'Cursos & Certificados'},
    'nav-contact':{'en':'Contact','pt':'Contato'},
    'btn-resume':{'en':'Resume','pt':'Curr\u00EDculo'},
    'btn-portfolio':{'en':'Portfolio','pt':'Portf\u00F3lio'},
    'btn-repo':{'en':'Visit GitHub Repository','pt':'Ver no GitHub'},
    'btn-cert':{'en':'Click to view certificate','pt':'Clique para ver o certificado'},
    'btn-send':{'en':'Send','pt':'Enviar'},
    'about-text1':{'en':'Computer Science & Business Graduate from Hanover College, Indiana, USA, passionate about leveraging technology to drive innovation and make meaningful social impact. I am committed to continuous learning and consistently seeking to grow technically and professionally.','pt':'Graduado em Computa\u00E7\u00E3o e Neg\u00F3cios pelo Hanover College, Indiana, EUA. Sou apaixonado por usar tecnologia para impulsionar inova\u00E7\u00E3o e impacto social. Busco aprendizado cont\u00EDnuo e crescimento t\u00E9cnico-profissional.'},
    'about-text2':{'en':'My academic experience includes software development, web and mobile applications, algorithm analysis, data structures, databases, information security, cloud computing, and artificial intelligence (with a focus on generative AI). At the same time, my Business major strengthened my skills in marketing strategy, management, financial analysis, and business law, enabling me to bridge technical expertise with business insights.','pt':'Minha forma\u00E7\u00E3o abrange desenvolvimento de software, aplica\u00E7\u00F5es web e mobile, an\u00E1lise de algoritmos, estruturas de dados, bancos de dados, seguran\u00E7a da informa\u00E7\u00E3o, computa\u00E7\u00E3o em nuvem e intelig\u00EAncia artificial (com foco em IA generativa). Em Administra\u00E7\u00E3o, aprofundei estrat\u00E9gias de marketing, gest\u00E3o, an\u00E1lise financeira e direito empresarial, conectando conhecimento t\u00E9cnico a vis\u00E3o de neg\u00F3cios.'},
    'skillsTech':{'en':'Key Skills & Technologies','pt':'Principais Habilidades e Tecnologias'},
    'skill-prog':{'en':'<strong>Programming:</strong> Proficient in Python and Kotlin; basic knowledge of Java, C++, and R.','pt':'<strong>Programação:</strong> Conhecimento sólido em Python e Kotlin; conhecimento básico em Java, C++ e R.'},
    'skill-web':{'en':'<strong>Web Development:</strong> HTML, CSS, JavaScript, TypeScript, React, Node.js.','pt':'<strong>Desenvolvimento Web:</strong> HTML, CSS, JavaScript, TypeScript, React, Node.js.'},
    'skill-db':{'en':'<strong>Database Management:</strong> SQL (MySQL), NoSQL (Firebase).','pt':'<strong>Gerenciamento de Banco de Dados:</strong> SQL (MySQL), NoSQL (MongoDB, Firebase).'},
    'skill-algo':{'en':'<strong>Algorithms & Data Structures:</strong> Algorithm Analysis, Sorting and Searching Algorithms, Linear and Non-Linear Structures (such as lists, trees, and graphs).','pt':'<strong>Algoritmos e Estruturas de Dados:</strong> Análise de Algoritmos, Algoritmos de Ordenação e Busca, Listas, Pilhas, Filas, Árvores, Grafos.'},
    'skill-cloud':{'en':'<strong>Cloud & DevOps:</strong> Google Cloud, Docker.','pt':'<strong>Cloud & DevOps:</strong> Google Cloud, Docker'},
    'biz-header':{'en':'Business Administration & Strategy','pt':'Administração e Estratégia de Negócios'},
    'biz-text':{'en':'Marketing, Management and Financial Analysis, Agile Strategy, Excel, Power BI.','pt':'Marketing, Gestão e Análise Financeira, Direito e Ética Empresarial, Excel, Power BI'},
    'languages-list':{'en':'Portuguese (native)<br/>English (fluent)<br/>Spanish (basic)','pt':'Português (nativo)<br/>Inglês (fluente)<br/>Espanhol (básico)'}
    'cat-algorithms':{'en':'Algorithm Analysis','pt':'An\u00E1lise de Algoritmos'},
    'cat-ai':{'en':'Artificial Intelligence','pt':'Intelig\u00EAncia Artificial'},
    'cat-mobile':{'en':'Mobile Applications','pt':'Aplicativos Mobile'},
    'cat-web':{'en':'Web Development','pt':'Desenvolvimento Web'},
    'cat-blockchain':{'en':'Blockchain & Cryptocurrency','pt':'Blockchain e Criptomoedas'},
    'cat-iot':{'en':'Networks and IoT','pt':'Redes e IoT'},
    'cat-cyber':{'en':'Cybersecurity','pt':'Ciberseguran\u00E7a'},
    'cat-game':{'en':'Game Development','pt':'Desenvolvimento de Jogos'},
    'cat-desktop':{'en':'Desktop Applications','pt':'Aplicativos Desktop'},
    'resume-en-btn':{'en':'English Version','pt':'Vers\u00E3o em Ingl\u00EAs'},
    'resume-pt-btn':{'en':'Portuguese Version','pt':'Vers\u00E3o em Portugu\u00EAs'}
};
function translate(){
    document.querySelectorAll('[data-lang]').forEach(el=>{
        const key=el.getAttribute('data-lang');
        if(translations[key]) el.innerHTML=translations[key][currentLang];
    });
    langToggle.textContent=currentLang==='en'?'Traduzir para o portugu\u00EAs':'Translate to English';
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

// Resume image toggle
const resumeImg=document.getElementById('resume-img');
const resumeEnBtn=document.getElementById('resume-en-btn');
const resumePtBtn=document.getElementById('resume-pt-btn');
if(resumeEnBtn&&resumePtBtn&&resumeImg){
    resumeEnBtn.addEventListener('click',()=>{resumeImg.src='assets/images/CaioResumeCS.png';});
    resumePtBtn.addEventListener('click',()=>{resumeImg.src='assets/images/caioPortugueseCV.png';});
}

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
