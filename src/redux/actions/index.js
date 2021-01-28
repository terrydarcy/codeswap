export const setSongName = (name) => {
  return {
    type: "setSongName",
    payload: name,
  };
};
export const setArtistName = (name) => {
  return {
    type: "setArtistName",
    payload: name,
  };
};
export const setVideoID = (id) => {
  return {
    type: "setVideoID",
    payload: id,
  };
};
export const setSpotifyID = (id) => {
  return {
    type: "setSpotifyID",
    payload: id,
  };
};
export const toggleLogin = (id) => {
  return {
    type: "toggleLogin",
    payload: id,
  };
};
export const setUserLogin = (data) => {
  return {
    type: "user",
    payload: data,
  };
};
export const setUpVoted = (data) => {
  return {
    type: "upVote",
    payload: data,
  };
};
export const setDownVoted = (data) => {
  return {
    type: "downVote",
    payload: data,
  };
};
