const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res){
  const cityName = req.body.cityName;
  const apiKey = "37715e1245c79c57b286527597c64424";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + apiKey +"&units=unit"

  https.get(url,function(response){

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
    const temperature = weatherData.main.temp;
    const weatherDiscription = weatherData.weather[0].description;
    const city = weatherData.name;
    const icon = weatherData.weather[0].icon;
    const imageUrl =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<p> Weather Discription = " + weatherDiscription + "</p>");
    res.write("<h1>The temperature in " + city + " is " + temperature + " degree celcius.</h1>");
    res.write("<img src=" + imageUrl + " ></img>")

    res.send();

    });

  });
})



app.listen(process.env.PORT || 3000,function(){
  console.log("Server is online and running on port 3000.....");
});
