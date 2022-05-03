import axios from 'axios';

export default {
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
};
