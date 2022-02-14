function compare(a,b){ //quick compare function to sort by date at the end
  if (a.x < b.x){
    return -1;
  }
  else if(a.x > b.x){
    return 1;
  }
  else{
    return 0;
  }
}


function getDictDateDictSongs(response){ //converts responses to dictionaries
  // returns a dictionary with the following structure:
  // key: YYYY-MM-DD 
  // value: dictionary => 
  //            key: Song Name
  //            value: number of times played for day

  var songs = []
  for (var radio of response) {
    for (var track of radio.tracks){
      songs.push(track);
    }
  }
  // songs are no longer seperated by radio station

  var dict_by_date = {}; 
  // inside each dict will be another dict with song as key and num_times played as value
  for (var song of songs) {
    var day = song.timestp;
    var name = song.trackName;
    if (!(day in dict_by_date)) { // if dict for date doesn't exist
      dict_by_date[day] = {};
    }
    var song_dict = dict_by_date[day];
    if (!(name in song_dict)) { // song not in dict yet
      song_dict[name] = 1;
    }
    else { // already in dict
      song_dict[name] = song_dict[name] + 1;
    }
  }

  return dict_by_date;
}


export default function formatResponse(response) {
  // response: list of hashmap of responss
  // example of singular response hashmap:
  // {
  //   id: 4,
  //   name: "WNYC",
  //   tracks: [
  //     { timestp: "2021-04-09", trackName: "Captain Hook" },
  //     { timestp: "2021-04-08", trackName: "Captain Hook" },
  //     { timestp: "2021-04-07", trackName: "Captain Hook" }
  //   ]
  // }
  const dict_by_date = getDictDateDictSongs(response);

  // format:
  //  key: YYYY-MM-DD 
  //  value: dictionary => 
  //             key: Song Name
  //             value: number of times played for day

  // dict_by_date now consists of dict of dates, within which are dicts of songs

  var formatted_data = []
  for (var date in dict_by_date){
    var total_spins = 0;
    var tooltip = ""; // note that order is "random"
    for (var song in dict_by_date[date]){
      var num_times_played = dict_by_date[date][song];
      total_spins = total_spins + num_times_played;
      tooltip = tooltip + song + " (" + num_times_played.toString() + "), ";
    }
    tooltip = tooltip.substring(0, tooltip.length - 2); // remove last comma
    formatted_data.push(
      {
        x: date,
        y: total_spins,
        tooltip: tooltip
      }
    )
  }

  formatted_data.sort(compare); //sort by date at end
  return formatted_data;
}