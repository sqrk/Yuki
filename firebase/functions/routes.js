const AuthenticationController = require('./controllers/AuthenticationController');
const ChallengesController = require('./controllers/ChallengesController');
const { isAuthenticated } = require('./auth/authenticated');
const { isAuthorized } = require('./auth/authorized');

module.exports = {
  routes(app) {
    app.post('/register', AuthenticationController.register);
    app.post('/login', AuthenticationController.login);

    app.get('/profile', isAuthenticated);
    app.post('/profile/logout', AuthenticationController.logout)
    // Challenges
    // app.get('/challenges', [
    //   isAuthenticated,
    //   ChallengesController.list
    // ]);
    // app.get('/challenges/:id', [
    //   isAuthenticated,
    //   ChallengesController.get
    // ]);
    // app.post('/challenges',
    //   isAuthenticated,
    //   isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
    //   ChallengesController.create
    // );
    // app.patch('/challenges/:id',
    //   isAuthenticated,
    //   isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
    //   ChallengesController.create
    // );
    // app.delete('/challenges/:id',
    //   isAuthenticated,
    //   isAuthorized({ hasRole: ['admin'], allowSameUser: false }),
    //   ChallengesController.delete
    // );
  }
};
