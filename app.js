//jshint esversion:6
const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(4000, function () {
    console.log("server is running at port 4000");
});

app.get('/',function (request,response) {

    response.sendFile(__dirname + "/weatherapp.html");
    //make get request to external server using node
    // we will make use of native node module which is HTTPS
    console.log("app.get working");

    
});

app.post('/', function (request,response) {

    var api = "4721636805ffcfba7ae3338d5e01a000"   ;
    var endpoint = "https://api.openweathermap.org/data/2.5/weather?" ;
    var city = request.body.NameCity ;
    console.log(city);
    var url = endpoint +"q=" +city+ "&units=metric&appid="+ api;
    console.log(url);
    
    https.get(url, function (res) {
        console.log(res.statusCode);

        res.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            //icon url
            var iconurl =  "http://openweathermap.org/img/wn/"+icon +"@2x.png";
            response.writeHead(200,{"Content-Type" : "text/html"});
            response.write("<h3>The weather is currently: "+weatherDescription+" </h3> ");
            response.write("<h2>The temperature in "+city +" is "+temp+" degree Celcius </h2>");
            response.write("<img src="+iconurl+">");
            response.end();
            // response.send();
        });

    });

    

});

