<template>
  <div class="main-content-employee-view">
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
        :class="this.showMobileMenu ? 'relative -translate-x-0' : 'closed-menu'"
      >
        <h3 class="headline-large ml-4 mb6-4">อร่อยโภชนา</h3>
        <SectionHeader/>
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

    <div class="w-full">
      <span class="headline-medium"> ตอนนี้กำลังดำเนินการ </span>
      <div class="order-cooking-page">
        <CookingBoard
          :id="orderItem.id"
          :tableNumber="orderItem.table_number"
          :foodName="food.food_name"
          :orderRequest="orderItem.order_request"
        />
        <div class="order-cooking-inside">
          <ServeFoodButton :onClick="updateStatus" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CookingBoard from "../../components/CookingBoard/CookingBoard.vue";
import CancelCookingFood from "../../components/CancelCookingFood/CancenCookingFood.vue";
import ServeFoodButton from "../../components/ServeFoodButton/ServeFoodButton.vue";
import NavItem from "../../components/NavBarDrawer/NavItem.vue";
import SectionHeader from "../../components/NavBarDrawer/SectionHeader.vue";
import { orderDescriptionApi, foodAPI } from "../../services/api";

export default {
  created() {
    this.orderDescriptionId = this.$route.params.orderDescriptionId;
    this.getOrderDetail();
  },
  components: {
    CookingBoard,
    CancelCookingFood,
    ServeFoodButton,
    NavItem,
    SectionHeader,
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    onClickItem(id, url) {
      this.activeId = id;
      if (url != "") {
        this.$router.push(url);
      }
    },
    async getOrderDetail() {
      const orderItem = await orderDescriptionApi.get(this.orderDescriptionId);
      this.orderItem = orderItem.data || orderItem;
      const food = await foodAPI.get(this.orderItem.food_id);
      this.food = food.data || food;
      // console.log(this.orderItem.order_request);
      // console.log(this.food);
    },
    async updateStatus() {
      let response = await orderDescriptionApi.updateStatus(this.orderDescriptionId);
      response = response.data || response;
      if (response.success) {
        this.$router.push({name: 'Order-to-cook'});
      }
    }
  },

  data() {
    return {
      orderDescriptionId: null,
      showMobileMenu: false,
      food: {},
      orderItem: {},
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
          activeId: 0,
        },
        {
          label: "อาหารที่ต้องทำ",
          icon: "soup_kitchen",
          router: "/employee/order/order-to-do",
          activeId: 1,
        },
        { label: "ออกจากระบบ", icon: "logout", router: "/logout", activeId: 0 },
      ],
    };
  },
};
</script>

<style>
.order-cooking-page {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

@media screen and (max-width: 768px) {
  .order-cooking-page {
    display: flex;
    flex-direction: column;
  }
}
</style>

