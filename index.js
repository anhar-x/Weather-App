require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
  res.render('index');
})

app.get('/weather/:location', async (req, res) => {
  try {
      const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.location}&appid=${process.env.API_KEY}`);
      res.json(data);
  }
  catch(error) {
      res.status(500).json({message: error.message});
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));