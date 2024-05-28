import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUser, faSpinner, faPaperPlane} from '@fortawesome/free-solid-svg-icons';

import './style.css';
import App from './App.vue';
import router from '@/router';

const pinia = createPinia();

library.add(faUser, faSpinner, faPaperPlane);

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');
