const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const featureFlagsRouter = require('./routes/featureFlags');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/featureFlags', featureFlagsRouter);
const server = http.createServer(app);


server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});