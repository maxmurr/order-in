<template>
 <div class="order-item-container rounded-lg mt-3 p-4 flex justify-between">
  <div class="flex">
    <div>
      <img class="order-image" :src="food_image" alt="">
                                <!-- order.food_image.thumb -->
    </div>

    <div class='mx-5 flex flex-col'>
        <span class='headline-small'>{{food_name}}</span>
        <span class='body-large'>{{order_price}} บาท</span>
        <span class='body-small'>x{{order_quantity}}</span>
        <span class='body-medium'>{{order_request}}</span>
    </div>
  </div>
  <div class="flex items-center">
      <button
        @click="() => DeletePopup('buttonTrigger')"
        class="error-container error-text w-10 h-10 rounded-full">
        <div class="flex items-center justify-center">
          <span class="material-symbols-outlined">close</span>
        </div>
      </button>
  </div>
  <OrderConfirmDeletePopup
    v-if="popupTrigger.buttonTrigger"
      :DeletePopup="() => DeletePopup('buttonTrigger')"
    >
    <h1 class="text-center headline-medium">เอาออกจากถาด</h1>
    <article>
      <p>
        อาหารจะถูกเอาออกจากถาด เมื่อกดปุ่ม "เอาออก" ข้างล่างนี้
        <br/>เมื่อกดแล้วอาหารจะหายจากถาดอาหาร
      </p>
    </article>
    <div>
      <button @click="deleteOrder"
              class="dbutton-color p-3 mt-5 border rounded-lg float-right">
        เอาออก
      </button>
    </div>
  </OrderConfirmDeletePopup>

</div>
</template>

<script>
import OrderConfirmDeletePopup from '../OrderConfirmDeletePopup.vue';
import {ref} from 'vue';

export default {
  props: [
    'id',
    'order_status',
    'food_image',
    'food_name',
    'order_price',
    'order_quantity',
    'order_request',
    'onDeleteOrder',
    'showDeleteDialog',
  ],
  setup() {
    const popupTrigger = ref({
      buttonTrigger: false,
    });

    const DeletePopup = (trigger) =>{
      popupTrigger.value[trigger] =!popupTrigger.value[trigger];
    };

    return {popupTrigger, DeletePopup};
  },

  methods: {
    deleteOrder() {
      console.log(this.onDeleteOrder);
      this.onDeleteOrder(this.id);
      this.popupTrigger.value.buttonTrigger = false;
    },

  },
  components: {OrderConfirmDeletePopup},

};
</script>

<style>
.order-item-container {
  padding: 16px;
  background: var(--md-sys-color-surface-variant);
  color: var(--md-sys-color-on-surface-variant)
}
.order-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
