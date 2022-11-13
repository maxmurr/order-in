<!-- eslint-disable max-len -->
<template>
  <div>
    <div>
      <h1 class="display-large justify-start text-center">อร่อยโภชนา</h1>
    </div>
    <div id="menu-detail" class="main-detail-menu">
      <div id="left-menu-detail" class="left-menu-detail">
        <img v-if="food.images?.original" class="img size-picture" :src="food.images?.original" />
        <div v-else class="img size-picture bg-slate-100"></div>

        <div id="buttom" class="buttom-lm">
          <span id="ชื่ออาหาร" class="headline-large mt-10">{{
            food.food_name
          }}</span>
          <span id="คำอธิบายอาหาร" class="font-medium">{{
            food.food_detail
          }}</span>
          <span class="font-bold">ข้อมูลสำหรับการแพ้อาหาร</span>

          <div class="scrollbar-food-allergy">
            <div class="flex flex-row space-x-3">
              <div class="select-food-allergy">{{ food.food_allergy }}</div>
            </div>
          </div>
          <span class="font-bold">จำนวน</span>
          <div class="flex flex-row gap-5">
            <button class="surface-variant on-surface-variant-text w-10 h-10 rounded-full">
              <div class="flex items-center justify-center">
                <span class="material-symbols-outlined" @click="decrement"
                  >remove</span
                >
              </div>
            </button>
            <span class="mt-2">{{ orderQuantity }}</span>
            <button class="primary on-primary-text w-10 h-10 rounded-full">
              <div class="flex items-center justify-center">
                <span class="material-symbols-outlined" @click="increment"
                  >add</span
                >
              </div>
            </button>
          </div>
          <span class="font-bold">ต้องการอะไรเป็นพิเศษ ?</span>
          <textarea
            class="textarea-want"
            v-model="customerRequest"
            placeholder="ตัวอย่าง ไม่เอาติดมันค่ะ"
          ></textarea>
          <div class="flex justify-end mr-4">
            <button @click="addMenuToTray" class="add-menu-button">
              เพิ่มในถาด
            </button>
          </div>
        </div>
      </div>
      <div class="w-1/3 h-1/2 overflow-hidden">
        <FoodTray/>
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from "@/components/OrderItem/OrderItem.vue";
import FoodTray from "../../components/FoodTray.vue";
import { foodAPI } from "../../services/api";
import { useOrderStore } from "../../stores/order";

export default {
  setup() {
    const orderStore = useOrderStore();
    return { orderStore };
  },
  components: {
    OrderItem,
    FoodTray,
  },
  data() {
    return {
      orderQuantity: 0,
      food: {},
      foodId: null,
      customerRequest: "",
    };
  },
  mounted() {
    this.foodId = this.$route.params.foodId;
    if (this.foodId) {
      this.getFoodDetail();
    }
  },
  methods: {
    async getFoodDetail() {
      const foodData = await foodAPI.get(this.foodId);
      console.log(foodData);
      this.food = foodData.data;
    },
    decrement() {
      if (this.orderQuantity) {
        this.orderQuantity -= 1;
      }
    },
    increment() {
      this.orderQuantity += 1;
    },
    async addMenuToTray() {
      try {
        const food = {
          ...this.food,
          food_id: this.food.id,
          order_quantity: this.orderQuantity,
          order_request: this.customerRequest,
        };
        console.log(food);
        this.orderStore.addFoodToTray(food);
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    },
    sendMenu() {},
  },
};
</script>

<style>
.left-menu-detail {
  width: 750px;
  height: auto;
}

.buttom-lm {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.size-picture {
  width: 750px;
  height: 270px;
  margin-top: 20px;
  object-fit: cover;
}

.img {
  border-radius: 16px;
}

.main-detail-menu {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.textarea-want {
  width: 97%;
  height: 100px;
  padding: 12px 20px;
  border: 1px solid;
  color: var(--md-sys-color-on-background);
  background: var(--md-sys-color-background);
  border-radius: 8px;
}

.select-food-allergy {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 60px;
  height: 25px;
  color: var(--md-sys-color-on-surface);
  background: var(--md-sys-color-surface);
  text-align: center;
}

.scrollbar-food-allergy {
  overflow-x: scroll;
  width: 300px;
  height: 50px;
}

.add-menu-button {
  justify-content: flex-end;
  width: 90px;
  height: 40px;
  color: var(--md-sys-color-on-secondary);
  background: var(--md-sys-color-secondary);

  /* outline */
  border-radius: 100px;
}

@media screen and (max-width: 650px) {
  .main-detail-menu {
    display: flex;
    flex-direction: column;
  }
  .left-menu-detail {
    width: 400px;
    height: 800px;
  }
  .buttom-lm {
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .size-picture {
    width: 300px;
    height: 150px;
    margin-top: 20px;
  }
  .img {
    border-radius: 16px;
  }
  .right-menu-list {
    padding-top: 30px;
  }
  .textarea-want {
    height: 200px;
    padding: 12px 20px;
    border: 1px solid;
    border-color: var(--md-ref-palette-neutral-variant0);
    border-radius: 8px;
  }
}
</style>
