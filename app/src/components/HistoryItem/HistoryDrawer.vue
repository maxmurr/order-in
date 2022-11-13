<!-- <template>
  <div>
    <HistoryItem v-for="(order, index) in orders" 
    :id="index"
    :status="order.status"
    :foodImage="order.image"
    :foodName="order.food_name"
    :orderPrice="order.food_price"
    :orderQuantity="order.order_quantity"
    :orderRequest="order.order_request"
    :key="index">
    </HistoryItem>
  </div>
</template> -->

<script>
import HistoryItem from './HistoryItem.vue';
export default {
  components: {HistoryItem},
};
</script>
