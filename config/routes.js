const axios = require('axios');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');

const { authenticate, setToken } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const user = req.body;
  const hashedPass = bcrypt.hashSync(user.password, 12);
  user.password = hashedPass;
  db.insertUser(user)
    .then(ids => {
      const id = ids[0];
      db.findByID(id).then(user => {
        const token = (setToken(user));
        res.status(200).json({ id: user.id, token })
      });
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
};

function login(req, res) {
  const credentials = req.body;
  db.findByUsername(credentials.username)
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = setToken(user);
        res.status(200).json({ id: user.id, token });
      } else {
        res.status(401).json({ message: 'Invalid Username or Password' });
      };
    }).catch(err => res.json({ message: `${err}, please try again` }));
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
