<template>
  <div class="overflow-x-auto relative">

      <div>
          <TopAppBar label="ประวัติ"></TopAppBar>
      </div>

      <div class="py-8">
        <HistoryItem
        v-for="(order, i) in orderHistoryList"
        :status="order.order_status"
        :foodImage="order.food_image.thumb"
        :foodName="order.food_name"
        :orderPrice="order.order_price"
        :orderQuantity="order.order_quantity"
        :foodDescription="order.order_request"
        :key="i"
      />
      </div>

      

      <div class="fixed left-0 bottom-0 w-full p-4">
          <FloatingHistoryOrder class="mx-10" 
              :totalOrder="orderItemCount"
              :tprice="totalOrderPrice">
          </FloatingHistoryOrder>
      </div>

  </div>
</template>

<script>
// import axios from 'axios';
import {useOrderStore} from '@/stores/order.js';
import HistoryItem from '../../components/HistoryItem/HistoryItem.vue';
import TopAppBar from '../../components/TopAppBar/TopAppBar.vue';
import FloatingHistoryOrder from '../../components/FloatingHistoryOrder.vue';

export default {
  components:
{
  TopAppBar,
  HistoryItem,
  FloatingHistoryOrder,
},

  name: 'AllOrderView',
  setup() {
    const orderStore = useOrderStore();
    return {orderStore};
  },
  created() {
    this.getOrders();
  },
  data() {
    return {
      orders: [],
    };
  },

  methods: {
    async getOrders() {
      await this.orderStore.fetch();
      this.orders = this.orderStore.orders;
    }, 
    onRemoveOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
    },
  },

  // คำนวณจำนวนรายการที่สั่ง
  computed: {
    orderItemCount() {
      let count = [];
      this.orders.forEach((order) => {
        count += order.order_quantity
      });
      if (count == 0) {
        return 0;
      } else {
        return count[count.length - 1];
      }
    },
    // คำนวณราคารวม
    totalOrderPrice() {
      let price = 0;
      this.orders.forEach((order) => {
        price += order.food_price * order.order_quantity;
      });
      return price;
    },
    orderHistoryList() {
      const orderHistory = this.orders.reduce(
        (prev, curr) => [...prev, ...curr.order_description],[]
      );
      console.log('eiei',orderHistory);
      return orderHistory;
    },

  },

  mounted() {
    console.log('Order List Component Mounted');
  },
  
};
</script>
