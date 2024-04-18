const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json());
app.use(cors());

// {origin: "http://localhost/3001"}

// app.get('/', (req, res) => {
//   res.send('application up and running');
// });

app.get ('/', (req, res) => {
  knex('inventory')
  .select('*')
  .then(data => res.status(200).json(data))
  .catch(err =>
  res.status(404).json('The data you are looking for could not be found.'))
})

// app.post('/api/create-user', async (req, res) => {
//   const{ firstname, lastname, username, password } =req.body;
//   try {
//     await knex('inventory_users').insert({firstname, lastname, username, password});
//     res.status(201).json({ message: `User account created for: ${username}`});
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


app.post("/new-account", async (req, res) => {
  const username_list = await knex("inventory_users")
  .select("*")
  .where({ username: req.body.username });
    if (username_list.length !== 0) {
      res.status(409).send("an account already exists with this username");
    } else {
      try{
        await knex("inventory_users").insert({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: req.body.password
        });
        res.status(202).send(`Account Created for ${req.body.username}`);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
});

app.post("/login", async (req, res) => {
  knex("inventory_users")
    .select("*")
    .where({
      username: `${req.body.username}`
    })
    .then((user_info) => {
      if (user_info.length === 0) {
        res.status(404).send("Username not found");
      } else if (user_info[0].password !== req.body.password) {
        res.status(404).send("Password not found");
      } else {
        res.status(200).json(user_info);
      }
    });
});


app.post("/myinventory", async (req, res) => {
  try{
    await knex("inventory")
      .select("*")
      .where({
        user_id: req.body.user_id
      })
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(403).json('The data you are looking for could not be found.'))
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/add-item", async (req, res) => {
  try{
    await knex("inventory").insert({
      itemname: req.body.itemname,
      description: req.body.description,
      quantity: parseInt(req.body.quantity),
      user_id: req.body.user_id
    });
    res.status(202).send(`item created`);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch("/edit-item", async (req, res) => {
  try{
    await knex("inventory")
      .where({item_id: parseInt(req.body.item_id)})
      .update({
      itemname: req.body.itemname,
      description: req.body.description,
      quantity: parseInt(req.body.quantity),
      });
    res.status(202).send(`item updated`);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete("/delete-item", async (req, res) => {
  try{
    await knex("inventory")
    .where({item_id: parseInt(req.body.item_id)})
    .del();
    res.status(202).send(`item deleted`);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
console.log(`The server is running on port ${PORT}`);
});