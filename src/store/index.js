import { createStore } from 'vuex';
import axios from 'axios';
import messagesModule from './messages.js';
import authModule from './auth.js';

axios.defaults.baseURL =
  'https://vue-http-demo-683e3-default-rtdb.europe-west1.firebasedatabase.app';

export const store = createStore({
  modules: {
    messages: messagesModule,
    auth: authModule,
  },
  state() {
    return {
      coaches: [],
    };
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
  },
  mutations: {
    setCoaches(state, payload) {
      const coaches = [];
      for (const id in payload) {
        coaches.push({ id, ...payload[id] });
      }
      state.coaches = coaches;
    },
  },
  actions: {
    async loadCoaches(context) {
      const responce = await axios.get('/coaches/.json');
      context.commit('setCoaches', responce.data);
    },
    async saveInfo(context, payload) {
      const token = context.getters.token;
      const userId = context.getters.userId;
      await axios.put(`/coaches/${userId}.json?auth=${token}`, payload);
    },
  },
});
