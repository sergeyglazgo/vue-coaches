<template>
  <ul>
    <li v-for="coach in coaches" :key="coach.id">
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
import { mapActions, mapGetters } from "vuex";

export default {
  components: { CoachCard },
  methods: {
    ...mapActions(["loadCoaches"]),
  },
  computed: {
    ...mapGetters(["coaches"]),
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style>
</style>