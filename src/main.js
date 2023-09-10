import { a } from './a.js'
console.log('vite', a)
import { createApp, h } from 'vue';
import App from './App.vue'
import './index.css'

// const App = {
//   render() {
//     return h('div', null, [h('div', null, String('hello vue'))])
//   }
// }

createApp(App).mount('#app')