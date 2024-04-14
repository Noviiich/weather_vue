<template>
  <div class="card">
    <h1>Погода</h1>
    <div class="search">
      <input type="text" v-model="cityName" placeholder="Введите название города">
      <button @click="getWeather(this.cityName)">поиск</button>
    </div>

    <p v-show="error" class="error">{{ error }}</p>
    <WeatherBox v-for="(value, secret) in mapBlocks" :secret="secret" :data="value" :deleteBlock="deleteBlock"/>
  </div>

</template>

<script>
import WeatherBox from "./components/WeatherBox.vue"
export default {
  components: {WeatherBox},
  data() {
    return {
      mapBlocks: {},
      cityName: "",
      error: "",
      data: null
    }
  },
  mounted() {
    this.checkByIP();
    setInterval(async () => {
      try{
        if (this.mapBlocks) {
          for (let key in this.mapBlocks) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}&q=${key}&appid=${import.meta.env.VITE_API_KEY}`);
            if (!response.ok) {
                throw new Error("Не удается получить данные о погоде");
            }
            this.data = await response.json();
            this.mapBlocks[this.data.name] = this.data;
            this.error = "";
          }
        }
      } catch (e){
          this.error = e;
      }
    }, 60000);
  },
  methods: {
    async getWeather(value) {
      this.cityName = '';
      try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}&q=${value}&appid=${import.meta.env.VITE_API_KEY}`);
        if (!response.ok) {
            throw new Error("Не удается получить данные о погоде");
        }
        this.data = await response.json();
        this.mapBlocks[this.data.name] = this.data;
        this.error = "";
      } catch (e){
          this.error = e;
      }
  },
    async checkByIP() {
      try {
        const response = await fetch(`${import.meta.env.VITE_IP_URL}`);
        if (!response.ok) {
            throw new Error("Ошибка в определении IP")
        }
        const info = await response.json();
        if (info.city !==  "") {
          this.getWeather(info.city);
        }

      } catch (e) {
          this.error = e;
      }
    },
    deleteBlock(secret) {
      delete this.mapBlocks[secret];
    }
}
}
</script>

<style scoped>

</style>