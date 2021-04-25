const express = require('express');

const app = express();
app.use(express.json());

app.locals.title = "Touring Song App";

app.get('/', (req, res) => {
    res.send('<h1>Touring Data</h1>')
})

const

    a
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`${app.locals.title} Server started on ${PORT}`))