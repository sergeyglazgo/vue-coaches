<template>
  <el-table v-loading="loading" style="width: 100%"></el-table>
</template>

<script>
import { ref } from 'vue';

export default {
  computed: {
    loading() {
      return ref(true);
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
