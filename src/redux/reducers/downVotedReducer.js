const downVotedReducer = (state = false, action) => {
  switch (action.type) {
    case "downVote":
      return action.payload;
    default:
      return state;
  }
};

export default downVotedReducer;
