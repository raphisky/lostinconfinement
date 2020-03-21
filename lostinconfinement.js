// form

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};


var $form = $('form#confinement-form'),
    url = 'https://script.google.com/macros/s/AKfycbwd31sg_vPl7YvRLxxCNJHXns3M3kVHwFw2aMVXXedo_HplG-I/exec'

$('#submit-form').on('click', function(e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).done(
    // do something
  );
})


// INTERACTIONS

$('#addPrompt').click(function() {
  $('#confinement-form-container').show();
})

$('#closePrompt').click(function() {
  $('#confinement-form-container').hide();
})

$('#submit-form').click(function() {
  var tempThingToAdd = $('#newThingInput').val();
  var tempThingHourToAdd = $('#newHourInput').val();
  var thingSpan = document.createElement('span');
  thingSpan.innerHTML = tempThingToAdd + " à " + tempThingHourToAdd + ", ";
  spawnConfinementThing(thingSpan);
})

// LOAD ACTIVITIES

var confinementThings = [];
var confinementThingsHour = [];


$.getJSON("https://spreadsheets.google.com/feeds/list/1DpU7Fni82j2hXfloJnnmUBmTPbZ0eHQi7FklWcl2-8M/od6/public/values?alt=json", function(data) {
  for (var el in data.feed.entry) {
    confinementThings.push(data.feed.entry[el].gsx$confinementthing.$t);
    confinementThingsHour.push(data.feed.entry[el].gsx$confinementthinghour.$t);
  }
  displayConfinementThings();
  return confinementThings;
});





function displayConfinementThings() {
  for (var i = 0; i < confinementThings.length; i++) {
    var newThing = confinementThings[i];
    var newThingHour = confinementThingsHour[i];
    var thingSpan = document.createElement('span');
    thingSpan.innerHTML = newThing + " à " + newThingHour + ", ";
    spawnConfinementThing(thingSpan);
  }
}

function spawnAddThingPrompt() {
    var addThingPrompt = document.createElement('span');
    addThingPrompt.innerHTML = "et toi ?";
    $('#confinementThingsContainer').append(addThingPrompt);
}

function spawnConfinementThing(el) {
  setTimeout(function() {
    $('#confinementThingsContainer').append(el);
    $('#confinementThingsContainer span').addClass("thing");
  }, 300);
}
