<template>
  <div class="card">
    <h1>Погода</h1>
    <div class="search">
      <input type="text" v-model="tempCity" placeholder="Введите название города">
      <button @click="getWeather(tempCity)">поиск</button>
    </div>

    <p v-show="error" class="error">{{ error }}</p>

    <div class="weather-container" v-show="city"> 
      <img :src="img" alt="img" class="weather-icon"/> 
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

<script>
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
    img() {
      return new URL(`./assets/images/${this.name}.png`, import.meta.url).href;
    }
  },
  created() {
    this.checkByIP();
  },
  methods: {
    async getWeather(val) {
      try{
        let response = await fetch(`${import.meta.env.VITE_API_URL}&q=${val}&appid=${import.meta.env.VITE_API_KEY}`);
        if (!response.ok) {
            throw new Error("Не удается получить данные о погоде")
        }
        this.error = "";
        let data = await response.json();
        this.city = data.name;
        this.celsius = Math.round(data.main.temp);
        this.humidity = data.main.humidity + "%";
        this.pressure = data.main.pressure;
	      this.name = data.weather[0].main.toLowerCase();
      } catch (e){
          this.error = e;
      }
  },
    async checkByIP() {
      try {
        let response = await fetch(`${import.meta.env.VITE_IP_URL}`);
        if (!response.ok) {
            throw new Error("Ошибка в apiUrl")
        }
        let data = await response.json();
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

<style scoped>

</style>