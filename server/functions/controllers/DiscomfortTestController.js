const admin = require('firebase-admin');

module.exports = {
  async computeMap(req, res) {
    try {
      // Store map in db under document with user's uid
      const map = req.body;
      //console.log(map);
      await admin.firestore()
        .collection('discomfortMaps')
        .doc(map.uid)
        .set(map);

      try {
        // Get challenges from db
        let challengePath = {};
        const querySnapshot = await admin.firestore()
          .collection("challenges")
          .get();

        // Return 404 error if no challenges were found.
        if ( querySnapshot.empty ) {
          return res.status(404).send({
            error: "No challenges available"
          })
        }

        querySnapshot.forEach(doc => {
          //console.log(doc.data());
          const challenge = doc.data();
          let maxDifficulty = 0;
          challenge.types.forEach((type) => {
            maxDifficulty = Math.max(map.types[type], maxDifficulty);
          });

          const totalDifficulty = challenge.difficulty + maxDifficulty;

          if ( totalDifficulty in challengePath) {
            challengePath[totalDifficulty].push(challenge.id);
          } else {
            challengePath[totalDifficulty] = [challenge.id];
          }
        });

        // TODO store object in db
        try {
          await admin.firestore()
            .collection('challengePath')
            .doc(map.uid)
            .set({
              uid: map.uid,
              challengePath: challengePath
            })
        } catch (error) {
          console.log("Failed to store challenge path in db ");
          return res.status(502).send({
            error: "Something wrong happened in our servers"
          })
        }

        return res.status(200).send(challengePath);

      } catch (error) {
        console.log("Failed to fetch challenges from db ");
        return res.status(502).send({
          error: "Something wrong happened in our servers"
        })
      }

    } catch(error) {
      console.log("Failed to write map to db");
      return res.status(502).send({
        error: "Something wrong happened in our servers"
      });
    }

  }
};
