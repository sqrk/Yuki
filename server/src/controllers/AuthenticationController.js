const firebase = require('../firebase');

const { fb } = firebase;
const { db } = firebase;

// TODO Fix error multiple res sent

module.exports = {
  register(req, res) {
    // Check if username exists
    db.collection('users').where('username', '==', req.body.username)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          res.status(400).send({
            error: 'This username exists already.',
          });
        }
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });

    // Create account
    fb.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
      // User authenticated
      .then(() => {
        // Create user object
        const user = {
          email: req.body.email,
          username: req.body.username,
          score: 0,
          pendingTestimonial: false,
          uid: fb.auth().currentUser.uid,
        };

        // Store user in database
        db.collection('users').doc(user.uid).set(user)
          .then(() => {
            console.log('Document successfully written');
          })

          // Error at the level of firebase db
          .catch((error) => res.status(502).send({
            error: `Error adding document: ${error}`,
          }));

        res.send(user);
      })

      // User not authenticated (e.g. email already exists)
      .catch((error) => {
        res.status(400).send({
          error: error.message,
        });
      });
  },

  login(req, res) {
    // Log User in
    fb.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
      .then(() => {
        // Get user info from DB
        db.collection('users').doc(fb.auth().currentUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              res.send(doc.data());
            } else {
              res.status(404).send({
                error: 'Document not found',
              });
            }
          })
          .catch((error) => {
            res.status(502).send({
              error: `Error fetching document: ${error}`,
            });
          });
      })
      .catch((error) => {
        // User not authenticated
        if (error.code === 'auth/invalid-email') {
          res.status(400).send({
            error: error.message,
          });
        } else if (error.code === 'auth/user-disabled') {
          res.status(403).send({
            error: error.message,
          });
        } else {
          res.status(403).send({
            error: 'The username and password you provided do not match',
          });
        }
      });
  },

  logout(req, res) {
    fb.auth()
      .signOut()
      .catch((error) => {
        res.status(502).send({
          error: `Something went wrong: ${error}`,
        });
      });
  },
};
