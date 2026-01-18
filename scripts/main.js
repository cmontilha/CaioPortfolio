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
    'experience-title':{'en':'Experience','pt':'Experi\u00EAncia'},
    'exp-hub-role':{'en':'Data Analyst & AI Developer Jr.','pt':'Data Analyst & AI Developer Jr.'},
    'exp-hub-company':{'en':'HUB Brasil · Full-time','pt':'HUB Brasil · Tempo integral'},
    'exp-hub-date':{'en':'Aug 2025 - Present · 6 months','pt':'Ago de 2025 - o momento · 6 meses'},
    'exp-hub-location':{'en':'S\u00E3o Paulo, Brazil · On-site','pt':'S\u00E3o Paulo, Brasil · Presencial'},
    'exp-hub-summary':{'en':'At HUB Brasil, I work as a Data Analyst & AI Developer Jr. at the intersection of analytics, data engineering, and development, delivering automations, dashboards, and AI solutions to support decisions and accelerate routines.','pt':'Na HUB Brasil, atuo como Data Analyst & AI Developer Jr., na interse\u00E7\u00E3o de analytics, engenharia de dados e desenvolvimento, entregando automa\u00E7\u00F5es, dashboards e solu\u00E7\u00F5es com IA para suportar decis\u00F5es e acelerar rotinas.'},
    'exp-hub-responsibilities':{'en':'Key responsibilities and deliveries:','pt':'Principais responsabilidades e entregas:'},
    'exp-hub-bullet1':{'en':'Analytics & BI: extraction/modeling via SQL (PostgreSQL) and creation/maintenance of dashboards (Power BI, Looker Studio) for operational and marketing KPIs.','pt':'Analytics & BI: extra\u00E7\u00E3o/modelagem via SQL (PostgreSQL) e cria\u00E7\u00E3o/manuten\u00E7\u00E3o de dashboards (Power BI, Looker Studio) para KPIs operacionais e de marketing.'},
    'exp-hub-bullet2':{'en':'Automation: routines and scripts in Python to standardize analysis, validation, and data preparation processes.','pt':'Automa\u00E7\u00E3o: rotinas e scripts em Python para padronizar processos de an\u00E1lise, valida\u00E7\u00E3o e prepara\u00E7\u00E3o de dados.'},
    'exp-hub-bullet3':{'en':'Data Ingestion/Mining (backend): development of a service for data collection, processing, and persistence, with a documented API for internal consumption.','pt':'Data Ingestion/Mining (backend): desenvolvimento de servi\u00E7o para coleta, tratamento e persist\u00EAncia de dados, com API documentada para consumo interno.'},
    'exp-hub-stack1':{'en':'Stack: Python + FastAPI, Swagger UI (OpenAPI), PostgreSQL, Google Cloud Platform (GCP).','pt':'Stack: Python + FastAPI, Swagger UI (OpenAPI), PostgreSQL, Google Cloud Platform (GCP).'},
    'exp-hub-dashboard':{'en':'AI Campaign Dashboard (Full-Stack + AI): development of a platform for campaign analysis and management, with metrics and workflows (including notifications) and AI components.','pt':'AI Campaign Dashboard (Full-Stack + IA): desenvolvimento de plataforma para an\u00E1lise e gest\u00E3o de campanhas, com m\u00E9tricas e workflows (incluindo notifica\u00E7\u00F5es) e componentes de IA.'},
    'exp-hub-bullet4':{'en':'Chatbot: implementation/integration of a chatbot to support information queries and internal product flows.','pt':'Chatbot: implementa\u00E7\u00E3o/integra\u00E7\u00E3o de um chatbot para suporte \u00E0 consulta de informa\u00E7\u00F5es e fluxos internos do produto.'},
    'exp-hub-bullet5':{'en':'Machine Learning: use of Python for data preparation and model training applied to the dashboard context.','pt':'Machine Learning: uso de Python para prepara\u00E7\u00E3o de dados e treinamento de modelos aplicados ao contexto do dashboard.'},
    'exp-hub-stack2':{'en':'Stack: Node.js (backend) with TypeScript, React (frontend) with TypeScript, Python (ML/Chatbot), Docker, Google Cloud Platform (GCP).','pt':'Stack: Node.js (backend) com TypeScript, React (frontend) com TypeScript, Python (ML/Chatbot), Docker, Google Cloud Platform (GCP).'},
    'exp-hub-tech':{'en':'Technologies: Python, FastAPI, Swagger UI (OpenAPI), SQL (PostgreSQL), Power BI, Looker Studio, Docker, Node.js, TypeScript, React, Google Cloud Platform (GCP), data pipelines, ML, and chatbots.','pt':'Tecnologias: Python, FastAPI, Swagger UI (OpenAPI), SQL (PostgreSQL), Power BI, Looker Studio, Docker, Node.js, TypeScript, React, Google Cloud Platform (GCP), pipelines de dados, ML e chatbots.'},
    'exp-park-role':{'en':'Operations Assistant','pt':'Operations Assistant'},
    'exp-park-company':{'en':'Parkhurst Dining · Part-time','pt':'Parkhurst Dining · Meio per\u00EDodo'},
    'exp-park-date':{'en':'May 2022 - Dec 2024 · 2 years 8 months','pt':'Mai de 2022 - Dez de 2024 · 2 anos 8 meses'},
    'exp-park-location':{'en':'United States · On-site','pt':'Estados Unidos · Presencial'},
    'exp-park-summary':{'en':'Worked as an Operations Assistant in a corporate environment in the United States, on-site operations focused on service quality and customer experience. Continuous communication in English, developing professional customer service communication with clarity, agility, and posture.','pt':'Atuei como Operations Assistant em um ambiente corporativo nos Estados Unidos, em opera\u00E7\u00E3o presencial, com foco em qualidade de servi\u00E7o e experi\u00EAncia do cliente. Comunica\u00E7\u00E3o cont\u00EDnua em ingl\u00EAs, desenvolvendo comunica\u00E7\u00E3o profissional no atendimento ao cliente (clareza, agilidade e postura).'},
    'exp-park-activities':{'en':'Activities and responsibilities:','pt':'Atividades e responsabilidades:'},
    'exp-park-bullet1':{'en':'Customer service in English, ensuring efficient support and clear communication.','pt':'Atendimento ao cliente em ingl\u00EAs, garantindo suporte eficiente e comunica\u00E7\u00E3o clara.'},
    'exp-park-bullet2':{'en':'Worked as cashier, supporting service flow and organization.','pt':'Atua\u00E7\u00E3o como cashier (caixa), apoiando o fluxo de atendimento e organiza\u00E7\u00E3o do servi\u00E7o.'},
    'exp-park-bullet3':{'en':'Inventory control and replenishment, checking and organizing to maintain operational continuity.','pt':'Controle e reposi\u00E7\u00E3o de estoque, confer\u00EAncia e organiza\u00E7\u00E3o para manter continuidade operacional.'},
    'exp-park-bullet4':{'en':'Daily team support, contributing to pace, organization, and quality standards.','pt':'Apoio \u00E0 equipe no dia a dia, contribuindo para manter ritmo, organiza\u00E7\u00E3o e padr\u00F5es de qualidade.'},
    'exp-park-bullet5':{'en':'Constant collaboration with the team, reinforcing teamwork, responsibility, and operational discipline.','pt':'Colabora\u00E7\u00E3o constante com o time, refor\u00E7ando trabalho em equipe, responsabilidade e disciplina operacional.'},
    'exp-park-note':{'en':'Experience carried out in an on-site operations context, with routines related to services and operational support in the food service sector.','pt':'Experi\u00EAncia realizada em contexto de opera\u00E7\u00F5es presenciais, com rotinas relacionadas a servi\u00E7os e suporte operacional (atividades ligadas ao setor aliment\u00EDcio).'},
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
    'course6-title':{'en':'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional','pt':'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional'},
    'course7-title':{'en':'IBM Full Stack Software Developer Specialization Certificate','pt':'IBM Full Stack Software Developer Specialization Certificate'},
    'course8-title':{'en':'NVIDIA AI Infrastructure and Operations Fundamentals','pt':'NVIDIA AI Infrastructure and Operations Fundamentals'},
    'course9-title':{'en':'Data Analysis with R Programming – Enap Certification','pt':'Data Analysis with R Programming – Enap Certification'},
    'course6-desc':{'en':'Description for course three.','pt':'Descri\u00E7\u00E3o do curso tr\u00EAs.'},
    'contact-title':{'en':'Contact Me','pt':'Contate-Me'},
    'nav-home':{'en':'Home','pt':'In\u00EDcio'},
    'nav-about':{'en':'About','pt':'Sobre'},
    'nav-projects':{'en':'Projects','pt':'Projetos'},
    'nav-experience':{'en':'Experience','pt':'Experi\u00EAncia'},
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
    'prog-label':{'en':'Programming:','pt':'Programação:'},
    'prog-desc':{'en':'Proficient in Python and Kotlin; basic knowledge of Java, C++, and R.','pt':'Proficiência em Python e Kotlin; conhecimento básico em Java, C++ e R.'},
    'web-label':{'en':'Web Development:','pt':'Desenvolvimento Web:'},
    'web-desc':{'en':'HTML, CSS, JavaScript, TypeScript, React, Node.js.','pt':'HTML, CSS, JavaScript, TypeScript, React, Node.js.'},
    'db-label':{'en':'Database Management:','pt':'Gerenciamento de Banco de Dados:'},
    'db-desc':{'en':'SQL (MySQL), NoSQL (Firebase).','pt':'SQL (MySQL), NoSQL (Firebase).'},
    'alg-label':{'en':'Algorithms & Data Structures:','pt':'Algoritmos e Estruturas de Dados:'},
    'alg-desc':{'en':'Algorithm Analysis, Sorting and Searching Algorithms, Linear and Non-Linear Structures (such as lists, trees, and graphs).','pt':'Análise de Algoritmos, Algoritmos de Ordenação e Busca, Estruturas Lineares e Não Lineares (como listas, árvores e grafos).'},
    'cloud-label':{'en':'Cloud & DevOps:','pt':'Cloud & DevOps:'},
    'cloud-desc':{'en':'Google Cloud, Docker.','pt':'Google Cloud, Docker.'},
    'business-title':{'en':'Business Administration & Strategy','pt':'Administração e Estratégia de Negócios'},
    'business-desc':{'en':'Marketing, Management and Financial Analysis, Business Law and Ethics, Excel, Power BI.','pt':'Marketing, Gestão e Análise Financeira, Direito e Ética Empresarial, Excel, Power BI.'},
    'languages-title':{'en':'Languages','pt':'Idiomas'},
    'lang-pt':{'en':'Portuguese (native)','pt':'Português (nativo)'},
    'lang-en':{'en':'English (fluent)','pt':'Inglês (fluente)'},
    'lang-es':{'en':'Spanish (basic)','pt':'Espanhol (básico)'},
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
        if(translations[key]) el.textContent=translations[key][currentLang];
    });
    langToggle.textContent=currentLang==='en'?'Traduzir para o portugu\u00EAs':'Translate to English';
}
langToggle.addEventListener('click',()=>{
    currentLang=currentLang==='en'?'pt':'en';
    translate();
});
translate();

