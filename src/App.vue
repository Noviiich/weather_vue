<template>
  <div class="card">
    <h1>Погода</h1>
    <div class="search">
      <input type="text" v-model="cityName" placeholder="Введите название города">
      <button @click="getWeather">поиск</button>
    </div>

    <p v-show="error" class="error">{{ error }}</p>
    <WeatherBox v-for="(el, index) in blocks" :key="index" :data="el" :index="index" :deleteBlock="deleteBlock"/>
  </div>

</template>

<script>
import WeatherBox from "./components/WeatherBox.vue"
export default {
  components: {WeatherBox},
  data() {
    return {
      blocks: [],
      cityName: "",
      error: "",
      data: null
    }
  },
  watch: {
    data() {
      this.blocks.push(this.data);
    }
  },
  mounted() {
    this.checkByIP();
  },
  methods: {
    async getWeather() {
      try{
        let response = await fetch(`${import.meta.env.VITE_API_URL}&q=${this.cityName}&appid=${import.meta.env.VITE_API_KEY}`);
        if (!response.ok) {
            throw new Error("Не удается получить данные о погоде");
        }
        this.data = await response.json();
        this.error = "";
      } catch (e){
          this.error = e;
      }
  },
    async checkByIP() {
      try {
        let response = await fetch(`${import.meta.env.VITE_IP_URL}`);
        if (!response.ok) {
            throw new Error("Ошибка в определении IP")
        }
        let info = await response.json();
        if (info.city !==  "") {
          this.cityName = info.city;
          this.getWeather();
        }

      } catch (e) {
          this.error = e;
      }
    },
    deleteBlock(index) {
      this.blocks.splice(index, 1);
    }
}
}
</script>

<style scoped>

</style>