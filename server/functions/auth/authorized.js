module.exports = {
  isAuthorized(options) {
    return (req, res, next) => {
      const { uid, email, role } = req.locals;
      const { id } = req.params;

      if (email === 'root@root.com')
        return next();

      if (options.allowSameUser && id === uid) { // To allow users to modify their own data
        return next();
      }

      if (!role) {
        return res.status(403).send({ error: "You do not have the necessary privileges to perform this action." });
      }

      if (options.hasRole.includes(role)) { // hasRole: array of roles that are allowed
        return next();
      }

      return res.status(403).send({ error: "You do not have the necessary privileges to perform this action." });
    }
  }
};
