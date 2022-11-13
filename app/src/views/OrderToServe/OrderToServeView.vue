<template>
  <div class="relative">
    <div class="flex flex-row main-content-employee-view">
      <div class="flex">
        <i>
          <button @click="showMenu()">
            <span class="material-symbols-outlined"> menu </span>
          </button>
        </i>
        <div
          class="
            w-64
            absolute
            inset-y-0
            left-0
            md:relative md:-translate-x-0
            transform
            -translate-x-full
            transition
            duration-200
            ease-in-out
          "
          :class="
            this.showMobileMenu ? 'relative -translate-x-0' : 'closed-menu'
          "
        >
          <h3 class="flex headline-large ml-4 mb6-4">อร่อยโภชนา</h3>
          <SectionHeader label="สำหรับพนักงาน" />
          <NavItem
            v-for="(item, index) in navItems"
            :id="index"
            :label="item.label"
            :active="item.activeId"
            :url="item.router"
            :onClickItem="onClickItem"
            :key="index"
          >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </NavItem>
        </div>
      </div>

      <div class="p-4 flex-grow">
        <h1 class="headline-medium">รายการอาหารที่ต้องเสิร์ฟ</h1>
        <div class="py-4 text-right flex-col">
          <label for="order_amount">{{ totalOrders }} รายการ</label>
        </div>
        <div>
          <ToServeItem
            v-for="(table, index) in tableOrderList"
            :orders="table.order_description"
            :tableNumber="table.table_number"
            :serveDone="() => onServedDone(index)"
            :key="index"
          >
          </ToServeItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavItem from "../../components/NavBarDrawer/NavItem.vue";
import SectionHeader from "../../components/NavBarDrawer/SectionHeader.vue";
import ToServeItem from "../../components/ToServeItem/ToServeItem.vue";
import { useOrderStore } from "../../stores/order";
import { orderDescriptionApi } from "../../services/api";

export default {
  components: {
    NavItem,
    SectionHeader,
    ToServeItem,
  },

  setup() {
    const orderStore = useOrderStore();
    return { orderStore };
  },

  created() {
    this.fetchOrder();
  },

  computed: {
    orderToServeList(){
      const orderToServe = this.tableOrderList.reduce((prev,curr) =>
        [...prev, ...curr.order_description],[]);return orderToServe.order_status === 'พร้อมเสิร์ฟ';
  },
    totalOrders() {
      return this.tableOrderList.length;
    },
    tableOrderList() {
      console.log(this.orderList);
      return this.orderList.reduce(
        (prev, curr) => {
          const newOrderDescription = curr
          .order_description
          .filter((od) => od.order_status === "พร้อมเสิร์ฟ");

          if (newOrderDescription.length){
           return [...prev, {...curr,order_description: newOrderDescription,}]
          }
          return prev
        },
        []
      );
    },
  },

  methods: {
    // โชว์navbar
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    async fetchOrder() {
      await this.orderStore.fetch();
      console.log(this.orderStore.orders);
      const orderList = this.orderStore.orders;
      this.orderList = orderList;
      console.log(this.orderList);
    },
    onClickItem(id, url) {
      this.activeId = id;
      if (url != "") {
        this.$router.push(url);
      }
    },
    onServedDone(orderIndex) {
      let success = true;
      const servedOrderItem = this.tableOrderList[orderIndex].order_description;
      servedOrderItem.forEach(async (oitem) => {
        let response = await orderDescriptionApi.updateStatus(oitem.id);
        response = response.data || response;
      });

      if (success) {
        this.fetchOrder();
      }
    },
  },

  data() {
    return {
      showMobileMenu: false,
      orderList: [],

      navItems: [
        {
          label: "รับลูกค้าใหม่",
          icon: "sentiment_satisfied",
          router: "/employee/new-customer",
          activeId: 0,
        },
        {
          label: "จ่ายเงิน",
          icon: "payment",
          router: "/employee/payment/create-promptpay",
          activeId: 0,
        },
        {
          label: "อาหารที่ต้องเสิร์ฟ",
          icon: "room_service",
          router: "/employee/order/serve",
          activeId: 1,
        },
        {
          label: "อาหารที่ต้องทำ",
          icon: "soup_kitchen",
          router: "/employee/order/order-to-do",
          activeId: 0,
        },
        { label: "ออกจากระบบ", icon: "logout", router: "/logout", activeId: 0 },
      ],
    };
  },
};
</script>
