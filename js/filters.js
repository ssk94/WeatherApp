
app.filter('dateFilter', function() {

  return function(input) {
    var output =  moment(input).format("MM-DD HH:mm a");

    // Do filter work here

    return output;

  }

});

app.filter('timestampToTime', function() {

  return function(input) {
      console.log(input);
    var output = moment.unix(input, ["h:mm A"]).format("HH:mm A");

    // Do filter work here

    return output;

  }

});

app.filter('degreeFilter', function(){
  return function(input){
    var output = input - 273.15;
    return output;
  }
})

app.filter('timeStampToDay', function(){
  return function(input){
    var output = moment.unix(input).format("dddd");
    return output;
  }
});