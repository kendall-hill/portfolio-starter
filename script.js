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
    tags: ["c#", "Unity"],
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
  "Python", "Java", "C",
  "HTML & CSS", "Git & GitHub",
, "Figma","SQL", "Linux", "Power BI", "Power Apps"
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

// Jellyfish text dispersion effect
function initJellyfishEffect() {
  const container = document.getElementById("jellyfish-effect");
  if (!container) return;

  const chars = [];
  let charIndex = 0;

  // Fill container with jellyfish images
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const charWidth = 50;
  const charHeight = 50;

  for (let y = 0; y < containerHeight; y += charHeight) {
    for (let x = 0; x < containerWidth; x += charWidth) {
      const img = document.createElement("img");
      img.src = "images/jellyfish-icon.jpg";
      img.className = "jellyfish-char";
      img.style.width = charWidth + "px";
      img.style.height = charHeight + "px";
      img.style.left = x + "px";
      img.style.top = y + "px";
      container.appendChild(img);
      chars.push({
        element: img,
        x: x,
        y: y,
        originalX: x,
        originalY: y,
      });
      charIndex++;
    }
  }

  // Track mouse and disperse jellyfishes
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const disperseRadius = 150;

    chars.forEach((char) => {
      const heroRect = document.getElementById("hero").getBoundingClientRect();
      const charScreenX = heroRect.left + char.x;
      const charScreenY = heroRect.top + char.y;

      const dx = mouseX - charScreenX;
      const dy = mouseY - charScreenY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < disperseRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (disperseRadius - distance) / disperseRadius;
        const pushX = Math.cos(angle) * force * 80;
        const pushY = Math.sin(angle) * force * 80;

        char.x = char.originalX - pushX;
        char.y = char.originalY - pushY;
      } else {
        char.x += (char.originalX - char.x) * 0.1;
        char.y += (char.originalY - char.y) * 0.1;
      }

      char.element.style.left = char.x + "px";
      char.element.style.top = char.y + "px";
    });
  });
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
  initJellyfishEffect();

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
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  updateYear();

  // TODO: Wire up your dark mode toggle button here once you add it
});
