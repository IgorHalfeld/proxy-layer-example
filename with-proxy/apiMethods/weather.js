const axios = require('axios')

const API_KEY = 'd4ba1a8fb0a181f0e59a6f3f60abf6a5'
const API_URI = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`

module.exports = {
  getForecast: async coordinates => {
    const { lat, lng } = coordinates
    console.log('Weather =>', coordinates)
    const QUERY = `&lat=${lat}&lon=${lng}`
    
    const { data: response } = await axios.get(API_URI + QUERY)
    const { main: coords } = response

    return {
      data: {
        temp: coords.temp,
        tempMax: coords.temp_max,
        tempMin: coords.temp_min
      }
    }
  }
}