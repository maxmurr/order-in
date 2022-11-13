<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div class="food-card">
    <img :src="image" :alt="`an image of ${name}`" class="food-card-image" />
    <div class="flex p-2 justify-between">
      <div>
        <h3 class="label-large --md-sys-color-on-primary-container">
          {{ name }}
        </h3>
        <p class="label-small --md-sys-color-on-primary">{{ price }} บาท</p>
      </div>
      <div v-if="!buttonDisabled" class="items-center">
        <button
          @click="goToMenuDetail"
          class="w-8 h-8 secondary-container rounded-full p-1 justify-center"
        >
          <span class="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["id", "image", "name", "price", "buttonDisabled"],
  methods: {
    goToMenuDetail() {
      this.$router.push (
          {name: 'detail-menu', params: {foodId: this.id}}
      );
    }
  },
};
</script>

<style scoped>
.food-card {
  border-radius: 8px;
  background: var(--md-sys-color-primary-container);
}
.food-card-image {
  border-radius: 8px 8px 0px 0px;
  height: 150px;
  width: 100%;
  object-fit: cover;
}
</style>
