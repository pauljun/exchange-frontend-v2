<template>
  <div id="list-history-deposit" class="data-list-container">
    <div class="flex-between-center">
      <div>TỔNG {{ tableType == "nap" ? "NẠP" : "RÚT" }} THÀNH CÔNG</div>
      <p style="color: rgb(25 146 246)">
        Tổng {{ tableType == "nap" ? "nạp" : "rút" }}: ${{
          this.formatPrice(tongNap, 2)
        }}
      </p>
    </div>

    <div id="loading-corners-nap" class="vs-con-loading__container">
      <a-table
        :columns="columns"
        :data-source="products"
        :row-key="(record, index) => index"
      >
        <template slot="account" slot-scope="row"
          >{{ row.from_u }}<br />Mô tả: {{ row.type }}</template
        >
        <template slot="type" slot-scope="row">
          <p class="de-name font-medium truncate">
            <span>
              <IconCrypto
                style="width: 20px"
                :coinname="getIconType(row.currency)"
                color="color"
                format="svg"
                v-if="row.paypal == null"
              />
              <img width="20" :src="typeMoney(row.currency).i" v-else />
              {{ typeMoney(row.currency).t }}
            </span>
          </p>
        </template>
        <template slot="amount" slot-scope="row">
          {{ getAmountDecimal(row.currency, row.amount) }}<br />
        </template>
        <template slot="note" slot-scope="row">
          <p class="de-note">{{ row.note }}</p>
        </template>
        <template slot="status" slot-scope="row">
          <a-tag :color="getOrderStatusColor(row.status)"> Thành công </a-tag>
        </template>
        <template slot="createdAt" slot-scope="row">
          <p class="de-create">{{ formatDate(row.created_at) }}</p>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";

const columns = [
  {
    title: "Tài khoản",
    key: "account",
    scopedSlots: { customRender: "account" },
  },

  {
    title: "Loại",
    key: "type",
    scopedSlots: { customRender: "type" },
  },

  {
    title: "Số tiền",
    key: "amount",
    scopedSlots: { customRender: "amount" },
  },
  {
    title: "Ghi chú",
    key: "note",
    scopedSlots: { customRender: "note" },
  },

  {
    title: "Trạng thái",
    key: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "Thời gian giao dịch",
    key: "createdAt",
    scopedSlots: { customRender: "createdAt" },
  },
];
export default {
  components: {},
  props: {
    email: { type: String },
    tableData: { type: Array, default: () => [] },
    tableType: { type: String },
  },
  data() {
    return {
      columns,
      // selectedUser: [],

      // itemsPerPage: 10,
      // currentDataMoney: {},
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    products() {
      return this.tableData;
    },

    // queriedItems() {
    //   return this.$refs.table
    //     ? this.$refs.table.queriedResults.length
    //     : this.productsFake.length;
    // },

    tongNap() {
      return this.products.reduce((prev, curr) => {
        return curr.status === 1 ? parseFloat(curr.amount) + prev : 0 + prev;
      }, 0);
    },
  },
  methods: {
    onTimeChange(e) {
      let timQuery = e !== "all" ? `f=${e}` : "";
      this.reloadList(timQuery);
    },

    filterFromToDate() {
      let from = moment(this.startDate).format("YYYY-MM-DD");
      let to = moment(this.endDate).format("YYYY-MM-DD");
      let timeQuery = `from=${from}&to=${to}`;
      this.reloadList(timeQuery);
    },

    getOrderStatusColor(status) {
      if (status == 0) return "orange";
      if (status == 1) return "green";
      //if(status == 2) return "danger"
      return "orange";
    },
    getOrderStatusColorText(status) {
      if (status == 0) return "Đang xử lý";
      if (status == 1) return "Hoàn thành";
      if (status == -1) return "Từ chối";
      //if(status == 2) return "danger"
      return "Đang xử lý";
    },

    getIconType(type) {
      let cur = type.toUpperCase();
      return cur;
    },

    typeMoney(currency) {
      switch (currency.toUpperCase()) {
        case "BTC":
        case "ETH":
        case "USDT":
          return {
            t: "Hệ thống",
            i: require("@/assets/images/sky/icon_bank/paypal-mini.png"),
          };
        case "VND":
          return {
            t: "Ngân hàng VNĐ",
            i: require("@/assets/images/sky/icon_bank/vnd-mini.svg"),
          };

        default:
          return {
            t: currency.toUpperCase(),
            i: require("@/assets/images/sky/icon_bank/paypal-mini.png"),
          };
      }
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY HH:mm:ss");
      }
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

    getAmountDecimal(type, value) {
      let cur = "$";
      let coin = type.toUpperCase();
      let minimum = 2;
      if (coin == "BTC") minimum = 6;

      if (coin == "ETH") minimum = 4;

      if (coin == "USDT") minimum = 2;

      if (coin == "VN") minimum = 0;

      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum,
      });

      return cur + formatter.format(value);
    },

    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
  },
  created() {},

  mounted() {},

  watch: {},
};
</script>

<style lang="scss">
#list-history-deposit {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
