module.exports = {
  list(req, res) {
    try {
      const challenges = 1; // TODO Get challenges from db
      return res.status(200).send({ challenges });
    } catch (error) {
      return res.status(502).send({ error: error.message });
    }
  },

  get(req, res) {
    try {
      const { id } = req.params; // Or req.body.id??
      // TODO Get that challenge from db
      return res.status(200).send({ challenge: id}); // TEMP
    } catch (error) {
      return res.status(502).send({ error: error.message });
    }
  }
};
