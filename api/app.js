const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const featureFlagsRouter = require('./routes/featureFlags');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/featureFlags', featureFlagsRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});