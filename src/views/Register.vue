<template>
  <div class="container">
    <el-row class="row-bg" justify="end" style="padding-top: 1rem" type="flex">
      <el-col :span="2">
        <el-button @click="goToLoginPage" type="primary">
          Sign In
        </el-button>
      </el-col>
    </el-row>
    <el-form :model="user" class="user-form" label-position="top" label-width="5rem" ref="user">
      <el-alert :title="alert.message" :type="alert.type" effect="dark" show-icon v-if="alert.message" />
      <div class="user-form-title-container">
        <h3 class="user-form-title ">
          Sign Up
        </h3>
      </div>
      <el-form-item :rules="emailRules" label="Email" prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
      <el-form-item label="Username">
        <el-input type="text" v-model="user.username" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="user.password" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="!user.email || !user.username || !user.password"
          @click="handleSubmit"
          class="user-form-button"
          native-type="submit"
          type="primary"
        >
          Sign Up
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Actions } from '@/constants/actions';
import { Messages } from '@/constants/messages';

@Component
export default class Register extends Vue {
  emailRules = [{ type: 'email', message: Messages.email.invalid, trigger: ['blur', 'change'] }];
  user = {
    email: '',
    username: '',
    password: '',
  };

  get alert() {
    return this.$store.state.alert;
  }

  goToLoginPage() {
    this.$router.push('/login');
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.$store.dispatch(Actions.REGISTER, this.user);
  }
}
</script>
