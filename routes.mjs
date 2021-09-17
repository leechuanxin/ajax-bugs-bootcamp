import db from './models/index.mjs';

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
}
