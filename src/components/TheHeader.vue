<template>
  <header class="el-header">
    <nav>
      <router-link to="/coaches" class="el-button">Coaches</router-link>
      <router-link v-if="isLoggedIn" to="/account" class="el-button">
        Your Account
      </router-link>
      <user-auth v-if="!isLoggedIn"></user-auth>
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