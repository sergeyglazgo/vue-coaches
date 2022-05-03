<template>
  <h2 class="title text-center mb-4 font-bold text-3xl">
    {{ error ? "Somethting went wrong" : "Find your Coach" }}
  </h2>
  <div class="search-wrapper w-[480px] mb-3 mx-auto">
    <el-input v-model="searchValue" placeholder="Search coach" />
  </div>
  <ul v-loading="isLoading" class="w-max my-0 mx-auto">
    <li v-for="coach in filteredCoaches" :key="coach.id">
      <CoachCard
        :id="coach.id"
        :name="coach.name"
        :last-name="coach.lastName"
        :description="coach.description"
        :rate="coach.rate"
      />
    </li>
  </ul>
</template>

<script>
import CoachCard from "./CoachCard.vue";
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";

export default {
  components: { CoachCard },
  data() {
    return {
      error: null,
      isLoading: false,
      searchValue: ref(""),
    };
  },
  methods: {
    ...mapActions(["loadCoaches"]),
    async getCoaches() {
      try {
        this.isLoading = true;
        await this.loadCoaches();
      } catch {
        this.error = "Something went wrong";
      } finally {
        this.isLoading = false;
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
