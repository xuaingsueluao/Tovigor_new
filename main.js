import App from './App'

// 全局注册通用弹窗组件
import ModalGeneral from '@/components/modals/modal-general.vue'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.component('ModalGeneral', ModalGeneral)
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	// Vue 3 全局注册组件
	app.component('ModalGeneral', ModalGeneral)
	return {
		app
	}
}
// #endif
