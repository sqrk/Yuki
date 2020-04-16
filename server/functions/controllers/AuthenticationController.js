const admin = require('firebase-admin');
const { fb } = require('../firebase');
// TODO Change uids to usernames
module.exports = {
  async register(req, res) {
    try {
      // Get user info from request
      const { username, password, email } = req.body;

      try {
        // Check if username exists already
        const querySnapshot = await admin.firestore().collection('users')
          .where('username', '==', username)
          .get();

        if (!querySnapshot.empty) {
          return res.status(400).send({
            error: 'This username exists already.',
          });
        }
      } catch(error) {
        console.log('Error getting documents: ', error);
        return res.status(502).send({
          error: "There has been a problem from our servers.",
        })
      }

      // Create user
      const { uid } = await admin.auth().createUser({
        password,
        email,
      });

      // Set user role
      await admin.auth().setCustomUserClaims(uid, { role: 'user' });

      // Create user object
      const user = {
        email: email,
        username: username,
        score: 0,
        pendingTestimonial: false,
        activeChallenge: null,
        completedChallenges: [],
        uid: uid,
      };

      // Store user object in database
      try {
        await admin.firestore().collection('users').doc(user.uid).set(user);

        console.log('Document successfully written');
        return res.status(201).send(user);

      // Error at the level of firebase db
      } catch(error) {
        return res.status(502).send({
          error: `Error adding document: ${error}`,
        })
      }
    } catch (error) {
      return res.status(400).send({ // Error at the level of the authentication
        error: error.message,
      })
    }
  },

  async login(req, res) {
    try {
      // Authenticating user
      const { email, password } = req.body;
      const { user } = await fb.auth().signInWithEmailAndPassword(email, password);

      try {
        // Getting user data from db
        const doc = await admin.firestore().collection('users').doc(user.uid)
          .get();

        if (doc.exists) {
          return res.send(doc.data());
        } else {
          return res.status(404).send({
            error: 'Document not found',
          });
        }
      }
      catch (error) { // Error with db
        return res.status(502).send({
          error: `Error fetching document: ${error}`,
        });
      }

    } catch (error) { // Unsuccessful authentication
      if (error.code === 'auth/invalid-email') {
        return res.status(400).send({
          error: error.message,
        });
      } else if (error.code === 'auth/user-disabled') {
        return res.status(403).send({
          error: error.message,
        });
      } else {
        return res.status(403).send({
          error: 'The username and password you provided do not match',
        });
      }
    }
  },

  async logout(req, res) { // TODO Fix
    try {
      await fb.auth().signOut();

      return res.sendStatus(200);
    } catch (error) {
      return res.status(502).send({
        error: `Something went wrong: ${error}`,
      });
    }
  },
};
