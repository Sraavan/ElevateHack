exports.db = function () {
  const array = [];

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

}