<template>
  <div>
    <div class="mx-10" v-if="!active2fa">
      <p class="description color-white-50 text-center mb-2">
        Google Authenticator đã được bật. Để hủy kích hoạt, nhập mã Google
        Authenticator và nhấn Hủy kích hoạt.
      </p>
      <div class="qrcode">
        <div class="vx-row mb-5 mb-sm-4 items-center justify-center ccQR">
          <div class="md:w-5/12 text-center qr-code-wrap mb-3 mb-md-0">
            <div class="qr-code-container qr-200 mx-auto">
              <img
                height="150"
                width="150"
                :src="linkBase64Img"
                style="height: 150px; width: 150px"
              />
            </div>
          </div>
          <div class="w-full text-center">
            <p class="desc mb-0">
              <small class="description">
                <span class="noted" style="color: red">
                  Mở ứng dụng Google Authenticator của bạn và quét mã QR bên
                  dưới hoặc nhập khóa vào ứng dụng. Khóa này dùng để khôi phục
                  Xác thực Google của bạn khi bạn đổi hoặc mất điện thoại. Vui
                  lòng sao lưu khóa này trước khi kích hoạt Xác thực Google.
                </span>
              </small>
            </p>
          </div>
        </div>
        <div class="vx-row backupkey">
          <div class="flex justify-between w-full">
            <div class="label color-white-50">Mã sao lưu:</div>
            <div class="key pl-0 pr-lg-3 pr-0">
              <div class="grouplabel">
                <div class="input-group relative">
                  <vs-input
                    class="w-full"
                    readonly="readonly"
                    icon-pack="feather"
                    icon="icon-copy"
                    icon-after
                    placeholder="icon-after"
                    v-model="MSLuu"
                  />
                  <div class="input-group-append">
                    <a
                      href.parent
                      class="input-group-addon"
                      @click="copyMSL"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-10">
      <div class="vx-row">
        <div class="relative w-full">
          <vs-input
            class="w-full"
            label="Mã 2FA"
            placeholder="Nhập mã 2FA"
            v-model="code2FA"
          />
        </div>
      </div>
      <div class="w-full text-center" style="margin-top: 1rem">
        <vs-button
          class="w-64"
          color="rgb(62, 201, 214)"
          type="filled"
          @click="changeActive2fa()"
          >{{ active2fa ? "Tắt" : "Bật" }}</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  props: {
    active2fa: {
      type: Boolean,
      default: false,
    },
    toggle2fa: {
      type: Function,
    },
  },

  data() {
    return {
      disSendCode: false,
      MSLuu: "",
      linkBase64Img: "",
      code2FA: "",
      //   codeActive: "",
      passwordSend: "",
      //   ssDownSend: "Gửi mã",
      backgroundLoading: "primary",
      colorLoading: "#fff",
    };
  },
  methods: {
    copyMSL() {
      const thisIns = this;

      this.$copyText(this.MSLuu).then(
        function () {
          thisIns.$vs.notify({
            text: "Đã sao chép vào bộ nhớ",
            color: "success",
            iconPack: "feather",
            position: "top-right",
            icon: "icon-check-circle",
          });
        },
        function () {
          thisIns.$vs.notify({
            text: "Lỗi sao chép",
            color: "danger",
            iconPack: "feather",
            position: "top-right",
            icon: "icon-alert-circle",
          });
        }
      );
    },

    changeActive2fa() {
      if (!this.active2fa) {
        this.verify();
      } else {
        this.unVerify();
      }
    },
    verify() {
      let secret = this.MSLuu;

      if (secret == "" || this.code2FA == "") {
        return this.$vs.notify({
          text: "Các trường không được rỗng.",
          iconPack: "feather",
          icon: "icon-check",
          position: "top-right",
          color: "danger",
        });
      }

      let obj = {
        s: secret,
        t: this.code2FA,
      };

      AuthenticationService.active2fa(obj).then((res) => {
        if (res.data.success == 1) {
          this.code2FA = "";
          this.toggle2fa();
          return this.$vs.notify({
            text: "Bật Google 2FA thành công.",
            iconPack: "feather",
            icon: "icon-check",
            position: "top-right",
            color: "success",
          });
        } else if (res.data.success == 0) {
          return this.$vs.notify({
            text: "Lỗi.",
            iconPack: "feather",
            icon: "icon-check",
            position: "top-right",
            color: "danger",
          });
        } else if (res.data.success == 2) {
          return this.$vs.notify({
            text: "Mã 2FA không chính xác.",
            iconPack: "feather",
            icon: "icon-check",
            position: "top-right",
            color: "danger",
          });
        } else if (res.data.success == 4) {
          localStorage.removeItem("INFO");
          localStorage.removeItem("token");
          this.$router.push({ name: "page-login" });
        }
      });
    },

    unVerify() {
      if (
        this.code2FA == ""
        // this.codeActive == "" ||
        // this.passwordSend == ""
      ) {
        return this.$vs.notify({
          text: "Vui lòng nhập mã 2FA.",
          iconPack: "feather",
          icon: "icon-check",
          position: "top-right",
          color: "danger",
        });
      }

      let obj = {
        t: this.code2FA,
        // c: this.codeActive,
        // p: this.passwordSend,
      };

      AuthenticationService.disable2fa(obj).then((res) => {
        if (res.data.success == 1) {
          this.code2FA = "";
          //   this.isActive2FA = false;
          //khởi tạo lại 2FA
          this.toggle2fa();
          this.createQRCode2FA();

          return this.$vs.notify({
            text: "Tắt Google 2FA thành công.",
            iconPack: "feather",
            icon: "icon-check",
            position: "top-right",
            color: "success",
          });
        } else if (res.data.success == 0) {
          return this.$vs.notify({
            text: "Lỗi",
            iconPack: "feather",
            icon: "icon-check",
            position: "top-right",
            color: "danger",
          });
        } else if (res.data.success == 2) {
          return this.$vs.notify({
            text: "Mã 2FA không chính xác.",
            iconPack: "feather",
            icon: "icon-check",
            position: "top-right",
            color: "danger",
          });
        } else if (res.data.success == 4) {
          localStorage.removeItem("INFO");
          localStorage.removeItem("token");
          this.$router.push({ name: "page-login" });
        }
      });
    },

    createQRCode2FA() {
      AuthenticationService.createGG2FA(true).then((res) => {
        if (res.data.success) {
          this.MSLuu = res.data.s;
          this.linkBase64Img = res.data.qr;
        }
        if (res.data.success == 4) {
          localStorage.removeItem("INFO");
          localStorage.removeItem("token");
          this.$router.push({ name: "page-login" });
        }
      });
    },
  },
  created() {
    if (!this.active2fa) {
      this.createQRCode2FA();
    } else {
      //   this.isActive2FA = true;
    }
  },
};
</script>

