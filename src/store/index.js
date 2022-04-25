import { createStore } from 'vuex';
import axios from 'axios';
import messagesModule from './messages.js';
import authModule from './auth.js';

const store = createStore({
  modules: {
    messages: messagesModule,
    auth: authModule,
  },
  state() {
    return {
      coaches: [],
    };
  },
  mutations: {
    setCoaches(state, payload) {
      const coaches = [];
      for (const id in payload) {
        coaches.push({
          id,
          name: payload[id].name,
          lastName: payload[id].lastName,
          description: payload[id].description,
        });
      }
      state.coaches = coaches;
    },
  },
  actions: {
    async loadCoaches(context) {
      const responce = await axios.get(
        `https://vue-http-demo-683e3-default-rtdb.europe-west1.firebasedatabase.app/coaches/.json`
      );
      context.commit('setCoaches', responce.data);
    },
    async saveInfo(context, payload) {
        const token = context.getters.token;
        const userId = context.getters.userId;
        await axios.put(
          `https://vue-http-demo-683e3-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
          payload
        );
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
  },
});

export default store;
