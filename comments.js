// Create a web server
// Create a route for POST requests to /comments
// Read the data from the request
// Append the data to the comments.json file
// Redirect the user back to the /comments page

// Import the express module
const express = require('express');

// Import the file system module
const fs = require('fs');

// Create a new web server
const app = express();

// Serve the contents of the public directory
app.use(express.static('public'));

// Use the JSON body parser middleware
app.use(express.json());

// Create a route for POST requests to /comments
app.post('/comments', (request, response) => {
  // Read the data from the request
  const comment = request.body.comment;

  // Read the contents of the comments.json file
  fs.readFile('comments.json', 'utf8', (error, data) => {
    // Parse the contents of the comments.json file
    const comments = JSON.parse(data);

    // Append the data to the comments array
    comments.push(comment);

    // Write the updated comments array to the comments.json file
    fs.writeFile('comments.json', JSON.stringify(comments), (error) => {
      // Redirect the user back to the /comments page
      response.redirect('/comments');
    });
  });
});

// Start the web server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});