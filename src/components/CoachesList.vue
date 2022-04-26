<template>
  <h2 class="title">
    {{ error ? "Somethting went wrong" : "Find your Coach" }}
  </h2>
  <div class="search-wrapper">
    <el-input v-model="searchValue" placeholder="Search coach" />
  </div>
  <the-loader v-if="!coaches.length && !error"></the-loader>
  <ul class="coach-list">
    <li v-for="coach in filteredCoaches" :key="coach.id">
      <coach-card
        :id="coach.id"
        :name="coach.name"
        :lastName="coach.lastName"
        :description="coach.description"
        :rate="coach.rate"
      ></coach-card>
    </li>
  </ul>
</template>

<script>
import CoachCard from "./CoachCard.vue";
import TheLoader from "./TheLoader.vue";
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";

export default {
  components: { CoachCard, TheLoader },
  data() {
    return {
      error: null,
      searchValue: ref(""),
    };
  },
  methods: {
    ...mapActions(["loadCoaches"]),
    async getCoaches() {
      try {
        await this.loadCoaches();
      } catch {
        this.error = "Something went wrong";
      }
    },
  },
  computed: {
    ...mapGetters(["coaches"]),
    filteredCoaches() {
      const input = this.searchValue.toLowerCase();

      if (input) {
        return this.coaches.filter(
          (coach) =>
            coach.name.toLowerCase().includes(input) ||
            coach.lastName.toLowerCase().includes(input) ||
            coach.description.toLowerCase().includes(input)
        );
      } else {
        return this.coaches;
      }
    },
  },
  created() {
    this.getCoaches();
  },
};
</script>

<style>
.coach-list {
  width: max-content;
  margin: 0 auto;
}
.title {
  text-align: center;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
}
.search-wrapper {
  margin: 0 auto;
  width: 480px;
  margin-bottom: 15px;
}
</style>