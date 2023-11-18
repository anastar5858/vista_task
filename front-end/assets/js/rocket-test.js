const element = document.getElementById('ellipse'); // Replace 'yourElement' with the actual ID or selector of your element
// Create a new style element
const style = document.createElement('style');
document.head.appendChild(style);
// Get the style sheet associated with the newly added style element
const styleSheet = style.sheet;
// Add or update a rule for the ::before pseudo-element
styleSheet.insertRule(`
#ellipse::before {
    visibility: visible;
  }
`, styleSheet.cssRules.length);

// Add or update a rule for the ::after pseudo-element
styleSheet.insertRule(`
  #ellipse::after {
    visibility: visible;
  }
`, styleSheet.cssRules.length);

setTimeout(() => {
 styleSheet.insertRule(`
  #ellipse {
    animation: translateY 5s 1 forwards;
  }
`, styleSheet.cssRules.length);   
}, 5000);
