const express = require('express');
const router = express.Router();

let id = 0;
let parents = [];

// helpers
const helpers = require('../utils/helpers');


router.post('/login', (req, res, next) => {
  const email = req.body.email;

  const user = parents.filter(user => {
    user.email === email;
  })

  if (user[0])
    res.status(200).json({ message: "Logged in", user: user[0] })
  else
    res.status(404).json({ message: "failed Auth" })
})

router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  // Validate stuff here

  const ID = id++;

  const new_user = {
    id: ID,
    email: email,
    children: [],
    location: req.body.location || {},
    url: 'http://localhost:4001/user/' + ID
  };

  // add user to DB
  parents.push(new_user);
  res.status(201).json({
    message: " Created new Accoutn",
    user: new_user,
  });
})

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  let user = findParent(userId);

  console.log("user:", user);
  if (user.length === 1) {
    res.status(200).json({ user: user[0] })
  }
  else {
    res.status(404).json({ message: "failed Auth" })
  }

})


router.post('/:userId/child', (req, res, next) => {
  const parent = findParent(req.params.userId);
  if (parent) {
    const child_id = parent.children.length;

    const child = {
      id: child_id,
      name: req.body.name,
      birthday: req.body.birthday,
      url: `http://localhost:4001/user/${parent.id}/child/${child_id}`
    }

    parent.children.push(child);

    res.status(200).json({ user: parent });
  }
  else { res.status(404).json({ message: 'User is not found' }) };
})

router.get('/:userId/child/:childId', (req, res, next) => {
  const child = findChild(req.params.userId, req.params.childId);

  res.status(200).json({ child: { ...child, age: helpers.calcAge(child.birthday) } })
})

router.get('/:userId/child/:childId/recommendations', (req, res, next) => {
  const child = findChild(req.params.userId, req.params.childId)[0];
  const age = helpers.calAge(child.birthday);
})

router.get('/:userId/child/:childId/learning', (req, res, next) => {
  const child = findChild(req.params.userId, req.params.childId)[0];
  const age = helpers.calAge(child.birthday);
})

router.get('/:userId/child/:childId/activity', (req, res, next) => {
  const child = findChild(req.params.userId, req.params.childId)[0];
  const age = helpers.calAge(child.birthday);
})

router.get('/:userId/child/:childId/support', (req, res, next) => {
  const child = findChild(req.params.userId, req.params.childId)[0];
  const age = helpers.calAge(child.birthday);
})




module.exports = router;

// Helpers

const findChild = (parent_id, child_id) => {
  const parent = findParent(parent_id);
  const child = parent.children.filter(child => (child.id == child_id));

  if (child.length == 1)
    return child[0];

  return null;
}

const findParent = (parent_id) => {
  const parent = parents.filter(user => (user.id == parent_id));
  if (parent.length == 1)
    return parent[0];
  return null;
}
