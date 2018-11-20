<template>
  <div class="container">
    <div class="loading" v-if="isLoading">
      <div class="loading-spinner"></div>
    </div>
    <h1 class="title">Weather App :D</h1>
    <div class="content-temp">
      <span class="content-temp-current">{{ temp.current }} ºC</span>
      <div class="content-temp-minmax">
        <p>Min: {{ temp.min }} ºC</p>
        <p>Max: {{ temp.max }} ºC</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const HTTPClient = axios.create({
  baseURL: 'http://localhost:4000/api'
})

const getCoordinates = navigator => new Promise(resolve => {
  navigator.geolocation.getCurrentPosition(position => {
    const { coords } = position
    resolve({ lat: coords.latitude, lng: coords.longitude })
  })
})

export default {
  name: 'WeatherApp',
  data: () => ({
    isLoading: true,
    temp: {
      current: 0,
      min: 0,
      max: 0
    }
  }),
  async mounted () {
    const payload = await getCoordinates(window.navigator)
    try {
      const { data: response } = await HTTPClient({
        method: 'POST',
        headers: {
          path: 'weather.getForecast'
        },
        data: payload
      })

      this.temp.current = response.temp.toFixed(0)
      this.temp.max = response.tempMax.toFixed(0)
      this.temp.min = response.tempMin.toFixed(0)
      this.isLoading = false;
    } catch (error) {
      console.log('Something happen', error) // eslint-disable-line
    }
  }
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

html,
body { width: 100%; height: 100%; }

@keyframes spin {
  to { transform: rotate(360deg); }
}
.loading {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
}
.loading-spinner {
  border: 8px solid rgb(255, 255, 255);
  border-radius: 50%;
  border-left-color: lightcoral;
  width: 50px;
  height: 50px;
  animation: spin .2s linear infinite;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container .title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: tomato;
  font-size: 40px;
  text-align: center;
  margin-bottom: 50px;
}

.content-temp {
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.content-temp-current {
  font-size: 30px;
  color: teal;
  font-weight: 700;
}
.content-temp-minmax {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 20px;
  color: #ccc;
  font-weight: 300;
}
</style>
