const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to check if the request is during working hours
function checkWorkingHours(req, res, next) {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();  // Proceed if it's Monday to Friday, 9 AM to 5 PM
  } else {
    res.send('<h1>Sorry, the website is only available during working hours (Mon-Fri, 9 AM - 5 PM).</h1>');
  }
}

// Use middleware for all routes
app.use(checkWorkingHours);

// Serve static files (CSS and HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
