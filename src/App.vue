<script>
let apiKey = "20dd21edc24ea3b46733e9fc4989774f";
let apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";
let ipUrl = "https://ipapi.co/json/";
export default {
  data() {
    return {
      name: "clouds",
      tempCity: "",
      city: "",
      error: "",
      humidity: "",
      pressure: "",
      celsius: ""
    }
  },
  computed: {
    getImg() {
      return new URL(`./assets/images/${this.name}.png`, import.meta.url).href;
    }
  },
  created() {
    console.log("awd");
    this.checkByIP();
  },
  methods: {
    async getWeather(val) {
      try{
        const response = await fetch(`${apiUrl}&q=${val}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Не удается получить данные о погоде")
        }

        const data = await response.json();
        this.city = data.name;
        this.celsius = Math.round(data.main.temp);
        this.humidity = data.main.humidity + "%";
        this.pressure = data.main.pressure;

        if (data.weather[0].main === "Clouds") {
            this.name = "clouds";
          } else if (data.weather[0].main === "Clear") {
            this.name = "clear";
          } else if (data.weather[0].main === "Rain") {
            this.name = "rain";
          } else if (data.weather[0].main === "Drizzle") {
            this.name = "drizzle";
          } else if (data.weather[0].main === "Mist") {
            this.name = "mist";
          }
      } catch (e){
          this.error = e;
      }
  },
    async checkByIP() {
      try {
        const response = await fetch(`${ipUrl}`);
        if (!response.ok) {
            throw new Error("Ошибка в apiUrl")
        }

        const data = await response.json();
        if (data.city !==  "") {
          this.city = data.city;
          this.getWeather(this.city);
        }

      } catch (e) {
          this.error = e;
      }
    }
}
}
</script>

<template>
  <div class="card">
    <h1>Погода</h1>
    <div class="search">
      <input type="text" v-model="tempCity" placeholder="Введите название города">
      <button @click="getWeather(this.tempCity)">поиск</button>
    </div>

    <p class="error">{{ error }}</p>

    <div class="weather" v-show="city"> 
      <img :src="getImg" alt="img" class="weather-icon"/> 
      <h1 class="temp">{{ celsius + "°C"}}</h1>
      <h2 class="city">{{ city }}</h2>

      <div class="details">
        <div class="col">
          <img src="./assets/images/humidity.png" alt="humidity" />
            <div class="card-details">
                <p class="humidity">{{ humidity }}</p>
                <p>Влажность</p>
            </div>
        </div>

        <div class="col">
          <img src="./assets/images/barometer.png" alt="barometer" />

          <div class="card-details">
              <p class="pressure">{{ pressure }}</p>
              <p>Давление</p>
          </div>
        </div>

      </div>

      <div class="degree-button">
        <button class="btn-item1">°C</button>
        <button class="btn-item2">°F</button>
      </div>

    </div>

    
  </div>

</template>

<style scoped>

</style>
