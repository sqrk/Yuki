const admin = require('firebase-admin');

module.exports = {
  async isAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization || !authorization.startsWith('Bearer ')) { // Bearer authentication scheme
      return res.status(401).send({
        error: 'Unauthorized',
      });
    }
    const split = authorization.split(' ');
    const token = split[1];

    console.log(token);

    try {
      // Token verification by Firebase
      const decodedToken = await admin.auth().verifyIdToken(token);

      console.log("decodedToken", JSON.stringify(decodedToken));

      res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email };
      return next();

    } catch (error) {
      return res.status(401).send({
        error: 'Unauthorized',
      });
    }
  }
};
