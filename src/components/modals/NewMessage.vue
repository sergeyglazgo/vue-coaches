<template>
  <el-button type="text" @click="dialogFormVisible = true"
    >Contact</el-button
  >

  <el-dialog v-model="dialogFormVisible" title="New message">
    <el-form :model="form">
      <el-form-item label="Your name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Your email" :label-width="formLabelWidth">
        <el-input v-model="form.email" type="email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Message" :label-width="formLabelWidth">
        <el-input v-model="form.message" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button @click="onSubmit">Send</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive } from "vue";
import { mapActions } from 'vuex';

export default {
  props: ['coachId'],
  data() {
    return {
      dialogFormVisible: false,
    }
  },
  computed: {
    formLabelWidth() {
      return "140px";
    },
    form() {
      return reactive({
        name: "",
        email: "",
        message: "",
      });
    },
  },
  methods: {
    ...mapActions(['sendMessage']),
    onSubmit() {
      const coachId = this.coachId;
      this.sendMessage({
        ...this.form,
        coachId,
        });
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-input {
  width: 300px;
}
.el-textarea {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
