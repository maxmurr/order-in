<template>
  <div class="flex gap-2">
    <button class="floating-order-bar order-detail-bar" @click="onClickGoToCurrentOrder">
      <span class="material-symbols-outlined">
        shopping_cart
      </span>
      <div class="order-detail">
        <span>{{totalItem}}</span>
        <div class="flex ml-[14px]">
          <!-- <div
            class="order-item-image"
            v-for="item,id in currentOrder"
            :key="id"
            :style="{
              'background-image': `url(${item.image})`,
              'background-position': 'center',
              'background-size': 'cover',
              'margin-left': '-14px',
              'z-index': 10,
            }"
          /> -->
        </div>
        <span>฿{{totalPrice}}</span>
      </div>
    </button>
    <button @click="onClickToGoToAllOrders"
      class="floating-order-bar order-history-icon">
      <span class="material-symbols-outlined">
        history
      </span>
    </button>
  </div>
  </template>

<script>
import { useOrderStore } from "../stores/order";
export default {
  setup() {
    const orderStore = useOrderStore();
    return {orderStore};
  },
  computed: {
    totalItem() {
      return this.orderStore.foodItemsInTray.length;
    },
    totalPrice() {
      return this.orderStore.foodItemsInTray.reduce((prev, {food_price}) => prev + food_price, 0);
    },
  },
  methods: {
    onClickToGoToAllOrders() {
      this.$router.push({name: 'order-history-list'});
    },
    onClickGoToCurrentOrder() {
      this.$router.push({name: 'order-detail'});
    }
  },
};
</script>

<style>
.floating-order-bar {
  display: flex;
  align-content: center;
  padding: 8px;
  border: 1px solid var(--md-sys-color-secondary);
  color: var(--md-sys-color-on-tertiary-container);
  background: var(--md-sys-color-tertiary-container);
}
.order-detail-bar {
  flex: 1 1 0%;
  justify-content: space-between;
  border-radius: 16px;
}
.order-history-icon {
  border-radius: 50%;
}
.floating-order-bar > .order-detail {
  display: flex;
  align-items: center;
  gap: 8px;
}
.order-item-image {
  height: 20px;
  width: 20px;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
}
</style>
