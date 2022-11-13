<template lang=''>
    <div class="w-full">
      <div>
        <h1 class='display-large justify-start text-center'>อร่อยโภชนา</h1>
      </div>
      <div class="flex relative">
            <div>
              <FoodCategoryChip
                 v-for="(chip, index) in chips"
                 :id="index"
                 :image="chip.image"
                 :name="chip.name"
                 :key="index"
              >
              </FoodCategoryChip>
            </div>
      </div>

      <div class="flex justify-between w-full gap-4">
            <div class="grid grid-cols-2 gap-2 sm:w-1/2 md:w-2/3">
              <FoodCard
                v-for="(food, index) in foods"
                :id="food.id"
                :image="food.images.thumb"
                :name="food.food_name"
                :price="food.food_price"
                :key="index"
              />
            </div>
            <div
              class="w-1/2 lg:w-1/3 hidden md:block
              h-screen overflow-hidden sticky top-0"
              >
              <FoodTray :cart="foodInTray"/>
            </div>
        </div>
        <div class="fixed left-0 bottom-0 w-full p-4 md:hidden">
            <FloatingOrder class="m-10"/>
        </div>
    </div>
</template>

<script>
import FloatingOrder from '../../components/FloatingOrder.vue';
import FoodCard from '../../components/FoodCard/FoodCard.vue';
import BannerCard from '../../components/BannerCard.vue';
import FoodTray from
  '../../components/FoodTray.vue';
import FoodCategoryChip from
  '../../components/FoodCategoryChip/FoodCategoryChip.vue';
import {useFoodStore} from '../../stores/food';
import {usePromotionStore} from "../../stores/promotion";

export default {
  setup() {
    const foodStore = useFoodStore();
    const promotionStore = usePromotionStore();
    return {
      foodStore,
      promotionStore
    };
  },

  created() {
    this.fetchData();
  },

  components: {
    FloatingOrder,
    FoodCard,
    BannerCard,
    FoodCategoryChip,
    FoodTray,
  },
  data() {
    return {
      promotions: [],
      chips: [],
      foods: [],
      foodInTray: [],
    };
  },
  methods: {
    async fetchData() {
      await this.promotionStore.fetch();
      await this.foodStore.fetch();
      this.promotions = this.promotionStore.promotions.data || [];
      console.log(this.promotions);
      this.foods = this.foodStore.foods.data || this.foodStore.foods;
      console.log(this.foods)
    },
  },
};
</script>

<style>

.head-recommend {
  display: flex;
  flex-direction: column;
}

.order-and-history {
  color:var( --md-ref-palette-neutral50);
}

.order-and-history:hover {
  color:var( --md-ref-palette-primary0);
}

.scroller-recommend-menu {
  width: auto;
  height: auto;
  overflow-x: scroll;
  margin-bottom: 10px;
}

.category-main-size {
  width: 744px;
  height: 40px;
  gap: 15px;
}

.category-size {
  display: flex;
  flex-direction: row;
  width: 150px;
  height: 10px;
  gap: 20px;
}

.left-menu-list {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  width: 744px;
  height: 976px;
}

.select-food-card-size {
  width: 350px;
  height: 217px;
}

.select-food-card {
  display: grid;
  margin-top: 50px;
  gap: 5px;

  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 4px;
}

.scroller-food-card {
  width: auto;
  height: 500px;
  overflow-y: scroll;
  margin-bottom: 10px;
}

.scroller-order-food {
  width: auto;
  height: 450px;
  overflow-y: scroll;
  gap: 16px;
  margin-bottom: 10px;
}

.main-menu {
  display: flex;
  justify-content: space-between;
}

.right-menu-list {
  width: 360px;
  height: 580px;
  margin-top: 20px;
  margin-right: 50px;

  border: 1px solid;
  padding: 16px 16px 16px 16px;
  border-radius: 8px;
  border-color: var( --md-sys-color-outline);
}

.send-button {
    justify-content: flex-end;
    width: 90px;
    height: 40px;
    background: var( --md-sys-color-primary);
    color: var( --md-sys-color-on-primary);

    /* outline */
    border-radius: 100px;
}

@media screen and (max-width: 420px) {
  .scroller-recommend-menu {
    width: 100px;
    height: 100px;
    /*overscroll-behavior-x: none;*/
    /*overflow-x: auto;*/
    overflow-y: scroll;
    margin-bottom: 10px;
  }

  .main-menu {
    display: flex;
    flex-direction: column;
  }

  .right-menu-list {
    width: 300px;
    height: 300px;

    border: 1px solid;
    padding: 16px 16px 16px 16px;
    border-radius: 8px;
    border-color: var( --md-sys-color-outline);
  }

  .select-food-card {
    display: grid;
    margin-top: 50px;
    gap: 5px;

    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-gap: 4px;
  }

  .scroller-order-food {
    width: 250px;
    height: 150px;
    overflow-y: scroll;
    gap: 16px;
    margin-bottom: 10px;
  }
}
</style>

