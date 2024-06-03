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

// Utility function to escape special characters for SQL LIKE clause
const escapeLike = (str) => {
  if (!str) return '';
  return str.replace(/[%_]/g, '\\$&');
};

// Search endpoint with unique titles
app.get('/fetch', (req, res) => {
    const { term } = req.query;
    const searchValue = `%${escapeLike(term)}%`;

    const query = `SELECT DISTINCT movie AS title FROM IMDb_Info WHERE movie LIKE '${searchValue}'
                   UNION
                   SELECT DISTINCT title FROM RT_Movie_Info WHERE title LIKE '${searchValue}'`;

    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing search query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);  // Return results directly as JSON
    });
});

// Endpoint to fetch detailed rows for a given movie title
app.get('/details', (req, res) => {
    const { movie } = req.query;
    if (!movie) {
        res.status(400).json({ error: 'Movie title is required' });
        return;
    }

    const escapedTitle = escapeLike(movie);

    const query = `
        SELECT 'IMDb' AS source, movie AS title, avg_rating, avg_word_count, NULL AS rating, NULL AS reviewer, NULL AS reviewText, NULL AS Sentence, NULL AS Aspect, NULL AS Sentiment, NULL AS extracted_keywords 
        FROM IMDb_Info WHERE movie = '${escapedTitle}'
        UNION ALL
        SELECT 'RT' AS source, title, avg_adj_score AS avg_rating, avg_word_count, NULL AS rating, NULL AS reviewer, NULL AS reviewText, NULL AS Sentence, NULL AS Aspect, NULL AS Sentiment, NULL AS extracted_keywords 
        FROM RT_Movie_Info WHERE title = '${escapedTitle}'
        UNION ALL
        SELECT 'IMDb' AS source, movie AS title, NULL AS avg_rating, NULL AS avg_word_count, rating, reviewer, reviewText, Sentence, Aspect, Sentiment, extracted_keywords 
        FROM IMDb_Reviews WHERE movie = '${escapedTitle}'
        UNION ALL
        SELECT 'RT' AS source, title, NULL AS avg_rating, NULL AS avg_word_count, adj_score AS rating, criticName AS reviewer, reviewText, Sentence, Aspect, Sentiment, extracted_keywords 
        FROM Rotten_Tomatoes_Reviews WHERE title = '${escapedTitle}'
    `;

    console.log(`Executing query: ${query}`);  // Log the query for debugging

    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing details query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);  // Return detailed rows as JSON
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
