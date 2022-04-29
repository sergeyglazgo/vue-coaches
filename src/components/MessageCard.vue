<template>
  <el-card class="w-[480px] mb-px">
    <template #header>
      <div class="flex justify-between items-center">
        <span>
          <strong>{{ name }}</strong>
        </span>
        <span>{{ email }}</span>
      </div>
    </template>
    <div class="text-[14px] mb-3">
      {{ message }}
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
};
</script>
