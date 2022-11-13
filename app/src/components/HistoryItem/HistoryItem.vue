<template>
    <div class= "mt-3 p-4
                color-block
                rounded
                flex gab-4
                justify-between">
        <div class="space-y-4">
            <div class="flex items-center text-black">
                <span v-show="status == 'รอทำ'"
                    class="material-symbols-outlined"
                  >alarm</span>
                <span v-show="status == 'กำลังทำ'"
                    class="material-symbols-outlined">soup_kitchen</span>
                <span v-show="status == 'ส่งถึงโต๊ะแล้ว'"
                    class="material-symbols-outlined">done</span>
                {{status}}
            </div>
            <div class="flex gap-4">
              <div
                  class="rounded border-radius-10px
                    overflow-hidden flex flex-col"
              >
                  <img :src="foodImage"
                      :alt="foodName"
                      class="rounded-lg w-44"
                  >
                </div>
                <div class='text-black mx-5 flex flex-col'>
                    <p class='body-large'>{{foodName}}</p>
                    <p class='body-large'>{{orderPrice}} บาท</p>
                    <p class='label-medium'>x{{orderQuantity}}</p>
                    <p class='body-large'>{{orderRequest}}</p>
                </div>
            </div>
       </div>

       <div class="flex items-center flex-shrink-0">
           <button v-show="status == 'รอทำ'"
           @click="() => DeletePopup('buttonTrigger')"
           class="error-container error-text w-10 h-10 rounded-full"
           >
            <div class="flex items-center justify-center">
              <span class="material-symbols-outlined">close</span>
            </div>
           </button>
           <button disabled v-show="status == 'กำลังทำ'"
           class="on-surface-variant w-10 h-10 rounded-full">
            <div class="flex items-center justify-center">
             <span class="material-symbols-outlined">close</span>
            </div>
           </button>
       </div>

       <OrderConfirmDeletePopup
       v-if="popupTrigger.buttonTrigger"
       :DeletePopup="() => DeletePopup('buttonTrigger')"
       >
       <h1 class="text-center headline-medium">ยกเลิกอาหาร</h1>
       <article>
         <p>
           ยกเลิกอาหารที่สั่งไปแล้ว คุณจะไม่สามารถแก้ไขการยกเลิกนี้ได้
           <br/>กดปุ่มยกเลิกอาหารเพื่อยกเลิกการสั่งทำอาหาร
          </p>
        </article>
        <div>
          <button @click="deleteOrdered"
          class="dbutton-color p-3 mt-5 border rounded-lg float-right">
              ยกเลิกอาหาร
            </button>
          </div>
        </OrderConfirmDeletePopup>
    </div>
</template>

<script>

import OrderConfirmDeletePopup from '../OrderConfirmDeletePopup.vue';
import {ref} from 'vue';
import { useOrderStore } from '../../stores/order';


export default {
  props: [
    'id', 'status', 'foodImage', 'foodName',
    'orderPrice', 'orderQuantity', 'orderRequest', 'onRemoveOrder'
  ],

  components: {OrderConfirmDeletePopup},

  setup() {
    const popupTrigger = ref({
      buttonTrigger: false,
    });
    const DeletePopup = (trigger) =>{
      popupTrigger.value[trigger] =! popupTrigger.value[trigger];
    };
    const orderStore = useOrderStore();
    
    return {orderStore, popupTrigger, DeletePopup};
  },

  data() {
    return {
      orderedItems: [],
    }
  },

  created() {
    this.getOrderItems();
  },

  methods:{
    async getOrderItems() {
      await this.orderStore.fetch();
      this.orderedItems = this.orderStore.orders.data;
    },

    deleteOrdered() {
      this.orderStore.delete(this.id);
      this.onRemoveOrder(this.id);
    }

    // async deleteOrdered(){
    //   await this.orderStore.delete(this.id);
    //   this.onRemoveOrder();
    //   this.orderedItems = this.orderStore.orders.data;
    //   this.DeletePopup();
    // }

  },


};
</script>

<style>
.color-block {
    padding: 16px;
    color: var(--md-sys-color-on-surface);
    background: var(--md-sys-color-surface-variant);
}

</style>

