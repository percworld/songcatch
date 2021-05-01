const express = require('express');

const app = express();
app.use(express.json());

app.locals.title = "Songcatch";

app.get('/', (req, res) => {
    res.send('<h1>Songcatch</h1>')
})


a
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`${app.locals.title} Server started on ${PORT}`))