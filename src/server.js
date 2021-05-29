const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.locals.title = "Setlift";

const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error('The songs aren\'t currently available.');
    } else {
        console.log(response)
        return response.json();
    }
}

// const logger = (req, res, next) => {
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// }
// app.use(logger);

app.get('/', (req, res) => {
    res.send('<h1>Setlift</h1>')
})

app.get('/songs/', async (req, res) => {
    console.log(req.query.bandId)
    const bandId = req.query.bandId;
    const songs = await fetch(`https://phantasytour.com/api/songs/?bandId=${bandId}`)
        .then(checkResponse)
    console.log(songs[100])
    res.json(songs);
})


// else {
//     const songId = req.params.name;
//     console.log(songId)
//     const song = await fetch(`https://phantasytour.com/api/songs/${songId}`)
//         .then(checkResponse)
//     res.json(song);

// }

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
})
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`${app.locals.title} Server started on ${PORT}`))