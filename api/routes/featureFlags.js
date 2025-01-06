const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/featureFlags.json');

let featureFlags = require(filePath);


const saveFlags = () => {
  fs.writeFileSync(filePath, JSON.stringify(featureFlags, null, 2));
};

router.get('/search', (req, res) => {
  const { project, name } = req.query;

  // Validation des paramètres
  if (!project || !name) {
      return res.status(400).json({ error: "Missing 'project' or 'name' parameter" });
  }

  // Charger les données du fichier
  console.log(" requete api "+featureFlags);

  // Filtrer les données pour le projet et le nom donnés
  const feature = featureFlags.find(
      (f) => f.project === project && f.name === name
  );

  if (!feature) {
      return res.status(404).json({ error: `Feature '${name}' not found in project '${project}'` });
  }

  // Renvoi des allowedIds
  res.status(200).json({
      project: feature.project,
      name: feature.name,
      allowedIds: feature.allowedIds || [],
      forbiddenIds: feature.forbiddenIds || [],
  });
});

// Get all flags
router.get('/', (req, res) => {
  console.log(" get  "+featureFlags);
  res.json(featureFlags);
});

// Create a new flag
router.post('/', (req, res) => {
  console.log(" post  "+req);
  const newFlag = { id: Date.now(), ...req.body };
  featureFlags.push(newFlag);
  saveFlags();
  res.json(newFlag);
});

// Update a flag
router.put('/:id', (req, res) => {
  console.log(" put  "+req);
  const id = parseInt(req.params.id);
  const index = featureFlags.findIndex((f) => f.id === id);
  if (index !== -1) {
    featureFlags[index] = { ...featureFlags[index], ...req.body };
    saveFlags();
    res.json(featureFlags[index]);
  } else {
    res.status(404).send('Flag not found');
  }
});

// Delete a flag
router.delete('/:id', (req, res) => {
  console.log(" delete  "+req);
  const id = parseInt(req.params.id);
  featureFlags = featureFlags.filter((f) => f.id !== id);
  saveFlags();
  res.sendStatus(204);
});

module.exports = router;