import axios from 'axios';

export default {
  state() {
    return {
      messages: [],
    };
  },
  getters: {
    messages(state) {
      return state.messages;
    },
  },
  mutations: {
    setMessages(state, payload) {
      const messages = [];
      for (const id in payload) {
        messages.push({ id, ...payload[id] });
      }
      state.messages = messages;
    },
  },
  actions: {
    async loadMessages(context) {
      const token = context.getters.token;
      const responce = await axios.get(`/requests.json?auth=${token}`);
      context.commit('setMessages', responce.data);
    },
    async sendMessage(_, payload) {
      await axios.post('/requests.json', payload);
    },
  },
};
