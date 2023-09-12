<template>
  <div>
    <vs-input
      v-validate="'required|min:3'"
      data-vv-validate-on="blur"
      name="text"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      :label-placeholder="$t('Account')"
      v-model="username"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("username") }}</span>

    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      :label-placeholder="$t('Password')"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">
        {{ $t("Memorize") }}
      </vs-checkbox>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button :disabled="!validateForm" @click="loginJWT">
        {{ $t("Login") }}
      </vs-button>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data() {
    return {
      username: "arres@gmail.com",
      password: "catchadmin",
      checkbox_remember_me: false,
    };
  },
  computed: {
    validateForm() {
      return this.username != "" && this.password != "";
    },
  },
  methods: {
    async loginJWT() {
      this.$vs.loading();
      let userDetails = {
        email: this.username,
        password: this.password,
      };
      const response = await AuthenticationService.loginAdmin(userDetails);
      this.$vs.loading.close();
      if (response.data.code === 10000) {
        localStorage.setItem("token", response.data.data.token);
        this.$store.dispatch("setToken", response.data.data.token);
        this.$router.push("/analytics");
      } else {
        this.$vs.notify({
          title: this.$t("Error"),
          text: this.$t("ErrorPs"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "danger",
        });
      }
    },
  },
};
</script>

