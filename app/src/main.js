import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCodemirror from 'vue-codemirror';
import VModal from 'vue-js-modal';

library.add(faUserSecret, faCaretRight, faTimes);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.config.productionTip = false
Vue.use(VueMaterial);
Vue.use(VueCodemirror);
Vue.use(VModal, { componentName: 'modal' })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
