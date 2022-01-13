const playlistForm = document.querySelector("#create-playlist-form");
const addSongForm = document.querySelector("#add-song-form");

playlistForm.onsubmit = async function(evt) {
  evt.preventDefault();
  const name = document.querySelector("#playlist-name").value;
  const customerId = "CRHarding";
  const playlistObj = {
    "name": name,
    "customerId": customerId,
    "songCount": 0
  }
  axios.post("https://svebsuap66.execute-api.us-west-2.amazonaws.com/prod/playlists", playlistObj, {
    authorization: {
      'x-api-key': 'K7CHRL6aqt1C6eGJ9EHyFaZCn86G0fyI2sTZKSkW'
    }
  }).then((res) => console.log(res))
}

addSongForm.onsubmit = function(evt) {
  evt.preventDefault();
  const asin = document.querySelector("#album-asin").value;
  const songTitle = document.querySelector("#track-name");
  const trackNumber = document.querySelector("#track-number");
  axios.get(`https://svebsuap66.execute-api.us-west-2.amazonaws.com/prod/playlists/${asin}`)
    .then(res => {
      console.log(res);
      const newSong = {
        "asin": asin,
        "trackNumber": trackNumber,
        "albumName": res.name,
        "songTitle": songTitle
      }
      axios.post(`https://svebsuap66.execute-api.us-west-2.amazonaws.com/prod/playlists/${asin}/songs`, newSong, {
        authorization: {
          'x-api-key': 'K7CHRL6aqt1C6eGJ9EHyFaZCn86G0fyI2sTZKSkW'
        }
      })
      .then(res => console.log(res))
  })
}