const UserReducer = (state = null, action) => {
  switch (action.type) {
    case "user":
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;
