import client from "../../../sanity/config";

export const service = {
  createDoc(oldData, newData) {
    const { active, role, username } = oldData;
    const _username = newData.username.trim();
    const doc = {
      active: newData.active,
      role: {
        _type: "reference",
        _ref: newData.role,
      },
      username: _username,
    };

    if (newData.active === active) {
      delete doc.active;
    }
    if (newData.role === role._id) {
      delete doc.role;
    }
    if (!_username || newData.username === username) {
      delete doc.username;
    }

    return doc;
  },
  update(id, document) {
    return client.patch(id).set(document).commit();
  },
};
