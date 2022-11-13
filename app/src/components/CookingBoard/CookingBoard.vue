<!-- eslint-disable max-len -->
<template>
 <div class='cooking-board'>
    <span class='body-large'>
      โต๊ะ {{ tableNumber }}
    </span>
    <div>
        <p class="label-small">ที่ต้องทำ</p>
        <p class='headline-large'>{{ foodName }}</p>
    </div>
    <div>
        <p class="label-small">เพิ่มเติมจากลูกค้า</p>
        <p>{{ orderRequest }}</p>
    </div>
 </div>
</template>

<script>
export default {
  props: ['id', 'tableNumber', 'foodName', 'orderRequest'],
};
</script>

<style>
.cooking-board {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 750px;
  background:var(--md-sys-color-secondary-container);
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
}

.cooking-board > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media screen and (max-width: 768px) {
  .cooking-board {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 400px;
    background:var(--md-sys-color-secondary-container);
    border-radius: 16px;
    padding: 16px;
    gap: 16px;
  }
}
</style>
