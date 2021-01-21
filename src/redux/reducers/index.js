import SongNameReducer from "./SongNameReducer";
import ArtistNameReducer from "./ArtistNameReducer";
import YoutubeVideoIDReducer from "./YoutubeVideoIDReducer";
import { combineReducers } from "redux";
import SpotifyIDReducer from "./SpotifyIDReducer";
import ToggleLoginReducer from "./ToggleLoginReducer";

const songDataReducers = combineReducers({
  songName: SongNameReducer,
  artistName: ArtistNameReducer,
  videoID: YoutubeVideoIDReducer,
  SpotifyID: SpotifyIDReducer,
  toggleLogin: ToggleLoginReducer,
});

export default songDataReducers;
