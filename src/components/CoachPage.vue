<template>
  <section>
    <router-link
      v-if="!isCoach"
      to="/register"
      class="el-button block mb-3 w-[300px] mx-auto"
    >
      Register as Coach
    </router-link>
    <h2 class="title text-center font-bold text-2xl mb-3">
      {{ titleCaption }}
    </h2>
    <ul v-loading="isLoading" class="messages-list w-max mx-auto">
      <li v-for="message in messages" :key="message.id">
        <MessageCard
          :id="message.id"
          :name="message.name"
          :message="message.message"
          :email="message.email"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import MessageCard from "./MessageCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { MessageCard },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions(["loadMessages", "loadCoaches"]),
    async getMessages() {
      try {
        this.isLoading = true;
        await this.loadMessages();
      } catch {
        this.error = "Something went wrong";
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    ...mapGetters(["messages", "coaches", "userId", "isAuthenticated"]),
    isCoach() {
      return this.coaches.find((coach) => coach.id === this.userId);
    },
    titleCaption() {
      if (!this.isLoading && this.error) {
        return "Something went wrong";
      } else if (
        !this.isLoading &&
        !this.error &&
        !this.messages.length
      ) {
        return "No messages yet";
      } else if (
        !this.isLoading &&
        !this.error &&
        this.messages.length
      ) {
        return "Recieved Messages";
      }
    },
  },
  created() {
    this.loadCoaches();
    this.getMessages();
  },
};
</script>
