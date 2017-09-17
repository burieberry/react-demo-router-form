
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

const UserThing = conn.define('user_thing', {
});

UserThing.belongsTo(User);
UserThing.belongsTo(Thing);

User.hasMany(UserThing);
Thing.hasMany(UserThing);

conn.sync({ force: true })
  .then(() => {
    return Promise.all([
        User.create({ name: 'Moe' }),
        User.create({ name: 'Larry' }),
        User.create({ name: 'Curly' }),
        Thing.create({ name: 'foo' }),
        Thing.create({ name: 'bar' }),
        Thing.create({ name: 'bazz' }),
        User.create({ name: 'Shep' })
      ])
      .then(([ moe, larry, curly, foo, bar, bazz ]) => {
        return Promise.all([
          UserThing.create({ userId: moe.id, thingId: foo.id }),
          UserThing.create({ userId: moe.id, thingId: foo.id }),
          UserThing.create({ userId: moe.id, thingId: foo.id }),
          UserThing.create({ userId: larry.id, thingId: bar.id }),
          UserThing.create({ userId: larry.id, thingId: bazz.id }),
          UserThing.create({ userId: curly.id, thingId: bazz.id })
        ]);
      });
  });

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next) => { res.sendFile(path.join(__dirname, 'index.html')) });

app.get('/api/users', (req, res, next) => {
  User.findAll({
    include: [
      {
        model: UserThing,
        include: [ Thing, User ]
      }
    ]
  })
    .then(users => res.send(users))
    .catch(next);
});

app.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id, {
      include: [
        {
          model: UserThing,
          include: [ Thing, User ]
        }
      ]
    })
    .then(user => res.send(user))
    .catch(next);
});

app.get('/api/things', (req, res, next) => {
  Thing.findAll({
      include: [
        {
          model: UserThing,
          include: [ Thing, User ]
        }
      ]
    })
    .then(things => res.send(things))
    .catch(next);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
