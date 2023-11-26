// Get a reference to the button
const backToTopButton = document.querySelector('.back-to-top');

// Add a scroll event listener
window.addEventListener('scroll', () => {
  // If the user has scrolled down a certain amount (e.g., 300 pixels), show the button
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// Add a click event listener to scroll back to the top when the button is clicked
backToTopButton.addEventListener('click', () => {
  // Smoothly scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
