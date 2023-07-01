// Define Global Variables
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');

// Function to build the navigation menu
function buildNavigationMenu() {
  sections.forEach(section => {
    const listItem = document.createElement('li');
    listItem.classList.add('menu__link');
    listItem.setAttribute('data-link', section.id);
    listItem.innerHTML = `<a href="#${section.id}">${section.dataset.nav}</a>`;
    navList.appendChild(listItem);
  });
}

// Function to handle smooth scrolling to sections
function scrollToSection(event) {
  event.preventDefault();
  if (event.target.tagName === 'A') {
    const sectionId = event.target.getAttribute('href').slice(1);
    const sectionToScrollTo = document.getElementById(sectionId);
    sectionToScrollTo.scrollIntoView({ behavior: 'smooth' });
  }
}

// Function to add and remove 'active' class based on intersection with viewport
function handleIntersection(entries) {
  entries.forEach(entry => {
    const navListItem = document.querySelector(`.menu__link[data-link='${entry.target.id}']`);
    if (entry.isIntersecting) {
      navListItem.classList.add('active');
      entry.target.classList.add('active');
    } else {
      navListItem.classList.remove('active');
      entry.target.classList.remove('active');
    }
  });
}

// Setting up the Intersection Observer
const observer = new IntersectionObserver(handleIntersection, { threshold: 0.625 });

// Call the functions to build the navigation and observe the sections
buildNavigationMenu();
sections.forEach(section => {
  observer.observe(section);
});

// Event listener to handle smooth scrolling on link click
navList.addEventListener('click', scrollToSection);
