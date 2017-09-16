
const express = require('express');
const path = require('path');
const app = express();

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db', { logging: false });

const User = conn.define('user', {
  name: Sequelize.STRING
});

const Thing = conn.define('thing', {
  name: Sequelize.STRING
});

User.hasMany(Thing);

conn.sync({ force: true })
  .then(() => {
    return Promise.all([
        User.create({ name: 'Moe' }),
        User.create({ name: 'Larry' }),
        User.create({ name: 'Curly' }),
        Thing.create({ name: 'foo' }),
        Thing.create({ name: 'bar' }),
        Thing.create({ name: 'bazz' })
      ])
      .then(([ moe, larry, curly, foo, bar, bazz ]) => {
        return Promise.all([
          moe.addThing(foo),
          larry.addThing(bar),
          curly.addThing(bazz)
        ]);
      });
  });

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => { res.sendFile(path.join(__dirname, 'index.html')) });

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.get('/api/things', (req, res, next) => {
  Thing.findAll()
    .then(things => res.send(things))
    .catch(next);
})

app.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id, { include: [ Thing ] })
    .then(user => res.send(user))
    .catch(next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
