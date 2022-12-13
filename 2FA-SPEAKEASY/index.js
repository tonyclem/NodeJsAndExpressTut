const express = require('express');
const speakeasy = require('speakeasy');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;

const app = express();

const dbConfig = new Config('myDataBase', true, false, '/');

const db = new JsonDB(dbConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the two factor authentication' });
});

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

app.post('/api/verify', async (req, res) => {
  const { userId, token } = req.body;
  try {
    // Retrieve user from database
    const path = `/user/${userId}`;
    const user = db.getData(path);
    console.log({ user });
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
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

app.post('/api/validate', (req, res) => {
  const { userId, token } = req.body;
  try {
    // Retrieve user from database
    const path = `/user/${userId}`;
    const user = db.getData(path);
    console.log({ user });
    const { base32: secret } = user.secret;
    // Returns true if the token matches
    const tokenValidates = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
    if (tokenValidates) {
      res.json({ validated: true });
    } else {
      res.json({ validated: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
