<template>
<div class="weather-container" v-show="city"> 
      <img :src="img" alt="img" class="weather-icon"/> 
      <h1 class="temp">{{ celsius }}</h1>
      <h2 class="city">{{ city }}</h2>

      <div class="details">
        <div class="col">
          <img src="../assets/images/humidity.png" alt="humidity" />
            <div class="card-details">
                <p class="humidity">{{ humidity }}</p>
                <p>Влажность</p>
            </div>
        </div>

        <div class="col">
          <img src="../assets/images/barometer.png" alt="barometer" />

          <div class="card-details">
              <p class="pressure">{{ pressure }}</p>
              <p>Давление</p>
          </div>
        </div>

        <button @click="deleteBlock(index)">Удалить</button>

      </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: String,
            required: true
        },
        index: {
          type: Number,
          required: true
        },
        deleteBlock: {
          type: Function,
          required: true
        }
    },
    computed: {
    img() {
      return new URL(`../assets/images/${this.name}.png`, import.meta.url).href;
    },
    pressure() {
      return this.data != null ? this.data.main.pressure : ""
    },
    celsius() {
      return this.data != null ? Math.round(this.data.main.temp) + "°C": ""
    },
    humidity() {
      return this.data != null ? this.data.main.humidity + "%" : ""
    },
    city() {
      return this.data != null ? this.data.name : ""
    },
    name() {
      return this.data != null ? this.data.weather[0].main.toLowerCase() : ""
    }
  }
}

</script>

<style scoped>
button {
  border: 0;
  border-radius: 5px;
  outline: none;
  padding: 10px 15px;
  background: #d66c75;
  color: #7f1629;
  font-weight: bold;
  cursor: pointer;
  transition: transform 500ms ease;
  float: right;
}

button:hover {
  transform: translateY(-5px);
}
</style>