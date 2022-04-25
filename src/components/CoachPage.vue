<template>
  <section>
    <router-link v-if="!isCoach" to="/register" class="el-button">
      Register as Coach
    </router-link>
    <the-loader v-if="isLoading"></the-loader>
    <h2 class="title">{{ titleCaption }}</h2>
    <ul class="messages-list flex-column">
      <li v-for="message in recievedMessages" :key="message.id">
        <message-card
          :id="message.id"
          :name="message.name"
          :message="message.message"
          :email="message.email"
        ></message-card>
      </li>
    </ul>
  </section>
</template>

<script>
import MessageCard from "./MessageCard.vue";
import TheLoader from "./TheLoader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { MessageCard, TheLoader },
  data() {
    return {
      isLoading: true,
      error: null,
    }
  },
  methods: {
    ...mapActions(["loadMessages"]),
    async getMessages() {
      try {
        await this.loadMessages();
        this.isLoading = false;
      } catch {
        this.error = 'Something went wrong';
      }
    }
  },
  computed: {
    ...mapGetters(["messages", "coaches", "userId", "isAuthenticated"]),
    isCoach() {
      return this.coaches.find((coach) => coach.id === this.userId);
    },
    recievedMessages() {
      return this.messages.filter((message) => message.coachId === this.userId);
    },
    titleCaption() {
      if (this.error) {
        return 'Something went wrong';
      } else if (this.recievedMessages.length) {
        return 'Recieved Messegas';
      } else {
        return 'Not messages yet';
      }
    }
  },
  created() {
    this.getMessages();
  },
};
</script>

<style scoped>
.messages-list {
  width: max-content;
  margin: 0 auto;
}
.title {
  text-align: center;
  margin: 15px;
  font-size: 20px;
  font-weight: bold;
}
.el-button {
  display: block;
  margin: 0 auto;
  width: 300px;
}
</style>