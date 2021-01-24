import SongNameReducer from "./SongNameReducer";
import ArtistNameReducer from "./ArtistNameReducer";
import YoutubeVideoIDReducer from "./YoutubeVideoIDReducer";
import { combineReducers } from "redux";
import SpotifyIDReducer from "./SpotifyIDReducer";
import ToggleLoginReducer from "./ToggleLoginReducer";
import UserReducer from "./UserReducer";

const songDataReducers = combineReducers({
  songName: SongNameReducer,
  artistName: ArtistNameReducer,
  videoID: YoutubeVideoIDReducer,
  SpotifyID: SpotifyIDReducer,
  toggleLogin: ToggleLoginReducer,
  user: UserReducer,
});

export default songDataReducers;
