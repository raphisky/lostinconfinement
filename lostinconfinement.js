var confinementThings = [];
var confinementThingsHour = [];
var isDataLoaded = false;


$.getJSON("https://spreadsheets.google.com/feeds/list/1p1rZkKs7FZ5DrIoG8UYsSSB9cg2pvKCkWLnN4qR-fYQ/od6/public/values?alt=json", function(data) {
  for (var el in data.feed.entry) {
    confinementThings.push(data.feed.entry[el].gsx$confinementthing.$t);
    confinementThingsHour.push(data.feed.entry[el].gsx$confinementthinghour.$t);
  }
  isDataLoaded = true;
  console.log(confinementThings);
  displayConfinementThings();

  return confinementThings;
});

function displayConfinementThings() {
  for (var i = 0; i < confinementThings.length; i++) {
    var newThing = confinementThings[i];
    var newThingHour = confinementThingsHour[i];
    $('#confinementThingsContainer').append(newThing + " à " + newThingHour + ", ");
  }
}
