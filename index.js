const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Ladda highscore från JSON-fil
let highscores = JSON.parse(fs.readFileSync('src/highscores.json', 'utf-8'));

// GET för att hämta highscore-listan
app.get('/highscores', (req, res) => {
    res.json(highscores);
});

// POST för att uppdatera highscore-listan
app.post('/highscores', (req, res) => {
    const { name, score } = req.body;
    highscores.push({ name, score });
    highscores.sort((a, b) => b.score - a.score);  // Sortera från högsta till lägsta
    if (highscores.length > 5) highscores.pop();   // Ta bort om det finns mer än 5 scores
    fs.writeFileSync('src/highscores.json', JSON.stringify(highscores, null, 2));  // Uppdatera JSON-filen
    res.status(201).json(highscores);
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
