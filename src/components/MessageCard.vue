<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>
          <strong>{{ name }}</strong>
        </span>
        <span>{{ email }}</span>
      </div>
    </template>
    <div class="text item">
      {{ message }}
    </div>
  </el-card>
</template>

<script>
export default {
  props: ["id", "name", "message", 'email'],
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