<style scoped>
.backupkey {
  line-height: 34px;
  margin-top: 0;
  margin-bottom: 10px;
}
.backupkey .input-group-append {
  position: absolute;
  right: 10px;
  top: 5px;
  z-index: 999;
}
.backupkey .input-group-append a {
  width: 20px;
  height: 20px;
  display: inline-block;
  cursor: pointer;
}

.qrcode .paste {
  position: absolute;
  right: 10px;
  top: 70%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #2177ff;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .gg {
    overflow-x: auto;
    /* height: 300px; */
    margin: 0 !important;
    padding: 2rem;
  }
  .ccQR {
    justify-content: center;
  }
}
</style>
<style>
.qrcode input {
  border-color: #737373 !important;
}
.ld-loading::after {
  position: relative;
  content: "";
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.ld-loading .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transform: translate(-50%, -50%);
}
.ld-loading .loading__ring {
  position: absolute;
  width: 50px;
  height: 50px;
}
.ld-loading .loading__ring:first-child {
  transform: skew(30deg, 20deg);
}
.ld-loading .loading__ring:last-child {
  transform: skew(-30deg, -20deg) scale(-1, 1);
}
.ld-loading .loading__ring:last-child svg {
  animation-delay: -0.5s;
}
.ld-loading .loading__ring svg {
  animation: rotate 1s linear infinite;
  fill: #597079;
}
</style>
