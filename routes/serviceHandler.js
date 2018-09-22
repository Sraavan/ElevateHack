const helpers = require('../utils/helpers');

exports.get_recommendations = (req, res, next) => {
  const child = findChild(req.params.userId, req.params.childId)[0];
  const age = helpers.calAge(child.birthday);

  res.status(200).json({ child: child, age: age });

}

// exports.get_learnings = (req, res, next) => {
//   const child = findChild(req.params.userId, req.params.childId)[0];
//   const age = calAge(child.birthday);
// }

// exports.get_activity = (req, res, next) => {
//   const child = findChild(req.params.userId, req.params.childId)[0];
//   const age = calAge(child.birthday);
// }

// exports.get_support = (req, res, next) => {
//   const child = findChild(req.params.userId, req.params.childId)[0];
//   const age = calAge(child.birthday);
// }
