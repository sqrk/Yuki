const admin = require('firebase-admin');

module.exports = {
  async computeMap(req, res) {
    try {
      // Store map in db under document with user's uid
      const map = req.body;
      console.log('will write discomfortMap');
      await admin.firestore()
        .collection('discomfortMaps')
        .doc(map.uid)
        .set(map);

      console.log('done');
      try {
        // Get challenges from db
        let path = {};
        console.log('will get challenges');
        const querySnapshot = await admin.firestore()
          .collection("challenges")
          .get();
        console.log('done');
        // Return 404 error if no challenges were found.
        if (querySnapshot.empty) {
          return res.status(404).send({
            error: "No challenges available"
          })
        }

        // Initialize variable for the smallest difficulty we should start with and highest one we should stop at
        let minDifficulty = 0;
        let maxDifficulty = 0;

        querySnapshot.forEach(doc => {
          const challenge = doc.data();
          let maxDiscomfort = 0;
          challenge.types.forEach((type) => {
            maxDiscomfort = Math.max(map.types[type], maxDiscomfort);
          });

          const totalDifficulty = challenge.difficulty + maxDiscomfort;

          // A difficulty can never be 0, if found it means it's not set yet
          minDifficulty = minDifficulty === 0 ? totalDifficulty : Math.min(minDifficulty, totalDifficulty);
          maxDifficulty = Math.max(maxDifficulty, totalDifficulty);

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
          console.log('will write challengePath');
          await admin.firestore()
            .collection('challengePaths')
            .doc(map.uid)
            .set({
              uid: map.uid,
              currentDifficulty: minDifficulty,
              maxDifficulty,
              path
            });
          console.log('done');
        } catch (error) {
          console.log("DiscomfortController: Failed to store challenge path in db:" + error.message);
          return res.status(502).send({
            error: "Something wrong happened in our servers"
          })
        }

        return res.status(200).send(path);
      } catch (error) {
        console.log("DiscomfortController: Failed to fetch challenges from db:", error.message);
        return res.status(502).send({
          error: "Something wrong happened in our servers"
        })
      }

    } catch(error) {
      console.log("DiscomfortController: Failed to write map to db:", error.message);
      return res.status(502).send({
        error: "Something wrong happened in our servers"
      });
    }

  }
};

// TODO Prevent from taking test more than once (just check if corresponding challengePath exists already)
