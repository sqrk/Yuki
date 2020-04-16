const admin = require('firebase-admin');
const uuid = require('uuid/v4');

module.exports = {
  async fetch(req, res) {
    const { id } = req.params;
    let data = {};

    // Get challenge data
    admin.firestore().collection('challenges').doc(id).get()
      .then(challengeDoc => {

        if (!challengeDoc.exists) {
          console.log('Challenge with id', id, 'not found');
          return res.status(404).send({
            error: 'Challenge details not found.'
          })
        }

        data.challenge = challengeDoc.data();
        data.testimonials = [];

        // Getting all testimonials for this challenge
        admin.firestore().collection('testimonials')
          .where('challenge', "==", id)
          .get()
          .then(testimonialSnapshot => {
            testimonialSnapshot.forEach(testimonialDoc => {
              let testimonial = testimonialDoc.data();
              let date = testimonial.date.toDate();

              let strDate = date.getHours().toString().padStart(2, "0") + ':' + date.getMinutes().toString().padStart(2, "0") + '  ' + date.getDay()
                + '/' + date.getMonth() + '/' + date.getFullYear();

              testimonial.date = strDate;

              testimonial.comments.forEach(comment => {
                date = comment.date.toDate();

                strDate = date.getHours().toString().padStart(2, "0") + ':' + date.getMinutes().toString().padStart(2, "0") + '  ' + date.getDay()
                  + '/' + date.getMonth() + '/' + date.getFullYear();

                comment.date = strDate;
              });

              data.testimonials.push(testimonial);
            });

            return res.status(200).send(data);
          })
          .catch(error => {
            console.log('Failed to fetch testimonials:', error.message);
            return res.status(502).send({
              error: 'Something wrong happened with our servers.'
            });
          });

      })
      .catch(error => {
        console.log('Failed to fetch challenge data:', error.message);
        return res.status(502).send({
          error: 'Something wrong happened with our servers.'
        });
      });
  },

  async complete(req, res) {
    const { challenge, uid, username, testimonial } = req.body;
    const testimonialId = uuid();

    // Add the new testimonial to db
    admin.firestore()
      .collection('testimonials')
      .doc(testimonialId)
      .set({
        uid: testimonialId,
        challenge,
        user: username,
        content: testimonial,
        date: admin.firestore.Timestamp.now(),
        score: 0,
        comments: []
      })
      .then(() => {
        // Update activeChallenge and completeChallenges for that user
        admin.firestore()
          .collection('users')
          .doc(uid)
          .update({
            activeChallenge: "",
            completedChallenges: admin.firestore.FieldValue.arrayUnion(challenge)
          })
          .then(()=> {
            // Get this user's challengePath
            admin.firestore()
              .collection('challengePaths')
              .doc(uid)
              .get()
              .then(doc => {

                let challengePath = doc.data();
                let { currentDifficulty, maxDifficulty } = challengePath;
                let completed = challengePath.path[currentDifficulty].completed + 1;
                const challenges = challengePath.path[currentDifficulty].challenges;

                // If we finished the challenges under this round, find the next difficulty
                if (completed === challenges.length) {

                  // Case where we're already at the last round
                  if (currentDifficulty === maxDifficulty) {
                    challengePath.currentDifficulty = -1; // TODO Handle at the level of the view
                  } else {
                    // Case where we should go to the next round
                    for (let i = currentDifficulty + 1; i <= maxDifficulty; i++) {
                      if (i in doc.data().path) {
                        challengePath.currentDifficulty = i;
                        break;
                      }
                    }
                  }
                }

                challengePath.path[currentDifficulty].completed = completed;

                // Update challengePath
                admin.firestore()
                  .collection('challengePaths')
                  .doc(uid)
                  .set(challengePath)
                  .then(() => {

                    // Update activeChallenge for user
                    admin.firestore()
                      .collection('users')
                      .doc(uid)
                      .update({
                        activeChallenge: ""
                      })
                      .then(() => {
                        return res.sendStatus(200);
                      })
                      .catch(error => {
                        console.log('TestimonialController: Failed to update activeChallenge:', error.message);
                        return res.status(502).send({
                          error: 'Something wrong happened with our servers.'
                        })
                      });
                  })
                  .catch(error => {
                    console.log('TestimonialController: Failed to update challengePath:', error.message);
                    return res.status(502).send({
                      error: 'Something wrong happened with our servers.'
                    })
                  })
              })
              .catch(error => {
                console.log('TestimonialController: Failed to get challengePath:', error.message);
                return res.status(502).send({
                  error: 'Something wrong happened with our servers.'
                })
              })

          })
          .catch(error => {
            console.log('TestimonialController: Failed to update activeChallenge/completedChallenges:', error.message);
            return res.status(502).send({
              error: 'Something wrong happened with our servers.'
            })
          })
      })
      .catch(error => {
        console.log('TestimonialController: Failed to add testimonial to db:', error.message);
        return res.status(502).send({
          error: 'Something wrong happened with our servers.'
        })
      });
  },

  async addComment(req, res) {
    const { content, testimonial, user } = req.body;

    // Storing comment
    admin.firestore()
      .collection('testimonials')
      .doc(testimonial)
      .update({
        comments: admin.firestore.FieldValue.arrayUnion({
          content,
          date: admin.firestore.Timestamp.now(),
          user,
          uid: uuid(),
          score: 0
        })
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log('TestimonialController: Failed to store comment to db:', error.message);
        res.status(502).send({
          error: 'Something wrong happened with our servers.'
        })
      });
  }
};

// TODO Change currDiff to "round"
// TODO Trace why it's so slow
// TODO Clear error
