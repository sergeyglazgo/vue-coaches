<template>
  <el-button type="text" @click="dialogFormVisible = true">Contact</el-button>

  <el-dialog width="480px" v-model="dialogFormVisible" title="New message">
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
    <div v-if="!isFormValid" class="isFormValid flex justify-end">
      <span>Please fill the form</span>
    </div>
    <div class="flex justify-end">
      <el-button @click="cancel">Cancel</el-button>
      <el-button @click="onSubmit">Send</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { reactive } from "vue";
import { mapActions } from "vuex";

export default {
  props: ["coachId"],
  data() {
    return {
      dialogFormVisible: false,
      isFormValid: true,
    };
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
    ...mapActions(["sendMessage"]),
    onSubmit() {
      const coachId = this.coachId;
      if (
        this.form.name === "" ||
        this.form.email === "" ||
        this.form.message === ""
      ) {
        this.isFormValid = false;
      } else {
        this.sendMessage({
          ...this.form,
          coachId,
        });
        this.isFormValid = true;
        this.form.name = "";
        this.form.email = "";
        this.form.message = "";
        this.dialogFormVisible = false;
      }
    },
    cancel() {
      this.dialogFormVisible = false;
      this.isFormValid = true;
    }
  },
};
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.isFormValid {
  margin: 0;
  color: red;
}
</style>
