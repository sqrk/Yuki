const firebase = require('../firebase');

const { fb } = firebase;
const { db } = firebase;

module.exports = {
  register(req, res) {
    // Create User
    fb.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then(() => {
        // Create user object
        const user = {
          email: req.body.email,
          username: req.body.username,
          score: 0,
          pendingTestimonial: false,
        };

        // Store user in database
        db.collection('users').add(user)
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
          })

          // Error at the level of firebase db
          .catch((error) => {
            res.status(502).send(`Error adding document:${error}`);
          });

        res.send(user);
      })

      // User not authenticated (e.g. email already exists)
      .catch((error) => {
        res.status(400).send(error.message);
      });
  },
};
