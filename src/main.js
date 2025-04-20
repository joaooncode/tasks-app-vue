import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';


import App from './App.vue'
import router from './router'


const MyCustomTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
})


const app = createApp(App)



app.use(createPinia())
app.use(router)

app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: MyCustomTheme,
  }
})

app.mount('#app')
