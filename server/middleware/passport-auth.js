const passport = require('../config/passport');
// Middleware для проверки авторизации пользователя
exports.authenticate = passport.authenticate('jwt', { session: false });
