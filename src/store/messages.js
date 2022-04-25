import axios from 'axios';

export default {
  state() {
    return {
      messages: [],
    };
  },
  mutations: {
    setMessages(state, payload) {
      const messages = [];
      for (const id in payload) {
        messages.push({
          id,
          name: payload[id].name,
          email: payload[id].email,
          message: payload[id].message,
          coachId: payload[id].coachId,
        });
      }
      state.messages = messages;
    },
  },
  actions: {
    async loadMessages(context) {
      const token = context.getters.token;
      const responce = await axios.get(
        `https://vue-http-demo-683e3-default-rtdb.europe-west1.firebasedatabase.app/requests.json?auth=${token}`
      );
      context.commit('setMessages', responce.data);
    },
    async sendMessage(_, payload) {
      await axios.post(
        'https://vue-http-demo-683e3-default-rtdb.europe-west1.firebasedatabase.app/requests.json',
        payload
      );
    },
  },
  getters: {
    messages(state) {
      return state.messages;
    },
  },
};
