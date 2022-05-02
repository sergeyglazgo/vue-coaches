<template>
  <section class="w-[500px] m-auto">
    <el-form
      :label-position="labelPosition.value"
      label-width="100px"
      :model="form"
    >
      <el-form-item label="Name">
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label="Surname">
        <el-input v-model.trim="form.lastName" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model.trim="form.description" type="textarea" />
      </el-form-item>
      <el-form-item v-if="!isFormValid" class="text-red-600 m-0">
        <span>Please fill the form</span>
      </el-form-item>
      <el-form-item v-if="error" class="text-red-600 m-0">
        <span>{{ error }}</span>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">Cancel</el-button>
        <el-button @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { reactive, ref } from "vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isFormValid: true,
      error: null,
    };
  },
  computed: {
    form() {
      return reactive({
        name: "",
        lastName: "",
        description: "",
      });
    },
    labelPosition() {
      return ref("right");
    },
  },
  methods: {
    ...mapActions(["saveInfo"]),
    async onSubmit() {
      if (
        this.form.name === "" ||
        this.form.lastName === "" ||
        this.form.description === ""
      ) {
        this.isFormValid = false;
        return;
      }
      try {
        await this.saveInfo({
          ...this.form,
          rate: "no ratings yet",
        });
        this.isFormValid = true;
        this.form.name = "";
        this.form.lastName = "";
        this.form.description = "";
      } catch {
        this.error = 'Something went wrong';
      }
    },
    cancel() {
      this.$router.replace("/account");
    },
  },
};
</script>

<style>
.registration {
  width: 500px;
  margin: 0 auto;
}
</style>