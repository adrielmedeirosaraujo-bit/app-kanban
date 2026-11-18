const express = require('express');
const app = express();
app.use(express.static('www'));
app.get('*', (req, res) => res.sendFile(__dirname + '/www/index.html'));
app.listen(4200, () => console.log('Serving on 4200'));
