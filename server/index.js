const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define API routes before the static file serving
app.get('/fetch', (req, res) => {
    const { term } = req.query;
    const searchValue = `%${term}%`;

    const query = `SELECT movie AS title FROM IMDb_Info WHERE movie LIKE ${searchValue}
                   UNION ALL
                   SELECT title FROM RT_Movie_Info WHERE title LIKE ${searchValue}`;

    pool.query(query, [searchValue, searchValue], (err, results) => {
        if (err) {
            console.error('Error executing search query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);  // Return results directly as JSON
    });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
