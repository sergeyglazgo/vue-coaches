<template>
  <header class="py-6">
    <nav class="flex justify-center">
      <router-link to="/coaches" class="el-button">Coaches</router-link>
      <router-link v-if="isLoggedIn" to="/account" class="el-button">
        Your Account
      </router-link>
      <UserAuth v-if="!isLoggedIn" />
      <el-button v-if="isLoggedIn" @click="logout">Logout</el-button>
    </nav>
  </header>
</template>

<script>
import UserAuth from "./modals/UserAuth.vue";

export default {
  components: { UserAuth },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.replace('/coaches');
      }
    }
};
</script>
