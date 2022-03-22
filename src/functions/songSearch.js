import axios from "axios";

const songSearch = async (value) => {
  const url = "https://ws.audioscrobbler.com/2.0";
  const response = await axios.get(url, {
    params: {
      method: "track.search",
      track: value,
      api_key: process.env.REACT_APP_LAST_FM_API_KEY,
      format: "json",
    },
  });
  return response["data"]["results"]["trackmatches"]["track"].slice(0, 10);
};

export default songSearch;
