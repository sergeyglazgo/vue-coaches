<template>
  <el-button type="default" @click="dialogFormVisible = true">Sign In</el-button>

  <el-dialog v-model="dialogFormVisible" title="Sign In">
    <p v-if="!!error">{{ error }}</p>
    <p v-if="isLoading">Authenticating...</p>
    <el-form :model="form">
      <el-form-item
        :label-width="formLabelWidth"
        prop="email"
        label="Email"
        :rules="[
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password" prop="pass" :label-width="formLabelWidth">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <p v-if="!formIsValid">Please fill the fields</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button @click="onSubmit">{{ submitButtonCaption }}</el-button>
        <el-button @click="switchAuthMode">{{ switchButtonCaption }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive } from "vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialogFormVisible: false,
      mode: "login",
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    formLabelWidth() {
      return "140px";
    },
    form() {
      return reactive({
        email: "",
        password: "",
      });
    },
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    ...mapActions(["signup", "login"]),
    async onSubmit() {
      this.formIsValid = true;
      this.error = null;

      if (this.form.email === "" || this.form.password.length < 6) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === "login") {
          await this.login({ ...this.form });
          this.$router.replace('/account');
        } else {
          await this.signup({ ...this.form });
          this.$router.replace('/account');
        }
      } catch {
        this.error = "Failed to authenticate";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
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
