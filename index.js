require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

const port = process.env.PORT || 8080;

app.get('/', (req, res)=>{
  res.render('index');
})

app.get('/weather/', async (req, res) => {
  try {
      console.log(req.query.location);
      // res.send(req.query.location);
      const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.location}&appid=${process.env.API_KEY}&units=metric`);
      console.log(data);
      // res.json(data["weather"][0]["main"]);
      // console.log("http://openweathermap.org/img/w/"+String(data["weather"][0]["icon"])+ ".png");
      res.render('weather', {
        main:data["weather"][0]["main"], 
        temp:Math.round(data["main"]["temp"]),
        feels_like:Math.round(data["main"]["feels_like"]),
        icon:"http://openweathermap.org/img/w/"+String(data["weather"][0]["icon"])+ ".png"
        
      });
  }
  catch(error) {
      res.status(500).json({message: error.message});
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));