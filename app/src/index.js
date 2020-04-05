const express = require('express');

const getStatus = require('./request-handlers/get-status');

const port = process.env.PORT || 8080;

const app = express();

app.get('/get-status', getStatus);

app.listen(port, () => console.log(`Listening on port ${port}`));