const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

// MongoDB connection string directly in the code
const mongoURI = "mongodb+srv://sanjaysammathew:Sanjay%402005@cluster0.okhsz.mongodb.net/mydatabase?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // Use Helmet for security

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Handle login form submission
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      // Redirect to search page on successful login
      res.redirect('/search.html');
    } else {
      // Redirect back to login with an error message
      res.send(`<script>alert('Invalid username or password'); window.location.href='/';</script>`);
    }
  } catch (err) {
    console.error(err);
    res.send(`<script>alert('Error during login. Please try again.'); window.location.href='/';</script>`);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
