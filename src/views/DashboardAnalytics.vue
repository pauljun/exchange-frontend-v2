<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/4 mb-base">
        <vx-card :title="$t('Status')" :subtitle="$t('Today')">
          <template slot="actions">
            <feather-icon
              icon="MoreVerticalIcon"
              svgClasses="w-6 h-6 text-grey"
            >
            </feather-icon>
          </template>
          <div class="flex">
            <span class="flex items-center ml-4">
              <div class="h-3 w-3 rounded-full mr-1 bg-success"></div>
              <span>
                {{ $t("Online") }}
              </span>
            </span>
          </div>
          <div slot="no-body-bottom"></div>
        </vx-card>
      </div>

      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <vx-card :title="$t('Subscribers')">
          <h2 class="mb-1 font-bold">
            {{ dataGet.nNDK | k_formatter }}
          </h2>
        </vx-card>
      </div>

      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <vx-card :title="$t('Verified')">
          <h2 class="mb-1 font-bold">
            {{ dataGet.nNDXM | k_formatter }}
          </h2>
        </vx-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <vx-card :title="$t('Agency')">
          <h2 class="mb-1 font-bold">
            {{ dataGet.nDL | k_formatter }}
          </h2>
        </vx-card>
      </div>
    </div>

    <div class="vx-row">
      <!-- CARD 4: SESSION -->
      <div class="vx-col w-full md:w-1/2 mb-base">
        <div
          id="loading-corners"
          class="vs-con-loading__container overflow-visible"
        >
          <vx-card>
            <div
              class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row"
            >
              <div
                class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between"
                v-if="salesBarSession.analyticsData"
              >
                <div>
                  <h2 class="mb-1 font-bold">
                    {{ dataGet.tsNNT | k_formatter }}
                  </h2>
                  <span class="font-medium">
                    {{ $t("DepositAccount") }}
                  </span>

                  <!-- Previous Data Comparison -->
                  <p class="mt-2 text-xl font-medium">
                    <span
                      :class="
                        dataGet.tsTN7N >= 0 ? 'text-success' : 'text-danger'
                      "
                    >
                      <span v-if="dataGet.tsTN7N > 0">+</span>
                      <span>{{ dataGet.tsTN7N }}</span>
                    </span>
                    <span> {{ $t("Last7Day") }} </span>
                  </p>
                </div>
              </div>
            </div>
            <vs-divider class="my-6"></vs-divider>
            <v-select
              :options="timeOptions"
              class="style-chooser"
              v-model="isCheckShowDT"
              :reduce="(option) => option.code"
              @option:selected="onSelectedTime"
            >
            </v-select>
            <div class="flex items-end mt-2">
              <div class="mr-4">
                <small class="date-label">{{ $t("Since") }}</small>
                <datepicker
                  v-model="startDate"
                  format="dd-MM-yyyy"
                ></datepicker>
              </div>
              <div class="mr-4">
                <small class="date-label">{{ $t("ToDate") }}</small>
                <datepicker
                  name="end-date"
                  v-model="endDate"
                  format="dd-MM-yyyy"
                ></datepicker>
              </div>
              <vs-button
                @click="filterFromToDate"
                :disabled="!startDate || !endDate"
              >
                {{ $t("Find") }}
              </vs-button>
            </div>

            <div class="vx-row">
              <div class="vx-col w-1/2 mb-3">
                <p>
                  {{ $t("LoadingSystem") }} USDT:<br />
                  <span class="font-bold">
                    ${{ formatPrice(dataGet.tsTNUSD, 4) }}
                  </span>
                </p>
              </div>
              <div class="vx-col w-1/2 mb-3">
                <p>
                  {{ $t("Fee") }} GAS BNB:<br />
                  <span class="font-bold">
                    {{ formatPrice(dataGet.tsFee, 10) }}
                  </span>
                </p>
              </div>
            </div>
          </vx-card>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card :title="$t('RemainingUserBalance')">
          <div class="vx-row">
            <div class="vx-col w-1/2 mb-3">
              <p>
                {{ $t("TotalPaypalBalance") }} Paypal:<br />
                <span class="font-bold">
                  ${{ formatPrice(dataGet.tsTNPAYPALN, 2) }}
                </span>
              </p>
            </div>
            <div class="vx-col w-1/2 mb-3">
              <p>
                {{ $t("TotalPaypalBalance") }} BTC:<br />
                <span class="font-bold">
                  ${{ formatPrice(dataGet.tsTNBTCN, 6) }}
                </span>
              </p>
            </div>
            <div class="vx-col w-1/2 mb-3">
              <p>
                {{ $t("TotalPaypalBalance") }} ETH:<br />
                <span class="font-bold">
                  ${{ formatPrice(dataGet.tsTNETHN, 4) }}
                </span>
              </p>
            </div>
            <div class="vx-col w-1/2 mb-3">
              <p>
                {{ $t("TotalPaypalBalance") }} USDT:<br />
                <span class="font-bold">
                  ${{ formatPrice(dataGet.tsTNUSDN, 2) }}
                </span>
              </p>
            </div>
            <div class="vx-col w-1/2 mb-3">
              <p>
                {{ $t("TotalPaypalBalance") }} VN:<br />
                <span class="font-bold">
                  ${{ formatPrice(dataGet.tsTNVNN, 0) }}
                </span>
              </p>
            </div>
          </div>
        </vx-card>
      </div>

      <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <div id="loading-corners2" class="vs-con-loading__container">
          <vx-card :title="`${$t('ErrorSystem')} USD`">
            <div class="vx-row">
              <div class="vx-col w-1/2 mb-3">
                <p>
                  Tổng giao dịch sàn THẮNG:<br />
                  <span class="font-bold">
                    ${{ formatPrice(dataGet.tsLose, 4) }}
                  </span>
                </p>
              </div>
              <div class="vx-col w-1/2 mb-3">
                <p>
                  Tổng giao dịch sàn THUA:<br />
                  <span class="font-bold">
                    ${{ formatPrice(dataGet.tsWin, 4) }}
                  </span>
                </p>
              </div>
              <div class="vx-col w-1/2 mb-3">
                <p>
                  Tổng giao dịch Hoa Hồng:<br />
                  <span class="font-bold">
                    ${{ formatPrice(dataGet.tsHHong, 4) }}
                  </span>
                </p>
              </div>
              <div class="vx-col w-1/2 mb-3">
                <p>
                  {{ $t("ErrorSystem") }} USD:<br />
                  <span class="font-bold">
                    ${{
                      formatPrice(
                        dataGet.tsLose - dataGet.tsWin - dataGet.tsHHong,
                        4
                      )
                    }}
                  </span>
                </p>
              </div>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "./ui-elements/card/analyticsData.js";
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue";
import VxTimeline from "@/components/timeline/VxTimeline";
import AuthenticationService from "@/services/AuthenticationService";
import vSelect from "vue-select";
import moment from "moment";

