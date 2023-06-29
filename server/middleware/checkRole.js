const isAdmin = (req, res, next) => {
  // Проверяем, является ли пользователь админом
  if (req.user.userType === 'админ') {
    return next();
  }
  // Если пользователь не админ, возвращаем ошибку
  return res.status(403).json({ message: 'Доступ запрещен' });
};

const isPatient = (req, res, next) => {
  // Проверяем, является ли пользователь админом
  if (req.user.userType === 'пациент') {
    return next();
  }
  // Если пользователь не админ, возвращаем ошибку
  return res.status(403).json({ message: 'Доступ запрещен' });
};

module.exports = { isAdmin, isPatient };
