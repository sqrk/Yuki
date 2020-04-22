const AuthenticationController = require('./controllers/AuthenticationController');
const DiscomfortTestController = require('./controllers/DiscomfortTestController');
const { isAuthenticated } = require('./auth/authenticated');
const { isAuthorized } = require('./auth/authorized');
const ChallengeController = require('./controllers/ChallengeController');
const TestimonialService = require('./controllers/TestimonialController');

module.exports = {
  routes(app) {
    app.post('/register', AuthenticationController.register);
    app.post('/login', AuthenticationController.login);

    app.post('/discomfort-test',
      //isAuthenticated,
      //isAuthorized({ allowSameUser: true }),
      DiscomfortTestController.computeMap
    );

    app.post('/challenges/fetch', ChallengeController.fetch);
    app.post('/challenges/take', ChallengeController.take);
    app.post('/challenges/drop', ChallengeController.drop);

    app.get('/testimonials/:id', TestimonialService.fetch);
    app.post('/testimonials/new', TestimonialService.complete);
    app.post('/testimonials/comments/new', TestimonialService.addComment);

  }
};
