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
      const userId = this.state.auth.userId;
      const messages = [];
      for (const id in payload) {
        messages.push({ id, ...payload[id] });
      }
      state.messages = messages.filter(message => message.coachId === userId);
    },
    setMessagesAfterDeleting(state, messageId) {
      state.messages = state.messages.filter(message => message.id !== messageId);
    }
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
    async deleteMessage(context, messageId) {
      await axios.delete(`/requests/${messageId}.json`);
      context.commit('setMessagesAfterDeleting', messageId);
    },
  },
};
