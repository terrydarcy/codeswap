const ToggleLoginReducer = (state = false, action) => {
  switch (action.type) {
    case "toggleLogin":
      return action.payload;
    default:
      return state;
  }
};

export default ToggleLoginReducer;
