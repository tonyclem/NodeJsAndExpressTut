const express = require('express');
const speakeasy = require('speakeasy');
const uuid = require('uuid');
const { JsonDB, Config } = require('node-json-db');

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const db = new JsonDB(new Config('myDataBase', true, false, '/'));

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the two factor authentication' });
});

// Register user & create temp secret
app.post('/api/register', (req, res) => {
  const id = uuid.v4();

  try {
    const path = `users/${id}`;
    const temp_secret = speakeasy.generateSecret();
    db.push(path, { id, temp_secret });
    res.json({ id, secret: temp_secret.base32 });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Error generating the secret' });
  }
});

app.post('/api/verity', () => {
  const { userId, token } = req.body;
  try {
    const path = `/user/${userId}`;
    const user = db.getData(path);
    const { base32: secret } = user.temp_secret;
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
    });
    if (verified) {
      // Update user data
      db.push(path, { id: userId, secret: user.temp_secret });
      res.json({ verified: true });
    } else {
      res.json({ verified: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error generating the secret' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
