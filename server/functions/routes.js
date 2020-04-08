const AuthenticationController = require('./controllers/AuthenticationController');
//const ChallengesController = require('./controllers/ChallengesController');
const DiscomfortTestController = require('./controllers/DiscomfortTestController');
const { isAuthenticated } = require('./auth/authenticated');
const { isAuthorized } = require('./auth/authorized');
const ChallengeController = require('./controllers/ChallengeController');
const TestimonialService = require('./controllers/TestimonialController');

module.exports = {
  routes(app) {
    app.post('/register', AuthenticationController.register);
    app.post('/login', AuthenticationController.login);
    app.post('/logout', AuthenticationController.logout);

    app.post('/discomfort-test',
      //isAuthenticated,
      //isAuthorized({ allowSameUser: true }),
      DiscomfortTestController.computeMap
    );
   // app.post('/discomfort-test', isAuthenticated, TestController)

    app.post('/challenges/fetch', ChallengeController.fetch);
    app.post('/challenges/take', ChallengeController.take);

    app.get('/testimonials/:id', TestimonialService.fetch);

    app.get('/profile', isAuthenticated);

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
