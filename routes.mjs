import db from './models/index.mjs';
import util from './util.js';
import SALT from './globals.js';

// import your controllers here

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks

  // define your route matchers here using app
  app.get('/', (req, res) => res.render('index'));
  app.post('/', async (req, res) => {
    console.log('req.body :>> ', req.body);
    const bug = await db.Bug.create(req.body);
    console.log('bug :>> ', bug);
    res.send({ bug });
  });
  app.post('/login', async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        // check password and login
        const hashedPassword = util.getHash(req.body.password);
        if (hashedPassword === user.password) {
          // create an unhashed cookie string based on user ID and salt
          const unhashedCookieString = `${user.id}-${SALT}`;
          // generate a hashed cookie string using SHA object
          const hashedCookieString = util.getHash(unhashedCookieString);
          // set the loggedIn and userId cookies in the response
          // The user's password hash matches that in the DB and we authenticate the user.
          res.cookie('loggedIn', hashedCookieString);
          res.cookie('userId', user.id);
          res.send({
            loggedIn: hashedCookieString,
            userId: user.id,
          });
        } else {
          throw new Error('Something went wrong!');
        }
      }
    } catch (error) {
      res.send({
        error: error.message,
      });
    }
  });
  app.get('/features', async (req, res) => {
    const features = await db.Feature.findAll();
    res.send({ features });
  });
  app.get('/bugs', async (req, res) => {
    const bugs = await db.Bug.findAll({
      include: [{
        model: db.Feature,
      }, {
        model: db.User,
        attributes: ['id', 'email'],
      }],
    });
    res.send({ bugs });
  });
}
