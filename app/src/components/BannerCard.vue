<template>
  <div
    class="banner-container"
    v-bind:style="containerStyle"
    @click="onClick"
  >
    <div class="banner-backdrop"></div>
    <p class="headline-small text-white
    absolute bottom-4 left-4">{{ headerText }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'image',
    'headerText',
  ],
  methods: {
    onClick() {
    },
  },
  computed: {
    containerStyle() {
      return {
        'background-image': 'url(' + this.image + ')',
        'background-repeat': 'none',
        'background-size': 'cover',
        'background-position': 'center',
      };
    },
  },
};
</script>

<style>
.banner-container {
  position: relative;
  width: 200px;
  height: 128px;
  border-radius: 16px;
  overflow: hidden;
}

@media (min-width: 640px) {
  .banner-container {
    width: 100%;
  }
}

.banner-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg,
  rgba(0, 0, 0, 0) 20%,
  rgba(0, 0, 0, 0.8) 100%);
}

@media screen and (max-width: 375px) {
  .banner-container {
    position: relative;
    height: 70px;
    border-radius: 16px;
    overflow: hidden;
  }

  .banner-backdrop {
    position: absolute;
    background: linear-gradient(180deg,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0.8) 100%);
  }
}
</style>
