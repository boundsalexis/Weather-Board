$(document).ready(function(){
//api key
    var apiKey ="388ef372adda68b3d644c51a14d31ab6";

//array to hold search history
var searchHistoryArray=[];
//retrive history from local storage when page opens
// populateHistory();


// when user clicks submit
$("#submit").on("click",function(event){
event.preventDefault(); // stop from reloading
// grab value from input
var userInput =$("#inputCity").val();
// push that value into our history array
searchHistoryArray.push(userInput);
// add that history to our locale storage
addHistory();


// current weather query
var queryURL =
"https://api.openweathermap.org/data/2.5/weather?units=imperial&q="+userInput+"&appid=" + apiKey;
// populate the current weather box
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(userInput);
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    var icon = response.weather[0].icon;
    var iconURL ="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    var date = moment().format("l");
    var addIcon=$("<img>");
    addIcon.attr("src", iconURL);
    $("#city").text(userInput +" "+ date);

    $("#city").append(addIcon);
    // $("#city").text(userInput +" "+ date);
    $("#temp").text(temperature);
    $("#humidity").text(humidity);
    $("#wind").text(wind);

    lon= response.coord.lon;
    lat= response.coord.lat;
    uvIndex(lat,lon); // to get the index
    fiveDay(lat,lon); // get forecast
    // // place weather icon
    // var iconURL ="https://openweathermap.org/img/wn/"+icon+"@2x.png"
    // $("#image").attr("src", iconURL);

});

});
function uvIndex(lat,lon){
    // remove alll color classes to replace with current correct one
var uvi = $("#uvi");
uvi.removeClass("low");
uvi.removeClass("medium");
uvi.removeClass("high");
uvi.removeClass("veryhigh");
uvi.removeClass("extreme");
  var uvQuery=  "https://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+lat+"&lon="+lon;
    $.ajax({
        url: uvQuery,
        method: "GET"
    }).then(function(response){
        var uviValue=response.value;
        uvi.text(uviValue);
        if (uviValue <3){
        uvi.addClass("low");   
        }
        else if (3<= uviValue && uviValue<6){
        uvi.addClass("medium");
        }
        else if (6<= uviValue && uviValue<8){
        uvi.addClass("high");
        }
        else if (8<= uviValue && uviValue<11){
            uvi.addClass("veryhigh");
        }
        else if( uviValue === 11){
        uvi.addCass("extreme");
        }
    });
}
// adding history to local storage
function addHistory(){
    for( var i=0; i<searchHistoryArray.length; i++){
        var stringI= i.toString();
        window.localStorage.setItem(stringI, searchHistoryArray[i]);
    } //subsequently populating the displayed history
populateHistory();
}
function populateHistory(){
    $("#history").empty();
    for (var i=0; i<searchHistoryArray.length; i++){
       var newsearch = $("<p>");
       var item = window.localStorage.getItem(i.toString());
       newsearch.text(item);
       $("#history").append(newsearch);
    }
}
function fiveDay(lat,lon){
var fiveQuery ="https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid="+ apiKey +"&lat="+lat+"&lon="+ lon;
$.ajax({
    url: fiveQuery,
    method: "GET"
}).then(function(response){
    console.log(response);
})

}
})