<template>
  <div class="card">
    <button @click="weatherStore.$reset" class="btn-remove">Очистить</button>
    <h1>Погода</h1>
    <div class="search">
      <input type="text" v-model="cityName" placeholder="Введите название города">
      <button @click="weatherStore.getWeather(cityName)">поиск</button>
    </div>

    <p v-show="error" class="error">{{ error }}</p>
    <WeatherCard v-for="(value, secret) in mapBlocks" :secret="secret" :data="value" :deleteBlock="weatherStore.deleteBlock"/>
  </div>

</template>

<script>
import { storeToRefs } from "pinia";
import WeatherCard from "./components/WeatherCard.vue";
import { useWeatherStore } from './stores/WeatherStore';

export default {
  components: {WeatherCard},
  setup() {
    const weatherStore = useWeatherStore();

    weatherStore.loadState();

    const { cityName, mapBlocks, error } = storeToRefs(weatherStore);

    return {weatherStore, cityName, mapBlocks, error}
  },
  mounted() {
    this.weatherStore.checkByIP();
    this.weatherStore.fetchDataPeriodically();
  },
}
</script>

<style scoped>

</style>