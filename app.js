const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");
const { encode } = require("punycode");
const app= express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
   
})

app.post("/", function(req,res){
    const query= req.body.cityName;
    const apiKey="3326eadec7304bc9e201fbfae8691d74";
   const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey;


    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const wdta=JSON.parse(data);
            const temp =wdta.main.temp;
            const icon=wdta.weather[0].icon
            const imageUrl="https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in "+ query +" is "+ temp + " in celcius</h1>");
            res.write("<img src=" + imageUrl +">")
            res.send();
        })
    })
    console.log("post request recieved");
})

app.listen(3000, function(){
    console.log("server is listening to port 3000");
})