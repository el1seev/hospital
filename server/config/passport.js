const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

require('dotenv').config();
const { JWT_SECRET } = process.env;

// JWT-стратегия
passport.use( new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    console.log(payload)
    // Находим пользователя в базе данных по ID из токена
    const user = await User.findById(payload.userId);

    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
      return done(null, false);
    }

    // Возвращаем найденного пользователя
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));