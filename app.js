const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var query = req.body.cityName;
  const unit = "metric";
  const appid = "ebd235a43830f0426b115fb63a1e8e21"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + appid;
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const discription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + discription + ".<p>");
      res.write("<img src=" + imageURL + ">");
      res.write("<h2>\nThe temperature in " + query + " is " +temp+ " degree celcius.</h2>");
      res.send();
    })
  });
})

app.listen(3000, function() {
  console.log("Server running.....");
});
