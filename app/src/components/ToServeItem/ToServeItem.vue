<template>
  <div class="main-content-toserve-list">
    <div class="table-circle primary on-primary-text">
      <span> โต๊ะ {{ tableNumber }} </span>
    </div>
    <div
      class="
        flex flex-1
        self-stretch
        items-center
        m-4
        p-4
        rounded-xl
        primary-container
        on-primary-container-text
      "
    >
      <div class="flex-1 self-stretch">
        <h3 class="body-medium">รายการอาหาร</h3>
        <div class="order-detail">
          <p v-for="(order, index) in orders" 
          :key="index" 
          class="body-large"
          >
            {{ order.food_name }} x{{ order.order_quantity }}
          </p>
        </div>
      </div>
      <div class="items-center">
        <button
          @click="serveDone"
          class="
            icon
            secondary-container
            on-secondary-container-text
            justify-center
          "
        >
          <span class="material-symbols-outlined"> done </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['tableNumber', 'orders', 'serveDone'],
};
</script>

<style lang="scss">
div.main-content-toserve-list {
  display: flex;
  gap: 4px;
  align-items: center;
  margin: 4px;
  padding: 4px;
}
@media screen and (max-width: 768px) {
  div.main-content-toserve-list {
    display: flex;
    gap: 4px;
    align-items: center;
    margin: 4px;
    padding: 4px;
  }
}
@media screen and (max-width: 650px) {
  div.main-content-toserve-list {
    display: inline;
    gap: 4px;
    align-items: center;
    margin: 4px;
    padding: 4px;
  }
}
@media screen and (max-width: 420px) {
  div.main-content-toserve-list {
    display: inline;
    gap: 4px;
    align-items: center;
    margin: 4px;
    padding: 4px;
  }
}

.color-block {
  padding: 30px;
  background: gainsboro;
}
.table-circle {
  width: 150px;
  height: 150px;
  line-height: 50px;
  border-radius: 50%;
  font-size: 20px;
  text-align: center;
  vertical-align: baseline;
  line-height: 7.5;
}

.icon {
  float: right;
  padding: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.order-detail {
  display: block;
  padding-left: 16px;
}
.order-detail > p {
  padding-top: 4px;
}
</style>
