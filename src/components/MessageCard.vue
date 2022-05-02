<template>
  <el-card class="w-[480px] mb-px">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-bold">{{ name }}</span>
        <span>{{ email }}</span>
      </div>
    </template>
    <div class="mb-3 flex justify-between">
      <span class="text-[14px]">{{ message }}</span>
      <el-button class="ml-2" @click="deleteMessage">Delete</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  emits: ["deleteMessage"],
  methods: {
    deleteMessage() {
      this.$emit("deleteMessage");
    },
  },
};
</script>
