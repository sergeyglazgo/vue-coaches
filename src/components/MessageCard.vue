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
    <span v-if="error" class="text-red-600 text-[14px]">{{ error }}</span>
  </el-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
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
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async deleteMessage() {
      try {
        await this.$store.dispatch("deleteMessage", this.id);
      } catch {
        this.error = 'Something went wrong!';
        setTimeout(() => {
          this.error = null;
        }, 1000);
      }
    },
  },
};
</script>
