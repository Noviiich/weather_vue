import { defineStore } from "pinia";

const STORAGE_KEY = 'weatherStore';

export const useWeatherStore = defineStore('weatherStore', {
    state: () => {
        return {
            mapBlocks: {},
            cityName: "",
            error: "",
            data: null
          }
    },
    actions: {
      saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
      },
      loadState() {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          this.$patch(JSON.parse(savedState));
        }
      },
      $reset() {
        this.cityName = '';
        this.mapBlocks = {};
        this.error = null;
        localStorage.removeItem(STORAGE_KEY);
      },
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
              this.saveState();
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
            this.saveState();
          },
          async fetchDataPeriodically() {
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
    }
})