// Expandable project and course descriptions
const projectModal = document.getElementById('project-modal');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalImages = document.getElementById('project-modal-images');
const projectModalDescription = document.getElementById('project-modal-description');
const projectModalAction = document.getElementById('project-modal-action');

function closeProjectModal(){
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden','true');
    projectModalImages.innerHTML='';
    projectModalDescription.textContent='';
    projectModalTitle.textContent='';
    projectModalAction.onclick=null;
}

function openProjectModal(card){
    if (!projectModal || !projectModalTitle || !projectModalImages || !projectModalDescription || !projectModalAction) return;
    const titleEl = card.querySelector('h4, h3');
    const descEl = card.querySelector('p');
    const images = card.querySelectorAll('img');
    const actionBtn = card.querySelector('.repo-btn');

    projectModalTitle.textContent = titleEl ? titleEl.textContent : 'Project';
    projectModalDescription.textContent = descEl ? descEl.textContent.trim() : '';
    projectModalImages.innerHTML = '';
    images.forEach(img => {
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt || projectModalTitle.textContent;
        projectModalImages.appendChild(modalImg);
    });
    if (actionBtn) {
        projectModalAction.style.display = 'inline-flex';
        projectModalAction.textContent = actionBtn.textContent;
        projectModalAction.onclick = () => actionBtn.click();
    } else {
        projectModalAction.style.display = 'none';
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden','false');
}

document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click',(event)=>{
        if (event.target.closest('button, a')) return;
        if (card.closest('#projects')) {
            openProjectModal(card);
            return;
        }
        const p=card.querySelector('p');
        if (p) p.classList.toggle('hidden');
    });
});

if (projectModal) {
    projectModal.addEventListener('click',(event)=>{
        if (event.target.closest('[data-modal-close="true"]')) {
            closeProjectModal();
        }
    });
    document.addEventListener('keydown',(event)=>{
        if (event.key === 'Escape') closeProjectModal();
    });
}

// Resume image and link toggle
const resumeImg = document.getElementById('resume-img');
const resumeEnBtn = document.getElementById('resume-en-btn');
const resumePtBtn = document.getElementById('resume-pt-btn');
const resumeLink = resumeImg?.parentElement;

if (resumeEnBtn && resumePtBtn && resumeImg && resumeLink) {
    resumeEnBtn.addEventListener('click', () => {
        resumeImg.src = 'assets/images/CaioMontilhaResume.png';
        resumeLink.href = 'assets/pdf/CaioMontilhaCSResume2025Updated.pdf';
    });

    resumePtBtn.addEventListener('click', () => {
        resumeImg.src = 'assets/images/CaioMontilhaCurrículo.png';
        resumeLink.href = 'assets/pdf/CaioMontilhaCurrículo2025Atualizado.pdf';
    });
}
