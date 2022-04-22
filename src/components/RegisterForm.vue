<template>
  <div style="margin: 20px" />
  <el-form
    :label-position="labelPosition.value"
    label-width="100px"
    :model="form"
    style="max-width: 460px"
  >
    <el-form-item label="Name" >
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Surname">
      <el-input v-model="form.lastName" />
    </el-form-item>
    <el-form-item label="Description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from "vue";
import { mapActions } from "vuex";

export default {
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
    onSubmit() {
      this.saveInfo({
        ...this.form,
        rate: "no ratings yet",
      });
      this.form.name = "";
      this.form.lastName = "";
      this.form.description = "";
    },
  },
};
</script>