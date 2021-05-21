const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.locals.title = "Setlift";

const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error('The songs aren\'t currently available.');
    } else {
        return response.json();
    }
}


// app.get('/', (req, res) => {
//     res.send('<h1>Setlift</h1>')
// })

app.get('/songs/', async (req, res) => {
    //get id 
    const bandId = req.query.Id;
    const songs = await fetch(`https://phantasytour.com/api/songs/?bandId=${bandId}`)
        .then(checkResponse)
    console.log(songs)
    res.json(songs);
})


// else {
//     const songId = req.params.name;
//     console.log(songId)
//     const song = await fetch(`https://phantasytour.com/api/songs/${songId}`)
//         .then(checkResponse)
//     res.json(song);

// }
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`${app.locals.title} Server started on ${PORT}`))