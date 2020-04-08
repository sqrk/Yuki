const admin = require('firebase-admin');

module.exports = {
  async fetch(req, res) {
    try {
      const uid = req.body.uid;
      const pathDoc = await admin.firestore()
          .collection('challengePaths')
          .doc(uid)
          .get();

      if (!pathDoc.exists) {
        console.log('challengePath not found.');
        return res.status(404).send({
          error: 'No path has been found. Have you taken the test?',
        })
      }

      // Get the challenges under the current difficulty
      const currentDifficulty = pathDoc.data().currentDifficulty;
      const challengesIDs = pathDoc.data().path[currentDifficulty].challenges;
      let challenges = [];
      let processed = 0;

      // Get completed challenges under our user to only display the uncompleted ones
      admin.firestore().collection('users').doc(uid).get()
        .then((userDoc) => {
          const completedChallenges = userDoc.data().completedChallenges;

          // Iterate over the ids and push the respective challenge in the challenges array
          challengesIDs.forEach((id) => {
            admin.firestore().collection('challenges').doc(id).get()
              .then((challengeDoc) => {

                // Throw error if no challenges are found
                if (!challengeDoc.exists) {
                  console.log('Challenge not found although challengePath exists');
                  return res.status(404).send({
                    error: 'No challenge was found.',
                  })
                }

                if (!(challengeDoc.data().id in completedChallenges)) {
                  challenges.push(challengeDoc.data());
                }

                processed++; // Async function, we need to ensure all items were processed.

                if(processed === challengesIDs.length) {
                  return res.status(200).send(challenges);
                }
              })
              .catch((error) => {
                console.log('Failed to fetch challenges from db: ', error.message);
                return res.status(502).send({
                  error: 'Something wrong happened with our servers.',
                })
              });
          });

        })
        .catch(error => {
          console.log('Failed to fetch user: ', error.message);
          return res.status(502).send({
            error: 'Something wrong happened with our servers.'
          })
        });

    } catch (error) {
      console.log('Failed to fetch paths from db');
      return res.status(502).send({
        error: 'Something wrong happened with our servers.',
      })
    }
  },

  async take(req, res) {
    const {id, uid} = req.body;
    try {
      // Setting this challenge as the active one for our user
      await admin.firestore().collection('users').doc(uid)
        .update({
          activeChallenge: id
        });

      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      return res.status(502).send({
        error: "Something wrong happened with our servers."
      })
    }
  }
};
