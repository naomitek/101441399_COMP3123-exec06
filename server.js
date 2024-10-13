const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

// Update your MongoDB Atlas URL here to connect to the database
const DB_URL = "mongodb+srv://db1399:2KAbzCGIjCLOZxQB@cluster-2.gxhja.mongodb.net/comp3123_lab6?retryWrites=true&w=majority";


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register the routes
app.use('/api', noteRoutes);

// Connect to MongoDB Atlas
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL)
.then(() => {
    console.log("Successfully connected to the MongoDB Atlas server");
})
.catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// Define a simple route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Note-taking application - Week06 Exercise</h1>");
});

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
