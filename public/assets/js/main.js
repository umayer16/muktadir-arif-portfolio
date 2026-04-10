/* =========================================
   MAIN LOGIC - Dynamic Navbar & Interactions
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INJECT NAVBAR (Expanded with SMA Nahian's Structure)
    const navbarHTML = `
      <div class="nav-container">
        <a href="/" class="nav-logo">MUKTADIR ARIF</a>
        <ul class="nav-menu" id="nav-menu">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="/about.html" class="nav-link">About</a></li>
          <li><a href="/experience.html" class="nav-link">Experience</a></li>
          <li><a href="/projects.html" class="nav-link">Projects</a></li>
          <li><a href="/academics.html" class="nav-link">Academics</a></li>
          <li><a href="/skills.html" class="nav-link">Skills</a></li>
          <li class="dropdown">
            <span class="nav-link" style="cursor:pointer">More ▾</span>
            <div class="dropdown-content">
              <a href="/awards.html">Awards</a>
              <a href="/publications.html">Publications</a>
              <a href="/volunteering.html">Volunteering</a>
              <a href="/guestbook.html">Guestbook</a>
            </div>
          </li>
          <li><a href="/contact.html" class="nav-link">Contact</a></li>
        </ul>
        <div class="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    
    const navElement = document.getElementById('navbar');
    if (navElement) navElement.innerHTML = navbarHTML;
  
    // 2. HIGHLIGHT ACTIVE PAGE
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .dropdown-content a').forEach(link => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath) {
        link.classList.add('active');
        // If it's a dropdown item, highlight the parent "More"
        if (link.parentElement.classList.contains('dropdown-content')) {
           link.closest('.dropdown').querySelector('.nav-link').classList.add('active');
        }
      }
    });
  
    // 3. MOBILE MENU LOGIC
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
    
    // 4. TYPEWRITER EFFECT (For Home Page)
    const statusElement = document.getElementById('learning-status');
    if (statusElement) {
        const topics = ["Machine Learning", "Spending Prediction Model", "HSC Physics", "Advanced Python"];
        let topicIndex = 0;
        setInterval(() => {
            topicIndex = (topicIndex + 1) % topics.length;
            statusElement.style.opacity = 0;
            setTimeout(() => {
                statusElement.innerText = topics[topicIndex];
                statusElement.style.opacity = 1;
            }, 500);
        }, 3000);
    }
});

// Modal Logic
const projectData = {
    'hostel': {
      title: "Hostel Expense Tracker",
      img: "assets/img/hostel-tracker-logo.png", 
      desc: "Built a real-world web app used by 70+ students daily. Features Firebase Authentication, Firestore database, and real-time expense charting.",
      tech: ["Firebase", "JavaScript", "Chart.js"],
      links: [
        { text: "Live Demo", url: "https://spendwise-cd1c9.web.app/" },
        { text: "GitHub", url: "https://github.com/umayer16/hostel-expense-tracker" }
      ]
    },
    'flappy': {
      title: "Flappy Sparrow",
      img: "assets/img/flappy-sparrow-logo.png",
      desc: "A Python/Pygame clone of the classic arcade game. Implements collision detection, score tracking, and physics simulation.",
      tech: ["Python", "Pygame"],
      links: [
        { text: "Play on Scratch", url: "https://scratch.mit.edu/projects/1233387521" }
      ]
    }
};
function openModal(id) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    const data = projectData[id];
    if (!data) return;
    const linksHTML = data.links.map(l => `<a href="${l.url}" target="_blank" class="btn" style="padding:0.5rem 1rem; margin-right:10px;">${l.text}</a>`).join('');
    body.innerHTML = `<h2 style="color:var(--gold);margin-bottom:1rem;">${data.title}</h2><img src="${data.img}" style="width:100px;margin-bottom:1rem;border-radius:12px;"><p style="color:var(--text-main);margin-bottom:1.5rem;">${data.desc}</p><div style="margin-bottom:1.5rem;">${data.tech.map(t => `<span style="color:var(--gold);font-family:'Fira Code',monospace;margin-right:10px;">#${t}</span>`).join('')}</div><div>${linksHTML}</div>`;
    modal.style.display = "flex";
}
function closeModal() { document.getElementById('projectModal').style.display = "none"; }
window.onclick = function(e) { if (e.target.classList.contains('modal')) closeModal(); }