const express = require('express');
const cors = require('cors'); // Add this line
const noblox = require('noblox.js');

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

app.get('/getPlayerInfo', async (req, res) => {
  const username = req.query.username;

  try {
    const userId = await noblox.getIdFromUsername(username);
    const playerInfo = await noblox.getBlurb(userId);
    res.json(playerInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
