const text = "Hello! My name is Shanon. I am the receptionist for Monkey Therapy inc. The therapist is very empathetic... Here is a note to help guide your therapy. Enter when you feel ready. Good luck!";
const bubble = document.querySelector('.tooltip');
const textDisplay = document.getElementById("overlay");

let i = 0;
const speed = 50; // ms per character
let hideTimer;

function typeWriter() {
  if (i < text.length) {
    textDisplay.textContent += text.charAt(i);
    i++;

    let delay = speed;
    if (text.charAt(i) === '.' || text.charAt(i) === '!' || text.charAt(i) === '?') {
      delay += 200; 
    }

    setTimeout(typeWriter, delay);
  } else {
// Show both buttons and note after typing is finished
document.querySelector(".buttons").style.opacity = "1";
document.querySelector(".note-container").style.opacity = "1";
  }
}

// Make bubble visible and start typewriter on page load
window.onload = function() {
  bubble.style.opacity = "1";
  textDisplay.textContent = ""; // Clear the "..." first
  typeWriter();
};