import Datepicker from "vuejs-datepicker";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      isCheckShowDT: "all",
      checkpointReward: {},
      subscribersGained: {},
      ordersRecevied: {},
      salesBarSession: {},
      supportTracker: {},
      productsOrder: {},
      salesRadar: {},
      dataGet: {},
      rateTNFE: 0,
      analyticsData: analyticsData,
      dispatchedOrders: [],
      timeOptions: [
        { label: "Tất cả", code: "all" },
        { label: "Hôm nay", code: "today" },
        { label: "Tuần trước", code: "lastweek" },
        { label: "Tháng trước", code: "lastmonth" },
        { label: "3 tháng trước", code: "threelastmonth" },
      ],
    };
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline,
    vSelect,
    Datepicker,
  },
  methods: {
    filterFromToDate() {
      let from = moment(this.startDate).format("YYYY-MM-DD");
      let to = moment(this.endDate).format("YYYY-MM-DD");
      let timeQuery = {
        from: from,
        to: to,
      };
      this.changeDT(timeQuery);
    },

    openLoadingInDiv() {
      this.$vs.loading({
        container: "#loading-corners",
        type: "corners",
        scale: 0.6,
      });
      this.$vs.loading({
        container: "#loading-corners2",
        type: "corners",
        scale: 0.6,
      });
    },
    closeLoadingInDiv() {
      this.$vs.loading.close("#loading-corners > .con-vs-loading");
      this.$vs.loading.close("#loading-corners2 > .con-vs-loading");
    },

    formatPrice(value, minimum) {
      if (void 0 === value) value = 0;
      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum,
      });
      return formatter.format(value);
    },
    onSelectedTime() {
      this.changeDT({
        type: this.isCheckShowDT,
      });
    },
    changeDT(timeQuery) {
      this.openLoadingInDiv();
      AuthenticationService.getShowDT(timeQuery).then((res) => {
        let g = res.data;
        this.closeLoadingInDiv();
        if (g.code === 10000) {
          this.dataGet.tsTNUSD = g.data.dtUSD;
          this.dataGet.tsTNThuc = g.data.dtBNB;
          this.dataGet.tsFee = g.data.freeBNB;

          this.dataGet.tsWin = g.data.tsWin;
          this.dataGet.tsLose = g.data.tsLose;
          this.dataGet.tsHHong = g.data.tsHHong;
        }
      });
    },
  },
  created() {
    AuthenticationService.getAnalytics()
      .then((res) => {
        this.closeLoadingInDiv();

        if (res.data.code == 10000) {
          let obj = res.data.data;
          this.dataGet = obj;
        } else if (res.data.code === 40001) {
          localStorage.removeItem("token");
          this.$router.push("/pages/login").catch(() => {});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    this.openLoadingInDiv();
  },
};
</script>

<style lang="scss">
/*! rtl:begin:ignore */

#dashboard-analytics {
  padding: 0 1rem;
  .greet-user {
    position: relative;

    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
