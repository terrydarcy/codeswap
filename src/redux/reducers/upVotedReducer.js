const upVotedReducer = (state = false, action) => {
  switch (action.type) {
    case "upVote":
      return action.payload;
    default:
      return state;
  }
};

export default upVotedReducer;
