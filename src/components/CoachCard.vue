<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>
          <strong>{{ name }} {{ lastName }}</strong>
        </span>
        <new-message :coachId="id"></new-message>
      </div>
    </template>
    <div class="text item">
      {{ description }}
    </div>
  </el-card>
</template>

<script>
import NewMessage from './modals/NewMessage.vue';

export default {
  components: { NewMessage },
  props: ["id", "name", "lastName", "description", "rate"],
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
