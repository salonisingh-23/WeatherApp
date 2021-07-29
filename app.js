const https=require('https');
const express=require('express');
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res)
    {   
        res.sendFile(__dirname + "/index.html");
    });

    app.post("/about", function(req,res){
    const query=req.body.cityName;
    const apiKey='28e53fba12d2a58f02fbdb5ba162bf86';
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +apiKey+ "&units=" + unit;
    https.get(url, function(response){
    console.log(response.statusCode);

   response.on("data", function(data){
       
      const weatherData= JSON.parse(data);
       const temp=weatherData.main.temp;
       const weatherDescription=weatherData.weather[0].description;
       const icon=weatherData.weather[0].icon;
   const imageURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
       // const object={
       //     name:"Angela",
       //     favouriteFood:"Ramen"
       // }
       // console.log(JSON.stringify(object))
       // res.write("The weather is currently" + weatherDescription);
       res.write("<p>The weather is currently " +weatherDescription+ "</p> ");
       res.write("<h1>The Temperature in " + query + " is " +temp+ " degress Celsius</h1>");
       res.write("<img src=" + imageURL +">");
       res.send();
   });

    });
});
app.listen(3000,function(){
console.log("Server is running on port 3000");
});