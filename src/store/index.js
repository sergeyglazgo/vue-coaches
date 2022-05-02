import { createStore } from 'vuex';
import axios from 'axios';
import coachesModule from './coaches.js';
import messagesModule from './messages.js';
import authModule from './auth.js';

axios.defaults.baseURL =
  'https://vue-http-demo-683e3-default-rtdb.europe-west1.firebasedatabase.app';

export const store = createStore({
  modules: {
    coaches: coachesModule,
    messages: messagesModule,
    auth: authModule,
  },
});
