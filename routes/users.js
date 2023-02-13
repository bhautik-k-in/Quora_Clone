const router = require('express').Router();
const USER_CONTROLLER = require('../controllers/users');
const { validate } = require('express-validation');
const { login, register } = require('../validations/users');
const { isAuth } = require('../middlewares/authentication');

router.post('/login', isAuth(['users']), validate(login, { context: true }),USER_CONTROLLER.login);
router.post('/register', validate(register, { context: true }), USER_CONTROLLER.register);
router.get('/profile', isAuth(), USER_CONTROLLER.profile);
router.get('/posts', isAuth(), USER_CONTROLLER.posts);
router.get('/topics', isAuth(), USER_CONTROLLER.topics);


module.exports = router;