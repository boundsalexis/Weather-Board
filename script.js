$(document).ready(function(){
var apiKey ="388ef372adda68b3d644c51a14d31ab6";
var searchHistoryArray=[];
// var userInput =$("#inputCity").val();

$("#submit").on("click",function(event){
event.preventDefault();
var userInput =$("#inputCity").val();
searchHistoryArray.push(userInput);
addHistory();
console.log(searchHistoryArray);
var queryURL =
"https://api.openweathermap.org/data/2.5/weather?units=imperial&q="+userInput+"&appid=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    var icon = response.weather[0].icon;
    $("#temp").text(temperature);
    $("#humidity").text(humidity);
    $("#wind").text(wind);

    lon= response.coord.lon;
    lat= response.coord.lat;
    uvIndex(lat,lon);
    console.log(icon);
    var iconURL ="https://openweathermap.org/img/wn/"+icon+"@2x.png"
    $("#image").attr("src", iconURL);

});

});
function uvIndex(lat,lon){
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
        console.log(uviValue);
        console.log(uviValue <3);
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
function addHistory(){
    for( var i=0; i<searchHistoryArray.length; i++){
        var stringI= i.toString();
        window.localStorage.setItem(stringI, searchHistoryArray[i]);
    }

}
})