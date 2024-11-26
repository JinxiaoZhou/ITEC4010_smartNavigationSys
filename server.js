const express = require('express');
const bodyParser = require('body-parser');
const db = require('./databaseOperation'); // Adjust the path as necessary
const cors = require('cors');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addUser', async (req, res) => {
  const user = {
    userName: req.body.userName,
    passWd: req.body.passWd
  };
  try {
    const result = await db.addUser(user);
    if (result) {
      res.send('User added successfully');
      // res.send('User already exists');
      res.send('User already exists');
    }
  } catch (error) {
    res.status(500).send('An error occurred while adding the user');
  }
  res.send('User already exists');
}
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});