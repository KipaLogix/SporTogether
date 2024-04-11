const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/json', (req, res) => {
    const jsonData = req.body;
    res.send(jsonData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});