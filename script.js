$(document).ready(function(){
// console.log()
var apiKey ="388ef372adda68b3d644c51a14d31ab6";
var lat;
var lon;
$("#submit").on("click",function(event){
event.preventDefault();
// var apiKey ="388ef372adda68b3d644c51a14d31ab6";
var queryURL =
"https://api.openweathermap.org/data/2.5/weather?units=imperial&q="+$("#inputCity").val()+"&appid=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;

    $("#temp").text(temperature);
    $("#humidity").text(humidity);
    $("#wind").text(wind);

    lon= response.coord.lon;
    lat= response.coord.lat;
    uvIndex(lat,lon);

    
});

// uvIndex(lon,lat);


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

})