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

// ============================================================
// HAMBURGER MENU TOGGLE
// ============================================================
function toggleHamburgerMenu() {
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  
  if (hamburger && navLinks) {
    hamburger.classList.toggle("is-active");
    navLinks.classList.toggle("is-active");
    hamburger.setAttribute("aria-expanded", hamburger.classList.contains("is-active"));
  }
}

function closeHamburgerMenu() {
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  
  if (hamburger && navLinks) {
    hamburger.classList.remove("is-active");
    navLinks.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  updateYear();
  initProfilePictureSpin();
  initCatInteraction();
  initBlankApologyButton();

  // Initialize hamburger menu
  const hamburger = document.getElementById("hamburger-btn");
  if (hamburger) {
    hamburger.addEventListener("click", toggleHamburgerMenu);
  }

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeHamburgerMenu);
  });

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
function initCatInteraction() {
  const cat = document.querySelector(".contact-cat");
  const page = document.body;

  if (!cat) return;

  let clickCount = 0;
  let isCoolingDown = false;
  const messageCooldownMs = 1800;

  const messages = [
    "He is not friendly don't pet him",
    "He doesn't like strangers",
    "Respect his personal space",
    "Whats wrong with you? You can't just click a cat like that",
  ];

  const showCatMessage = (message) => {
    const rect = cat.getBoundingClientRect();
    const bubble = document.createElement("div");
    bubble.className = "cat-message";
    bubble.textContent = message;

    bubble.style.left = `${rect.left + rect.width / 2}px`;
    bubble.style.top = `${rect.top - 20}px`;

    document.body.appendChild(bubble);

    requestAnimationFrame(() => bubble.classList.add("is-visible"));

    setTimeout(() => {
      bubble.classList.remove("is-visible");
      bubble.addEventListener("transitionend", () => bubble.remove(), { once: true });
    }, 1500);
  };

  cat.addEventListener("click", () => {
    if (isCoolingDown) return;

    const message = messages[clickCount];
    showCatMessage(message);

    clickCount++;
    isCoolingDown = true;

    setTimeout(() => {
      isCoolingDown = false;
    }, messageCooldownMs);

    if (clickCount === 4) {
      // Fade out the entire page
      page.classList.add("page-destroyed");

      // Redirect to the blank fail-state page after the fade
      setTimeout(() => {
        window.location.href = "blank.html";
      }, 900);

      // Remove Milo from the page version
      cat.classList.add("cat-hide");
      setTimeout(() => cat.remove(), 400);
    }
  });
}

function initBlankApologyButton() {
  const apologyBtn = document.getElementById("milo-apology-btn");
  if (!apologyBtn) return;

  apologyBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!hasFinePointer || reduceMotion) return;

  let offsetX = 0;
  let offsetY = 0;
  const triggerDistance = 130;
  const maxOffset = 110;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const handlePointerMove = (event) => {
    const rect = apologyBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = centerX - event.clientX;
    const deltaY = centerY - event.clientY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > triggerDistance) return;

    const safeDistance = distance || 0.001;
    const intensity = (triggerDistance - safeDistance) / triggerDistance;
    const push = 30 + intensity * 55;

    offsetX = clamp(offsetX + (deltaX / safeDistance) * push, -maxOffset, maxOffset);
    offsetY = clamp(offsetY + (deltaY / safeDistance) * push, -maxOffset, maxOffset);

    apologyBtn.style.setProperty("--runaway-x", `${offsetX}px`);
    apologyBtn.style.setProperty("--runaway-y", `${offsetY}px`);
  };

  document.addEventListener("pointermove", handlePointerMove);
}
