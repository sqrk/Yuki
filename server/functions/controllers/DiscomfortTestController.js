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
        let path = {};
        const querySnapshot = await admin.firestore()
          .collection("challenges")
          .get();

        // Return 404 error if no challenges were found.
        if (querySnapshot.empty) {
          return res.status(404).send({
            error: "No challenges available"
          })
        }

        // Initialize variable for the smallest difficulty we should start with
        let minDifficulty = 0;

        querySnapshot.forEach(doc => {
          const challenge = doc.data();
          let maxDiscomfort = 0;
          challenge.types.forEach((type) => {
            maxDiscomfort = Math.max(map.types[type], maxDiscomfort);
          });

          const totalDifficulty = challenge.difficulty + maxDiscomfort;

          // A difficulty can never be 0, if found it means it's not set yet
          minDifficulty = minDifficulty === 0 ? totalDifficulty : Math.min(minDifficulty, totalDifficulty);

          if (totalDifficulty in path) {
            path[totalDifficulty].challenges.push(challenge.id);
          } else {
            path[totalDifficulty] = {
              challenges: [challenge.id],
              completed: 0
            };
          }
        });

        try {
          await admin.firestore()
            .collection('challengePaths')
            .doc(map.uid)
            .set({
              uid: map.uid,
              currentDifficulty: minDifficulty,
              path: path
            })
        } catch (error) {
          console.log("Failed to store challenge path in db ");
          return res.status(502).send({
            error: "Something wrong happened in our servers"
          })
        }

        return res.status(200).send(path);
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

// TODO Prevent from taking test more than once (just check if corresponding challengePath exists already)
