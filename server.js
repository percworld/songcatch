const cors = require('cors');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cors())
app.locals.title = "Setlift";
const baseUrl = "https://phantasytour.com/api"
const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error('The songs aren\'t currently available.');
  } else {
    return response.json();
  }
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/songs/', async (req, res) => {
  const bandId = req.query.bandId;
  const songs = await fetch(`${baseUrl}/songs/?bandId=${bandId}`)
    .then(checkResponse)
  res.json(songs);
})

app.get('/songs/:songId', async (req, res) => {
  const songId = req.params.songId;
  const songs = await fetch(`${baseUrl}/songs/${songId}`)
    .then(checkResponse)
  res.json(songs);
})

app.get('/plays/:songId', async (req, res) => {
  const songId = req.params.songId;
  const songs = await fetch(`${baseUrl}/songs/${songId}/shows?sEcho=1&iColumns=5&sColumns=Show.DateTime%2CShow.Venue.Name%2CShow.Venue.Locale%2CSetNumber%2CPosition&iDisplayStart=0&iDisplayLength=250&mDataProp_0=DateTime&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=Venue&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=Venue.Locale&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=SongStats.SetNumber&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=SongStats.Position&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=1618599207911`)
    .then(checkResponse)
  res.json(songs);
})

app.get('/set/:showId', async (req, res) => {
  const showId = req.params.showId;
  const show = await fetch(`${baseUrl}/shows/${showId}/songstats`)
    .then(checkResponse)
  res.json(show);
})

app.get('/shows', async (req, res) => {
  const tourId = req.query.tourId;
  const shows = await fetch(`${baseUrl}/shows?tourId=${tourId}`)
    .then(checkResponse)
  res.json(shows);
})

app.get('/bands/:bandId/tours', async (req, res) => {
  const bandId = req.params.bandId;
  const show = await fetch(`${baseUrl}/bands/${bandId}/tours`)
    .then(checkResponse)
  res.json(show);
})

app.get('/latestShows/:bandId', async (req, res) => {
  const id = req.params.bandId;
  console.log(req.params)
  const shows = await fetch(`${baseUrl}/bands/${id}/shows?pageSize=300&page=1`)
    .then(checkResponse)
  res.json(shows);
})

app.get('/bands/', async (req, res) => {
  const bands = await fetch(`${baseUrl}/bands?%24orderby=followerCount+desc%2C+name&%24top=154`)
    .then(checkResponse)
  res.json(bands);
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`${app.locals.title} Server started on ${PORT}`))


// const logger = (req, res, next) => {
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// }
// app.use(logger);