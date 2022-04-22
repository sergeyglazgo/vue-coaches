<template>
  <section>
    <router-link v-if="!isCoach" to="/register" class="el-button">
      Register as Coach
    </router-link>
    <h2>{{ recievedMessages.length ? 'Recieved Messages' : 'No messages yet'}}</h2>
    <ul>
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
import { mapActions, mapGetters } from "vuex";

export default {
  components: { MessageCard },
  methods: {
    ...mapActions(["loadMessages"]),
  },
  computed: {
    ...mapGetters(["messages", "coaches", "userId", "isAuthenticated"]),
    isCoach() {
      return this.coaches.find((coach) => coach.id === this.userId);
    },
    recievedMessages() {
      return this.messages.filter((message) => message.coachId === this.userId);
    },
  },
  created() {
    this.loadMessages();
  },
};
</script>

<style>
</style>