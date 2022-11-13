<template>
    <div class="relative">
        <div>
            <TopAppBar label="อาหารในถาด"></TopAppBar>
        </div>
        <div class="py-4">
          <OrderItem
            v-for="order, i in cart"
            :order="order"
            :key="i"
            >
          </OrderItem>
        </div>
        <div>
            <div class="flex gap-2">
                <div class="order-bar order-detail-bar">
                    <label>รวม</label>
                    <div class="order-detail">
                        <div class="flex ml-[14px]">
                            <span>{{totalPrice}} บาท</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-4 float-right">
                <button @click="saveNewOrder()"
                  class="
                    text-center
                    button1
                    primary-container
                    ">
                    + สั่ง
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import TopAppBar from '../../components/TopAppBar/TopAppBar.vue';
import OrderItem from '../../components/OrderItem/OrderItem.vue';
import { useOrderStore } from '../../stores/order';


export default {
  components: {
    TopAppBar,
    OrderItem,
  },

  setup() {
    const orderStore = useOrderStore();
    return {orderStore};
  },

  data() {
    return { 
      cart: [],
      orderedItems: []
    };
  },

  mounted() {
    this.getOrderItems();
  },

  methods: {
    async getOrderItems() {
      this.orderedItems = this.orderStore.foodItemsInTray;
    },
  },
  computed: {
    totalPrice() {
      return this.orderedItems.reduce((prev, curr) => {
          return prev + (curr.order_description
          ? curr.order_description.reduce(
            (prev, curr) => prev + (curr.order_price * curr.order_quantity), 0)
          : 0
        )}, 0)
    },
  },
};
</script>

<style>
.button1{
    padding: 10px 24px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.order-bar{
    display: flex;
    align-content: center;
    padding: 8px;
    color: var(--md-sys-color-primary-container);
    background: var(--md-sys-color-on-primary-container);
}

.order-bar > .order-detail {
  display: flex;
  align-items: center;
  gap: 8px;
}

</style>
