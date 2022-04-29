<template>
  <el-card class="w-[480px] mb-px">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-bold">{{ name }} {{ lastName }}</span>
        <NewMessage :coachId="id" />
      </div>
    </template>
    <div class="text-[14px] mb-4">
      {{ description }}
    </div>
  </el-card>
</template>

<script>
import NewMessage from './modals/NewMessage.vue';

export default {
  components: { NewMessage },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
};
</script>
