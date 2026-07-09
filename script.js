// ============================================================
// PROJECTS DATA
// TODO: Replace these with your real projects!
// Each project needs: title, description, tags, and optional links.
// Ask Copilot: "Add a project card for a [project type] called [name]"
// ============================================================
const projects = [
  {
    title: "Chopping Block",
    description: "A web game to teach kids about healthy eating and nutrition. Built with C# and Unity.",
    tags: ["C#", "Unity"],
    github: "https://github.com/kendall-hill/ChoppingBlock",
    demo: null,
  },
  {
    title: "Data Dictionary",
    description: "A comprehensive reference for database schema definitions.",
    tags: ["Power Apps", "SQL", "Data Management" ,"Excel"],
    github: null,
    demo: null,
  },
  {
    title: "Password Cracking",
    description: "A project that demonstrates the use of John the Ripper and various algorithms to crack passwords.",
    tags: ["JohnTheRipper", "Algorithms", "AI", "RockYou Dataset"],
    github: null,
    demo: null,
  },
];

// ============================================================
// SKILLS DATA
// TODO: Replace with your actual skills.
// Ask Copilot to help format this list based on your resume.
// ============================================================
const skills = [
  "Python",
  "Java",
  "C",
  "HTML & CSS",
  "Git & GitHub",
  "Figma",
  "SQL",
  "Linux",
  "Power BI",
  "Power Apps",
];

// ============================================================
// RENDER PROJECTS
// ============================================================
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="project-links">
          ${project.github ? `<a href="${project.github}" target="_blank">GitHub →</a>` : ""}
          ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo →</a>` : ""}
        </div>
      </div>
    `
    )
    .join("");
}

// ============================================================
// RENDER SKILLS
// ============================================================
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  container.innerHTML = skills
    .map((skill) => `<span class="skill-badge">${skill}</span>`)
    .join("");
}

// ============================================================
// DARK MODE TOGGLE
// TODO: Implement this! Here's a stub to get you started.
// Ask Copilot (inline chat on this function): "Implement dark mode
// toggle that saves preference to localStorage"
// ============================================================

function toggleDarkMode() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);

  const btn = document.getElementById("dark-mode-btn");
  if (btn) {
    btn.textContent = nextTheme === "dark" ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  updateYear();
  initProfilePictureSpin();

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", initialTheme);

  const btn = document.getElementById("dark-mode-btn");
  if (btn) {
    btn.addEventListener("click", toggleDarkMode);
    btn.textContent = initialTheme === "dark" ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      initialTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
});

function initProfilePictureSpin() {
  const profileImage = document.querySelector(".about-image");
  if (!profileImage) return;

  const spinProfilePicture = () => {
    profileImage.classList.remove("is-spinning");
    void profileImage.offsetWidth;
    profileImage.classList.add("is-spinning");
    emitCoinBurst(profileImage);
  };

  profileImage.addEventListener("pointerdown", spinProfilePicture);
  profileImage.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      spinProfilePicture();
    }
  });

  profileImage.addEventListener("animationend", () => {
    profileImage.classList.remove("is-spinning");
  });
}

function emitCoinBurst(sourceElement) {
  const rect = sourceElement.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const coinCount = 12;

  for (let index = 0; index < coinCount; index += 1) {
    const coin = document.createElement("span");
    coin.className = "coin-particle";
    coin.textContent = "✿";

    const size = 1.05 + Math.random() * 0.85;
    const angle = Math.random() * Math.PI * 2;
    const speed = 90 + Math.random() * 120;
    const spin = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540);
    const driftX = Math.cos(angle) * speed;
    const driftY = Math.sin(angle) * speed - (80 + Math.random() * 40);
    const duration = 900 + Math.random() * 500;

    coin.style.width = `${size}rem`;
    coin.style.height = `${size}rem`;
    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;

    document.body.appendChild(coin);

    const startTime = performance.now();

    const animateCoin = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const x = startX + driftX * progress;
      const y = startY + driftY * progress + 120 * progress * progress;
      const rotation = spin * progress;
      const scale = 1 - progress * 0.15;

      coin.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${rotation}deg) scale(${scale})`;
      coin.style.opacity = String(1 - progress);

      if (progress < 1) {
        requestAnimationFrame(animateCoin);
      } else {
        coin.remove();
      }
    };

    requestAnimationFrame(animateCoin);
  }
}


// ============================================================
// UPDATE FOOTER YEAR
// ============================================================
function updateYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// INIT
// ============================================================
