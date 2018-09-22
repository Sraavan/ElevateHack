// Helpers

const calcAge = birthday => {
  now = Date.now();
  birthday = new Date(birthday);
  diff = now - birthday.getTime();
  age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  return age;
}

module.exports = {
  calcAge: calcAge,
}