const admin = require('firebase-admin');

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
              data.testimonials.push(testimonialDoc.data());
            });


            // TODO try for no comment found

            //console.log(data);
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
  }
};
